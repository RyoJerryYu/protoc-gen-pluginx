package descriptorx

import "google.golang.org/protobuf/reflect/protoreflect"

type FieldDescriptors interface {
	Len() int
	Get(i int) FieldDescriptor
	ByName(s protoreflect.Name) FieldDescriptor
	ByTextName(s string) FieldDescriptor
}

type FieldDescriptor interface {
	Message() MessageDescriptor
	Kind() protoreflect.Kind
	IsList() bool
	IsMap() bool
	JSONName() string
	TextName() string
}

type MessageDescriptor interface {
	Fields() FieldDescriptors
}
