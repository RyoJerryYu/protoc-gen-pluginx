package simple

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func TestSetters(t *testing.T) {
	msg := &ABitOfEverything{}

	msg.SetSingleNested(&ABitOfEverything_Nested{Name: "nested"})
	assert.Equal(t, "nested", msg.SingleNested.Name)

	msg.SetUuid("uuid")
	assert.Equal(t, "uuid", msg.Uuid)

	msg.SetNested([]*ABitOfEverything_Nested{{Name: "nested1"}, {Name: "nested2"}})
	assert.Equal(t, 2, len(msg.Nested))
	assert.Equal(t, "nested1", msg.Nested[0].Name)
	assert.Equal(t, "nested2", msg.Nested[1].Name)

	msg.SetFloatValue(1.23)
	assert.Equal(t, float32(1.23), msg.FloatValue)

	msg.SetDoubleValue(4.56)
	assert.Equal(t, float64(4.56), msg.DoubleValue)

	msg.SetInt64Value(123)
	assert.Equal(t, int64(123), msg.Int64Value)

	msg.SetUint64Value(456)
	assert.Equal(t, uint64(456), msg.Uint64Value)

	msg.SetInt32Value(789)
	assert.Equal(t, int32(789), msg.Int32Value)

	msg.SetFixed64Value(101112)
	assert.Equal(t, uint64(101112), msg.Fixed64Value)

	msg.SetFixed32Value(131415)
	assert.Equal(t, uint32(131415), msg.Fixed32Value)

	msg.SetBoolValue(true)
	assert.Equal(t, true, msg.BoolValue)

	msg.SetStringValue("string")
	assert.Equal(t, "string", msg.StringValue)

	msg.SetBytesValue([]byte("bytes"))
	assert.Equal(t, "bytes", string(msg.BytesValue))

	msg.SetUint32Value(161718)
	assert.Equal(t, uint32(161718), msg.Uint32Value)

	msg.SetEnumValue(NumericEnum_ONE)
	assert.Equal(t, NumericEnum_ONE, msg.EnumValue)

	msg.SetPathEnumValue(PathEnum_ABC)
	assert.Equal(t, PathEnum_ABC, msg.PathEnumValue)

	msg.SetNestedPathEnumValue(MessagePathEnum_NestedPathEnum(MessagePathEnum_GHI))
	assert.Equal(t, MessagePathEnum_GHI, msg.NestedPathEnumValue)

	msg.SetSfixed32Value(192021)
	assert.Equal(t, int32(192021), msg.Sfixed32Value)

	msg.SetSfixed64Value(222324)
	assert.Equal(t, int64(222324), msg.Sfixed64Value)

	msg.SetSint32Value(252627)
	assert.Equal(t, int32(252627), msg.Sint32Value)

	msg.SetSint64Value(282930)
	assert.Equal(t, int64(282930), msg.Sint64Value)

	msg.SetRepeatedStringValue([]string{"one", "two"})
	assert.Equal(t, 2, len(msg.RepeatedStringValue))
	assert.Equal(t, "one", msg.RepeatedStringValue[0])
	assert.Equal(t, "two", msg.RepeatedStringValue[1])

	msg.SetOneofEmpty(&emptypb.Empty{})
	_, ok := msg.OneofValue.(*ABitOfEverything_OneofEmpty)
	assert.Equal(t, true, ok)

	msg.SetOneofString("oneof string")
	oneofString, ok := msg.OneofValue.(*ABitOfEverything_OneofString)
	assert.Equal(t, true, ok)
	assert.Equal(t, "oneof string", oneofString.OneofString)

	msg.SetMapValue(map[string]NumericEnum{"key": NumericEnum_ZERO})
	assert.Equal(t, 1, len(msg.MapValue))
	assert.Equal(t, NumericEnum_ZERO, msg.MapValue["key"])

	msg.SetMappedStringValue(map[string]string{"key": "value"})
	assert.Equal(t, 1, len(msg.MappedStringValue))
	assert.Equal(t, "value", msg.MappedStringValue["key"])

	msg.SetMappedNestedValue(map[string]*ABitOfEverything_Nested{"key": {Name: "nested"}})
	assert.Equal(t, 1, len(msg.MappedNestedValue))
	assert.Equal(t, "nested", msg.MappedNestedValue["key"].Name)

	msg.SetNonConventionalNameValue("non conventional")
	assert.Equal(t, "non conventional", msg.NonConventionalNameValue)

	timestamp := timestamppb.New(time.Now())
	msg.SetTimestampValue(timestamp)
	assert.Equal(t, timestamp, msg.TimestampValue)

	msg.SetRepeatedEnumValue([]NumericEnum{NumericEnum_ONE, NumericEnum_ZERO})
	assert.Equal(t, 2, len(msg.RepeatedEnumValue))
	assert.Equal(t, NumericEnum_ONE, msg.RepeatedEnumValue[0])
	assert.Equal(t, NumericEnum_ZERO, msg.RepeatedEnumValue[1])

	msg.SetRepeatedEnumAnnotation([]NumericEnum{NumericEnum_ONE, NumericEnum_ZERO})
	assert.Equal(t, 2, len(msg.RepeatedEnumAnnotation))
	assert.Equal(t, NumericEnum_ONE, msg.RepeatedEnumAnnotation[0])
	assert.Equal(t, NumericEnum_ZERO, msg.RepeatedEnumAnnotation[1])

	msg.SetEnumValueAnnotation(NumericEnum_ONE)
	assert.Equal(t, NumericEnum_ONE, msg.EnumValueAnnotation)

	msg.SetRepeatedStringAnnotation([]string{"one", "two"})
	assert.Equal(t, 2, len(msg.RepeatedStringAnnotation))
	assert.Equal(t, "one", msg.RepeatedStringAnnotation[0])
	assert.Equal(t, "two", msg.RepeatedStringAnnotation[1])

	msg.SetRepeatedNestedAnnotation([]*ABitOfEverything_Nested{{Name: "nested1"}, {Name: "nested2"}})
	assert.Equal(t, 2, len(msg.RepeatedNestedAnnotation))
	assert.Equal(t, "nested1", msg.RepeatedNestedAnnotation[0].Name)
	assert.Equal(t, "nested2", msg.RepeatedNestedAnnotation[1].Name)

	msg.SetNestedAnnotation(&ABitOfEverything_Nested{Name: "nested"})
	assert.Equal(t, "nested", msg.NestedAnnotation.Name)

	msg.SetInt64OverrideType(313233)
	assert.Equal(t, int64(313233), msg.Int64OverrideType)

	msg.SetRequiredStringViaFieldBehaviorAnnotation("required string")
	assert.Equal(t, "required string", msg.RequiredStringViaFieldBehaviorAnnotation)

	msg.SetOutputOnlyStringViaFieldBehaviorAnnotation("output only string")
	assert.Equal(t, "output only string", msg.OutputOnlyStringViaFieldBehaviorAnnotation)

	optionalString := "optional string"
	msg.SetOptionalStringValue(&optionalString)
	assert.Equal(t, "optional string", *msg.OptionalStringValue)

	msg.SetProductId([]string{"product1", "product2"})
	assert.Equal(t, 2, len(msg.ProductId))
	assert.Equal(t, "product1", msg.ProductId[0])
	assert.Equal(t, "product2", msg.ProductId[1])

	msg.SetOptionalStringField("optional string field")
	assert.Equal(t, "optional string field", msg.OptionalStringField)

	msg.SetRequiredStringField_1("required string field 1")
	assert.Equal(t, "required string field 1", msg.RequiredStringField_1)

	msg.SetRequiredStringField_2("required string field 2")
	assert.Equal(t, "required string field 2", msg.RequiredStringField_2)

	msg.SetRequiredFieldBehaviorJsonName("required field behavior json name")
	assert.Equal(t, "required field behavior json name", msg.RequiredFieldBehaviorJsonName)

	msg.SetRequiredFieldSchemaJsonName("required field schema json name")
	assert.Equal(t, "required field schema json name", msg.RequiredFieldSchemaJsonName)

	msg.SetTrailingOnly("trailing only")
	assert.Equal(t, "trailing only", msg.TrailingOnly)

	msg.SetTrailingOnlyDot("trailing only dot")
	assert.Equal(t, "trailing only dot", msg.TrailingOnlyDot)

	msg.SetTrailingBoth("trailing both")
	assert.Equal(t, "trailing both", msg.TrailingBoth)

	msg.SetTrailingMultiline("trailing multiline")
	assert.Equal(t, "trailing multiline", msg.TrailingMultiline)

	msg.SetUuids([]string{"uuid1", "uuid2"})
	assert.Equal(t, 2, len(msg.Uuids))
	assert.Equal(t, "uuid1", msg.Uuids[0])
	assert.Equal(t, "uuid2", msg.Uuids[1])

	nestedMsg := &ABitOfEverything_Nested{}
	nestedMsg.SetName("nested name")
	assert.Equal(t, "nested name", nestedMsg.Name)

	nestedMsg.SetAmount(12345)
	assert.Equal(t, uint32(12345), nestedMsg.Amount)

	nestedMsg.SetOk(ABitOfEverything_Nested_TRUE)
	assert.Equal(t, ABitOfEverything_Nested_TRUE, nestedMsg.Ok)

	repeatedMsg := &ABitOfEverythingRepeated{}
	repeatedMsg.SetPathRepeatedFloatValue([]float32{1.1, 2.2})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedFloatValue))
	assert.Equal(t, float32(1.1), repeatedMsg.PathRepeatedFloatValue[0])
	assert.Equal(t, float32(2.2), repeatedMsg.PathRepeatedFloatValue[1])

	repeatedMsg.SetPathRepeatedDoubleValue([]float64{3.3, 4.4})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedDoubleValue))
	assert.Equal(t, float64(3.3), repeatedMsg.PathRepeatedDoubleValue[0])
	assert.Equal(t, float64(4.4), repeatedMsg.PathRepeatedDoubleValue[1])

	repeatedMsg.SetPathRepeatedInt64Value([]int64{5, 6})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedInt64Value))
	assert.Equal(t, int64(5), repeatedMsg.PathRepeatedInt64Value[0])
	assert.Equal(t, int64(6), repeatedMsg.PathRepeatedInt64Value[1])

	repeatedMsg.SetPathRepeatedUint64Value([]uint64{7, 8})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedUint64Value))
	assert.Equal(t, uint64(7), repeatedMsg.PathRepeatedUint64Value[0])
	assert.Equal(t, uint64(8), repeatedMsg.PathRepeatedUint64Value[1])

	repeatedMsg.SetPathRepeatedInt32Value([]int32{9, 10})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedInt32Value))
	assert.Equal(t, int32(9), repeatedMsg.PathRepeatedInt32Value[0])
	assert.Equal(t, int32(10), repeatedMsg.PathRepeatedInt32Value[1])

	repeatedMsg.SetPathRepeatedFixed64Value([]uint64{11, 12})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedFixed64Value))
	assert.Equal(t, uint64(11), repeatedMsg.PathRepeatedFixed64Value[0])
	assert.Equal(t, uint64(12), repeatedMsg.PathRepeatedFixed64Value[1])

	repeatedMsg.SetPathRepeatedFixed32Value([]uint32{13, 14})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedFixed32Value))
	assert.Equal(t, uint32(13), repeatedMsg.PathRepeatedFixed32Value[0])
	assert.Equal(t, uint32(14), repeatedMsg.PathRepeatedFixed32Value[1])

	repeatedMsg.SetPathRepeatedBoolValue([]bool{true, false})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedBoolValue))
	assert.Equal(t, true, repeatedMsg.PathRepeatedBoolValue[0])
	assert.Equal(t, false, repeatedMsg.PathRepeatedBoolValue[1])

	repeatedMsg.SetPathRepeatedStringValue([]string{"one", "two"})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedStringValue))
	assert.Equal(t, "one", repeatedMsg.PathRepeatedStringValue[0])
	assert.Equal(t, "two", repeatedMsg.PathRepeatedStringValue[1])

	repeatedMsg.SetPathRepeatedBytesValue([][]byte{[]byte("one"), []byte("two")})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedBytesValue))
	assert.Equal(t, "one", string(repeatedMsg.PathRepeatedBytesValue[0]))
	assert.Equal(t, "two", string(repeatedMsg.PathRepeatedBytesValue[1]))

	repeatedMsg.SetPathRepeatedUint32Value([]uint32{15, 16})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedUint32Value))
	assert.Equal(t, uint32(15), repeatedMsg.PathRepeatedUint32Value[0])
	assert.Equal(t, uint32(16), repeatedMsg.PathRepeatedUint32Value[1])

	repeatedMsg.SetPathRepeatedEnumValue([]NumericEnum{NumericEnum_ONE, NumericEnum_ZERO})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedEnumValue))
	assert.Equal(t, NumericEnum_ONE, repeatedMsg.PathRepeatedEnumValue[0])
	assert.Equal(t, NumericEnum_ZERO, repeatedMsg.PathRepeatedEnumValue[1])

	repeatedMsg.SetPathRepeatedSfixed32Value([]int32{17, 18})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedSfixed32Value))
	assert.Equal(t, int32(17), repeatedMsg.PathRepeatedSfixed32Value[0])
	assert.Equal(t, int32(18), repeatedMsg.PathRepeatedSfixed32Value[1])

	repeatedMsg.SetPathRepeatedSfixed64Value([]int64{19, 20})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedSfixed64Value))
	assert.Equal(t, int64(19), repeatedMsg.PathRepeatedSfixed64Value[0])
	assert.Equal(t, int64(20), repeatedMsg.PathRepeatedSfixed64Value[1])

	repeatedMsg.SetPathRepeatedSint32Value([]int32{21, 22})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedSint32Value))
	assert.Equal(t, int32(21), repeatedMsg.PathRepeatedSint32Value[0])
	assert.Equal(t, int32(22), repeatedMsg.PathRepeatedSint32Value[1])

	repeatedMsg.SetPathRepeatedSint64Value([]int64{23, 24})
	assert.Equal(t, 2, len(repeatedMsg.PathRepeatedSint64Value))
	assert.Equal(t, int64(23), repeatedMsg.PathRepeatedSint64Value[0])
	assert.Equal(t, int64(24), repeatedMsg.PathRepeatedSint64Value[1])
}
