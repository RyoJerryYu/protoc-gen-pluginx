// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.35.1
// 	protoc        v3.21.12
// source: e2e_enum.proto

package e2e

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Enum int32

const (
	Enum_A Enum = 0
	Enum_B Enum = 1
	Enum_C Enum = 2
)

// Enum value maps for Enum.
var (
	Enum_name = map[int32]string{
		0: "A",
		1: "B",
		2: "C",
	}
	Enum_value = map[string]int32{
		"A": 0,
		"B": 1,
		"C": 2,
	}
)

func (x Enum) Enum() *Enum {
	p := new(Enum)
	*p = x
	return p
}

func (x Enum) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (Enum) Descriptor() protoreflect.EnumDescriptor {
	return file_e2e_enum_proto_enumTypes[0].Descriptor()
}

func (Enum) Type() protoreflect.EnumType {
	return &file_e2e_enum_proto_enumTypes[0]
}

func (x Enum) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use Enum.Descriptor instead.
func (Enum) EnumDescriptor() ([]byte, []int) {
	return file_e2e_enum_proto_rawDescGZIP(), []int{0}
}

type EnumParent_EnumChild int32

const (
	EnumParent_D EnumParent_EnumChild = 0
	EnumParent_E EnumParent_EnumChild = 1
	EnumParent_F EnumParent_EnumChild = 2
)

// Enum value maps for EnumParent_EnumChild.
var (
	EnumParent_EnumChild_name = map[int32]string{
		0: "D",
		1: "E",
		2: "F",
	}
	EnumParent_EnumChild_value = map[string]int32{
		"D": 0,
		"E": 1,
		"F": 2,
	}
)

func (x EnumParent_EnumChild) Enum() *EnumParent_EnumChild {
	p := new(EnumParent_EnumChild)
	*p = x
	return p
}

func (x EnumParent_EnumChild) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (EnumParent_EnumChild) Descriptor() protoreflect.EnumDescriptor {
	return file_e2e_enum_proto_enumTypes[1].Descriptor()
}

func (EnumParent_EnumChild) Type() protoreflect.EnumType {
	return &file_e2e_enum_proto_enumTypes[1]
}

func (x EnumParent_EnumChild) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use EnumParent_EnumChild.Descriptor instead.
func (EnumParent_EnumChild) EnumDescriptor() ([]byte, []int) {
	return file_e2e_enum_proto_rawDescGZIP(), []int{0, 0}
}

type EnumParent struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Enum EnumParent_EnumChild `protobuf:"varint,1,opt,name=enum,proto3,enum=e2e.EnumParent_EnumChild" json:"enum,omitempty"`
}

func (x *EnumParent) Reset() {
	*x = EnumParent{}
	mi := &file_e2e_enum_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *EnumParent) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*EnumParent) ProtoMessage() {}

func (x *EnumParent) ProtoReflect() protoreflect.Message {
	mi := &file_e2e_enum_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use EnumParent.ProtoReflect.Descriptor instead.
func (*EnumParent) Descriptor() ([]byte, []int) {
	return file_e2e_enum_proto_rawDescGZIP(), []int{0}
}

func (x *EnumParent) GetEnum() EnumParent_EnumChild {
	if x != nil {
		return x.Enum
	}
	return EnumParent_D
}

var File_e2e_enum_proto protoreflect.FileDescriptor

var file_e2e_enum_proto_rawDesc = []byte{
	0x0a, 0x0e, 0x65, 0x32, 0x65, 0x5f, 0x65, 0x6e, 0x75, 0x6d, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x12, 0x03, 0x65, 0x32, 0x65, 0x22, 0x5d, 0x0a, 0x0a, 0x45, 0x6e, 0x75, 0x6d, 0x50, 0x61, 0x72,
	0x65, 0x6e, 0x74, 0x12, 0x2d, 0x0a, 0x04, 0x65, 0x6e, 0x75, 0x6d, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x0e, 0x32, 0x19, 0x2e, 0x65, 0x32, 0x65, 0x2e, 0x45, 0x6e, 0x75, 0x6d, 0x50, 0x61, 0x72, 0x65,
	0x6e, 0x74, 0x2e, 0x45, 0x6e, 0x75, 0x6d, 0x43, 0x68, 0x69, 0x6c, 0x64, 0x52, 0x04, 0x65, 0x6e,
	0x75, 0x6d, 0x22, 0x20, 0x0a, 0x09, 0x45, 0x6e, 0x75, 0x6d, 0x43, 0x68, 0x69, 0x6c, 0x64, 0x12,
	0x05, 0x0a, 0x01, 0x44, 0x10, 0x00, 0x12, 0x05, 0x0a, 0x01, 0x45, 0x10, 0x01, 0x12, 0x05, 0x0a,
	0x01, 0x46, 0x10, 0x02, 0x2a, 0x1b, 0x0a, 0x04, 0x45, 0x6e, 0x75, 0x6d, 0x12, 0x05, 0x0a, 0x01,
	0x41, 0x10, 0x00, 0x12, 0x05, 0x0a, 0x01, 0x42, 0x10, 0x01, 0x12, 0x05, 0x0a, 0x01, 0x43, 0x10,
	0x02, 0x42, 0x0b, 0x5a, 0x09, 0x2e, 0x2f, 0x65, 0x32, 0x65, 0x3b, 0x65, 0x32, 0x65, 0x62, 0x06,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_e2e_enum_proto_rawDescOnce sync.Once
	file_e2e_enum_proto_rawDescData = file_e2e_enum_proto_rawDesc
)

func file_e2e_enum_proto_rawDescGZIP() []byte {
	file_e2e_enum_proto_rawDescOnce.Do(func() {
		file_e2e_enum_proto_rawDescData = protoimpl.X.CompressGZIP(file_e2e_enum_proto_rawDescData)
	})
	return file_e2e_enum_proto_rawDescData
}

var file_e2e_enum_proto_enumTypes = make([]protoimpl.EnumInfo, 2)
var file_e2e_enum_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_e2e_enum_proto_goTypes = []any{
	(Enum)(0),                 // 0: e2e.Enum
	(EnumParent_EnumChild)(0), // 1: e2e.EnumParent.EnumChild
	(*EnumParent)(nil),        // 2: e2e.EnumParent
}
var file_e2e_enum_proto_depIdxs = []int32{
	1, // 0: e2e.EnumParent.enum:type_name -> e2e.EnumParent.EnumChild
	1, // [1:1] is the sub-list for method output_type
	1, // [1:1] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_e2e_enum_proto_init() }
func file_e2e_enum_proto_init() {
	if File_e2e_enum_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_e2e_enum_proto_rawDesc,
			NumEnums:      2,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_e2e_enum_proto_goTypes,
		DependencyIndexes: file_e2e_enum_proto_depIdxs,
		EnumInfos:         file_e2e_enum_proto_enumTypes,
		MessageInfos:      file_e2e_enum_proto_msgTypes,
	}.Build()
	File_e2e_enum_proto = out.File
	file_e2e_enum_proto_rawDesc = nil
	file_e2e_enum_proto_goTypes = nil
	file_e2e_enum_proto_depIdxs = nil
}
