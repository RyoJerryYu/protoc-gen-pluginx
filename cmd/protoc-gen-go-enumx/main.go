package main

import (
	"flag"

	"github.com/RyoJerryYu/protoc-gen-plugins/cmd/protoc-gen-go-enumx/gen"
	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/version"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

var (
	options gen.Options
)

func init() {

}

func main() {
	flag.Parse()
	defer glog.Flush()

	protogen.Options{
		ParamFunc: flag.CommandLine.Set,
	}.Run(func(p *protogen.Plugin) error {
		for _, f := range p.Files {
			if len(f.Enums) == 0 {
				glog.V(1).Infof("Skipping %s, no enums", f.Desc.Path())
				continue
			}

			glog.V(1).Infof("Processing %s", f.Desc.Path())
			glog.V(2).Infof("Generating %s\n", f.GeneratedFilenamePrefix)

			gf := p.NewGeneratedFile(f.GeneratedFilenamePrefix+".pb.enumx.go", f.GoImportPath)

			plgOpt := pluginutils.PluginOptions{
				PluginName:       "protoc-gen-enumx",
				PluginVersionStr: version.Version,
				W:                gf,
				F:                f,
			}

			plgOpt.PHeader(p)
			plgOpt.PPackage()

			g := gen.Generator{
				Options:       options,
				PluginOptions: plgOpt,
			}
			err := g.ApplyTemplate()
			if err != nil {
				gf.Skip()
				p.Error(err)
				continue
			}
		}
		return nil
	})
}
