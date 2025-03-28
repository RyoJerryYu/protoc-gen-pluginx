// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.5
// 	protoc        (unknown)
// source: ryojerryyu/annotations/fieldmask.proto

package annotations

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	descriptorpb "google.golang.org/protobuf/types/descriptorpb"
	reflect "reflect"
	sync "sync"
	unsafe "unsafe"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type FieldMaskFieldOptions struct {
	state protoimpl.MessageState `protogen:"open.v1"`
	// end of the field mask,
	// generated code will not allow to get the inner field mask for this field
	End           bool `protobuf:"varint,1,opt,name=end,proto3" json:"end,omitempty"`
	unknownFields protoimpl.UnknownFields
	sizeCache     protoimpl.SizeCache
}

func (x *FieldMaskFieldOptions) Reset() {
	*x = FieldMaskFieldOptions{}
	mi := &file_ryojerryyu_annotations_fieldmask_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *FieldMaskFieldOptions) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*FieldMaskFieldOptions) ProtoMessage() {}

func (x *FieldMaskFieldOptions) ProtoReflect() protoreflect.Message {
	mi := &file_ryojerryyu_annotations_fieldmask_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use FieldMaskFieldOptions.ProtoReflect.Descriptor instead.
func (*FieldMaskFieldOptions) Descriptor() ([]byte, []int) {
	return file_ryojerryyu_annotations_fieldmask_proto_rawDescGZIP(), []int{0}
}

func (x *FieldMaskFieldOptions) GetEnd() bool {
	if x != nil {
		return x.End
	}
	return false
}

var file_ryojerryyu_annotations_fieldmask_proto_extTypes = []protoimpl.ExtensionInfo{
	{
		ExtendedType:  (*descriptorpb.FieldOptions)(nil),
		ExtensionType: (*FieldMaskFieldOptions)(nil),
		Field:         51010,
		Name:          "ryojerryyu.annotations.field_mask",
		Tag:           "bytes,51010,opt,name=field_mask",
		Filename:      "ryojerryyu/annotations/fieldmask.proto",
	},
}

// Extension fields to descriptorpb.FieldOptions.
var (
	// optional ryojerryyu.annotations.FieldMaskFieldOptions field_mask = 51010;
	E_FieldMask = &file_ryojerryyu_annotations_fieldmask_proto_extTypes[0]
)

var File_ryojerryyu_annotations_fieldmask_proto protoreflect.FileDescriptor

var file_ryojerryyu_annotations_fieldmask_proto_rawDesc = string([]byte{
	0x0a, 0x26, 0x72, 0x79, 0x6f, 0x6a, 0x65, 0x72, 0x72, 0x79, 0x79, 0x75, 0x2f, 0x61, 0x6e, 0x6e,
	0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2f, 0x66, 0x69, 0x65, 0x6c, 0x64, 0x6d, 0x61,
	0x73, 0x6b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x16, 0x72, 0x79, 0x6f, 0x6a, 0x65, 0x72,
	0x72, 0x79, 0x79, 0x75, 0x2e, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73,
	0x1a, 0x20, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2f, 0x64, 0x65, 0x73, 0x63, 0x72, 0x69, 0x70, 0x74, 0x6f, 0x72, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x22, 0x29, 0x0a, 0x15, 0x46, 0x69, 0x65, 0x6c, 0x64, 0x4d, 0x61, 0x73, 0x6b, 0x46,
	0x69, 0x65, 0x6c, 0x64, 0x4f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x12, 0x10, 0x0a, 0x03, 0x65,
	0x6e, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x08, 0x52, 0x03, 0x65, 0x6e, 0x64, 0x3a, 0x70, 0x0a,
	0x0a, 0x66, 0x69, 0x65, 0x6c, 0x64, 0x5f, 0x6d, 0x61, 0x73, 0x6b, 0x12, 0x1d, 0x2e, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x46, 0x69,
	0x65, 0x6c, 0x64, 0x4f, 0x70, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x18, 0xc2, 0x8e, 0x03, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x2d, 0x2e, 0x72, 0x79, 0x6f, 0x6a, 0x65, 0x72, 0x72, 0x79, 0x79, 0x75, 0x2e,
	0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x2e, 0x46, 0x69, 0x65, 0x6c,
	0x64, 0x4d, 0x61, 0x73, 0x6b, 0x46, 0x69, 0x65, 0x6c, 0x64, 0x4f, 0x70, 0x74, 0x69, 0x6f, 0x6e,
	0x73, 0x52, 0x09, 0x66, 0x69, 0x65, 0x6c, 0x64, 0x4d, 0x61, 0x73, 0x6b, 0x88, 0x01, 0x01, 0x42,
	0x47, 0x5a, 0x45, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x52, 0x79,
	0x6f, 0x4a, 0x65, 0x72, 0x72, 0x79, 0x59, 0x75, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d,
	0x67, 0x65, 0x6e, 0x2d, 0x70, 0x6c, 0x75, 0x67, 0x69, 0x6e, 0x78, 0x2f, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2f, 0x72, 0x79, 0x6f, 0x6a, 0x65, 0x72, 0x72, 0x79, 0x79, 0x75, 0x2f, 0x61, 0x6e, 0x6e,
	0x6f, 0x74, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x73, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
})

var (
	file_ryojerryyu_annotations_fieldmask_proto_rawDescOnce sync.Once
	file_ryojerryyu_annotations_fieldmask_proto_rawDescData []byte
)

func file_ryojerryyu_annotations_fieldmask_proto_rawDescGZIP() []byte {
	file_ryojerryyu_annotations_fieldmask_proto_rawDescOnce.Do(func() {
		file_ryojerryyu_annotations_fieldmask_proto_rawDescData = protoimpl.X.CompressGZIP(unsafe.Slice(unsafe.StringData(file_ryojerryyu_annotations_fieldmask_proto_rawDesc), len(file_ryojerryyu_annotations_fieldmask_proto_rawDesc)))
	})
	return file_ryojerryyu_annotations_fieldmask_proto_rawDescData
}

var file_ryojerryyu_annotations_fieldmask_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_ryojerryyu_annotations_fieldmask_proto_goTypes = []any{
	(*FieldMaskFieldOptions)(nil),     // 0: ryojerryyu.annotations.FieldMaskFieldOptions
	(*descriptorpb.FieldOptions)(nil), // 1: google.protobuf.FieldOptions
}
var file_ryojerryyu_annotations_fieldmask_proto_depIdxs = []int32{
	1, // 0: ryojerryyu.annotations.field_mask:extendee -> google.protobuf.FieldOptions
	0, // 1: ryojerryyu.annotations.field_mask:type_name -> ryojerryyu.annotations.FieldMaskFieldOptions
	2, // [2:2] is the sub-list for method output_type
	2, // [2:2] is the sub-list for method input_type
	1, // [1:2] is the sub-list for extension type_name
	0, // [0:1] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_ryojerryyu_annotations_fieldmask_proto_init() }
func file_ryojerryyu_annotations_fieldmask_proto_init() {
	if File_ryojerryyu_annotations_fieldmask_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: unsafe.Slice(unsafe.StringData(file_ryojerryyu_annotations_fieldmask_proto_rawDesc), len(file_ryojerryyu_annotations_fieldmask_proto_rawDesc)),
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 1,
			NumServices:   0,
		},
		GoTypes:           file_ryojerryyu_annotations_fieldmask_proto_goTypes,
		DependencyIndexes: file_ryojerryyu_annotations_fieldmask_proto_depIdxs,
		MessageInfos:      file_ryojerryyu_annotations_fieldmask_proto_msgTypes,
		ExtensionInfos:    file_ryojerryyu_annotations_fieldmask_proto_extTypes,
	}.Build()
	File_ryojerryyu_annotations_fieldmask_proto = out.File
	file_ryojerryyu_annotations_fieldmask_proto_goTypes = nil
	file_ryojerryyu_annotations_fieldmask_proto_depIdxs = nil
}
