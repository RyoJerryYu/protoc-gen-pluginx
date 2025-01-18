// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.36.0
// 	protoc        (unknown)
// source: proto/feed/feed.proto

package feed

import (
	_ "github.com/RyoJerryYu/protoc-gen-pluginx/proto/ryojerryyu/annotations"
	user "github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-go-fieldmask/e2e/proto/user"
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Feed struct {
	state           protoimpl.MessageState `protogen:"open.v1"`
	Id              string                 `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Title           string                 `protobuf:"bytes,2,opt,name=title,proto3" json:"title,omitempty"`
	Author          *user.User             `protobuf:"bytes,4,opt,name=author,proto3" json:"author,omitempty"`
	CreatedAt       *timestamppb.Timestamp `protobuf:"bytes,5,opt,name=created_at,json=createdAt,proto3" json:"created_at,omitempty"`
	NestedFromOther *user.Icon_Nested      `protobuf:"bytes,6,opt,name=nested_from_other,json=nestedFromOther,proto3" json:"nested_from_other,omitempty"`
	unknownFields   protoimpl.UnknownFields
	sizeCache       protoimpl.SizeCache
}

func (x *Feed) Reset() {
	*x = Feed{}
	mi := &file_proto_feed_feed_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Feed) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Feed) ProtoMessage() {}

func (x *Feed) ProtoReflect() protoreflect.Message {
	mi := &file_proto_feed_feed_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Feed.ProtoReflect.Descriptor instead.
func (*Feed) Descriptor() ([]byte, []int) {
	return file_proto_feed_feed_proto_rawDescGZIP(), []int{0}
}

func (x *Feed) GetId() string {
	if x != nil {
		return x.Id
	}
	return ""
}

func (x *Feed) GetTitle() string {
	if x != nil {
		return x.Title
	}
	return ""
}

func (x *Feed) GetAuthor() *user.User {
	if x != nil {
		return x.Author
	}
	return nil
}

func (x *Feed) GetCreatedAt() *timestamppb.Timestamp {
	if x != nil {
		return x.CreatedAt
	}
	return nil
}

func (x *Feed) GetNestedFromOther() *user.Icon_Nested {
	if x != nil {
		return x.NestedFromOther
	}
	return nil
}

var File_proto_feed_feed_proto protoreflect.FileDescriptor

var file_proto_feed_feed_proto_rawDesc = []byte{
	0x0a, 0x15, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x66, 0x65, 0x65, 0x64, 0x2f, 0x66, 0x65, 0x65,
	0x64, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0b, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e,
	0x66, 0x65, 0x65, 0x64, 0x1a, 0x1f, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x15, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x75, 0x73, 0x65,
	0x72, 0x2f, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x26, 0x72, 0x79,
	0x6f, 0x6a, 0x65, 0x72, 0x72, 0x79, 0x79, 0x75, 0x2f, 0x61, 0x6e, 0x6e, 0x6f, 0x74, 0x61, 0x74,
	0x69, 0x6f, 0x6e, 0x73, 0x2f, 0x66, 0x69, 0x65, 0x6c, 0x64, 0x6d, 0x61, 0x73, 0x6b, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x22, 0xd8, 0x01, 0x0a, 0x04, 0x46, 0x65, 0x65, 0x64, 0x12, 0x0e, 0x0a,
	0x02, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x02, 0x69, 0x64, 0x12, 0x14, 0x0a,
	0x05, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x09, 0x52, 0x05, 0x74, 0x69,
	0x74, 0x6c, 0x65, 0x12, 0x29, 0x0a, 0x06, 0x61, 0x75, 0x74, 0x68, 0x6f, 0x72, 0x18, 0x04, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x11, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e, 0x75, 0x73, 0x65,
	0x72, 0x2e, 0x55, 0x73, 0x65, 0x72, 0x52, 0x06, 0x61, 0x75, 0x74, 0x68, 0x6f, 0x72, 0x12, 0x39,
	0x0a, 0x0a, 0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x5f, 0x61, 0x74, 0x18, 0x05, 0x20, 0x01,
	0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52, 0x09,
	0x63, 0x72, 0x65, 0x61, 0x74, 0x65, 0x64, 0x41, 0x74, 0x12, 0x44, 0x0a, 0x11, 0x6e, 0x65, 0x73,
	0x74, 0x65, 0x64, 0x5f, 0x66, 0x72, 0x6f, 0x6d, 0x5f, 0x6f, 0x74, 0x68, 0x65, 0x72, 0x18, 0x06,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x18, 0x2e, 0x61, 0x70, 0x69, 0x2e, 0x76, 0x31, 0x2e, 0x75, 0x73,
	0x65, 0x72, 0x2e, 0x49, 0x63, 0x6f, 0x6e, 0x2e, 0x4e, 0x65, 0x73, 0x74, 0x65, 0x64, 0x52, 0x0f,
	0x6e, 0x65, 0x73, 0x74, 0x65, 0x64, 0x46, 0x72, 0x6f, 0x6d, 0x4f, 0x74, 0x68, 0x65, 0x72, 0x42,
	0x57, 0x5a, 0x55, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x52, 0x79,
	0x6f, 0x4a, 0x65, 0x72, 0x72, 0x79, 0x59, 0x75, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d,
	0x67, 0x65, 0x6e, 0x2d, 0x70, 0x6c, 0x75, 0x67, 0x69, 0x6e, 0x78, 0x2f, 0x74, 0x65, 0x73, 0x74,
	0x73, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x2d, 0x67, 0x65, 0x6e, 0x2d, 0x67, 0x6f, 0x2d,
	0x66, 0x69, 0x65, 0x6c, 0x64, 0x6d, 0x61, 0x73, 0x6b, 0x2f, 0x65, 0x32, 0x65, 0x2f, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x2f, 0x66, 0x65, 0x65, 0x64, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_feed_feed_proto_rawDescOnce sync.Once
	file_proto_feed_feed_proto_rawDescData = file_proto_feed_feed_proto_rawDesc
)

func file_proto_feed_feed_proto_rawDescGZIP() []byte {
	file_proto_feed_feed_proto_rawDescOnce.Do(func() {
		file_proto_feed_feed_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_feed_feed_proto_rawDescData)
	})
	return file_proto_feed_feed_proto_rawDescData
}

var file_proto_feed_feed_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_proto_feed_feed_proto_goTypes = []any{
	(*Feed)(nil),                  // 0: api.v1.feed.Feed
	(*user.User)(nil),             // 1: api.v1.user.User
	(*timestamppb.Timestamp)(nil), // 2: google.protobuf.Timestamp
	(*user.Icon_Nested)(nil),      // 3: api.v1.user.Icon.Nested
}
var file_proto_feed_feed_proto_depIdxs = []int32{
	1, // 0: api.v1.feed.Feed.author:type_name -> api.v1.user.User
	2, // 1: api.v1.feed.Feed.created_at:type_name -> google.protobuf.Timestamp
	3, // 2: api.v1.feed.Feed.nested_from_other:type_name -> api.v1.user.Icon.Nested
	3, // [3:3] is the sub-list for method output_type
	3, // [3:3] is the sub-list for method input_type
	3, // [3:3] is the sub-list for extension type_name
	3, // [3:3] is the sub-list for extension extendee
	0, // [0:3] is the sub-list for field type_name
}

func init() { file_proto_feed_feed_proto_init() }
func file_proto_feed_feed_proto_init() {
	if File_proto_feed_feed_proto != nil {
		return
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_feed_feed_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_proto_feed_feed_proto_goTypes,
		DependencyIndexes: file_proto_feed_feed_proto_depIdxs,
		MessageInfos:      file_proto_feed_feed_proto_msgTypes,
	}.Build()
	File_proto_feed_feed_proto = out.File
	file_proto_feed_feed_proto_rawDesc = nil
	file_proto_feed_feed_proto_goTypes = nil
	file_proto_feed_feed_proto_depIdxs = nil
}
