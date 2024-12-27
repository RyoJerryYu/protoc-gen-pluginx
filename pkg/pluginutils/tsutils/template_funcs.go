package tsutils

import (
	"fmt"
	"strings"
	"text/template"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/protobufx"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

// ServiceTemplate gets the template for the primary typescript file.
func (r *TSRegistry) ServiceFmap() template.FuncMap {
	fMap := template.FuncMap{
		"tsType":       r.TsType,
		"functionCase": FunctionCase_TSProto,
		// "tsTypeKey":    tsTypeKey(r),
		// "tsTypeDef":    tsTypeDef(r),
		// "fieldName":    fieldName(r),
	}
	return fMap
}

//////
// String
//////

// JSONCamelCase converts a snake_case identifier to a camelCase identifier,
// according to the protobuf JSON specification.
//
// Copied from: google.golang.org/protobuf/internal/strs.
func JSONCamelCase(s string) string {
	var b []byte
	var wasUnderscore bool
	for i := range len(s) { // proto identifiers are always ASCII
		c := s[i]
		if c != '_' {
			if wasUnderscore && isASCIILower(c) {
				c -= 'a' - 'A' // convert to uppercase
			}
			b = append(b, c)
		}
		wasUnderscore = c == '_'
	}
	return string(b)
}

func isASCIILower(c byte) bool {
	return 'a' <= c && c <= 'z'
}

// TSProto Function Case
func FunctionCase_TSProto(s string) string {
	if len(s) == 0 {
		return s
	}

	// Find the position of the first non-uppercase letter after the initial uppercase sequence
	firstLowerPos := -1
	for i := range len(s) {
		if isASCIILower(s[i]) {
			firstLowerPos = i
			break
		}
	}

	switch firstLowerPos {
	case -1:
		// If no lowercase letter is found, return the string in lowercase
		return strings.ToLower(s)

	case 0:
		// If the first letter is lowercase, return the string as is.
		return s

	default:
		// default, we want to lowercase the first letter.
		return strings.ToLower(s[:1]) + s[1:]
	}
}

// Takes a service name or method name in the form SomeMethod or HTTPMethod and
// return someMethod or httpMethod.
func functionCase(s string) string {
	if len(s) == 0 {
		return s
	}

	// Find the position of the first non-uppercase letter after the initial uppercase sequence
	firstLowerPos := -1
	for i := range len(s) {
		if isASCIILower(s[i]) {
			firstLowerPos = i
			break
		}
	}

	switch firstLowerPos {
	case -1:
		// If no lowercase letter is found, return the string in lowercase
		return strings.ToLower(s)

	case 0:
		// If the first letter is lowercase, return the string as is.
		return s

	case 1:
		// If only the first letter is upper, we want to lowercase it.
		return strings.ToLower(s[:1]) + s[1:]

	default:
		// If multiple letters are upper case, we want all but the last one.
		return strings.ToLower(s[:firstLowerPos-1]) + s[firstLowerPos-1:]
	}
}

////////////////
// Template
////////////////

func FieldName(opt *TSOption) func(name string) string {
	return func(name string) string {
		if opt.UseProtoNames {
			return name
		}

		fields := strings.Split(name, ".")
		for i, field := range fields {
			fields[i] = JSONCamelCase(field)
		}
		return strings.Join(fields, ".")
	}
}

// location: the location of the field or method that references the type
func (r *TSRegistry) TsType(def *protogen.Message, location protogen.Location) string {
	glog.V(3).Infof("tsType: %s", def.GoIdent.GoName)
	// Map entry type
	if def.Desc.IsMapEntry() {
		glog.V(3).Infof("tsType is map entry %s", def.GoIdent.GoName)
		keyType := r.TsType(def.Fields[0].Message, location)   //TODO: enums?
		valueType := r.TsType(def.Fields[1].Message, location) //TODO: enums?

		return fmt.Sprintf("Record<%s, %s>", keyType, valueType)
	}
	var typeStr string
	switch {
	case protobufx.IsWellKnownType(def.Desc): // Well known type
		typeStr = mapWellKnownType(def.Desc)
	case !strings.Contains(string(def.Desc.FullName()), "."): // Scalar type
		typeStr = mapScalaType(string(def.Desc.FullName()))
	// case def.Location.SourceFile == location.SourceFile: // Local type
	// 	typeStr = typeInfo.PackageIdentifier
	default: // External type
		glog.V(3).Infof("parent file: package: %s, name: %s, fullname: %s, path: %s",
			def.Desc.ParentFile().Package(),
			def.Desc.ParentFile().Name(),
			def.Desc.ParentFile().FullName(),
			def.Desc.ParentFile().Path(),
		)
		module := TSModule_TSProto(def.Desc.ParentFile())
		typeStr = r.QualifiedTSIdent(module.Ident(def.GoIdent.GoName))
	}

	// if .IsRepeated {
	// 	typeStr += "[]"
	// }
	return typeStr
}

func mapWellKnownType(desc protoreflect.MessageDescriptor) string {
	switch desc.FullName() {
	case protobufx.BoolValue_message_fullname:
		return "boolean | null"
	case protobufx.StringValue_message_fullname:
		return "string | null"
	case protobufx.DoubleValue_message_fullname,
		protobufx.FloatValue_message_fullname,
		protobufx.Int32Value_message_fullname,
		protobufx.Int64Value_message_fullname,
		protobufx.UInt32Value_message_fullname,
		protobufx.UInt64Value_message_fullname:
		return "number | null"
	case protobufx.ListValue_message_fullname:
		return "StructPBValue[]"
	case protobufx.Struct_message_fullname:
		return "{ [key: string]: StructPBValue }"
	case protobufx.Empty_message_fullname:
		return "{}"
	}
	return "unknown"
}

func mapScalaType(protoType string) string {
	switch protoType {
	case "uint64", "sint64", "int64", "fixed64", "sfixed64", "string":
		return "string"
	case "float", "double", "int32", "sint32", "uint32", "fixed32", "sfixed32":
		return "number"
	case "bool":
		return "boolean"
	case "bytes":
		return "Uint8Array"
	}
	return ""
}
