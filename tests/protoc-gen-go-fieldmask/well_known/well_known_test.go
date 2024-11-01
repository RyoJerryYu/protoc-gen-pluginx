package well_known

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"google.golang.org/protobuf/types/known/anypb"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
	structpb "google.golang.org/protobuf/types/known/structpb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func TestHolder(t *testing.T) {
	i := Holder{
		Empty:       &emptypb.Empty{},
		Timestamp:   &timestamppb.Timestamp{},
		Duration:    &durationpb.Duration{},
		FieldMask:   &fieldmaskpb.FieldMask{},
		BoolValue:   &wrapperspb.BoolValue{},
		Int32Value:  &wrapperspb.Int32Value{},
		Int64Value:  &wrapperspb.Int64Value{},
		Uint32Value: &wrapperspb.UInt32Value{},
		Uint64Value: &wrapperspb.UInt64Value{},
		FloatValue:  &wrapperspb.FloatValue{},
		DoubleValue: &wrapperspb.DoubleValue{},
		StringValue: &wrapperspb.StringValue{},
		BytesValue:  &wrapperspb.BytesValue{},
		Struct:      &structpb.Struct{},
		ListValue:   &structpb.ListValue{},
		Value:       &structpb.Value{},
		Any:         &anypb.Any{},
	}
	b := i.PathBuilder()
	assert.Equal(t, "", b.String())
	assert.Equal(t, "empty", b.Empty().String())
	assert.Equal(t, "timestamp", b.Timestamp().String())
	assert.Equal(t, "timestamp.nanos", b.Timestamp().Nanos().String())
	assert.Equal(t, "timestamp.seconds", b.Timestamp().Seconds().String())
	assert.Equal(t, "duration", b.Duration().String())
	assert.Equal(t, "duration.nanos", b.Duration().Nanos().String())
	assert.Equal(t, "duration.seconds", b.Duration().Seconds().String())
	assert.Equal(t, "field_mask", b.FieldMask().String())
	assert.Equal(t, "field_mask.paths", b.FieldMask().Paths().String())
	assert.Equal(t, "bool_value", b.BoolValue().String())
	assert.Equal(t, "bool_value.value", b.BoolValue().Value().String())
	assert.Equal(t, "int32_value", b.Int32Value().String())
	assert.Equal(t, "int32_value.value", b.Int32Value().Value().String())
	assert.Equal(t, "int64_value", b.Int64Value().String())
	assert.Equal(t, "int64_value.value", b.Int64Value().Value().String())
	assert.Equal(t, "uint32_value", b.Uint32Value().String())
	assert.Equal(t, "uint32_value.value", b.Uint32Value().Value().String())
	assert.Equal(t, "uint64_value", b.Uint64Value().String())
	assert.Equal(t, "uint64_value.value", b.Uint64Value().Value().String())
	assert.Equal(t, "float_value", b.FloatValue().String())
	assert.Equal(t, "float_value.value", b.FloatValue().Value().String())
	assert.Equal(t, "double_value", b.DoubleValue().String())
	assert.Equal(t, "double_value.value", b.DoubleValue().Value().String())
	assert.Equal(t, "string_value", b.StringValue().String())
	assert.Equal(t, "string_value.value", b.StringValue().Value().String())
	assert.Equal(t, "bytes_value", b.BytesValue().String())
	assert.Equal(t, "bytes_value.value", b.BytesValue().Value().String())
	assert.Equal(t, "struct", b.Struct().String())
	assert.Equal(t, "list_value", b.ListValue().String())
	assert.Equal(t, "value", b.Value().String())
	assert.Equal(t, "any", b.Any().String())
}

func TestOneOf(t *testing.T) {
	i := OneOfHolder{
		Various: &OneOfHolder_Timestamp{&timestamppb.Timestamp{}},
	}
	b := i.PathBuilder()
	assert.Equal(t, "", b.String())
	assert.Equal(t, "timestamp", b.Timestamp().String())
	assert.Equal(t, "duration", b.Duration().String())
	assert.Equal(t, "field_mask", b.FieldMask().String())
	assert.Equal(t, "bool_value", b.BoolValue().String())
	assert.Equal(t, "int32_value", b.Int32Value().String())
	assert.Equal(t, "int64_value", b.Int64Value().String())
	assert.Equal(t, "uint32_value", b.Uint32Value().String())
	assert.Equal(t, "uint64_value", b.Uint64Value().String())
	assert.Equal(t, "float_value", b.FloatValue().String())
	assert.Equal(t, "double_value", b.DoubleValue().String())
	assert.Equal(t, "string_value", b.StringValue().String())
	assert.Equal(t, "bytes_value", b.BytesValue().String())
	assert.Equal(t, "struct", b.Struct().String())
	assert.Equal(t, "list_value", b.ListValue().String())
	assert.Equal(t, "value", b.Value().String())
	assert.Equal(t, "any", b.Any().String())

}
