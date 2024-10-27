package pluginutils

import "google.golang.org/protobuf/compiler/protogen"

type PluginOptions struct {
	FileGenerator
	PluginName       string
	PluginVersionStr string
}

type FileGenerator struct {
	W *protogen.GeneratedFile // The file to write to
	F *protogen.File          // The proto file descr
}
