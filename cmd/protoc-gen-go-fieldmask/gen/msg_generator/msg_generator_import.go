package msg_generator

import (
	"fmt"

	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/pluginutils"
	"google.golang.org/protobuf/compiler/protogen"
)

// generator for the message that need to be imported from other package
type importMsgGenerator struct {
	pluginutils.FileGenerator
	// m           *protogen.Message
	importPath  protogen.GoImportPath
	ifaceName   string
	newFuncName string
}

func newImportMsgGenerator(g pluginutils.FileGenerator, m *protogen.Message) *importMsgGenerator {
	return &importMsgGenerator{
		FileGenerator: g,
		// m:             m,
		importPath:  m.GoIdent.GoImportPath,
		ifaceName:   getIfaceName(m.GoIdent),
		newFuncName: getNewFuncName(m.GoIdent),
	}
}

// Apply implements MsgGenerator.
func (g *importMsgGenerator) Apply(gCtx *GeneratorCtx) {
	// do nothing
}

// IfaceName implements MsgGenerator.
func (g *importMsgGenerator) IfaceName() string {
	return g.W.QualifiedGoIdent(g.importPath.Ident(g.ifaceName))
}

// NewStmt implements MsgGenerator.
func (g *importMsgGenerator) NewStmt(fieldPathStmt string) string {
	return fmt.Sprintf("%s(%s)",
		g.W.QualifiedGoIdent(g.importPath.Ident(g.newFuncName)),
		fieldPathStmt,
	)
}

var _ MsgGenerator = (*importMsgGenerator)(nil)
