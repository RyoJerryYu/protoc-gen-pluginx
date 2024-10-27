package protobufx

import (
	"google.golang.org/protobuf/reflect/protoreflect"
)

const (
	GoogleProtobuf_package protoreflect.FullName = "google.protobuf"
	GoogleApi_package      protoreflect.FullName = "google.api"
)

const (
	Any_message_name         protoreflect.Name = "Any"
	Timestamp_message_name   protoreflect.Name = "Timestamp"
	Duration_message_name    protoreflect.Name = "Duration"
	BoolValue_message_name   protoreflect.Name = "BoolValue"
	Int32Value_message_name  protoreflect.Name = "Int32Value"
	Int64Value_message_name  protoreflect.Name = "Int64Value"
	UInt32Value_message_name protoreflect.Name = "UInt32Value"
	UInt64Value_message_name protoreflect.Name = "UInt64Value"
	FloatValue_message_name  protoreflect.Name = "FloatValue"
	DoubleValue_message_name protoreflect.Name = "DoubleValue"
	StringValue_message_name protoreflect.Name = "StringValue"
	BytesValue_message_name  protoreflect.Name = "BytesValue"
	Struct_message_name      protoreflect.Name = "Struct"
	ListValue_message_name   protoreflect.Name = "ListValue"
	Value_message_name       protoreflect.Name = "Value"
	FieldMask_message_name   protoreflect.Name = "FieldMask"
	Empty_message_name       protoreflect.Name = "Empty"
)

const (
	Any_message_fullname         protoreflect.FullName = "google.protobuf.Any"
	Timestamp_message_fullname   protoreflect.FullName = "google.protobuf.Timestamp"
	Duration_message_fullname    protoreflect.FullName = "google.protobuf.Duration"
	BoolValue_message_fullname   protoreflect.FullName = "google.protobuf.BoolValue"
	Int32Value_message_fullname  protoreflect.FullName = "google.protobuf.Int32Value"
	Int64Value_message_fullname  protoreflect.FullName = "google.protobuf.Int64Value"
	UInt32Value_message_fullname protoreflect.FullName = "google.protobuf.UInt32Value"
	UInt64Value_message_fullname protoreflect.FullName = "google.protobuf.UInt64Value"
	FloatValue_message_fullname  protoreflect.FullName = "google.protobuf.FloatValue"
	DoubleValue_message_fullname protoreflect.FullName = "google.protobuf.DoubleValue"
	StringValue_message_fullname protoreflect.FullName = "google.protobuf.StringValue"
	BytesValue_message_fullname  protoreflect.FullName = "google.protobuf.BytesValue"
	Struct_message_fullname      protoreflect.FullName = "google.protobuf.Struct"
	ListValue_message_fullname   protoreflect.FullName = "google.protobuf.ListValue"
	Value_message_fullname       protoreflect.FullName = "google.protobuf.Value"
	FieldMask_message_fullname   protoreflect.FullName = "google.protobuf.FieldMask"
	Empty_message_fullname       protoreflect.FullName = "google.protobuf.Empty"
)

func IsWellKnownType(f protoreflect.MessageDescriptor) bool {
	fullName := f.FullName()
	if fullName.Parent() != GoogleProtobuf_package {
		return false
	}

	switch fullName.Name() {
	case Any_message_name,
		Timestamp_message_name,
		Duration_message_name,
		BoolValue_message_name,
		Int32Value_message_name,
		Int64Value_message_name,
		UInt32Value_message_name,
		UInt64Value_message_name,
		FloatValue_message_name,
		DoubleValue_message_name,
		StringValue_message_name,
		BytesValue_message_name,
		Struct_message_name,
		ListValue_message_name,
		Value_message_name,
		FieldMask_message_name,
		Empty_message_name:
		return true
	default:
		return false
	}
}
