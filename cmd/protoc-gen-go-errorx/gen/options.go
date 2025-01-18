package gen

import "github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"

type Options struct {
}

type Generator struct {
	Options
	pluginutils.GenerateOptions
}

func (g *Generator) ApplyTemplate() error {
	return nil
}
