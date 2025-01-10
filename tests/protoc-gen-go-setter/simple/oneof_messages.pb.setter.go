//Code generated by protoc-gen-go-setter. DO NOT EDIT.
//versions:
//- protoc-gen-go-setter v1.0.32
//- protoc (unknown)
//source: oneof_messages.proto

package simple

// Types that are assignable to OneofField:
//
//	*OneOfMessages_Name
//	*OneOfMessages_Amount
//	*OneOfMessages_Ok
func (msg *OneOfMessages) SetOneofField(v isOneOfMessages_OneofField) {
	msg.OneofField = v
}

// SetName sets the value of the field Name
func (msg *OneOfMessages) SetName(v string) {
	msg.SetOneofField(&OneOfMessages_Name{
		Name: v,
	})
}

// SetAmount sets the value of the field Amount
func (msg *OneOfMessages) SetAmount(v uint32) {
	msg.SetOneofField(&OneOfMessages_Amount{
		Amount: v,
	})
}

// SetOk sets the value of the field Ok
func (msg *OneOfMessages) SetOk(v bool) {
	msg.SetOneofField(&OneOfMessages_Ok{
		Ok: v,
	})
}

// Types that are assignable to OneofField:
//
//	*OneOfMessagesWithNested_Nested_
//	*OneOfMessagesWithNested_FloatValue
func (msg *OneOfMessagesWithNested) SetOneofField(v isOneOfMessagesWithNested_OneofField) {
	msg.OneofField = v
}

// SetNested sets the value of the field Nested
func (msg *OneOfMessagesWithNested) SetNested(v *OneOfMessagesWithNested_Nested) {
	msg.SetOneofField(&OneOfMessagesWithNested_Nested_{
		Nested: v,
	})
}

// SetFloatValue sets the value of the field FloatValue
func (msg *OneOfMessagesWithNested) SetFloatValue(v float32) {
	msg.SetOneofField(&OneOfMessagesWithNested_FloatValue{
		FloatValue: v,
	})
}

// SetName sets the value of the field Name
func (msg *OneOfMessagesWithNested_Nested) SetName(v string) {
	msg.Name = v
}

// SetAmount sets the value of the field Amount
func (msg *OneOfMessagesWithNested_Nested) SetAmount(v uint32) {
	msg.Amount = v
}

// SetOk sets the value of the field Ok
func (msg *OneOfMessagesWithNested_Nested) SetOk(v bool) {
	msg.Ok = v
}
