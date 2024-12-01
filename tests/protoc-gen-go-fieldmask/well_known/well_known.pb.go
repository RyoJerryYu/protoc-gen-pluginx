// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.35.1
// 	protoc        (unknown)
// source: well_known.proto

package well_known

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	anypb "google.golang.org/protobuf/types/known/anypb"
	durationpb "google.golang.org/protobuf/types/known/durationpb"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	fieldmaskpb "google.golang.org/protobuf/types/known/fieldmaskpb"
	structpb "google.golang.org/protobuf/types/known/structpb"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
	wrapperspb "google.golang.org/protobuf/types/known/wrapperspb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Holder struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Empty       *emptypb.Empty          `protobuf:"bytes,1,opt,name=empty,proto3" json:"empty,omitempty"`
	Timestamp   *timestamppb.Timestamp  `protobuf:"bytes,2,opt,name=timestamp,proto3" json:"timestamp,omitempty"`
	Duration    *durationpb.Duration    `protobuf:"bytes,3,opt,name=duration,proto3" json:"duration,omitempty"`
	FieldMask   *fieldmaskpb.FieldMask  `protobuf:"bytes,4,opt,name=field_mask,json=fieldMask,proto3" json:"field_mask,omitempty"`
	BoolValue   *wrapperspb.BoolValue   `protobuf:"bytes,5,opt,name=bool_value,json=boolValue,proto3" json:"bool_value,omitempty"`
	Int32Value  *wrapperspb.Int32Value  `protobuf:"bytes,6,opt,name=int32_value,json=int32Value,proto3" json:"int32_value,omitempty"`
	Int64Value  *wrapperspb.Int64Value  `protobuf:"bytes,7,opt,name=int64_value,json=int64Value,proto3" json:"int64_value,omitempty"`
	Uint32Value *wrapperspb.UInt32Value `protobuf:"bytes,8,opt,name=uint32_value,json=uint32Value,proto3" json:"uint32_value,omitempty"`
	Uint64Value *wrapperspb.UInt64Value `protobuf:"bytes,9,opt,name=uint64_value,json=uint64Value,proto3" json:"uint64_value,omitempty"`
	FloatValue  *wrapperspb.FloatValue  `protobuf:"bytes,10,opt,name=float_value,json=floatValue,proto3" json:"float_value,omitempty"`
	DoubleValue *wrapperspb.DoubleValue `protobuf:"bytes,11,opt,name=double_value,json=doubleValue,proto3" json:"double_value,omitempty"`
	StringValue *wrapperspb.StringValue `protobuf:"bytes,12,opt,name=string_value,json=stringValue,proto3" json:"string_value,omitempty"`
	BytesValue  *wrapperspb.BytesValue  `protobuf:"bytes,13,opt,name=bytes_value,json=bytesValue,proto3" json:"bytes_value,omitempty"`
	Struct      *structpb.Struct        `protobuf:"bytes,14,opt,name=struct,proto3" json:"struct,omitempty"`
	ListValue   *structpb.ListValue     `protobuf:"bytes,15,opt,name=list_value,json=listValue,proto3" json:"list_value,omitempty"`
	Value       *structpb.Value         `protobuf:"bytes,16,opt,name=value,proto3" json:"value,omitempty"`
	Any         *anypb.Any              `protobuf:"bytes,17,opt,name=any,proto3" json:"any,omitempty"`
}

func (x *Holder) Reset() {
	*x = Holder{}
	mi := &file_well_known_proto_msgTypes[0]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *Holder) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Holder) ProtoMessage() {}

func (x *Holder) ProtoReflect() protoreflect.Message {
	mi := &file_well_known_proto_msgTypes[0]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Holder.ProtoReflect.Descriptor instead.
func (*Holder) Descriptor() ([]byte, []int) {
	return file_well_known_proto_rawDescGZIP(), []int{0}
}

func (x *Holder) GetEmpty() *emptypb.Empty {
	if x != nil {
		return x.Empty
	}
	return nil
}

func (x *Holder) GetTimestamp() *timestamppb.Timestamp {
	if x != nil {
		return x.Timestamp
	}
	return nil
}

func (x *Holder) GetDuration() *durationpb.Duration {
	if x != nil {
		return x.Duration
	}
	return nil
}

func (x *Holder) GetFieldMask() *fieldmaskpb.FieldMask {
	if x != nil {
		return x.FieldMask
	}
	return nil
}

func (x *Holder) GetBoolValue() *wrapperspb.BoolValue {
	if x != nil {
		return x.BoolValue
	}
	return nil
}

func (x *Holder) GetInt32Value() *wrapperspb.Int32Value {
	if x != nil {
		return x.Int32Value
	}
	return nil
}

func (x *Holder) GetInt64Value() *wrapperspb.Int64Value {
	if x != nil {
		return x.Int64Value
	}
	return nil
}

func (x *Holder) GetUint32Value() *wrapperspb.UInt32Value {
	if x != nil {
		return x.Uint32Value
	}
	return nil
}

func (x *Holder) GetUint64Value() *wrapperspb.UInt64Value {
	if x != nil {
		return x.Uint64Value
	}
	return nil
}

func (x *Holder) GetFloatValue() *wrapperspb.FloatValue {
	if x != nil {
		return x.FloatValue
	}
	return nil
}

func (x *Holder) GetDoubleValue() *wrapperspb.DoubleValue {
	if x != nil {
		return x.DoubleValue
	}
	return nil
}

func (x *Holder) GetStringValue() *wrapperspb.StringValue {
	if x != nil {
		return x.StringValue
	}
	return nil
}

func (x *Holder) GetBytesValue() *wrapperspb.BytesValue {
	if x != nil {
		return x.BytesValue
	}
	return nil
}

func (x *Holder) GetStruct() *structpb.Struct {
	if x != nil {
		return x.Struct
	}
	return nil
}

func (x *Holder) GetListValue() *structpb.ListValue {
	if x != nil {
		return x.ListValue
	}
	return nil
}

func (x *Holder) GetValue() *structpb.Value {
	if x != nil {
		return x.Value
	}
	return nil
}

func (x *Holder) GetAny() *anypb.Any {
	if x != nil {
		return x.Any
	}
	return nil
}

type OneOfHolder struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Various:
	//
	//	*OneOfHolder_Empty
	//	*OneOfHolder_Timestamp
	//	*OneOfHolder_Duration
	//	*OneOfHolder_FieldMask
	//	*OneOfHolder_BoolValue
	//	*OneOfHolder_Int32Value
	//	*OneOfHolder_Int64Value
	//	*OneOfHolder_Uint32Value
	//	*OneOfHolder_Uint64Value
	//	*OneOfHolder_FloatValue
	//	*OneOfHolder_DoubleValue
	//	*OneOfHolder_StringValue
	//	*OneOfHolder_BytesValue
	//	*OneOfHolder_Struct
	//	*OneOfHolder_ListValue
	//	*OneOfHolder_Value
	//	*OneOfHolder_Any
	Various isOneOfHolder_Various `protobuf_oneof:"various"`
}

func (x *OneOfHolder) Reset() {
	*x = OneOfHolder{}
	mi := &file_well_known_proto_msgTypes[1]
	ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
	ms.StoreMessageInfo(mi)
}

func (x *OneOfHolder) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*OneOfHolder) ProtoMessage() {}

func (x *OneOfHolder) ProtoReflect() protoreflect.Message {
	mi := &file_well_known_proto_msgTypes[1]
	if x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use OneOfHolder.ProtoReflect.Descriptor instead.
func (*OneOfHolder) Descriptor() ([]byte, []int) {
	return file_well_known_proto_rawDescGZIP(), []int{1}
}

func (m *OneOfHolder) GetVarious() isOneOfHolder_Various {
	if m != nil {
		return m.Various
	}
	return nil
}

func (x *OneOfHolder) GetEmpty() *emptypb.Empty {
	if x, ok := x.GetVarious().(*OneOfHolder_Empty); ok {
		return x.Empty
	}
	return nil
}

func (x *OneOfHolder) GetTimestamp() *timestamppb.Timestamp {
	if x, ok := x.GetVarious().(*OneOfHolder_Timestamp); ok {
		return x.Timestamp
	}
	return nil
}

func (x *OneOfHolder) GetDuration() *durationpb.Duration {
	if x, ok := x.GetVarious().(*OneOfHolder_Duration); ok {
		return x.Duration
	}
	return nil
}

func (x *OneOfHolder) GetFieldMask() *fieldmaskpb.FieldMask {
	if x, ok := x.GetVarious().(*OneOfHolder_FieldMask); ok {
		return x.FieldMask
	}
	return nil
}

func (x *OneOfHolder) GetBoolValue() *wrapperspb.BoolValue {
	if x, ok := x.GetVarious().(*OneOfHolder_BoolValue); ok {
		return x.BoolValue
	}
	return nil
}

func (x *OneOfHolder) GetInt32Value() *wrapperspb.Int32Value {
	if x, ok := x.GetVarious().(*OneOfHolder_Int32Value); ok {
		return x.Int32Value
	}
	return nil
}

func (x *OneOfHolder) GetInt64Value() *wrapperspb.Int64Value {
	if x, ok := x.GetVarious().(*OneOfHolder_Int64Value); ok {
		return x.Int64Value
	}
	return nil
}

func (x *OneOfHolder) GetUint32Value() *wrapperspb.UInt32Value {
	if x, ok := x.GetVarious().(*OneOfHolder_Uint32Value); ok {
		return x.Uint32Value
	}
	return nil
}

func (x *OneOfHolder) GetUint64Value() *wrapperspb.UInt64Value {
	if x, ok := x.GetVarious().(*OneOfHolder_Uint64Value); ok {
		return x.Uint64Value
	}
	return nil
}

func (x *OneOfHolder) GetFloatValue() *wrapperspb.FloatValue {
	if x, ok := x.GetVarious().(*OneOfHolder_FloatValue); ok {
		return x.FloatValue
	}
	return nil
}

func (x *OneOfHolder) GetDoubleValue() *wrapperspb.DoubleValue {
	if x, ok := x.GetVarious().(*OneOfHolder_DoubleValue); ok {
		return x.DoubleValue
	}
	return nil
}

func (x *OneOfHolder) GetStringValue() *wrapperspb.StringValue {
	if x, ok := x.GetVarious().(*OneOfHolder_StringValue); ok {
		return x.StringValue
	}
	return nil
}

func (x *OneOfHolder) GetBytesValue() *wrapperspb.BytesValue {
	if x, ok := x.GetVarious().(*OneOfHolder_BytesValue); ok {
		return x.BytesValue
	}
	return nil
}

func (x *OneOfHolder) GetStruct() *structpb.Struct {
	if x, ok := x.GetVarious().(*OneOfHolder_Struct); ok {
		return x.Struct
	}
	return nil
}

func (x *OneOfHolder) GetListValue() *structpb.ListValue {
	if x, ok := x.GetVarious().(*OneOfHolder_ListValue); ok {
		return x.ListValue
	}
	return nil
}

func (x *OneOfHolder) GetValue() *structpb.Value {
	if x, ok := x.GetVarious().(*OneOfHolder_Value); ok {
		return x.Value
	}
	return nil
}

func (x *OneOfHolder) GetAny() *anypb.Any {
	if x, ok := x.GetVarious().(*OneOfHolder_Any); ok {
		return x.Any
	}
	return nil
}

type isOneOfHolder_Various interface {
	isOneOfHolder_Various()
}

type OneOfHolder_Empty struct {
	Empty *emptypb.Empty `protobuf:"bytes,1,opt,name=empty,proto3,oneof"`
}

type OneOfHolder_Timestamp struct {
	Timestamp *timestamppb.Timestamp `protobuf:"bytes,2,opt,name=timestamp,proto3,oneof"`
}

type OneOfHolder_Duration struct {
	Duration *durationpb.Duration `protobuf:"bytes,3,opt,name=duration,proto3,oneof"`
}

type OneOfHolder_FieldMask struct {
	FieldMask *fieldmaskpb.FieldMask `protobuf:"bytes,4,opt,name=field_mask,json=fieldMask,proto3,oneof"`
}

type OneOfHolder_BoolValue struct {
	BoolValue *wrapperspb.BoolValue `protobuf:"bytes,5,opt,name=bool_value,json=boolValue,proto3,oneof"`
}

type OneOfHolder_Int32Value struct {
	Int32Value *wrapperspb.Int32Value `protobuf:"bytes,6,opt,name=int32_value,json=int32Value,proto3,oneof"`
}

type OneOfHolder_Int64Value struct {
	Int64Value *wrapperspb.Int64Value `protobuf:"bytes,7,opt,name=int64_value,json=int64Value,proto3,oneof"`
}

type OneOfHolder_Uint32Value struct {
	Uint32Value *wrapperspb.UInt32Value `protobuf:"bytes,8,opt,name=uint32_value,json=uint32Value,proto3,oneof"`
}

type OneOfHolder_Uint64Value struct {
	Uint64Value *wrapperspb.UInt64Value `protobuf:"bytes,9,opt,name=uint64_value,json=uint64Value,proto3,oneof"`
}

type OneOfHolder_FloatValue struct {
	FloatValue *wrapperspb.FloatValue `protobuf:"bytes,10,opt,name=float_value,json=floatValue,proto3,oneof"`
}

type OneOfHolder_DoubleValue struct {
	DoubleValue *wrapperspb.DoubleValue `protobuf:"bytes,11,opt,name=double_value,json=doubleValue,proto3,oneof"`
}

type OneOfHolder_StringValue struct {
	StringValue *wrapperspb.StringValue `protobuf:"bytes,12,opt,name=string_value,json=stringValue,proto3,oneof"`
}

type OneOfHolder_BytesValue struct {
	BytesValue *wrapperspb.BytesValue `protobuf:"bytes,13,opt,name=bytes_value,json=bytesValue,proto3,oneof"`
}

type OneOfHolder_Struct struct {
	Struct *structpb.Struct `protobuf:"bytes,14,opt,name=struct,proto3,oneof"`
}

type OneOfHolder_ListValue struct {
	ListValue *structpb.ListValue `protobuf:"bytes,15,opt,name=list_value,json=listValue,proto3,oneof"`
}

type OneOfHolder_Value struct {
	Value *structpb.Value `protobuf:"bytes,16,opt,name=value,proto3,oneof"`
}

type OneOfHolder_Any struct {
	Any *anypb.Any `protobuf:"bytes,17,opt,name=any,proto3,oneof"`
}

func (*OneOfHolder_Empty) isOneOfHolder_Various() {}

func (*OneOfHolder_Timestamp) isOneOfHolder_Various() {}

func (*OneOfHolder_Duration) isOneOfHolder_Various() {}

func (*OneOfHolder_FieldMask) isOneOfHolder_Various() {}

func (*OneOfHolder_BoolValue) isOneOfHolder_Various() {}

func (*OneOfHolder_Int32Value) isOneOfHolder_Various() {}

func (*OneOfHolder_Int64Value) isOneOfHolder_Various() {}

func (*OneOfHolder_Uint32Value) isOneOfHolder_Various() {}

func (*OneOfHolder_Uint64Value) isOneOfHolder_Various() {}

func (*OneOfHolder_FloatValue) isOneOfHolder_Various() {}

func (*OneOfHolder_DoubleValue) isOneOfHolder_Various() {}

func (*OneOfHolder_StringValue) isOneOfHolder_Various() {}

func (*OneOfHolder_BytesValue) isOneOfHolder_Various() {}

func (*OneOfHolder_Struct) isOneOfHolder_Various() {}

func (*OneOfHolder_ListValue) isOneOfHolder_Various() {}

func (*OneOfHolder_Value) isOneOfHolder_Various() {}

func (*OneOfHolder_Any) isOneOfHolder_Various() {}

var File_well_known_proto protoreflect.FileDescriptor

var file_well_known_proto_rawDesc = []byte{
	0x0a, 0x10, 0x77, 0x65, 0x6c, 0x6c, 0x5f, 0x6b, 0x6e, 0x6f, 0x77, 0x6e, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x12, 0x0a, 0x77, 0x65, 0x6c, 0x6c, 0x5f, 0x6b, 0x6e, 0x6f, 0x77, 0x6e, 0x1a, 0x1b,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f,
	0x65, 0x6d, 0x70, 0x74, 0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1f, 0x67, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x74, 0x69, 0x6d,
	0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1e, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x64, 0x75,
	0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x20, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x66, 0x69,
	0x65, 0x6c, 0x64, 0x5f, 0x6d, 0x61, 0x73, 0x6b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1e,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f,
	0x77, 0x72, 0x61, 0x70, 0x70, 0x65, 0x72, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x1c,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f,
	0x73, 0x74, 0x72, 0x75, 0x63, 0x74, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x1a, 0x19, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x61, 0x6e,
	0x79, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xdb, 0x07, 0x0a, 0x06, 0x48, 0x6f, 0x6c, 0x64,
	0x65, 0x72, 0x12, 0x2c, 0x0a, 0x05, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28,
	0x0b, 0x32, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x52, 0x05, 0x65, 0x6d, 0x70, 0x74, 0x79,
	0x12, 0x38, 0x0a, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x18, 0x02, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x52,
	0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d, 0x70, 0x12, 0x35, 0x0a, 0x08, 0x64, 0x75,
	0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x03, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x19, 0x2e, 0x67,
	0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x44,
	0x75, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x52, 0x08, 0x64, 0x75, 0x72, 0x61, 0x74, 0x69, 0x6f,
	0x6e, 0x12, 0x39, 0x0a, 0x0a, 0x66, 0x69, 0x65, 0x6c, 0x64, 0x5f, 0x6d, 0x61, 0x73, 0x6b, 0x18,
	0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x46, 0x69, 0x65, 0x6c, 0x64, 0x4d, 0x61, 0x73,
	0x6b, 0x52, 0x09, 0x66, 0x69, 0x65, 0x6c, 0x64, 0x4d, 0x61, 0x73, 0x6b, 0x12, 0x39, 0x0a, 0x0a,
	0x62, 0x6f, 0x6f, 0x6c, 0x5f, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62,
	0x75, 0x66, 0x2e, 0x42, 0x6f, 0x6f, 0x6c, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x09, 0x62, 0x6f,
	0x6f, 0x6c, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x3c, 0x0a, 0x0b, 0x69, 0x6e, 0x74, 0x33, 0x32,
	0x5f, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x67,
	0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x49,
	0x6e, 0x74, 0x33, 0x32, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x0a, 0x69, 0x6e, 0x74, 0x33, 0x32,
	0x56, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x3c, 0x0a, 0x0b, 0x69, 0x6e, 0x74, 0x36, 0x34, 0x5f, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x18, 0x07, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x67, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x49, 0x6e, 0x74,
	0x36, 0x34, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x0a, 0x69, 0x6e, 0x74, 0x36, 0x34, 0x56, 0x61,
	0x6c, 0x75, 0x65, 0x12, 0x3f, 0x0a, 0x0c, 0x75, 0x69, 0x6e, 0x74, 0x33, 0x32, 0x5f, 0x76, 0x61,
	0x6c, 0x75, 0x65, 0x18, 0x08, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1c, 0x2e, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x55, 0x49, 0x6e, 0x74,
	0x33, 0x32, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x0b, 0x75, 0x69, 0x6e, 0x74, 0x33, 0x32, 0x56,
	0x61, 0x6c, 0x75, 0x65, 0x12, 0x3f, 0x0a, 0x0c, 0x75, 0x69, 0x6e, 0x74, 0x36, 0x34, 0x5f, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x18, 0x09, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1c, 0x2e, 0x67, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x55, 0x49, 0x6e,
	0x74, 0x36, 0x34, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x0b, 0x75, 0x69, 0x6e, 0x74, 0x36, 0x34,
	0x56, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x3c, 0x0a, 0x0b, 0x66, 0x6c, 0x6f, 0x61, 0x74, 0x5f, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x18, 0x0a, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x67, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x46, 0x6c, 0x6f,
	0x61, 0x74, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x0a, 0x66, 0x6c, 0x6f, 0x61, 0x74, 0x56, 0x61,
	0x6c, 0x75, 0x65, 0x12, 0x3f, 0x0a, 0x0c, 0x64, 0x6f, 0x75, 0x62, 0x6c, 0x65, 0x5f, 0x76, 0x61,
	0x6c, 0x75, 0x65, 0x18, 0x0b, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1c, 0x2e, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x44, 0x6f, 0x75, 0x62,
	0x6c, 0x65, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x0b, 0x64, 0x6f, 0x75, 0x62, 0x6c, 0x65, 0x56,
	0x61, 0x6c, 0x75, 0x65, 0x12, 0x3f, 0x0a, 0x0c, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x5f, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x18, 0x0c, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1c, 0x2e, 0x67, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x53, 0x74, 0x72,
	0x69, 0x6e, 0x67, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x0b, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67,
	0x56, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x3c, 0x0a, 0x0b, 0x62, 0x79, 0x74, 0x65, 0x73, 0x5f, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x18, 0x0d, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x67, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x42, 0x79, 0x74,
	0x65, 0x73, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x0a, 0x62, 0x79, 0x74, 0x65, 0x73, 0x56, 0x61,
	0x6c, 0x75, 0x65, 0x12, 0x2f, 0x0a, 0x06, 0x73, 0x74, 0x72, 0x75, 0x63, 0x74, 0x18, 0x0e, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x17, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x53, 0x74, 0x72, 0x75, 0x63, 0x74, 0x52, 0x06, 0x73, 0x74,
	0x72, 0x75, 0x63, 0x74, 0x12, 0x39, 0x0a, 0x0a, 0x6c, 0x69, 0x73, 0x74, 0x5f, 0x76, 0x61, 0x6c,
	0x75, 0x65, 0x18, 0x0f, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c,
	0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x56,
	0x61, 0x6c, 0x75, 0x65, 0x52, 0x09, 0x6c, 0x69, 0x73, 0x74, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x12,
	0x2c, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x10, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x16,
	0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66,
	0x2e, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x26, 0x0a,
	0x03, 0x61, 0x6e, 0x79, 0x18, 0x11, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x14, 0x2e, 0x67, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x41, 0x6e, 0x79,
	0x52, 0x03, 0x61, 0x6e, 0x79, 0x22, 0x8d, 0x08, 0x0a, 0x0b, 0x4f, 0x6e, 0x65, 0x4f, 0x66, 0x48,
	0x6f, 0x6c, 0x64, 0x65, 0x72, 0x12, 0x2e, 0x0a, 0x05, 0x65, 0x6d, 0x70, 0x74, 0x79, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x0b, 0x32, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x48, 0x00, 0x52, 0x05,
	0x65, 0x6d, 0x70, 0x74, 0x79, 0x12, 0x3a, 0x0a, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61,
	0x6d, 0x70, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c,
	0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x54, 0x69, 0x6d, 0x65, 0x73,
	0x74, 0x61, 0x6d, 0x70, 0x48, 0x00, 0x52, 0x09, 0x74, 0x69, 0x6d, 0x65, 0x73, 0x74, 0x61, 0x6d,
	0x70, 0x12, 0x37, 0x0a, 0x08, 0x64, 0x75, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x18, 0x03, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x19, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x44, 0x75, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x48, 0x00,
	0x52, 0x08, 0x64, 0x75, 0x72, 0x61, 0x74, 0x69, 0x6f, 0x6e, 0x12, 0x3b, 0x0a, 0x0a, 0x66, 0x69,
	0x65, 0x6c, 0x64, 0x5f, 0x6d, 0x61, 0x73, 0x6b, 0x18, 0x04, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a,
	0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66,
	0x2e, 0x46, 0x69, 0x65, 0x6c, 0x64, 0x4d, 0x61, 0x73, 0x6b, 0x48, 0x00, 0x52, 0x09, 0x66, 0x69,
	0x65, 0x6c, 0x64, 0x4d, 0x61, 0x73, 0x6b, 0x12, 0x3b, 0x0a, 0x0a, 0x62, 0x6f, 0x6f, 0x6c, 0x5f,
	0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x05, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f,
	0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x42, 0x6f,
	0x6f, 0x6c, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x09, 0x62, 0x6f, 0x6f, 0x6c, 0x56,
	0x61, 0x6c, 0x75, 0x65, 0x12, 0x3e, 0x0a, 0x0b, 0x69, 0x6e, 0x74, 0x33, 0x32, 0x5f, 0x76, 0x61,
	0x6c, 0x75, 0x65, 0x18, 0x06, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x49, 0x6e, 0x74, 0x33,
	0x32, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x0a, 0x69, 0x6e, 0x74, 0x33, 0x32, 0x56,
	0x61, 0x6c, 0x75, 0x65, 0x12, 0x3e, 0x0a, 0x0b, 0x69, 0x6e, 0x74, 0x36, 0x34, 0x5f, 0x76, 0x61,
	0x6c, 0x75, 0x65, 0x18, 0x07, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x67, 0x6f, 0x6f, 0x67,
	0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x49, 0x6e, 0x74, 0x36,
	0x34, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x0a, 0x69, 0x6e, 0x74, 0x36, 0x34, 0x56,
	0x61, 0x6c, 0x75, 0x65, 0x12, 0x41, 0x0a, 0x0c, 0x75, 0x69, 0x6e, 0x74, 0x33, 0x32, 0x5f, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x18, 0x08, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1c, 0x2e, 0x67, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x55, 0x49, 0x6e,
	0x74, 0x33, 0x32, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x0b, 0x75, 0x69, 0x6e, 0x74,
	0x33, 0x32, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x41, 0x0a, 0x0c, 0x75, 0x69, 0x6e, 0x74, 0x36,
	0x34, 0x5f, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x09, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1c, 0x2e,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e,
	0x55, 0x49, 0x6e, 0x74, 0x36, 0x34, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x0b, 0x75,
	0x69, 0x6e, 0x74, 0x36, 0x34, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x3e, 0x0a, 0x0b, 0x66, 0x6c,
	0x6f, 0x61, 0x74, 0x5f, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x0a, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x1b, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2e, 0x46, 0x6c, 0x6f, 0x61, 0x74, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x0a,
	0x66, 0x6c, 0x6f, 0x61, 0x74, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x41, 0x0a, 0x0c, 0x64, 0x6f,
	0x75, 0x62, 0x6c, 0x65, 0x5f, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x0b, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x1c, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62,
	0x75, 0x66, 0x2e, 0x44, 0x6f, 0x75, 0x62, 0x6c, 0x65, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00,
	0x52, 0x0b, 0x64, 0x6f, 0x75, 0x62, 0x6c, 0x65, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x12, 0x41, 0x0a,
	0x0c, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x5f, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x0c, 0x20,
	0x01, 0x28, 0x0b, 0x32, 0x1c, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x53, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x56, 0x61, 0x6c, 0x75,
	0x65, 0x48, 0x00, 0x52, 0x0b, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x56, 0x61, 0x6c, 0x75, 0x65,
	0x12, 0x3e, 0x0a, 0x0b, 0x62, 0x79, 0x74, 0x65, 0x73, 0x5f, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18,
	0x0d, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1b, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x42, 0x79, 0x74, 0x65, 0x73, 0x56, 0x61, 0x6c,
	0x75, 0x65, 0x48, 0x00, 0x52, 0x0a, 0x62, 0x79, 0x74, 0x65, 0x73, 0x56, 0x61, 0x6c, 0x75, 0x65,
	0x12, 0x31, 0x0a, 0x06, 0x73, 0x74, 0x72, 0x75, 0x63, 0x74, 0x18, 0x0e, 0x20, 0x01, 0x28, 0x0b,
	0x32, 0x17, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62,
	0x75, 0x66, 0x2e, 0x53, 0x74, 0x72, 0x75, 0x63, 0x74, 0x48, 0x00, 0x52, 0x06, 0x73, 0x74, 0x72,
	0x75, 0x63, 0x74, 0x12, 0x3b, 0x0a, 0x0a, 0x6c, 0x69, 0x73, 0x74, 0x5f, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x18, 0x0f, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1a, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x56, 0x61,
	0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x09, 0x6c, 0x69, 0x73, 0x74, 0x56, 0x61, 0x6c, 0x75, 0x65,
	0x12, 0x2e, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x10, 0x20, 0x01, 0x28, 0x0b, 0x32,
	0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2e, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x48, 0x00, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65,
	0x12, 0x28, 0x0a, 0x03, 0x61, 0x6e, 0x79, 0x18, 0x11, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x14, 0x2e,
	0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e,
	0x41, 0x6e, 0x79, 0x48, 0x00, 0x52, 0x03, 0x61, 0x6e, 0x79, 0x42, 0x09, 0x0a, 0x07, 0x76, 0x61,
	0x72, 0x69, 0x6f, 0x75, 0x73, 0x42, 0x19, 0x5a, 0x17, 0x2e, 0x2f, 0x77, 0x65, 0x6c, 0x6c, 0x5f,
	0x6b, 0x6e, 0x6f, 0x77, 0x6e, 0x3b, 0x77, 0x65, 0x6c, 0x6c, 0x5f, 0x6b, 0x6e, 0x6f, 0x77, 0x6e,
	0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_well_known_proto_rawDescOnce sync.Once
	file_well_known_proto_rawDescData = file_well_known_proto_rawDesc
)

func file_well_known_proto_rawDescGZIP() []byte {
	file_well_known_proto_rawDescOnce.Do(func() {
		file_well_known_proto_rawDescData = protoimpl.X.CompressGZIP(file_well_known_proto_rawDescData)
	})
	return file_well_known_proto_rawDescData
}

var file_well_known_proto_msgTypes = make([]protoimpl.MessageInfo, 2)
var file_well_known_proto_goTypes = []any{
	(*Holder)(nil),                 // 0: well_known.Holder
	(*OneOfHolder)(nil),            // 1: well_known.OneOfHolder
	(*emptypb.Empty)(nil),          // 2: google.protobuf.Empty
	(*timestamppb.Timestamp)(nil),  // 3: google.protobuf.Timestamp
	(*durationpb.Duration)(nil),    // 4: google.protobuf.Duration
	(*fieldmaskpb.FieldMask)(nil),  // 5: google.protobuf.FieldMask
	(*wrapperspb.BoolValue)(nil),   // 6: google.protobuf.BoolValue
	(*wrapperspb.Int32Value)(nil),  // 7: google.protobuf.Int32Value
	(*wrapperspb.Int64Value)(nil),  // 8: google.protobuf.Int64Value
	(*wrapperspb.UInt32Value)(nil), // 9: google.protobuf.UInt32Value
	(*wrapperspb.UInt64Value)(nil), // 10: google.protobuf.UInt64Value
	(*wrapperspb.FloatValue)(nil),  // 11: google.protobuf.FloatValue
	(*wrapperspb.DoubleValue)(nil), // 12: google.protobuf.DoubleValue
	(*wrapperspb.StringValue)(nil), // 13: google.protobuf.StringValue
	(*wrapperspb.BytesValue)(nil),  // 14: google.protobuf.BytesValue
	(*structpb.Struct)(nil),        // 15: google.protobuf.Struct
	(*structpb.ListValue)(nil),     // 16: google.protobuf.ListValue
	(*structpb.Value)(nil),         // 17: google.protobuf.Value
	(*anypb.Any)(nil),              // 18: google.protobuf.Any
}
var file_well_known_proto_depIdxs = []int32{
	2,  // 0: well_known.Holder.empty:type_name -> google.protobuf.Empty
	3,  // 1: well_known.Holder.timestamp:type_name -> google.protobuf.Timestamp
	4,  // 2: well_known.Holder.duration:type_name -> google.protobuf.Duration
	5,  // 3: well_known.Holder.field_mask:type_name -> google.protobuf.FieldMask
	6,  // 4: well_known.Holder.bool_value:type_name -> google.protobuf.BoolValue
	7,  // 5: well_known.Holder.int32_value:type_name -> google.protobuf.Int32Value
	8,  // 6: well_known.Holder.int64_value:type_name -> google.protobuf.Int64Value
	9,  // 7: well_known.Holder.uint32_value:type_name -> google.protobuf.UInt32Value
	10, // 8: well_known.Holder.uint64_value:type_name -> google.protobuf.UInt64Value
	11, // 9: well_known.Holder.float_value:type_name -> google.protobuf.FloatValue
	12, // 10: well_known.Holder.double_value:type_name -> google.protobuf.DoubleValue
	13, // 11: well_known.Holder.string_value:type_name -> google.protobuf.StringValue
	14, // 12: well_known.Holder.bytes_value:type_name -> google.protobuf.BytesValue
	15, // 13: well_known.Holder.struct:type_name -> google.protobuf.Struct
	16, // 14: well_known.Holder.list_value:type_name -> google.protobuf.ListValue
	17, // 15: well_known.Holder.value:type_name -> google.protobuf.Value
	18, // 16: well_known.Holder.any:type_name -> google.protobuf.Any
	2,  // 17: well_known.OneOfHolder.empty:type_name -> google.protobuf.Empty
	3,  // 18: well_known.OneOfHolder.timestamp:type_name -> google.protobuf.Timestamp
	4,  // 19: well_known.OneOfHolder.duration:type_name -> google.protobuf.Duration
	5,  // 20: well_known.OneOfHolder.field_mask:type_name -> google.protobuf.FieldMask
	6,  // 21: well_known.OneOfHolder.bool_value:type_name -> google.protobuf.BoolValue
	7,  // 22: well_known.OneOfHolder.int32_value:type_name -> google.protobuf.Int32Value
	8,  // 23: well_known.OneOfHolder.int64_value:type_name -> google.protobuf.Int64Value
	9,  // 24: well_known.OneOfHolder.uint32_value:type_name -> google.protobuf.UInt32Value
	10, // 25: well_known.OneOfHolder.uint64_value:type_name -> google.protobuf.UInt64Value
	11, // 26: well_known.OneOfHolder.float_value:type_name -> google.protobuf.FloatValue
	12, // 27: well_known.OneOfHolder.double_value:type_name -> google.protobuf.DoubleValue
	13, // 28: well_known.OneOfHolder.string_value:type_name -> google.protobuf.StringValue
	14, // 29: well_known.OneOfHolder.bytes_value:type_name -> google.protobuf.BytesValue
	15, // 30: well_known.OneOfHolder.struct:type_name -> google.protobuf.Struct
	16, // 31: well_known.OneOfHolder.list_value:type_name -> google.protobuf.ListValue
	17, // 32: well_known.OneOfHolder.value:type_name -> google.protobuf.Value
	18, // 33: well_known.OneOfHolder.any:type_name -> google.protobuf.Any
	34, // [34:34] is the sub-list for method output_type
	34, // [34:34] is the sub-list for method input_type
	34, // [34:34] is the sub-list for extension type_name
	34, // [34:34] is the sub-list for extension extendee
	0,  // [0:34] is the sub-list for field type_name
}

func init() { file_well_known_proto_init() }
func file_well_known_proto_init() {
	if File_well_known_proto != nil {
		return
	}
	file_well_known_proto_msgTypes[1].OneofWrappers = []any{
		(*OneOfHolder_Empty)(nil),
		(*OneOfHolder_Timestamp)(nil),
		(*OneOfHolder_Duration)(nil),
		(*OneOfHolder_FieldMask)(nil),
		(*OneOfHolder_BoolValue)(nil),
		(*OneOfHolder_Int32Value)(nil),
		(*OneOfHolder_Int64Value)(nil),
		(*OneOfHolder_Uint32Value)(nil),
		(*OneOfHolder_Uint64Value)(nil),
		(*OneOfHolder_FloatValue)(nil),
		(*OneOfHolder_DoubleValue)(nil),
		(*OneOfHolder_StringValue)(nil),
		(*OneOfHolder_BytesValue)(nil),
		(*OneOfHolder_Struct)(nil),
		(*OneOfHolder_ListValue)(nil),
		(*OneOfHolder_Value)(nil),
		(*OneOfHolder_Any)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_well_known_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   2,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_well_known_proto_goTypes,
		DependencyIndexes: file_well_known_proto_depIdxs,
		MessageInfos:      file_well_known_proto_msgTypes,
	}.Build()
	File_well_known_proto = out.File
	file_well_known_proto_rawDesc = nil
	file_well_known_proto_goTypes = nil
	file_well_known_proto_depIdxs = nil
}
