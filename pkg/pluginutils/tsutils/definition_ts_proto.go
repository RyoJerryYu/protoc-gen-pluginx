package tsutils

import (
	"fmt"
	"strings"

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

func (d TSProtoDefinition) FieldToJson(field *protogen.Field) func(g *TSRegistry, in string) string {
	if field.Desc.IsMap() {
		keyField := field.Message.Fields[0]
		valueField := field.Message.Fields[1]
		keyFieldToJson := d.FieldToJson(keyField)
		valueFieldToJson := d.FieldToJson(valueField)

		return func(g *TSRegistry, in string) string {
			return fmt.Sprintf(`((s) => {
				const entries = Object.entries(s);
				const obj: any = {};
				for (const [k, v] of entries) {
					obj[%s] = %s;
				}
				return obj;
			})(%s)`, keyFieldToJson(g, "k"), valueFieldToJson(g, "v"), in)
		}
	}
	isList := field.Desc.IsList()
	listify := func(in string, do func(string) string) string {
		return fmt.Sprintf(`(%s).map((e)=>%s)`, in, do("e"))
	}
	var toJsonFunc func(g *TSRegistry, in string) string
	switch field.Desc.Kind() {
	case protoreflect.MessageKind:
		bodyType := field.Message
		toJsonFunc = d.MessageToJson(bodyType)
	case protoreflect.EnumKind:
		// bodyType := field.Enum
		// if root is enum, it can only be parsed as a number
		// so it should not use TSProtoEnumToJson
		toJsonFunc = d.ScalarToJson()
	case protoreflect.BoolKind,
		protoreflect.StringKind,
		protoreflect.Int32Kind,
		protoreflect.Int64Kind,
		protoreflect.Uint32Kind,
		protoreflect.Uint64Kind,
		protoreflect.FloatKind,
		protoreflect.DoubleKind,
		protoreflect.Sfixed32Kind,
		protoreflect.Sfixed64Kind,
		protoreflect.Fixed32Kind,
		protoreflect.Fixed64Kind:
		// scalar types
		toJsonFunc = d.ScalarToJson()
	default:
		glog.Fatalf("unsupported body field type: %s", field.Desc.Kind())
		toJsonFunc = d.ScalarToJson()
	}
	if isList {
		return func(g *TSRegistry, in string) string {
			return listify(in, func(s string) string {
				return toJsonFunc(g, s)
			})
		}
	}

	return toJsonFunc
}

func (d TSProtoDefinition) MessageToJson(msgTyp *protogen.Message) func(g *TSRegistry, in string) string {
	messageToJson := func(g *TSRegistry, in string) string {
		ident := g.QualifiedTSIdent(d.TSIdentMsg(msgTyp))
		return ident + `.toJSON(` + in + `)`
	}
	if protobufx.IsWellKnownType(msgTyp.Desc) {
		switch msgTyp.Desc.Name() {
		case protobufx.Any_message_name,
			protobufx.Empty_message_name:
			// Any and Empty, jsonify as a normal message
			return messageToJson
		case protobufx.Struct_message_name,
			protobufx.Value_message_name,
			protobufx.ListValue_message_name:
			// Struct, Value, ListValue, jsonify as what they are
			// It presents as a JSON object, so we don't need to convert it
			return d.ScalarToJson()
		case protobufx.Timestamp_message_name:
			// Timestamp represents as Date in ts-proto
			// and need to convert to a ISO string
			return d.TimestampToJson()
		case protobufx.Duration_message_name:
			// don't know why ts-proto treats Duration as a normal message
			// in the docs, it should be a string like "1.234s"
			return messageToJson
		case protobufx.FieldMask_message_name:
			// FieldMask represents as []string in ts-proto
			// and need to convert to strings joined by ","
			return d.FieldMaskToJson(msgTyp)
		case protobufx.BoolValue_message_name,
			protobufx.StringValue_message_name,
			protobufx.DoubleValue_message_name,
			protobufx.FloatValue_message_name,
			protobufx.Int32Value_message_name,
			protobufx.Int64Value_message_name,
			protobufx.UInt32Value_message_name,
			protobufx.UInt64Value_message_name:
			// well-known scalar types,
			// represent as a scalar in ts-proto
			// and should be as it is in JSON
			return d.ScalarToJson()
		default:
			// other types for reflection or syntax types
			// should be treated as a normal message
			return messageToJson
		}
	}
	return messageToJson
}

func (d TSProtoDefinition) enumToJSONFuncName(g *TSRegistry, enum protoreflect.EnumDescriptor) string {
	return strcase.ToLowerCamel(string(enum.Name())) + "ToJSON"
}

func (d TSProtoDefinition) EnumToJson(enumTyp *protogen.Enum) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		enumModule := d.TSModule(enumTyp.Desc.ParentFile())
		toJsonIdent := enumModule.Ident(d.enumToJSONFuncName(g, enumTyp.Desc))
		toJsonFunc := g.QualifiedTSIdent(toJsonIdent)
		return toJsonFunc + `(` + in + `)`
	}
}

func (d TSProtoDefinition) ScalarToJson() func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		return in
	}
}

func (d TSProtoDefinition) TimestampToJson() func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		// in is type of Date
		return in + `.toISOString()`
	}
}

func (d TSProtoDefinition) FieldMaskToJson(msgTyp *protogen.Message) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		// in is type of FieldMask
		ident := g.QualifiedTSIdent(d.TSIdentMsg(msgTyp))
		return fmt.Sprintf(`%s.toJSON(%s.wrap(%s))`, ident, ident, in)
	}
}
