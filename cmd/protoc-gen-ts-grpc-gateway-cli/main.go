package main

import (
	"flag"

	"github.com/RyoJerryYu/protoc-gen-pluginx/cmd/protoc-gen-ts-grpc-gateway-cli/gen"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils/tsutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/version"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/types/pluginpb"
)

var options gen.Options

func init() {
	flag.StringVar(&options.TSOption.TypeDefinition, "ts_type_definition", tsutils.Definition_TSProto, "use ts-proto or protobuf-es for type definition")
	flag.BoolVar(&options.TSProto_KeySnakeToCamel, "ts_proto_key_snake_to_camel", true, "if ts-proto uses snakeToCamel for map keys")
	flag.BoolVar(&options.MarshalUseProtoNames, "marshal_use_proto_names", false, "if server has UseProtoNames set to true")
}

func main() {
	flag.Parse()
	defer glog.Flush()

	pluginutils.NewForEachFileRunner(pluginutils.PluginInfo{
		PluginName:        "protoc-gen-ts-grpc-gateway-cli",
		VersionStr:        version.Version,
		GenFileSuffix:     "_pb_gwcli.ts",
		SupportedFeatures: uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL),
	}).ForEachFileThat(func(protoFile *protogen.File) bool {
		if len(protoFile.Services) == 0 {
			glog.V(1).Infof("Skipping %s, no services", protoFile.Desc.Path())
			return false
		}
		return true
	}).Run(func(genOpt pluginutils.GenerateOptions) error {
		g := gen.Generator{
			Options:    options,
			Generator:  genOpt,
			TSRegistry: tsutils.NewTSRegistry(genOpt),
			Definition: tsutils.DefinitionFromOpts(options.TSOption),
		}
		return g.ApplyTemplate()
	})
}
