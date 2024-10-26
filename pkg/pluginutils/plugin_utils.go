package pluginutils

import "google.golang.org/protobuf/compiler/protogen"

type PluginOptions struct {
	PluginName       string
	PluginVersionStr string
	W                *protogen.GeneratedFile // The file to write to
	F                *protogen.File          // The proto file descr
}
