package protobufx

import (
	"fmt"

	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

// FieldGoType returns the Go type used for a field.
//
// If it returns pointer=true, the struct field is a pointer to the type.
// https://github.com/protocolbuffers/protobuf-go/blob/3b78ca86bdbb47b135364f251bde7db55fc7130d/cmd/protoc-gen-go/internal_gengo/main.go#L727-L768
func FieldGoType(g *protogen.GeneratedFile, field *protogen.Field) (goType string, pointer bool) {
	if field.Desc.IsWeak() {
		return "struct{}", false
	}

	pointer = field.Desc.HasPresence()
	switch field.Desc.Kind() {
	case protoreflect.BoolKind:
		goType = "bool"
	case protoreflect.EnumKind:
		goType = g.QualifiedGoIdent(field.Enum.GoIdent)
	case protoreflect.Int32Kind, protoreflect.Sint32Kind, protoreflect.Sfixed32Kind:
		goType = "int32"
	case protoreflect.Uint32Kind, protoreflect.Fixed32Kind:
		goType = "uint32"
	case protoreflect.Int64Kind, protoreflect.Sint64Kind, protoreflect.Sfixed64Kind:
		goType = "int64"
	case protoreflect.Uint64Kind, protoreflect.Fixed64Kind:
		goType = "uint64"
	case protoreflect.FloatKind:
		goType = "float32"
	case protoreflect.DoubleKind:
		goType = "float64"
	case protoreflect.StringKind:
		goType = "string"
	case protoreflect.BytesKind:
		goType = "[]byte"
		pointer = false // rely on nullability of slices for presence
	case protoreflect.MessageKind, protoreflect.GroupKind:
		goType = "*" + g.QualifiedGoIdent(field.Message.GoIdent)
		pointer = false // pointer captured as part of the type
	}
	switch {
	case field.Desc.IsList():
		return "[]" + goType, false
	case field.Desc.IsMap():
		keyType, _ := FieldGoType(g, field.Message.Fields[0])
		valType, _ := FieldGoType(g, field.Message.Fields[1])
		return fmt.Sprintf("map[%v]%v", keyType, valType), false
	}
	return goType, pointer
}

// oneofInterfaceName returns the name of the interface type implemented by
// the oneof field value types.
// https://github.com/protocolbuffers/protobuf-go/blob/3b78ca86bdbb47b135364f251bde7db55fc7130d/cmd/protoc-gen-go/internal_gengo/main.go#L920-L925
func OneOfInterfaceName(oneof *protogen.Oneof) string {
	return "is" + oneof.GoIdent.GoName
}
