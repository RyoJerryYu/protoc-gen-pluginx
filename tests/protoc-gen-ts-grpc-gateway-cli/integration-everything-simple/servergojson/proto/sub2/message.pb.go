// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.0
// 	protoc        (unknown)
// source: proto/sub2/message.proto

package sub2

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

type IdMessage struct {
	state         protoimpl.MessageState `protogen:"open.v1"`
	Uuid          string                 `protobuf:"bytes,1,opt,name=uuid,proto3" json:"uuid,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *IdMessage) Reset() {
	*x = IdMessage{}
	mi := &file_proto_sub2_message_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *IdMessage) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*IdMessage) ProtoMessage() {}

func (x *IdMessage) ProtoReflect() protoreflect.Message {
	mi := &file_proto_sub2_message_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use IdMessage.ProtoReflect.Descriptor instead.
func (*IdMessage) Descriptor() ([]byte, []int) {
	return file_proto_sub2_message_proto_rawDescGZIP(), []int{0}
}

func (x *IdMessage) GetUuid() string {
	if x != nil {
		return x.Uuid
	}
	return ""
}

var File_proto_sub2_message_proto protoreflect.FileDescriptor

var file_proto_sub2_message_proto_rawDesc = []byte{
	0x0a, 0x18, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x73, 0x75, 0x62, 0x32, 0x2f, 0x6d, 0x65, 0x73,
	0x73, 0x61, 0x67, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0a, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2e, 0x73, 0x75, 0x62, 0x32, 0x22, 0x1f, 0x0a, 0x09, 0x49, 0x64, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x12, 0x12, 0x0a, 0x04, 0x75, 0x75, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x09, 0x52, 0x04, 0x75, 0x75, 0x69, 0x64, 0x42, 0xed, 0x01, 0x0a, 0x0e, 0x63, 0x6f, 0x6d, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x73, 0x75, 0x62, 0x32, 0x42, 0x0c, 0x4d, 0x65, 0x73, 0x73,
	0x61, 0x67, 0x65, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x83, 0x01, 0x67, 0x69, 0x74,
	0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x52, 0x79, 0x6f, 0x4a, 0x65, 0x72, 0x72, 0x79,
	0x59, 0x75, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d, 0x67, 0x65, 0x6e, 0x2d, 0x70, 0x6c,
	0x75, 0x67, 0x69, 0x6e, 0x78, 0x2f, 0x74, 0x65, 0x73, 0x74, 0x73, 0x2f, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x63, 0x2d, 0x67, 0x65, 0x6e, 0x2d, 0x74, 0x73, 0x2d, 0x67, 0x72, 0x70, 0x63, 0x2d, 0x67,
	0x61, 0x74, 0x65, 0x77, 0x61, 0x79, 0x2d, 0x63, 0x6c, 0x69, 0x2f, 0x69, 0x6e, 0x74, 0x65, 0x67,
	0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2d, 0x65, 0x76, 0x65, 0x72, 0x79, 0x74, 0x68, 0x69, 0x6e,
	0x67, 0x2d, 0x73, 0x69, 0x6d, 0x70, 0x6c, 0x65, 0x2f, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x67,
	0x6f, 0x6a, 0x73, 0x6f, 0x6e, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x73, 0x75, 0x62, 0x32,
	0xa2, 0x02, 0x03, 0x50, 0x53, 0x58, 0xaa, 0x02, 0x0a, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x53,
	0x75, 0x62, 0x32, 0xca, 0x02, 0x0a, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x5c, 0x53, 0x75, 0x62, 0x32,
	0xe2, 0x02, 0x16, 0x50, 0x72, 0x6f, 0x74, 0x6f, 0x5c, 0x53, 0x75, 0x62, 0x32, 0x5c, 0x47, 0x50,
	0x42, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x0b, 0x50, 0x72, 0x6f, 0x74,
	0x6f, 0x3a, 0x3a, 0x53, 0x75, 0x62, 0x32, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_sub2_message_proto_rawDescOnce sync.Once
	file_proto_sub2_message_proto_rawDescData = file_proto_sub2_message_proto_rawDesc
)

func file_proto_sub2_message_proto_rawDescGZIP() []byte {
	file_proto_sub2_message_proto_rawDescOnce.Do(func() {
		file_proto_sub2_message_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_sub2_message_proto_rawDescData)
	})
	return file_proto_sub2_message_proto_rawDescData
}

var file_proto_sub2_message_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_proto_sub2_message_proto_goTypes = []any{
	(*IdMessage)(nil), // 0: proto.sub2.IdMessage
}
var file_proto_sub2_message_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_proto_sub2_message_proto_init() }
func file_proto_sub2_message_proto_init() {
	if File_proto_sub2_message_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_sub2_message_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_proto_sub2_message_proto_goTypes,
		DependencyIndexes: file_proto_sub2_message_proto_depIdxs,
		MessageInfos:      file_proto_sub2_message_proto_msgTypes,
	}.Build()
	File_proto_sub2_message_proto = out.File
	file_proto_sub2_message_proto_rawDesc = nil
	file_proto_sub2_message_proto_goTypes = nil
	file_proto_sub2_message_proto_depIdxs = nil
}
