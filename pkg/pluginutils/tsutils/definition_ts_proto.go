package tsutils

import (
	"fmt"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/protobufx"
	"github.com/golang/glog"
	"github.com/iancoleman/strcase"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

// Work with protoc-gen-ts_proto: https://github.com/stephenh/ts-proto

type TSProtoDefinition struct{}

func (d TSProtoDefinition) TSModule(file protoreflect.FileDescriptor) TSModule {
	protoPath := file.Path()
	return TSModule{
		ModuleName: GetModuleName(file),
		Path:       strings.TrimSuffix(protoPath, ".proto") + ".ts",
		Relative:   true,
	}
}

func (d TSProtoDefinition) TSIdentMsg(msg *protogen.Message) TSIdent {
	return d.TSModule(msg.Desc.ParentFile()).Ident(msg.GoIdent.GoName)
}

func (d TSProtoDefinition) GetFieldSyntax(opt *TSOption, rootMsg *protogen.Message) func(rootVar string, path string) string {
	fieldCase := JSONCamelCase
	if !opt.TSProto_KeySnakeToCamel {
		fieldCase = func(s string) string { return s } // no-op
	}
	return func(rootVar string, path string) string {
		if path == "" {
			return ""
		}
		var fd protoreflect.FieldDescriptor
		md := rootMsg.Desc
		syntax := &strings.Builder{}
		valid := pluginutils.RangeFields(path, func(field string) bool {
			if md == nil {
				return false
			}

			syntax.WriteString("?.")

			fd = md.Fields().ByTextName(field)
			if fd == nil {
				return false
			}

			_, err := syntax.WriteString(fieldCase(fd.TextName()))
			if err != nil {
				glog.Errorf("failed to write field syntax: %v", err)
				return false
			}

			md = fd.Message() // may be nil

			if fd.IsList() || fd.IsMap() {
				md = nil
			}

			return true
		})
		if !valid {
			return ""
		}
		return rootVar + strings.TrimPrefix(syntax.String(), "?")
	}
}

func (d TSProtoDefinition) MsgFromPartial(msg *protogen.Message) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		ident := g.QualifiedTSIdent(d.TSIdentMsg(msg))
		return ident + `.fromPartial(` + in + `)`
	}
}

func (d TSProtoDefinition) MsgFromJson(msg *protogen.Message) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		ident := g.QualifiedTSIdent(d.TSIdentMsg(msg))
		return ident + `.fromJSON(` + in + `)`
	}
}

func (d TSProtoDefinition) FieldToJson(field *protogen.Field) func(g *TSRegistry, in string) string {
	return fieldToJson(d, field)
}

func (d TSProtoDefinition) MessageToJson(msgTyp *protogen.Message) func(g *TSRegistry, in string) string {
	if protobufx.IsWellKnownType(msgTyp.Desc) {
		switch msgTyp.Desc.Name() {
		case protobufx.Any_message_name,
			protobufx.Empty_message_name:
			// Any and Empty, jsonify as a normal message
			return d.commonMessageToJson(msgTyp)
		case protobufx.Struct_message_name,
			protobufx.Value_message_name,
			protobufx.ListValue_message_name:
			// Struct, Value, ListValue, jsonify as what they are
			// It presents as a JSON object, so we don't need to convert it
			return d.ScalarToJson()
		case protobufx.Timestamp_message_name:
			// Timestamp represents as Date in ts-proto
			// and need to convert to a ISO string
			return d.timestampToJson(msgTyp)
		case protobufx.Duration_message_name:
			return d.durationToJson(msgTyp)
		case protobufx.FieldMask_message_name:
			// FieldMask represents as []string in ts-proto
			// and need to convert to strings joined by ","
			return d.fieldMaskToJson(msgTyp)
		case protobufx.BoolValue_message_name,
			protobufx.StringValue_message_name,
			protobufx.BytesValue_message_name,
			protobufx.DoubleValue_message_name,
			protobufx.FloatValue_message_name,
			protobufx.Int32Value_message_name,
			protobufx.Int64Value_message_name,
			protobufx.UInt32Value_message_name,
			protobufx.UInt64Value_message_name:
			// well-known wrapper types,
			// represent as a scalar in ts-proto
			// and should be as it is in JSON
			return d.ScalarToJson()
		default:
			// other types for reflection or syntax types
			// should be treated as a normal message
			return d.commonMessageToJson(msgTyp)
		}
	}
	return d.commonMessageToJson(msgTyp)
}

func (d TSProtoDefinition) commonMessageToJson(msg *protogen.Message) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		ident := g.QualifiedTSIdent(d.TSIdentMsg(msg))
		return ident + `.toJSON(` + in + `)`
	}
}

func (d TSProtoDefinition) enumToJSONFuncName(enum protoreflect.EnumDescriptor) string {
	return strcase.ToLowerCamel(string(enum.Name())) + "ToJSON"
}

func (d TSProtoDefinition) EnumToJson(enumTyp *protogen.Enum) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		enumModule := d.TSModule(enumTyp.Desc.ParentFile())
		toJsonIdent := enumModule.Ident(d.enumToJSONFuncName(enumTyp.Desc))
		toJsonFunc := g.QualifiedTSIdent(toJsonIdent)
		return toJsonFunc + `(` + in + `)`
	}
}

func (d TSProtoDefinition) ScalarToJson() func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		return in
	}
}

func (d TSProtoDefinition) timestampToJson(_ *protogen.Message) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		// in is type of Date
		return in + `.toISOString()`
	}
}

// don't know why ts-proto treats Duration as a normal message
// in the docs, it should be a string like "1.234s"
// use normal message conversion
func (d TSProtoDefinition) durationToJson(msg *protogen.Message) func(g *TSRegistry, in string) string {
	return d.commonMessageToJson(msg)
}

func (d TSProtoDefinition) fieldMaskToJson(msgTyp *protogen.Message) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		// in is type of FieldMask
		ident := g.QualifiedTSIdent(d.TSIdentMsg(msgTyp))
		return fmt.Sprintf(`%s.toJSON(%s.wrap(%s)) as string`, ident, ident, in)
	}
}
