//Code generated by protoc-gen-go-setter. DO NOT EDIT.
//versions:
//- protoc-gen-go-setter v1.0.34
//- protoc (unknown)
//source: simple_messages.proto

package simple

import (
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
)

// SetValue sets the value of the field Value
func (msg *MessageWithPathEnum) SetValue(v PathEnum) {
	msg.Value = v
}

// SetValue sets the value of the field Value
func (msg *MessageWithNestedPathEnum) SetValue(v MessagePathEnum_NestedPathEnum) {
	msg.Value = v
}

// SetSingleNested sets the value of the field SingleNested
func (msg *ABitOfEverything) SetSingleNested(v *ABitOfEverything_Nested) {
	msg.SingleNested = v
}

// SetUuid sets the value of the field Uuid
func (msg *ABitOfEverything) SetUuid(v string) {
	msg.Uuid = v
}

// SetNested sets the value of the field Nested
func (msg *ABitOfEverything) SetNested(v []*ABitOfEverything_Nested) {
	msg.Nested = v
}

// SetFloatValue sets the value of the field FloatValue
func (msg *ABitOfEverything) SetFloatValue(v float32) {
	msg.FloatValue = v
}

// SetDoubleValue sets the value of the field DoubleValue
func (msg *ABitOfEverything) SetDoubleValue(v float64) {
	msg.DoubleValue = v
}

// SetInt64Value sets the value of the field Int64Value
func (msg *ABitOfEverything) SetInt64Value(v int64) {
	msg.Int64Value = v
}

// SetUint64Value sets the value of the field Uint64Value
func (msg *ABitOfEverything) SetUint64Value(v uint64) {
	msg.Uint64Value = v
}

// SetInt32Value sets the value of the field Int32Value
func (msg *ABitOfEverything) SetInt32Value(v int32) {
	msg.Int32Value = v
}

// SetFixed64Value sets the value of the field Fixed64Value
func (msg *ABitOfEverything) SetFixed64Value(v uint64) {
	msg.Fixed64Value = v
}

// SetFixed32Value sets the value of the field Fixed32Value
func (msg *ABitOfEverything) SetFixed32Value(v uint32) {
	msg.Fixed32Value = v
}

// SetBoolValue sets the value of the field BoolValue
func (msg *ABitOfEverything) SetBoolValue(v bool) {
	msg.BoolValue = v
}

// SetStringValue sets the value of the field StringValue
func (msg *ABitOfEverything) SetStringValue(v string) {
	msg.StringValue = v
}

// SetBytesValue sets the value of the field BytesValue
func (msg *ABitOfEverything) SetBytesValue(v []byte) {
	msg.BytesValue = v
}

// SetUint32Value sets the value of the field Uint32Value
func (msg *ABitOfEverything) SetUint32Value(v uint32) {
	msg.Uint32Value = v
}

// SetEnumValue sets the value of the field EnumValue
func (msg *ABitOfEverything) SetEnumValue(v NumericEnum) {
	msg.EnumValue = v
}

// SetPathEnumValue sets the value of the field PathEnumValue
func (msg *ABitOfEverything) SetPathEnumValue(v PathEnum) {
	msg.PathEnumValue = v
}

// SetNestedPathEnumValue sets the value of the field NestedPathEnumValue
func (msg *ABitOfEverything) SetNestedPathEnumValue(v MessagePathEnum_NestedPathEnum) {
	msg.NestedPathEnumValue = v
}

// SetSfixed32Value sets the value of the field Sfixed32Value
func (msg *ABitOfEverything) SetSfixed32Value(v int32) {
	msg.Sfixed32Value = v
}

// SetSfixed64Value sets the value of the field Sfixed64Value
func (msg *ABitOfEverything) SetSfixed64Value(v int64) {
	msg.Sfixed64Value = v
}

// SetSint32Value sets the value of the field Sint32Value
func (msg *ABitOfEverything) SetSint32Value(v int32) {
	msg.Sint32Value = v
}

// SetSint64Value sets the value of the field Sint64Value
func (msg *ABitOfEverything) SetSint64Value(v int64) {
	msg.Sint64Value = v
}

// SetRepeatedStringValue sets the value of the field RepeatedStringValue
func (msg *ABitOfEverything) SetRepeatedStringValue(v []string) {
	msg.RepeatedStringValue = v
}

// Types that are assignable to OneofValue:
//
//	*ABitOfEverything_OneofEmpty
//	*ABitOfEverything_OneofString
func (msg *ABitOfEverything) SetOneofValue(v isABitOfEverything_OneofValue) {
	msg.OneofValue = v
}

// SetOneofEmpty sets the value of the field OneofEmpty
func (msg *ABitOfEverything) SetOneofEmpty(v *emptypb.Empty) {
	msg.SetOneofValue(&ABitOfEverything_OneofEmpty{
		OneofEmpty: v,
	})
}

// SetOneofString sets the value of the field OneofString
func (msg *ABitOfEverything) SetOneofString(v string) {
	msg.SetOneofValue(&ABitOfEverything_OneofString{
		OneofString: v,
	})
}

// SetMapValue sets the value of the field MapValue
func (msg *ABitOfEverything) SetMapValue(v map[string]NumericEnum) {
	msg.MapValue = v
}

// SetMappedStringValue sets the value of the field MappedStringValue
func (msg *ABitOfEverything) SetMappedStringValue(v map[string]string) {
	msg.MappedStringValue = v
}

// SetMappedNestedValue sets the value of the field MappedNestedValue
func (msg *ABitOfEverything) SetMappedNestedValue(v map[string]*ABitOfEverything_Nested) {
	msg.MappedNestedValue = v
}

// SetNonConventionalNameValue sets the value of the field NonConventionalNameValue
func (msg *ABitOfEverything) SetNonConventionalNameValue(v string) {
	msg.NonConventionalNameValue = v
}

// SetTimestampValue sets the value of the field TimestampValue
func (msg *ABitOfEverything) SetTimestampValue(v *timestamppb.Timestamp) {
	msg.TimestampValue = v
}

// SetRepeatedEnumValue sets the value of the field RepeatedEnumValue
func (msg *ABitOfEverything) SetRepeatedEnumValue(v []NumericEnum) {
	msg.RepeatedEnumValue = v
}

// SetRepeatedEnumAnnotation sets the value of the field RepeatedEnumAnnotation
func (msg *ABitOfEverything) SetRepeatedEnumAnnotation(v []NumericEnum) {
	msg.RepeatedEnumAnnotation = v
}

// SetEnumValueAnnotation sets the value of the field EnumValueAnnotation
func (msg *ABitOfEverything) SetEnumValueAnnotation(v NumericEnum) {
	msg.EnumValueAnnotation = v
}

// SetRepeatedStringAnnotation sets the value of the field RepeatedStringAnnotation
func (msg *ABitOfEverything) SetRepeatedStringAnnotation(v []string) {
	msg.RepeatedStringAnnotation = v
}

// SetRepeatedNestedAnnotation sets the value of the field RepeatedNestedAnnotation
func (msg *ABitOfEverything) SetRepeatedNestedAnnotation(v []*ABitOfEverything_Nested) {
	msg.RepeatedNestedAnnotation = v
}

// SetNestedAnnotation sets the value of the field NestedAnnotation
func (msg *ABitOfEverything) SetNestedAnnotation(v *ABitOfEverything_Nested) {
	msg.NestedAnnotation = v
}

// SetInt64OverrideType sets the value of the field Int64OverrideType
func (msg *ABitOfEverything) SetInt64OverrideType(v int64) {
	msg.Int64OverrideType = v
}

// SetRequiredStringViaFieldBehaviorAnnotation sets the value of the field RequiredStringViaFieldBehaviorAnnotation
func (msg *ABitOfEverything) SetRequiredStringViaFieldBehaviorAnnotation(v string) {
	msg.RequiredStringViaFieldBehaviorAnnotation = v
}

// SetOutputOnlyStringViaFieldBehaviorAnnotation sets the value of the field OutputOnlyStringViaFieldBehaviorAnnotation
func (msg *ABitOfEverything) SetOutputOnlyStringViaFieldBehaviorAnnotation(v string) {
	msg.OutputOnlyStringViaFieldBehaviorAnnotation = v
}

// SetOptionalStringValue sets the value of the field OptionalStringValue
func (msg *ABitOfEverything) SetOptionalStringValue(v *string) {
	msg.OptionalStringValue = v
}

// SetProductId sets the value of the field ProductId
func (msg *ABitOfEverything) SetProductId(v []string) {
	msg.ProductId = v
}

// SetOptionalStringField sets the value of the field OptionalStringField
func (msg *ABitOfEverything) SetOptionalStringField(v string) {
	msg.OptionalStringField = v
}

// SetRequiredStringField_1 sets the value of the field RequiredStringField_1
func (msg *ABitOfEverything) SetRequiredStringField_1(v string) {
	msg.RequiredStringField_1 = v
}

// SetRequiredStringField_2 sets the value of the field RequiredStringField_2
func (msg *ABitOfEverything) SetRequiredStringField_2(v string) {
	msg.RequiredStringField_2 = v
}

// SetRequiredFieldBehaviorJsonName sets the value of the field RequiredFieldBehaviorJsonName
func (msg *ABitOfEverything) SetRequiredFieldBehaviorJsonName(v string) {
	msg.RequiredFieldBehaviorJsonName = v
}

// SetRequiredFieldSchemaJsonName sets the value of the field RequiredFieldSchemaJsonName
func (msg *ABitOfEverything) SetRequiredFieldSchemaJsonName(v string) {
	msg.RequiredFieldSchemaJsonName = v
}

// SetTrailingOnly sets the value of the field TrailingOnly
func (msg *ABitOfEverything) SetTrailingOnly(v string) {
	msg.TrailingOnly = v
}

// SetTrailingOnlyDot sets the value of the field TrailingOnlyDot
func (msg *ABitOfEverything) SetTrailingOnlyDot(v string) {
	msg.TrailingOnlyDot = v
}

// SetTrailingBoth sets the value of the field TrailingBoth
func (msg *ABitOfEverything) SetTrailingBoth(v string) {
	msg.TrailingBoth = v
}

// SetTrailingMultiline sets the value of the field TrailingMultiline
func (msg *ABitOfEverything) SetTrailingMultiline(v string) {
	msg.TrailingMultiline = v
}

// SetUuids sets the value of the field Uuids
func (msg *ABitOfEverything) SetUuids(v []string) {
	msg.Uuids = v
}

// SetName sets the value of the field Name
func (msg *ABitOfEverything_Nested) SetName(v string) {
	msg.Name = v
}

// SetAmount sets the value of the field Amount
func (msg *ABitOfEverything_Nested) SetAmount(v uint32) {
	msg.Amount = v
}

// SetOk sets the value of the field Ok
func (msg *ABitOfEverything_Nested) SetOk(v ABitOfEverything_Nested_DeepEnum) {
	msg.Ok = v
}

// SetPathRepeatedFloatValue sets the value of the field PathRepeatedFloatValue
func (msg *ABitOfEverythingRepeated) SetPathRepeatedFloatValue(v []float32) {
	msg.PathRepeatedFloatValue = v
}

// SetPathRepeatedDoubleValue sets the value of the field PathRepeatedDoubleValue
func (msg *ABitOfEverythingRepeated) SetPathRepeatedDoubleValue(v []float64) {
	msg.PathRepeatedDoubleValue = v
}

// SetPathRepeatedInt64Value sets the value of the field PathRepeatedInt64Value
func (msg *ABitOfEverythingRepeated) SetPathRepeatedInt64Value(v []int64) {
	msg.PathRepeatedInt64Value = v
}

// SetPathRepeatedUint64Value sets the value of the field PathRepeatedUint64Value
func (msg *ABitOfEverythingRepeated) SetPathRepeatedUint64Value(v []uint64) {
	msg.PathRepeatedUint64Value = v
}

// SetPathRepeatedInt32Value sets the value of the field PathRepeatedInt32Value
func (msg *ABitOfEverythingRepeated) SetPathRepeatedInt32Value(v []int32) {
	msg.PathRepeatedInt32Value = v
}

// SetPathRepeatedFixed64Value sets the value of the field PathRepeatedFixed64Value
func (msg *ABitOfEverythingRepeated) SetPathRepeatedFixed64Value(v []uint64) {
	msg.PathRepeatedFixed64Value = v
}

// SetPathRepeatedFixed32Value sets the value of the field PathRepeatedFixed32Value
func (msg *ABitOfEverythingRepeated) SetPathRepeatedFixed32Value(v []uint32) {
	msg.PathRepeatedFixed32Value = v
}

// SetPathRepeatedBoolValue sets the value of the field PathRepeatedBoolValue
func (msg *ABitOfEverythingRepeated) SetPathRepeatedBoolValue(v []bool) {
	msg.PathRepeatedBoolValue = v
}

// SetPathRepeatedStringValue sets the value of the field PathRepeatedStringValue
func (msg *ABitOfEverythingRepeated) SetPathRepeatedStringValue(v []string) {
	msg.PathRepeatedStringValue = v
}

// SetPathRepeatedBytesValue sets the value of the field PathRepeatedBytesValue
func (msg *ABitOfEverythingRepeated) SetPathRepeatedBytesValue(v [][]byte) {
	msg.PathRepeatedBytesValue = v
}

// SetPathRepeatedUint32Value sets the value of the field PathRepeatedUint32Value
func (msg *ABitOfEverythingRepeated) SetPathRepeatedUint32Value(v []uint32) {
	msg.PathRepeatedUint32Value = v
}

// SetPathRepeatedEnumValue sets the value of the field PathRepeatedEnumValue
func (msg *ABitOfEverythingRepeated) SetPathRepeatedEnumValue(v []NumericEnum) {
	msg.PathRepeatedEnumValue = v
}

// SetPathRepeatedSfixed32Value sets the value of the field PathRepeatedSfixed32Value
func (msg *ABitOfEverythingRepeated) SetPathRepeatedSfixed32Value(v []int32) {
	msg.PathRepeatedSfixed32Value = v
}

// SetPathRepeatedSfixed64Value sets the value of the field PathRepeatedSfixed64Value
func (msg *ABitOfEverythingRepeated) SetPathRepeatedSfixed64Value(v []int64) {
	msg.PathRepeatedSfixed64Value = v
}

// SetPathRepeatedSint32Value sets the value of the field PathRepeatedSint32Value
func (msg *ABitOfEverythingRepeated) SetPathRepeatedSint32Value(v []int32) {
	msg.PathRepeatedSint32Value = v
}

// SetPathRepeatedSint64Value sets the value of the field PathRepeatedSint64Value
func (msg *ABitOfEverythingRepeated) SetPathRepeatedSint64Value(v []int64) {
	msg.PathRepeatedSint64Value = v
}
