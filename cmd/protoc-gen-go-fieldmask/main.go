package main

import (
	"errors"
	"flag"

	"github.com/RyoJerryYu/protoc-gen-plugins/cmd/protoc-gen-go-fieldmask/gen"
	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/version"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/types/pluginpb"
)

const (
	DefaultMaxDepth = 7
)

var options gen.Options

func init() {
	flag.Uint64Var(&options.Maxdepth, "maxdepth", DefaultMaxDepth, "maximum depth of the fieldmask")
	flag.StringVar(&options.Mode, "mode", "recursive", "mode of the fieldmask, recursive or reference")
}

func main() {
	flag.Parse()
	defer glog.Flush()

	protogen.Options{
		ParamFunc: flag.CommandLine.Set,
	}.Run(func(p *protogen.Plugin) error {
		if options.Maxdepth <= 0 {
			return errors.New("maxdepth must be greater than 0")
		}
		p.SupportedFeatures = uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL)

		for _, name := range p.Request.FileToGenerate {
			f := p.FilesByPath[name]
			if len(f.Messages) == 0 {
				glog.V(1).Infof("Skipping %s, no messages", f.Desc.Path())
				continue
			}

			glog.V(1).Infof("Processing %s", f.Desc.Path())
			glog.V(2).Infof("Generating %s\n", f.GeneratedFilenamePrefix)

			gf := p.NewGeneratedFile(f.GeneratedFilenamePrefix+".pb.fieldmask.go", f.GoImportPath)

			plgOpt := pluginutils.PluginOptions{
				PluginName:       "protoc-gen-go-fieldmask",
				PluginVersionStr: version.Version,
				FileGenerator: pluginutils.FileGenerator{
					W: gf,
					F: f,
				},
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
