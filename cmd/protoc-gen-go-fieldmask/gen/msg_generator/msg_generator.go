package msg_generator

import (
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/protobufx"
	"github.com/RyoJerryYu/protoc-gen-pluginx/proto/ryojerryyu/annotations"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/reflect/protoreflect"
)

type MsgGenerator interface {
	IfaceName() string
	NewStmt(fieldPathStmt string) string
	Apply(gCtx *GeneratorCtx)
}

func GeneratorForField(g pluginutils.FileGenerator, f *protogen.Field) MsgGenerator {
	glog.V(1).Infof("building generator for field %s", f.GoIdent.GoName)
	if isPathEnd(f) {
		return newEndMsgGenerator(g)
	}

	fieldExt := getExtension(f)
	if fieldExt.GetEnd() {
		return newEndMsgGenerator(g)
	}

	if protobufx.IsWellKnownType(f.Message.Desc) {
		return newWellKnownTypeMsgGenerator(g, f.Message.Desc)
	}

	if f.Message.Desc.FullName().Parent() == protobufx.GoogleApi_package {
		return newEndMsgGenerator(g) // currently do not support google.api package
	}

	if f.Message.GoIdent.GoImportPath != g.F.GoImportPath {
		return newImportMsgGenerator(g, f.Message)
	}

	return newLocalMsgGenerator(g, f.Message, false)
}

func GeneratorForMessage(g pluginutils.FileGenerator, m *protogen.Message) MsgGenerator {
	glog.V(1).Infof("building generator for message %s", m.GoIdent.GoName)
	return newLocalMsgGenerator(g, m, true)
}

// path do not end when the field is a message or group
func isPathEnd(field *protogen.Field) bool {
	return (field.Desc.Kind() != protoreflect.MessageKind &&
		field.Desc.Kind() != protoreflect.GroupKind) ||
		field.Desc.IsMap() ||
		field.Desc.IsList()
}

func defaultExtension() *annotations.FieldMaskFieldOptions {
	return &annotations.FieldMaskFieldOptions{
		End: false,
	}
}

func getExtension(field *protogen.Field) *annotations.FieldMaskFieldOptions {
	fieldExt, ok := proto.GetExtension(field.Desc.Options(), annotations.E_FieldMask).(*annotations.FieldMaskFieldOptions)
	if !ok {
		return defaultExtension()
	}
	return fieldExt
}

type GeneratorCtx struct {
	seen map[protoreflect.FullName]struct{}
}

func NewGeneratorCtx() *GeneratorCtx {
	return &GeneratorCtx{
		seen: make(map[protoreflect.FullName]struct{}),
	}
}

func (g *GeneratorCtx) See(m *protogen.Message) bool {
	if _, ok := g.seen[m.Desc.FullName()]; ok {
		return true
	}
	g.seen[m.Desc.FullName()] = struct{}{}
	return false
}

// func (g *GeneratorCtx) Seen(m *protogen.Message) bool {
// 	_, ok := g.seen[m.Desc.FullName()]
// 	return ok
// }
