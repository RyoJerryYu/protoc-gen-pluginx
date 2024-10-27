package msg_generator

import "github.com/RyoJerryYu/protoc-gen-plugins/pkg/pluginutils"

// generator for the end message,
// which is the field could not be explored recursively
type endMsgGenerator struct {
	pluginutils.FileGenerator
}

// The end field do not need to apply anything
func (g *endMsgGenerator) Apply(gCtx *GeneratorCtx) {
	// do nothing
}

// The end field returns the field path, no more struct to explore
func (g *endMsgGenerator) IfaceName() string {
	return "string"
}

// the end field returns the field path, no more struct to explore
func (g *endMsgGenerator) NewStmt(fieldPathStmt string) string {
	return fieldPathStmt
}

func newEndMsgGenerator(g pluginutils.FileGenerator) *endMsgGenerator {
	return &endMsgGenerator{
		FileGenerator: g,
	}
}

var _ MsgGenerator = (*endMsgGenerator)(nil)
