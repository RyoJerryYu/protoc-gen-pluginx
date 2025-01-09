package main

import (
	"flag"

	"github.com/RyoJerryYu/protoc-gen-pluginx/cmd/protoc-gen-go-registar/gen"
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
	flag.BoolVar(&options.NotGenGRPC, "not_gen_grpc", false, "Not generate GRPC registar, default to generate")
	flag.BoolVar(&options.GenGateway, "gen_gateway", false, "Generate GRPC Gateway registars, default not to generate")
	flag.StringVar(&options.GWRegisterFuncSuffix, "gw_register_func_suffix", "Handler", "Suffix for gateway register function, default to 'Handler'")
}

func main() {
	flag.Parse()
	defer glog.Flush()

	pluginutils.NewForEachFileRunner(pluginutils.PluginInfo{
		PluginName:        "protoc-gen-go-registar",
		VersionStr:        version.Version,
		GenFileSuffix:     ".pb.registar.go",
		SupportedFeatures: uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL),
	}).ForEachFileThat(func(protoFile *protogen.File) bool {
		if options.NotGenGRPC && !options.GenGateway {
			glog.V(1).Infof("Skipping %s, no service to generate", protoFile.Desc.Path())
			return false
		}
		if len(protoFile.Services) == 0 {
			glog.V(1).Infof("Skipping %s, no services", protoFile.Desc.Path())
			return false
		}
		return true
	}).Run(func(genOpt pluginutils.GenerateOptions) error {
		g := gen.Generator{
			Options:         options,
			GenerateOptions: genOpt,
		}
		return g.ApplyTemplate()
	})
}
