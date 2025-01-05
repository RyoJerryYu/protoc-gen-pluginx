package descriptorx

import (
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

var (
	_ FieldDescriptors  = (*FieldDescriptorsProtogenAdaptor)(nil)
	_ FieldDescriptor   = (*FieldDescriptorProtogenAdaptor)(nil)
	_ MessageDescriptor = (*MessageDescriptorProtogenAdaptor)(nil)
)

type FieldDescriptorsProtogenAdaptor struct {
	In []*protogen.Field
}

// ByName implements FieldDescriptors.
func (f FieldDescriptorsProtogenAdaptor) ByName(s protoreflect.Name) FieldDescriptor {
	for _, field := range f.In {
		if field.Desc.Name() == s {
			return FieldDescriptorProtogenAdaptor{In: field}
		}
	}
	return nil
}

func (f FieldDescriptorsProtogenAdaptor) ByTextName(s string) FieldDescriptor {
	for _, field := range f.In {
		if field.Desc.TextName() == s {
			return FieldDescriptorProtogenAdaptor{In: field}
		}
	}
	return nil
}

// Get implements FieldDescriptors.
func (f FieldDescriptorsProtogenAdaptor) Get(i int) FieldDescriptor {
	return FieldDescriptorProtogenAdaptor{In: f.In[i]}
}

// Len implements FieldDescriptors.
func (f FieldDescriptorsProtogenAdaptor) Len() int {
	return len(f.In)
}

type FieldDescriptorProtogenAdaptor struct {
	In *protogen.Field
}

// IsList implements FieldDescriptor.
func (f FieldDescriptorProtogenAdaptor) IsList() bool {
	return f.In.Desc.IsList()
}

// IsMap implements FieldDescriptor.
func (f FieldDescriptorProtogenAdaptor) IsMap() bool {
	return f.In.Desc.IsMap()
}

// Kind implements FieldDescriptor.
func (f FieldDescriptorProtogenAdaptor) Kind() protoreflect.Kind {
	return f.In.Desc.Kind()
}

// Message implements FieldDescriptor.
func (f FieldDescriptorProtogenAdaptor) Message() MessageDescriptor {
	if f.In.Message == nil {
		return nil
	}
	return MessageDescriptorProtogenAdaptor{In: f.In.Message}
}

// TextName implements FieldDescriptor.
func (f FieldDescriptorProtogenAdaptor) TextName() string {
	return f.In.Desc.TextName()
}

type MessageDescriptorProtogenAdaptor struct {
	In *protogen.Message
}

func (m MessageDescriptorProtogenAdaptor) Fields() FieldDescriptors {
	return FieldDescriptorsProtogenAdaptor{In: m.In.Fields}
}

func WrapProtogenMessage(in *protogen.Message) MessageDescriptor {
	return MessageDescriptorProtogenAdaptor{In: in}
}
