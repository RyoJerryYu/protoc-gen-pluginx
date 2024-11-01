package msg_generator

import (
	"fmt"

	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

type localMsgGenerator struct {
	pluginutils.FileGenerator
	m      *protogen.Message
	fields []fieldGeneratorPair
	// isDef represent whether is generating for a message or for field type.
	// If for field type, the type define will be in the same package
	// so we don't need to generate again
	isDef       bool
	ifaceName   string
	structName  string
	newFuncName string
}

type fieldGeneratorPair struct {
	*protogen.Field
	MsgGenerator
}

func newLocalMsgGenerator(g pluginutils.FileGenerator, m *protogen.Message, isDef bool) *localMsgGenerator {
	fields := make([]fieldGeneratorPair, 0, len(m.Fields))
	for _, f := range m.Fields {
		fields = append(fields, fieldGeneratorPair{f, GeneratorForField(g, f)})
	}
	return &localMsgGenerator{
		FileGenerator: g,
		m:             m,
		fields:        fields,
		isDef:         isDef,
		ifaceName:     getIfaceName(m.GoIdent),
		structName:    getStructName(m.GoIdent),
		newFuncName:   getNewFuncName(m.GoIdent),
	}
}

var _ MsgGenerator = (*localMsgGenerator)(nil)

func (x *localMsgGenerator) IfaceName() string {
	return x.ifaceName
}

// fieldPathStmt is the statement for method providing the path to the field
// mostly it is `x.prefix+"field_name"`, with the value type of string
func (x *localMsgGenerator) NewStmt(fieldPathStmt string) string {
	return fmt.Sprintf("%s(%s)", x.newFuncName, fieldPathStmt)
}

func (x *localMsgGenerator) Apply(gCtx *GeneratorCtx) {
	if !x.isDef {
		glog.V(1).Infof("Skipping %s, reference type in same package", x.m.GoIdent.GoName)
		return
	}
	if gCtx.See(x.m) {
		glog.V(1).Infof("Skipping %s, already seen", x.m.GoIdent.GoName)
		return
	}
	glog.V(1).Infof("Processing localMsg %s", x.m.GoIdent.GoName)
	x.applyFieldPathIface()
	x.applyFieldPathImpl()
	x.applyFieldPathNew()
	x.applyFieldPathMethods()
	x.applyMessageMethods()

	for _, field := range x.fields {
		glog.V(1).Infof("gen for field %s in %s", field.GoName, x.m.GoIdent.GoName)
		field.Apply(gCtx)
	}
}

func (x *localMsgGenerator) applyFieldPathIface() {
	x.Pf(`// %s is the interface for the field path of %s`, x.ifaceName, x.m.GoIdent.GoName)
	x.Pf(`type %s interface {`, x.ifaceName)
	x.Pf(`	String() string`)
	for _, field := range x.fields {
		x.Pf(`	%s() %s`, field.GoName, field.IfaceName())
	}
	x.Pf(`}`)
}

func (x *localMsgGenerator) applyFieldPathImpl() {
	// struct definition
	x.Pf(`// %s is the implementation for the field path of %s`, x.structName, x.m.GoIdent.GoName)
	x.Pf(`type %s struct {
	fieldPath string // the field path to the current field, empty if it's root
	prefix string // e.g. "fieldPath." or empty if it's root
}`,
		x.structName)

}

func (x *localMsgGenerator) applyFieldPathNew() {
	// new function
	x.Pf(`// %s creates a new %s`, x.newFuncName, x.structName)
	x.Pf(`func %s(fieldPath string) %s {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return %s{fieldPath: fieldPath, prefix: prefix}
}`,
		x.newFuncName, x.ifaceName, x.structName)

}

func (x *localMsgGenerator) applyFieldPathMethods() {
	// String method
	x.Pf(`// String returns the field path
func (x %s) String() string { return x.fieldPath }`,
		x.structName)

	x.Pf(``)
	// field path methods
	for _, field := range x.fields {
		fieldPathStmt := fmt.Sprintf(`x.prefix+"%s"`, field.Desc.Name())
		x.Pf(`func (x %s) %s() %s { return %s }`,
			x.structName,
			field.GoName,
			field.IfaceName(),
			field.NewStmt(fieldPathStmt),
		)
	}
	x.Pf(``)
}

func (x *localMsgGenerator) applyMessageMethods() {
	// field path method for protobuf message
	x.Pf(`// PathBuilder returns the field path for %s`, x.m.GoIdent.GoName)
	x.Pf(`func (x *%s) PathBuilder() %s {`, x.m.GoIdent.GoName, x.ifaceName)
	x.Pf(`	return %s("")`, getNewFuncName(x.m.GoIdent))
	x.Pf(`}`)
	x.Pf(``)
}
