package simple

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestOneOfMessagesSetters(t *testing.T) {
	msg := &OneOfMessages{}

	msg.SetName("test name")
	oneofName, ok := msg.OneofField.(*OneOfMessages_Name)
	assert.Equal(t, true, ok)
	assert.Equal(t, "test name", oneofName.Name)

	msg.SetAmount(12345)
	oneofAmount, ok := msg.OneofField.(*OneOfMessages_Amount)
	assert.Equal(t, true, ok)
	assert.Equal(t, uint32(12345), oneofAmount.Amount)

	msg.SetOk(true)
	oneofOk, ok := msg.OneofField.(*OneOfMessages_Ok)
	assert.Equal(t, true, ok)
	assert.Equal(t, true, oneofOk.Ok)
}

func TestOneOfMessagesWithNestedSetters(t *testing.T) {
	msg := &OneOfMessagesWithNested{}

	nested := &OneOfMessagesWithNested_Nested{Name: "nested name", Amount: 12345, Ok: true}
	msg.SetNested(nested)
	oneofNested, ok := msg.OneofField.(*OneOfMessagesWithNested_Nested_)
	assert.Equal(t, true, ok)
	assert.Equal(t, nested, oneofNested.Nested)

	msg.SetFloatValue(1.23)
	oneofFloatValue, ok := msg.OneofField.(*OneOfMessagesWithNested_FloatValue)
	assert.Equal(t, true, ok)
	assert.Equal(t, float32(1.23), oneofFloatValue.FloatValue)
}

func TestOneOfMessagesWithNested_NestedSetters(t *testing.T) {
	nested := &OneOfMessagesWithNested_Nested{}

	nested.SetName("nested name")
	assert.Equal(t, "nested name", nested.Name)

	nested.SetAmount(12345)
	assert.Equal(t, uint32(12345), nested.Amount)

	nested.SetOk(true)
	assert.Equal(t, true, nested.Ok)
}
