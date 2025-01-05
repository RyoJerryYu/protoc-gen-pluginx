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

type ProtobufESDefinition struct{}

func (d ProtobufESDefinition) TSModule(file protoreflect.FileDescriptor) TSModule {
	if file.Package() == protobufx.GoogleProtobuf_package {
		// well-known types deligated to protobuf-es
		return d.wktModule()
	}
	protoPath := file.Path()
	return TSModule{
		ModuleName: GetModuleName(file),
		Path:       strings.TrimSuffix(protoPath, ".proto") + "_pb.ts",
		Relative:   true,
	}
}

func (d ProtobufESDefinition) protobufModule() TSModule {
	return TSModule{
		ModuleName: "BufBuildProtobuf",
		Path:       "@bufbuild/protobuf",
		Relative:   false,
	}
}

func (d ProtobufESDefinition) wktModule() TSModule {
	return TSModule{
		ModuleName: "BufBuildProtobufWKT",
		Path:       "@bufbuild/protobuf/wkt",
		Relative:   false,
	}
}

func (d ProtobufESDefinition) TSIdentMsg(msg *protogen.Message) TSIdent {
	return d.TSModule(msg.Desc.ParentFile()).Ident(msg.GoIdent.GoName)
}
func (d ProtobufESDefinition) tsIdentMsgSchema(msg *protogen.Message) TSIdent {
	return d.TSModule(msg.Desc.ParentFile()).Ident(msg.GoIdent.GoName + "Schema")
}
func (d ProtobufESDefinition) tsIdentEnumSchema(enum *protogen.Enum) TSIdent {
	return d.TSModule(enum.Desc.ParentFile()).Ident(enum.GoIdent.GoName + "Schema")
}

func (d ProtobufESDefinition) GetFieldSyntax(opt *TSOption, rootMsg *protogen.Message) func(rootVar, path string) string {
	fieldCase := func(name protoreflect.Name) string {
		return strcase.ToLowerCamel(string(name))
	}
	return func(rootVar string, path string) string {
		if path == "" {
			return ""
		}
		var fd protoreflect.FieldDescriptor
		md := rootMsg.Desc
		syntax := &strings.Builder{}
		syntax.WriteString(rootVar)
		isFirst := true
		pluginutils.RangeFields(path, func(field string, restPath string) bool {
			if md == nil {
				return false
			}
			if isFirst {
				isFirst = false
				syntax.WriteString(".")
			} else {
				syntax.WriteString("?.")
			}

			fd = md.Fields().ByTextName(field)
			if fd == nil {
				return false
			}

			if oneof := fd.ContainingOneof(); oneof != nil && !oneof.IsSynthetic() {
				// fd is oneof field and is not optional synthetic oneof
				syntax.WriteString(fieldCase(oneof.Name()))
				prefixSyntax := syntax.String() // the prefix from root to oneof field
				syntax.Reset()
				oneofMatch := fmt.Sprintf(`%s.case === "%s"`, prefixSyntax, fieldCase(fd.Name()))
				oneofValue := fmt.Sprintf(`%s.value`, prefixSyntax)
				innerSyntax := oneofValue
				if restPath != "" {
					innerSyntax = d.GetFieldSyntax(opt, rootMsg)(oneofValue, restPath)
				}
				syntax.WriteString(fmt.Sprintf(
					`(%s ? %s : undefined)`,
					oneofMatch,
					innerSyntax,
				))
				return false
			}

			_, err := syntax.WriteString(fieldCase(fd.Name()))
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
		return syntax.String()
	}
}

func (d ProtobufESDefinition) MsgFromPartial(msg *protogen.Message) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		msgSchema := g.QualifiedTSIdent(d.tsIdentMsgSchema(msg))
		createFn := g.QualifiedTSIdent(d.protobufModule().Ident("create"))
		messageInitShape := g.QualifiedTSIdent(d.protobufModule().Ident("MessageInitShape"))
		// return `create(msgSchema, in as MessageInitShape<typeof msgSchema>)`
		return fmt.Sprintf(`%s(%s, %s as %s<typeof %s>)`, createFn, msgSchema, in, messageInitShape, msgSchema)
	}
}

func (d ProtobufESDefinition) MsgFromJson(msg *protogen.Message) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		msgSchema := g.QualifiedTSIdent(d.tsIdentMsgSchema(msg))
		fromJsonFn := g.QualifiedTSIdent(d.protobufModule().Ident("fromJson"))
		// return `fromJson(msgSchema, in)`
		return fmt.Sprintf(`%s(%s, %s)`, fromJsonFn, msgSchema, in)
	}
}

func (d ProtobufESDefinition) FieldToJson(field *protogen.Field) func(g *TSRegistry, in string) string {
	return fieldToJson(d, field)
}

func (d ProtobufESDefinition) MessageToJson(msg *protogen.Message) func(g *TSRegistry, in string) string {
	if protobufx.IsWellKnownType(msg.Desc) {
		switch msg.Desc.Name() {
		case protobufx.Struct_message_name:
			// Struct,
			// represent as JsonObject in protobuf-es
			// and should be as it is in JSON
			return d.ScalarToJson()
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
			// represent as a scalar in protobuf-es
			// but not same as it is in JSON
			// should first convert to wrapper message type
			return d.wrapperToJson(msg)
		default:
			return d.commonMessageToJson(msg)
		}
	}
	return d.commonMessageToJson(msg)
}

func (d ProtobufESDefinition) commonMessageToJson(msg *protogen.Message) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		msgSchema := g.QualifiedTSIdent(d.tsIdentMsgSchema(msg))
		toJsonFn := g.QualifiedTSIdent(d.protobufModule().Ident("toJson"))
		return fmt.Sprintf(`%s(%s, %s)`, toJsonFn, msgSchema, in)
	}
}

func (d ProtobufESDefinition) EnumToJson(enum *protogen.Enum) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		enumSchema := g.QualifiedTSIdent(d.tsIdentEnumSchema(enum))
		toJsonFn := g.QualifiedTSIdent(d.protobufModule().Ident("toJson"))
		return fmt.Sprintf(`%s(%s, %s)`, toJsonFn, enumSchema, in)
	}
}

func (d ProtobufESDefinition) ScalarToJson() func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		return in
	}
}

func (d ProtobufESDefinition) wrapperToJson(msg *protogen.Message) func(g *TSRegistry, in string) string {
	return func(g *TSRegistry, in string) string {
		// first convert to wrapper message type,
		// then message to JSON
		msgSchema := g.QualifiedTSIdent(d.tsIdentMsgSchema(msg))
		createFn := g.QualifiedTSIdent(d.protobufModule().Ident("create"))
		// create(msgSchema, {value: in})
		wrapperMsg := fmt.Sprintf(`%s(%s, {value: %s})`, createFn, msgSchema, in)
		return d.commonMessageToJson(msg)(g, wrapperMsg)
	}
}
