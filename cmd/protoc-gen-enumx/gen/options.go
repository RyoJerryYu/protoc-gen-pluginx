package gen

import (
	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

type Options struct {
}

type Generator struct {
	Options
	pluginutils.PluginOptions
}

func (g *Generator) ApplyTemplate() error {
	g.applyEnums(g.F.Enums)
	return nil
}

func (g *Generator) applyEnums(enums []*protogen.Enum) {
	for _, e := range enums {
		glog.V(2).Infof("Processing %s", e.GoIdent.GoName)
		g.Pf("enum %s {\n", e.GoIdent.GoName)
		for _, v := range e.Values {
			g.Pf("  %s = %d;\n", v.GoIdent.GoName, v.Desc.Number())
		}
		g.Pf("}\n")
	}
}

func (g *Generator) applyEnumFromStr(e *protogen.Enum) {

}
