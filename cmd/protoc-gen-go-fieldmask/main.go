package main

import (
	"flag"

	"github.com/RyoJerryYu/protoc-gen-pluginx/cmd/protoc-gen-go-fieldmask/gen"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/version"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/types/pluginpb"
)

const (
	DefaultMaxDepth = 7
)

var options gen.Options

func init() {
	// flag.Uint64Var(&options.Maxdepth, "maxdepth", DefaultMaxDepth, "maximum depth of the fieldmask")
	flag.StringVar(&options.Mode, "mode", "recursive", "mode of the fieldmask, recursive or reference")
}

func main() {
	flag.Parse()
	defer glog.Flush()
	// if options.Maxdepth <= 0 {
	// 	return errors.New("maxdepth must be greater than 0")
	// }

	pluginutils.NewForEachFileRunner(pluginutils.PluginInfo{
		PluginName:        "protoc-gen-go-fieldmask",
		VersionStr:        version.Version,
		GenFileSuffix:     ".pb.fieldmask.go",
		SupportedFeatures: uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL),
	}).ForEachFileThat(func(protoFile *protogen.File) pluginutils.ForEachFileCheckResult {
		if len(protoFile.Messages) == 0 {
			glog.V(1).Infof("Skipping %s, no messages", protoFile.Desc.Path())
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
