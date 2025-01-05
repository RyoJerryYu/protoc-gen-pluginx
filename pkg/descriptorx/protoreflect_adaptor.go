package descriptorx

import "google.golang.org/protobuf/reflect/protoreflect"

var (
	_ FieldDescriptors  = (*FieldDescriptorsProtoreflectAdaptor)(nil)
	_ FieldDescriptor   = (*FieldDescriptorProtoreflectAdaptor)(nil)
	_ MessageDescriptor = (*MessageDescriptorProtoreflectAdaptor)(nil)
)

type FieldDescriptorsProtoreflectAdaptor struct {
	In protoreflect.FieldDescriptors
}

func WrapReflectFields(in protoreflect.FieldDescriptors) FieldDescriptors {
	if in == nil {
		return nil
	}
	return FieldDescriptorsProtoreflectAdaptor{In: in}
}

func (f FieldDescriptorsProtoreflectAdaptor) Len() int { return f.In.Len() }
func (f FieldDescriptorsProtoreflectAdaptor) Get(i int) FieldDescriptor {
	return WrapReflectField(f.In.Get(i))
}
func (f FieldDescriptorsProtoreflectAdaptor) ByName(s protoreflect.Name) FieldDescriptor {
	return WrapReflectField(f.In.ByName(s))
}
func (f FieldDescriptorsProtoreflectAdaptor) ByTextName(s string) FieldDescriptor {
	return WrapReflectField(f.In.ByTextName(s))
}

type FieldDescriptorProtoreflectAdaptor struct {
	In protoreflect.FieldDescriptor
}

func WrapReflectField(in protoreflect.FieldDescriptor) FieldDescriptor {
	if in == nil {
		return nil
	}
	return FieldDescriptorProtoreflectAdaptor{In: in}
}

func (f FieldDescriptorProtoreflectAdaptor) Message() MessageDescriptor {
	return WrapReflectMessage(f.In.Message())
}
func (f FieldDescriptorProtoreflectAdaptor) Kind() protoreflect.Kind { return f.In.Kind() }
func (f FieldDescriptorProtoreflectAdaptor) IsList() bool            { return f.In.IsList() }
func (f FieldDescriptorProtoreflectAdaptor) IsMap() bool             { return f.In.IsMap() }
func (f FieldDescriptorProtoreflectAdaptor) JSONName() string        { return f.In.JSONName() }
func (f FieldDescriptorProtoreflectAdaptor) TextName() string        { return f.In.TextName() }

type MessageDescriptorProtoreflectAdaptor struct {
	In protoreflect.MessageDescriptor
}

func WrapReflectMessage(in protoreflect.MessageDescriptor) MessageDescriptor {
	if in == nil {
		return nil
	}
	return MessageDescriptorProtoreflectAdaptor{In: in}
}

func (m MessageDescriptorProtoreflectAdaptor) Fields() FieldDescriptors {
	return WrapReflectFields(m.In.Fields())
}
