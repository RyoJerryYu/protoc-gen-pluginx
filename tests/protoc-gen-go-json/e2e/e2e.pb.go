// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.0
// 	protoc        (unknown)
// source: e2e.proto

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

// Basic just tests basic fields, including oneofs and so on that don't
// generally work automatically with encoding/json.
type Basic struct {
	state protoimpl.MessageState `protogen:"open.v1"`
	A     string                 `protobuf:"bytes,1,opt,name=a,proto3" json:"a,omitempty"`
	// Types that are valid to be assigned to B:
	//
	//	*Basic_Int
	//	*Basic_Str
	B             isBasic_B         `protobuf_oneof:"b"`
	Map           map[string]string `protobuf:"bytes,4,rep,name=map,proto3" json:"map,omitempty" protobuf_key:"bytes,1,opt,name=key" protobuf_val:"bytes,2,opt,name=value"`
	O             *string           `protobuf:"bytes,5,opt,name=o,proto3,oneof" json:"o,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *Basic) Reset() {
	*x = Basic{}
	mi := &file_e2e_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Basic) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Basic) ProtoMessage() {}

func (x *Basic) ProtoReflect() protoreflect.Message {
	mi := &file_e2e_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Basic.ProtoReflect.Descriptor instead.
func (*Basic) Descriptor() ([]byte, []int) {
	return file_e2e_proto_rawDescGZIP(), []int{0}
}

func (x *Basic) GetA() string {
	if x != nil {
		return x.A
	}
	return ""
}

func (x *Basic) GetB() isBasic_B {
	if x != nil {
		return x.B
	}
	return nil
}

func (x *Basic) GetInt() int32 {
	if x != nil {
		if x, ok := x.B.(*Basic_Int); ok {
			return x.Int
		}
	}
	return 0
}

func (x *Basic) GetStr() string {
	if x != nil {
		if x, ok := x.B.(*Basic_Str); ok {
			return x.Str
		}
	}
	return ""
}

func (x *Basic) GetMap() map[string]string {
	if x != nil {
		return x.Map
	}
	return nil
}

func (x *Basic) GetO() string {
	if x != nil && x.O != nil {
		return *x.O
	}
	return ""
}

type isBasic_B interface {
	isBasic_B()
}

type Basic_Int struct {
	Int int32 `protobuf:"varint,2,opt,name=int,proto3,oneof"`
}

type Basic_Str struct {
	Str string `protobuf:"bytes,3,opt,name=str,proto3,oneof"`
}

func (*Basic_Int) isBasic_B() {}

func (*Basic_Str) isBasic_B() {}

// Test nested types
type Nested struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *Nested) Reset() {
	*x = Nested{}
	mi := &file_e2e_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Nested) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Nested) ProtoMessage() {}

func (x *Nested) ProtoReflect() protoreflect.Message {
	mi := &file_e2e_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Nested.ProtoReflect.Descriptor instead.
func (*Nested) Descriptor() ([]byte, []int) {
	return file_e2e_proto_rawDescGZIP(), []int{1}
}

type Nested_Message struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Basic         *Basic                 `protobuf:"bytes,1,opt,name=basic,proto3" json:"basic,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *Nested_Message) Reset() {
	*x = Nested_Message{}
	mi := &file_e2e_proto_msgTypes[3]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Nested_Message) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Nested_Message) ProtoMessage() {}

func (x *Nested_Message) ProtoReflect() protoreflect.Message {
	mi := &file_e2e_proto_msgTypes[3]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Nested_Message.ProtoReflect.Descriptor instead.
func (*Nested_Message) Descriptor() ([]byte, []int) {
	return file_e2e_proto_rawDescGZIP(), []int{1, 0}
}

func (x *Nested_Message) GetBasic() *Basic {
	if x != nil {
		return x.Basic
	}
	return nil
}

var File_e2e_proto protoreflect.FileDescriptor

var file_e2e_proto_rawDesc = []byte{
	0x0a, 0x09, 0x65, 0x32, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x03, 0x65, 0x32, 0x65,
	0x22, 0xba, 0x01, 0x0a, 0x05, 0x42, 0x61, 0x73, 0x69, 0x63, 0x12, 0x0c, 0x0a, 0x01, 0x61, 0x18,
	0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x01, 0x61, 0x12, 0x12, 0x0a, 0x03, 0x69, 0x6e, 0x74, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x05, 0x48, 0x00, 0x52, 0x03, 0x69, 0x6e, 0x74, 0x12, 0x12, 0x0a, 0x03,
	0x73, 0x74, 0x72, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x03, 0x73, 0x74, 0x72,
	0x12, 0x25, 0x0a, 0x03, 0x6d, 0x61, 0x70, 0x18, 0x04, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x13, 0x2e,
	0x65, 0x32, 0x65, 0x2e, 0x42, 0x61, 0x73, 0x69, 0x63, 0x2e, 0x4d, 0x61, 0x70, 0x45, 0x6e, 0x74,
	0x72, 0x79, 0x52, 0x03, 0x6d, 0x61, 0x70, 0x12, 0x11, 0x0a, 0x01, 0x6f, 0x18, 0x05, 0x20, 0x01,
	0x28, 0x09, 0x48, 0x01, 0x52, 0x01, 0x6f, 0x88, 0x01, 0x01, 0x1a, 0x36, 0x0a, 0x08, 0x4d, 0x61,
	0x70, 0x45, 0x6e, 0x74, 0x72, 0x79, 0x12, 0x10, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20,
	0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x14, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x3a, 0x02,
	0x38, 0x01, 0x42, 0x03, 0x0a, 0x01, 0x62, 0x42, 0x04, 0x0a, 0x02, 0x5f, 0x6f, 0x22, 0x35, 0x0a,
	0x06, 0x4e, 0x65, 0x73, 0x74, 0x65, 0x64, 0x1a, 0x2b, 0x0a, 0x07, 0x4d, 0x65, 0x73, 0x73, 0x61,
	0x67, 0x65, 0x12, 0x20, 0x0a, 0x05, 0x62, 0x61, 0x73, 0x69, 0x63, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x0a, 0x2e, 0x65, 0x32, 0x65, 0x2e, 0x42, 0x61, 0x73, 0x69, 0x63, 0x52, 0x05, 0x62,
	0x61, 0x73, 0x69, 0x63, 0x42, 0x0b, 0x5a, 0x09, 0x2e, 0x2f, 0x65, 0x32, 0x65, 0x3b, 0x65, 0x32,
	0x65, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_e2e_proto_rawDescOnce sync.Once
	file_e2e_proto_rawDescData = file_e2e_proto_rawDesc
)

func file_e2e_proto_rawDescGZIP() []byte {
	file_e2e_proto_rawDescOnce.Do(func() {
		file_e2e_proto_rawDescData = protoimpl.X.CompressGZIP(file_e2e_proto_rawDescData)
	})
	return file_e2e_proto_rawDescData
}

var file_e2e_proto_msgTypes = make([]protoimpl.MessageInfo, 4)
var file_e2e_proto_goTypes = []any{
	(*Basic)(nil),          // 0: e2e.Basic
	(*Nested)(nil),         // 1: e2e.Nested
	nil,                    // 2: e2e.Basic.MapEntry
	(*Nested_Message)(nil), // 3: e2e.Nested.Message
}
var file_e2e_proto_depIdxs = []int32{
	2, // 0: e2e.Basic.map:type_name -> e2e.Basic.MapEntry
	0, // 1: e2e.Nested.Message.basic:type_name -> e2e.Basic
	2, // [2:2] is the sub-list for method output_type
	2, // [2:2] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_e2e_proto_init() }
func file_e2e_proto_init() {
	if File_e2e_proto != nil {
		return
	}
	file_e2e_proto_msgTypes[0].OneofWrappers = []any{
		(*Basic_Int)(nil),
		(*Basic_Str)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_e2e_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   4,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_e2e_proto_goTypes,
		DependencyIndexes: file_e2e_proto_depIdxs,
		MessageInfos:      file_e2e_proto_msgTypes,
	}.Build()
	File_e2e_proto = out.File
	file_e2e_proto_rawDesc = nil
	file_e2e_proto_goTypes = nil
	file_e2e_proto_depIdxs = nil
}
