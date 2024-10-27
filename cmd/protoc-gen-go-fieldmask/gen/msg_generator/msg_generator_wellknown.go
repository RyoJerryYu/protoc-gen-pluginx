package msg_generator

import (
	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/protobufx"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

func reflectNameIdent(name protoreflect.Name) protogen.GoIdent {
	return protogen.GoIdent{
		GoName:       string(name),
		GoImportPath: "",
	}
}

func newWellKnownTypeMsgGenerator(g pluginutils.FileGenerator, f protoreflect.MessageDescriptor) MsgGenerator {
	switch f.Name() {
	case protobufx.Timestamp_message_name:
		return newTimestampMsgGenerator(g)
	case protobufx.Duration_message_name:
		return newDurationMsgGenerator(g)
	case protobufx.FieldMask_message_name:
		return newFieldMaskMsgGenerator(g)
	case protobufx.BoolValue_message_name,
		protobufx.Int32Value_message_name,
		protobufx.Int64Value_message_name,
		protobufx.UInt32Value_message_name,
		protobufx.UInt64Value_message_name,
		protobufx.FloatValue_message_name,
		protobufx.DoubleValue_message_name,
		protobufx.StringValue_message_name,
		protobufx.BytesValue_message_name:
		return newWrappersMsgGenerator(g)
	default:
		// end for any, struct, listValue, value, empty
		return newEndMsgGenerator(g)
	}
}

type timestampMsgGenerator struct {
	importMsgGenerator
}

func newTimestampMsgGenerator(g pluginutils.FileGenerator) *timestampMsgGenerator {
	return &timestampMsgGenerator{
		importMsgGenerator: importMsgGenerator{
			FileGenerator: g,
			importPath:    "github.com/RyoJerryYu/protoc-gen-plugins/pkg/fieldmask",
			ifaceName:     getIfaceName(reflectNameIdent(protobufx.Timestamp_message_name)),
			newFuncName:   getNewFuncName(reflectNameIdent(protobufx.Timestamp_message_name)),
		},
	}
}

type durationMsgGenerator struct {
	importMsgGenerator
}

func newDurationMsgGenerator(g pluginutils.FileGenerator) *durationMsgGenerator {
	return &durationMsgGenerator{
		importMsgGenerator: importMsgGenerator{
			FileGenerator: g,
			importPath:    "github.com/RyoJerryYu/protoc-gen-plugins/pkg/fieldmask",
			ifaceName:     getIfaceName(reflectNameIdent(protobufx.Duration_message_name)),
			newFuncName:   getNewFuncName(reflectNameIdent(protobufx.Duration_message_name)),
		},
	}
}

type fieldMaskMsgGenerator struct {
	importMsgGenerator
}

func newFieldMaskMsgGenerator(g pluginutils.FileGenerator) *fieldMaskMsgGenerator {
	return &fieldMaskMsgGenerator{
		importMsgGenerator: importMsgGenerator{
			FileGenerator: g,
			importPath:    "github.com/RyoJerryYu/protoc-gen-plugins/pkg/fieldmask",
			ifaceName:     getIfaceName(reflectNameIdent(protobufx.FieldMask_message_name)),
			newFuncName:   getNewFuncName(reflectNameIdent(protobufx.FieldMask_message_name)),
		},
	}
}

type wrappersMsgGenerator struct {
	importMsgGenerator
}

func newWrappersMsgGenerator(g pluginutils.FileGenerator) *wrappersMsgGenerator {
	return &wrappersMsgGenerator{
		importMsgGenerator: importMsgGenerator{
			FileGenerator: g,
			importPath:    "github.com/RyoJerryYu/protoc-gen-plugins/pkg/fieldmask",
			ifaceName:     getIfaceName(reflectNameIdent("Wrappers")),
			newFuncName:   getNewFuncName(reflectNameIdent("Wrappers")),
		},
	}
}
