package msg_generator

import "github.com/RyoJerryYu/protoc-gen-plugins/pkg/pluginutils"

type seenMsgGenerator struct {
	pluginutils.FileGenerator
	MsgGenerator
}

func newSeenMsgGenerator(g pluginutils.FileGenerator, inner MsgGenerator) *seenMsgGenerator {
	return &seenMsgGenerator{
		FileGenerator: g,
		MsgGenerator:  inner,
	}
}

func (g *seenMsgGenerator) Apply() {
	// do nothing
}
