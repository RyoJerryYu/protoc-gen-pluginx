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

	pluginutils.NewForEachFileRunner(pluginutils.PluginInfo{
		PluginName:        "protoc-gen-go-adapter",
		VersionStr:        version.Version,
		GenFileSuffix:     ".pb.adapter.go",
		SupportedFeatures: uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL),
	}).ForEachFileThat(func(protoFile *protogen.File) pluginutils.ForEachFileCheckResult {
		if options.NotGenGRPCAdapter && !options.GenGatewayClientAdapter {
			glog.V(1).Infof("Skipping %s, no adapter to generate", protoFile.Desc.Path())
			return pluginutils.ForEachFileCheckResult{
				Skip: true,
			}
		}
		if len(protoFile.Services) == 0 {
			glog.V(1).Infof("Skipping %s, no services", protoFile.Desc.Path())
			return pluginutils.ForEachFileCheckResult{
				Skip: true,
			}
		}
		return pluginutils.ForEachFileCheckResult{
			Skip: false,
		}
	}).Run(func(genOpt pluginutils.GenerateOptions) error {
		g := gen.Generator{
			Options:         options,
			GenerateOptions: genOpt,
		}
		return g.ApplyTemplate()
	})
}
