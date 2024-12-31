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
	flag.BoolVar(&options.UseProtoNames, "use_proto_names", false, "field names will match the proto file")
	flag.StringVar(&options.TSImportRoots, "ts_import_roots", "", "defaults to $(pwd)")
	flag.StringVar(&options.TSImportRootAliases, "ts_import_root_aliases", "", "use import aliases instead of relative paths")
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
		}
		return g.ApplyTemplate()
	})
}
