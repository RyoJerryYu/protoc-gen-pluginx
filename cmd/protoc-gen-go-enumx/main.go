package main

import (
	"flag"

	"github.com/RyoJerryYu/protoc-gen-pluginx/cmd/protoc-gen-go-enumx/gen"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/version"
	"github.com/golang/glog"
	"google.golang.org/protobuf/types/pluginpb"
)

var (
	options gen.Options
)

func init() {

}

func main() {
	flag.Parse()
	defer glog.Flush()

	pluginutils.NewForEachFileRunner(pluginutils.PluginInfo{
		PluginName:        "protoc-gen-go-enumx",
		VersionStr:        version.Version,
		GenFileSuffix:     ".pb.enumx.go",
		SupportedFeatures: uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL),
	}).Run(func(genOpt pluginutils.GenerateOptions) error {
		g := gen.Generator{
			Options:         options,
			GenerateOptions: genOpt,
		}
		return g.ApplyTemplate()
	})
}
