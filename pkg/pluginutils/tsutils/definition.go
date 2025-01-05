package tsutils

import (
	"fmt"

	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

type Definition interface {
	TSModule(file protoreflect.FileDescriptor) TSModule
	TSIdentMsg(msg *protogen.Message) TSIdent
	MsgFromPartial(msg *protogen.Message) func(g *TSRegistry, in string) string
	MsgFromJson(msg *protogen.Message) func(g *TSRegistry, in string) string
	FieldToJson(field *protogen.Field) func(g *TSRegistry, in string) string
	toJsonable
}

var _ Definition = TSProtoDefinition{}
var _ Definition = ProtobufESDefinition{}

const (
	Definition_ProtobufES = "protobuf-es"
	Definition_TSProto    = "ts-proto"
)

func DefinitionFromOpts(opts TSOption) Definition {
	switch opts.TypeDefinition {
	case Definition_ProtobufES:
		return ProtobufESDefinition{}
	case Definition_TSProto:
		return TSProtoDefinition{}
	default:
		// default to ts-proto
		return TSProtoDefinition{}
	}
}

type toJsonable interface {
	MessageToJson(msg *protogen.Message) func(g *TSRegistry, in string) string
	EnumToJson(enum *protogen.Enum) func(g *TSRegistry, in string) string
	ScalarToJson() func(g *TSRegistry, in string) string
}

func fieldToJson(d toJsonable, field *protogen.Field) func(g *TSRegistry, in string) string {
	if field.Desc.IsMap() {
		keyField := field.Message.Fields[0]
		valueField := field.Message.Fields[1]
		keyFieldToJson := fieldToJson(d, keyField)
		valueFieldToJson := fieldToJson(d, valueField)

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
		protoreflect.BytesKind,
		protoreflect.Int32Kind,
		protoreflect.Int64Kind,
		protoreflect.Uint32Kind,
		protoreflect.Uint64Kind,
		protoreflect.FloatKind,
		protoreflect.DoubleKind,
		protoreflect.Sint32Kind,
		protoreflect.Sint64Kind,
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
