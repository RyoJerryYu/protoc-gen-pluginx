package gen

import (
	"github.com/RyoJerryYu/protoc-gen-plugins/cmd/protoc-gen-go-fieldmask/gen/msg_generator"
	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

const (
	PluginMode_Recursive = "recursive" // recursively gen for all fields
	PluginMode_Reference = "reference" // would reference the fieldmask to the original package
	PluginMode_All       = "all"       // would generate all the fieldmask for all fields
	PluginMode_Option    = "option"    // would generate the fieldmask for the fields with the option
)

type Options struct {
	Maxdepth uint64
	Mode     string
}

type Generator struct {
	Options
	pluginutils.PluginOptions
}

func (g *Generator) ApplyTemplate() error {
	gCtx := msg_generator.NewGeneratorCtx()
	for _, m := range g.F.Messages {
		if m.Desc.IsMapEntry() {
			glog.V(2).Infof("Skipping %s, mapentry message", m.GoIdent.GoName)
			continue
		}

		glog.V(2).Infof("Processing %s", m.GoIdent.GoName)

		g.applyMessage(gCtx, m)
	}
	return nil
}

func (g *Generator) applyMessage(gCtx *msg_generator.GeneratorCtx, m *protogen.Message) {
	generator := msg_generator.GeneratorForMessage(g.FileGenerator, m)
	generator.Apply(gCtx)

	// Nested messages
	for _, msg := range m.Messages {
		g.applyMessage(gCtx, msg)
	}
}
