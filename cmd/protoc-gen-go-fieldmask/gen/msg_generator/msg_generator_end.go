package msg_generator

import (
	"fmt"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"google.golang.org/protobuf/compiler/protogen"
)

func endIdent() protogen.GoIdent {
	return protogen.GoIdent{
		GoName: "End",
	}
}

// generator for the end message,
// which is the field could not be explored recursively
func newEndMsgGenerator(g pluginutils.FileGenerator) *endMsgGenerator {
	return &endMsgGenerator{
		FileGenerator: g,
	}
}

type endMsgGenerator struct {
	pluginutils.FileGenerator
}

// The end field do not need to apply anything
func (g *endMsgGenerator) Apply(gCtx *GeneratorCtx) {
	// do nothing
}

// The end field returns the field path, no more struct to explore
func (g *endMsgGenerator) IfaceName() string {
	return g.W.QualifiedGoIdent(fieldmaskPackage.Ident(getIfaceName(endIdent())))
}

// the end field returns the field path, no more struct to explore
func (g *endMsgGenerator) NewStmt(fieldPathStmt string) string {
	return fmt.Sprintf("%s(%s)",
		g.W.QualifiedGoIdent(fieldmaskPackage.Ident(getNewFuncName(endIdent()))),
		fieldPathStmt,
	)
}

var _ MsgGenerator = (*endMsgGenerator)(nil)
