// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.0
// 	protoc        (unknown)
// source: proto/pathenum/path_enum.proto

package pathenum

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

type PathEnum int32

const (
	PathEnum_ABC PathEnum = 0
	PathEnum_DEF PathEnum = 1
)

// Enum value maps for PathEnum.
var (
	PathEnum_name = map[int32]string{
		0: "ABC",
		1: "DEF",
	}
	PathEnum_value = map[string]int32{
		"ABC": 0,
		"DEF": 1,
	}
)

func (x PathEnum) Enum() *PathEnum {
	p := new(PathEnum)
	*p = x
	return p
}

func (x PathEnum) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (PathEnum) Descriptor() protoreflect.EnumDescriptor {
	return file_proto_pathenum_path_enum_proto_enumTypes[0].Descriptor()
}

func (PathEnum) Type() protoreflect.EnumType {
	return &file_proto_pathenum_path_enum_proto_enumTypes[0]
}

func (x PathEnum) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use PathEnum.Descriptor instead.
func (PathEnum) EnumDescriptor() ([]byte, []int) {
	return file_proto_pathenum_path_enum_proto_rawDescGZIP(), []int{0}
}

// Ignoring lint warnings as this enum type exist to validate proper functionality
// for projects that don't follow these lint rules.
// buf:lint:ignore ENUM_PASCAL_CASE
type SnakeCaseForImport int32

const (
	// buf:lint:ignore ENUM_VALUE_UPPER_SNAKE_CASE
	SnakeCaseForImport_value_x SnakeCaseForImport = 0
	// buf:lint:ignore ENUM_VALUE_UPPER_SNAKE_CASE
	SnakeCaseForImport_value_y SnakeCaseForImport = 1
)

// Enum value maps for SnakeCaseForImport.
var (
	SnakeCaseForImport_name = map[int32]string{
		0: "value_x",
		1: "value_y",
	}
	SnakeCaseForImport_value = map[string]int32{
		"value_x": 0,
		"value_y": 1,
	}
)

func (x SnakeCaseForImport) Enum() *SnakeCaseForImport {
	p := new(SnakeCaseForImport)
	*p = x
	return p
}

func (x SnakeCaseForImport) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (SnakeCaseForImport) Descriptor() protoreflect.EnumDescriptor {
	return file_proto_pathenum_path_enum_proto_enumTypes[1].Descriptor()
}

func (SnakeCaseForImport) Type() protoreflect.EnumType {
	return &file_proto_pathenum_path_enum_proto_enumTypes[1]
}

func (x SnakeCaseForImport) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use SnakeCaseForImport.Descriptor instead.
func (SnakeCaseForImport) EnumDescriptor() ([]byte, []int) {
	return file_proto_pathenum_path_enum_proto_rawDescGZIP(), []int{1}
}

type MessagePathEnum_NestedPathEnum int32

const (
	MessagePathEnum_GHI MessagePathEnum_NestedPathEnum = 0
	MessagePathEnum_JKL MessagePathEnum_NestedPathEnum = 1
)

// Enum value maps for MessagePathEnum_NestedPathEnum.
var (
	MessagePathEnum_NestedPathEnum_name = map[int32]string{
		0: "GHI",
		1: "JKL",
	}
	MessagePathEnum_NestedPathEnum_value = map[string]int32{
		"GHI": 0,
		"JKL": 1,
	}
)

func (x MessagePathEnum_NestedPathEnum) Enum() *MessagePathEnum_NestedPathEnum {
	p := new(MessagePathEnum_NestedPathEnum)
	*p = x
	return p
}

func (x MessagePathEnum_NestedPathEnum) String() string {
	return protoimpl.X.EnumStringOf(x.Descriptor(), protoreflect.EnumNumber(x))
}

func (MessagePathEnum_NestedPathEnum) Descriptor() protoreflect.EnumDescriptor {
	return file_proto_pathenum_path_enum_proto_enumTypes[2].Descriptor()
}

func (MessagePathEnum_NestedPathEnum) Type() protoreflect.EnumType {
	return &file_proto_pathenum_path_enum_proto_enumTypes[2]
}

func (x MessagePathEnum_NestedPathEnum) Number() protoreflect.EnumNumber {
	return protoreflect.EnumNumber(x)
}

// Deprecated: Use MessagePathEnum_NestedPathEnum.Descriptor instead.
func (MessagePathEnum_NestedPathEnum) EnumDescriptor() ([]byte, []int) {
	return file_proto_pathenum_path_enum_proto_rawDescGZIP(), []int{0, 0}
}

type MessagePathEnum struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *MessagePathEnum) Reset() {
	*x = MessagePathEnum{}
	mi := &file_proto_pathenum_path_enum_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *MessagePathEnum) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MessagePathEnum) ProtoMessage() {}

func (x *MessagePathEnum) ProtoReflect() protoreflect.Message {
	mi := &file_proto_pathenum_path_enum_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MessagePathEnum.ProtoReflect.Descriptor instead.
func (*MessagePathEnum) Descriptor() ([]byte, []int) {
	return file_proto_pathenum_path_enum_proto_rawDescGZIP(), []int{0}
}

type MessageWithPathEnum struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Value         PathEnum               `protobuf:"varint,1,opt,name=value,proto3,enum=pathenum.PathEnum" json:"value,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *MessageWithPathEnum) Reset() {
	*x = MessageWithPathEnum{}
	mi := &file_proto_pathenum_path_enum_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *MessageWithPathEnum) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MessageWithPathEnum) ProtoMessage() {}

func (x *MessageWithPathEnum) ProtoReflect() protoreflect.Message {
	mi := &file_proto_pathenum_path_enum_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MessageWithPathEnum.ProtoReflect.Descriptor instead.
func (*MessageWithPathEnum) Descriptor() ([]byte, []int) {
	return file_proto_pathenum_path_enum_proto_rawDescGZIP(), []int{1}
}

func (x *MessageWithPathEnum) GetValue() PathEnum {
	if x != nil {
		return x.Value
	}
	return PathEnum_ABC
}

type MessageWithNestedPathEnum struct {
	state         protoimpl.MessageState         `protogen:"open.v1"`
	Value         MessagePathEnum_NestedPathEnum `protobuf:"varint,1,opt,name=value,proto3,enum=pathenum.MessagePathEnum_NestedPathEnum" json:"value,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *MessageWithNestedPathEnum) Reset() {
	*x = MessageWithNestedPathEnum{}
	mi := &file_proto_pathenum_path_enum_proto_msgTypes[2]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *MessageWithNestedPathEnum) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MessageWithNestedPathEnum) ProtoMessage() {}

func (x *MessageWithNestedPathEnum) ProtoReflect() protoreflect.Message {
	mi := &file_proto_pathenum_path_enum_proto_msgTypes[2]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MessageWithNestedPathEnum.ProtoReflect.Descriptor instead.
func (*MessageWithNestedPathEnum) Descriptor() ([]byte, []int) {
	return file_proto_pathenum_path_enum_proto_rawDescGZIP(), []int{2}
}

func (x *MessageWithNestedPathEnum) GetValue() MessagePathEnum_NestedPathEnum {
	if x != nil {
		return x.Value
	}
	return MessagePathEnum_GHI
}

var File_proto_pathenum_path_enum_proto protoreflect.FileDescriptor

var file_proto_pathenum_path_enum_proto_rawDesc = []byte{
	0x0a, 0x1e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x70, 0x61, 0x74, 0x68, 0x65, 0x6e, 0x75, 0x6d,
	0x2f, 0x70, 0x61, 0x74, 0x68, 0x5f, 0x65, 0x6e, 0x75, 0x6d, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x12, 0x08, 0x70, 0x61, 0x74, 0x68, 0x65, 0x6e, 0x75, 0x6d, 0x22, 0x35, 0x0a, 0x0f, 0x4d, 0x65,
	0x73, 0x73, 0x61, 0x67, 0x65, 0x50, 0x61, 0x74, 0x68, 0x45, 0x6e, 0x75, 0x6d, 0x22, 0x22, 0x0a,
	0x0e, 0x4e, 0x65, 0x73, 0x74, 0x65, 0x64, 0x50, 0x61, 0x74, 0x68, 0x45, 0x6e, 0x75, 0x6d, 0x12,
	0x07, 0x0a, 0x03, 0x47, 0x48, 0x49, 0x10, 0x00, 0x12, 0x07, 0x0a, 0x03, 0x4a, 0x4b, 0x4c, 0x10,
	0x01, 0x22, 0x3f, 0x0a, 0x13, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x57, 0x69, 0x74, 0x68,
	0x50, 0x61, 0x74, 0x68, 0x45, 0x6e, 0x75, 0x6d, 0x12, 0x28, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x12, 0x2e, 0x70, 0x61, 0x74, 0x68, 0x65, 0x6e,
	0x75, 0x6d, 0x2e, 0x50, 0x61, 0x74, 0x68, 0x45, 0x6e, 0x75, 0x6d, 0x52, 0x05, 0x76, 0x61, 0x6c,
	0x75, 0x65, 0x22, 0x5b, 0x0a, 0x19, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67, 0x65, 0x57, 0x69, 0x74,
	0x68, 0x4e, 0x65, 0x73, 0x74, 0x65, 0x64, 0x50, 0x61, 0x74, 0x68, 0x45, 0x6e, 0x75, 0x6d, 0x12,
	0x3e, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x0e, 0x32, 0x28,
	0x2e, 0x70, 0x61, 0x74, 0x68, 0x65, 0x6e, 0x75, 0x6d, 0x2e, 0x4d, 0x65, 0x73, 0x73, 0x61, 0x67,
	0x65, 0x50, 0x61, 0x74, 0x68, 0x45, 0x6e, 0x75, 0x6d, 0x2e, 0x4e, 0x65, 0x73, 0x74, 0x65, 0x64,
	0x50, 0x61, 0x74, 0x68, 0x45, 0x6e, 0x75, 0x6d, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x2a,
	0x1c, 0x0a, 0x08, 0x50, 0x61, 0x74, 0x68, 0x45, 0x6e, 0x75, 0x6d, 0x12, 0x07, 0x0a, 0x03, 0x41,
	0x42, 0x43, 0x10, 0x00, 0x12, 0x07, 0x0a, 0x03, 0x44, 0x45, 0x46, 0x10, 0x01, 0x2a, 0x31, 0x0a,
	0x15, 0x73, 0x6e, 0x61, 0x6b, 0x65, 0x5f, 0x63, 0x61, 0x73, 0x65, 0x5f, 0x66, 0x6f, 0x72, 0x5f,
	0x69, 0x6d, 0x70, 0x6f, 0x72, 0x74, 0x12, 0x0b, 0x0a, 0x07, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x5f,
	0x78, 0x10, 0x00, 0x12, 0x0b, 0x0a, 0x07, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x5f, 0x79, 0x10, 0x01,
	0x42, 0xe1, 0x01, 0x0a, 0x0c, 0x63, 0x6f, 0x6d, 0x2e, 0x70, 0x61, 0x74, 0x68, 0x65, 0x6e, 0x75,
	0x6d, 0x42, 0x0d, 0x50, 0x61, 0x74, 0x68, 0x45, 0x6e, 0x75, 0x6d, 0x50, 0x72, 0x6f, 0x74, 0x6f,
	0x50, 0x01, 0x5a, 0x81, 0x01, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f,
	0x52, 0x79, 0x6f, 0x4a, 0x65, 0x72, 0x72, 0x79, 0x59, 0x75, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x63, 0x2d, 0x67, 0x65, 0x6e, 0x2d, 0x70, 0x6c, 0x75, 0x67, 0x69, 0x6e, 0x78, 0x2f, 0x74, 0x65,
	0x73, 0x74, 0x73, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d, 0x67, 0x65, 0x6e, 0x2d, 0x74,
	0x73, 0x2d, 0x67, 0x72, 0x70, 0x63, 0x2d, 0x67, 0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2d, 0x63,
	0x6c, 0x69, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x67, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2d, 0x65,
	0x76, 0x65, 0x72, 0x79, 0x74, 0x68, 0x69, 0x6e, 0x67, 0x2d, 0x73, 0x69, 0x6d, 0x70, 0x6c, 0x65,
	0x2f, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x70, 0x61,
	0x74, 0x68, 0x65, 0x6e, 0x75, 0x6d, 0xa2, 0x02, 0x03, 0x50, 0x58, 0x58, 0xaa, 0x02, 0x08, 0x50,
	0x61, 0x74, 0x68, 0x65, 0x6e, 0x75, 0x6d, 0xca, 0x02, 0x08, 0x50, 0x61, 0x74, 0x68, 0x65, 0x6e,
	0x75, 0x6d, 0xe2, 0x02, 0x14, 0x50, 0x61, 0x74, 0x68, 0x65, 0x6e, 0x75, 0x6d, 0x5c, 0x47, 0x50,
	0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x08, 0x50, 0x61, 0x74, 0x68,
	0x65, 0x6e, 0x75, 0x6d, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_pathenum_path_enum_proto_rawDescOnce sync.Once
	file_proto_pathenum_path_enum_proto_rawDescData = file_proto_pathenum_path_enum_proto_rawDesc
)

func file_proto_pathenum_path_enum_proto_rawDescGZIP() []byte {
	file_proto_pathenum_path_enum_proto_rawDescOnce.Do(func() {
		file_proto_pathenum_path_enum_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_pathenum_path_enum_proto_rawDescData)
	})
	return file_proto_pathenum_path_enum_proto_rawDescData
}

var file_proto_pathenum_path_enum_proto_enumTypes = make([]protoimpl.EnumInfo, 3)
var file_proto_pathenum_path_enum_proto_msgTypes = make([]protoimpl.MessageInfo, 3)
var file_proto_pathenum_path_enum_proto_goTypes = []any{
	(PathEnum)(0),                       // 0: pathenum.PathEnum
	(SnakeCaseForImport)(0),             // 1: pathenum.snake_case_for_import
	(MessagePathEnum_NestedPathEnum)(0), // 2: pathenum.MessagePathEnum.NestedPathEnum
	(*MessagePathEnum)(nil),             // 3: pathenum.MessagePathEnum
	(*MessageWithPathEnum)(nil),         // 4: pathenum.MessageWithPathEnum
	(*MessageWithNestedPathEnum)(nil),   // 5: pathenum.MessageWithNestedPathEnum
}
var file_proto_pathenum_path_enum_proto_depIdxs = []int32{
	0, // 0: pathenum.MessageWithPathEnum.value:type_name -> pathenum.PathEnum
	2, // 1: pathenum.MessageWithNestedPathEnum.value:type_name -> pathenum.MessagePathEnum.NestedPathEnum
	2, // [2:2] is the sub-list for method output_type
	2, // [2:2] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_proto_pathenum_path_enum_proto_init() }
func file_proto_pathenum_path_enum_proto_init() {
	if File_proto_pathenum_path_enum_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_pathenum_path_enum_proto_rawDesc,
			NumEnums:      3,
			NumMessages:   3,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_proto_pathenum_path_enum_proto_goTypes,
		DependencyIndexes: file_proto_pathenum_path_enum_proto_depIdxs,
		EnumInfos:         file_proto_pathenum_path_enum_proto_enumTypes,
		MessageInfos:      file_proto_pathenum_path_enum_proto_msgTypes,
	}.Build()
	File_proto_pathenum_path_enum_proto = out.File
	file_proto_pathenum_path_enum_proto_rawDesc = nil
	file_proto_pathenum_path_enum_proto_goTypes = nil
	file_proto_pathenum_path_enum_proto_depIdxs = nil
}
