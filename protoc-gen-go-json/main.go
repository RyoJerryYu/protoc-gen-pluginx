package main

import (
	"flag"
	"fmt"

	"github.com/RyoJerryYu/protoc-gen-plugins/protoc-gen-go-json/gen"
	"github.com/RyoJerryYu/protoc-gen-plugins/utils/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/types/pluginpb"
)

var (
	options gen.Options
)

func init() {
	// MarshalOptions

	// marshalOption.Multiline
	// marshalOption.Indent
	// This two are for human readable json output, we don't allow to set them

	// AllowPartial allows messages that have missing required fields to marshal
	// without returning an error. If AllowPartial is false (the default),
	// Marshal will return error if there are any missing required fields.
	flag.BoolVar(&options.MarshalOptions.AllowPartial, "marshal_allow_partial", false, "allow messages that have missing required fields to marshal without returning an error. If AllowPartial is false (the default), Marshal will return error if there are any missing required fields.")

	// UseProtoNames uses proto field name instead of lowerCamelCase name in JSON
	// field names.
	flag.BoolVar(&options.MarshalOptions.UseProtoNames, "marshal_use_proto_names", false, "use proto field name instead of lowerCamelCase name in JSON field names")

	// UseEnumNumbers emits enum values as numbers.
	flag.BoolVar(&options.MarshalOptions.UseEnumNumbers, "marshal_use_enum_numbers", false, "emits enum values as numbers")

	// EmitUnpopulated specifies whether to emit unpopulated fields. It does not
	// emit unpopulated oneof fields or unpopulated extension fields.
	// The JSON value emitted for unpopulated fields are as follows:
	//  ╔═══════╤════════════════════════════╗
	//  ║ JSON  │ Protobuf field             ║
	//  ╠═══════╪════════════════════════════╣
	//  ║ false │ proto3 boolean fields      ║
	//  ║ 0     │ proto3 numeric fields      ║
	//  ║ ""    │ proto3 string/bytes fields ║
	//  ║ null  │ proto2 scalar fields       ║
	//  ║ null  │ message fields             ║
	//  ║ []    │ list fields                ║
	//  ║ {}    │ map fields                 ║
	//  ╚═══════╧════════════════════════════╝
	flag.BoolVar(&options.MarshalOptions.EmitUnpopulated, "marshal_emit_unpopulated", false, "specifies whether to emit unpopulated fields. It does not emit unpopulated oneof fields or unpopulated extension fields.")

	// EmitDefaultValues specifies whether to emit default-valued primitive fields,
	// empty lists, and empty maps. The fields affected are as follows:
	//  ╔═══════╤════════════════════════════════════════╗
	//  ║ JSON  │ Protobuf field                         ║
	//  ╠═══════╪════════════════════════════════════════╣
	//  ║ false │ non-optional scalar boolean fields     ║
	//  ║ 0     │ non-optional scalar numeric fields     ║
	//  ║ ""    │ non-optional scalar string/byte fields ║
	//  ║ []    │ empty repeated fields                  ║
	//  ║ {}    │ empty map fields                       ║
	//  ╚═══════╧════════════════════════════════════════╝
	//
	// Behaves similarly to EmitUnpopulated, but does not emit "null"-value fields,
	// i.e. presence-sensing fields that are omitted will remain omitted to preserve
	// presence-sensing.
	// EmitUnpopulated takes precedence over EmitDefaultValues since the former generates
	// a strict superset of the latter.
	flag.BoolVar(&options.MarshalOptions.EmitDefaultValues, "marshal_emit_default_values", false, "specifies whether to emit default-valued primitive fields, empty lists, and empty maps")

	// UnmarshalOptions

	// If AllowPartial is set, input for messages that will result in missing
	// required fields will not return an error.
	flag.BoolVar(&options.UnmarshalOptions.AllowPartial, "unmarshal_allow_partial", false, "if AllowPartial is set, input for messages that will result in missing required fields will not return an error")

	// If DiscardUnknown is set, unknown fields are ignored.
	flag.BoolVar(&options.UnmarshalOptions.DiscardUnknown, "unmarshal_discard_unknown", false, "if DiscardUnknown is set, unknown fields are ignored")
}

func main() {
	flag.Parse()
	defer glog.Flush()

	protogen.Options{
		ParamFunc: flag.CommandLine.Set,
	}.Run(func(gp *protogen.Plugin) error {
		gp.SupportedFeatures = uint64(pluginpb.CodeGeneratorResponse_FEATURE_PROTO3_OPTIONAL)

		for _, name := range gp.Request.FileToGenerate {
			f := gp.FilesByPath[name]

			if len(f.Messages) == 0 && len(f.Enums) == 0 {
				glog.V(1).Infof("Skipping %s, no messages and no enums", name)
				continue
			}

			glog.V(1).Infof("Processing %s", name)
			glog.V(2).Infof("Generating %s\n", fmt.Sprintf("%s.pb.json.go", f.GeneratedFilenamePrefix))

			gf := gp.NewGeneratedFile(fmt.Sprintf("%s.pb.json.go", f.GeneratedFilenamePrefix), f.GoImportPath)

			plgOpt := pluginutils.PluginOptions{
				PluginName:       "protoc-gen-go-json",
				PluginVersionStr: "v1.0.0-beta",
				W:                gf,
				F:                f,
			}
			plgOpt.PHeader(gp)

			g := gen.Generator{
				Options:       options,
				PluginOptions: plgOpt,
			}
			err := g.ApplyTemplate()
			if err != nil {
				gf.Skip()
				gp.Error(err)
				continue
			}
		}

		return nil
	})
}
