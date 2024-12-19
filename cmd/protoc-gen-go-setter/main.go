package main

import (
	"flag"

	"github.com/RyoJerryYu/protoc-gen-pluginx/cmd/protoc-gen-go-setter/gen"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/version"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/types/pluginpb"
)

var (
	options gen.Options
)

func init() {}

func main() {
	flag.Parse()
	defer glog.Flush()

	pluginutils.NewForEachFileRunner(pluginutils.PluginInfo{
		PluginName:        "protoc-gen-go-setter",
		VersionStr:        version.Version,
		GenFileSuffix:     ".pb.setter.go",
		SupportedFeatures: uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL),
	}).ForEachFileThat(func(protoFile *protogen.File) bool {
		if len(protoFile.Messages) == 0 {
			glog.V(1).Infof("Skipping %s, no messages", protoFile.Desc.Path())
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
