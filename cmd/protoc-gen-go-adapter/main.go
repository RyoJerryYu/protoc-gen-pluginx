package main

import (
	"flag"

	"github.com/RyoJerryYu/protoc-gen-pluginx/cmd/protoc-gen-go-adapter/gen"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/version"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/types/pluginpb"
)

var (
	options gen.Options
)

func init() {
	flag.BoolVar(&options.NotGenGRPCAdapter, "not_gen_grpc_adapter", false, "Not generate GRPC adapter, default to generate")
	flag.BoolVar(&options.GenGatewayClientAdapter, "gen_gateway_client_adapter", false, "Generate GRPC Gateway client adapter, default not to generate")
}

func main() {
	flag.Parse()
	defer glog.Flush()

	protogen.Options{
		ParamFunc: flag.CommandLine.Set,
	}.Run(func(p *protogen.Plugin) error {
		p.SupportedFeatures = uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL)

		for _, name := range p.Request.FileToGenerate {
			f := p.FilesByPath[name]
			if options.NotGenGRPCAdapter && !options.GenGatewayClientAdapter {
				glog.V(1).Infof("Skipping %s, no adapter to generate", f.Desc.Path())
				continue
			}
			if len(f.Services) == 0 {
				glog.V(1).Infof("Skipping %s, no services", f.Desc.Path())
				continue
			}

			glog.V(1).Infof("Processing %s", f.Desc.Path())
			glog.V(2).Infof("Generating %s\n", f.GeneratedFilenamePrefix)

			gf := p.NewGeneratedFile(f.GeneratedFilenamePrefix+".pb.adapter.go", f.GoImportPath)

			plgOpt := pluginutils.PluginOptions{
				PluginName:       "protoc-gen-go-adapter",
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
