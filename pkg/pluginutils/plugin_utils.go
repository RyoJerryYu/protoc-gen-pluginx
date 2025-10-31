package pluginutils

import "google.golang.org/protobuf/compiler/protogen"

type GenerateOptions struct {
	FileGenerator
	PluginInfo
}

type PluginInfo struct {
	PluginName        string
	VersionStr        string
	GenFileSuffix     string
	SupportedFeatures uint64
}

type FileGenerator struct {
	W *protogen.GeneratedFile // The file to write to
	F *protogen.File          // The proto file descr
}
