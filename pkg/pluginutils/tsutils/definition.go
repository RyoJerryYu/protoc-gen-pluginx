package tsutils

import (
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

type Definition interface {
	TSModule(file protoreflect.FileDescriptor) TSModule
	TSIdentMsg(msg *protogen.Message) TSIdent
	FieldToJson(field *protogen.Field) func(g *TSRegistry, in string) string
	MessageToJson(msg *protogen.Message) func(g *TSRegistry, in string) string
}
