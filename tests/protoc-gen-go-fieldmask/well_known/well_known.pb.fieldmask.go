//Code generated by protoc-gen-go-fieldmask. DO NOT EDIT.
//versions:
//- protoc-gen-go-fieldmask v1.0.10
//- protoc 5.28.2
//source: well_known.proto

package well_known

import (
	fieldmask "github.com/RyoJerryYu/protoc-gen-pluginx/pkg/fieldmask"
)

// IHolderPathBuilder is the interface for the field path of Holder
type IHolderPathBuilder interface {
	String() string
	Empty() fieldmask.IEndPathBuilder
	Timestamp() fieldmask.ITimestampPathBuilder
	Duration() fieldmask.IDurationPathBuilder
	FieldMask() fieldmask.IFieldMaskPathBuilder
	BoolValue() fieldmask.IWrappersPathBuilder
	Int32Value() fieldmask.IWrappersPathBuilder
	Int64Value() fieldmask.IWrappersPathBuilder
	Uint32Value() fieldmask.IWrappersPathBuilder
	Uint64Value() fieldmask.IWrappersPathBuilder
	FloatValue() fieldmask.IWrappersPathBuilder
	DoubleValue() fieldmask.IWrappersPathBuilder
	StringValue() fieldmask.IWrappersPathBuilder
	BytesValue() fieldmask.IWrappersPathBuilder
	Struct() fieldmask.IEndPathBuilder
	ListValue() fieldmask.IEndPathBuilder
	Value() fieldmask.IEndPathBuilder
	Any() fieldmask.IEndPathBuilder
}

// holderPathBuilder is the implementation for the field path of Holder
type holderPathBuilder struct {
	fieldPath string // the field path to the current field, empty if it's root
	prefix    string // e.g. "fieldPath." or empty if it's root
}

// NewHolderPathBuilder creates a new holderPathBuilder
func NewHolderPathBuilder(fieldPath string) IHolderPathBuilder {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return holderPathBuilder{fieldPath: fieldPath, prefix: prefix}
}

// String returns the field path
func (x holderPathBuilder) String() string { return x.fieldPath }

func (x holderPathBuilder) Empty() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "empty")
}
func (x holderPathBuilder) Timestamp() fieldmask.ITimestampPathBuilder {
	return fieldmask.NewTimestampPathBuilder(x.prefix + "timestamp")
}
func (x holderPathBuilder) Duration() fieldmask.IDurationPathBuilder {
	return fieldmask.NewDurationPathBuilder(x.prefix + "duration")
}
func (x holderPathBuilder) FieldMask() fieldmask.IFieldMaskPathBuilder {
	return fieldmask.NewFieldMaskPathBuilder(x.prefix + "field_mask")
}
func (x holderPathBuilder) BoolValue() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "bool_value")
}
func (x holderPathBuilder) Int32Value() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "int32_value")
}
func (x holderPathBuilder) Int64Value() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "int64_value")
}
func (x holderPathBuilder) Uint32Value() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "uint32_value")
}
func (x holderPathBuilder) Uint64Value() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "uint64_value")
}
func (x holderPathBuilder) FloatValue() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "float_value")
}
func (x holderPathBuilder) DoubleValue() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "double_value")
}
func (x holderPathBuilder) StringValue() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "string_value")
}
func (x holderPathBuilder) BytesValue() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "bytes_value")
}
func (x holderPathBuilder) Struct() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "struct")
}
func (x holderPathBuilder) ListValue() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "list_value")
}
func (x holderPathBuilder) Value() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "value")
}
func (x holderPathBuilder) Any() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "any")
}

// PathBuilder returns the field path for Holder
func (x *Holder) PathBuilder() IHolderPathBuilder {
	return NewHolderPathBuilder("")
}

// IOneOfHolderPathBuilder is the interface for the field path of OneOfHolder
type IOneOfHolderPathBuilder interface {
	String() string
	Empty() fieldmask.IEndPathBuilder
	Timestamp() fieldmask.ITimestampPathBuilder
	Duration() fieldmask.IDurationPathBuilder
	FieldMask() fieldmask.IFieldMaskPathBuilder
	BoolValue() fieldmask.IWrappersPathBuilder
	Int32Value() fieldmask.IWrappersPathBuilder
	Int64Value() fieldmask.IWrappersPathBuilder
	Uint32Value() fieldmask.IWrappersPathBuilder
	Uint64Value() fieldmask.IWrappersPathBuilder
	FloatValue() fieldmask.IWrappersPathBuilder
	DoubleValue() fieldmask.IWrappersPathBuilder
	StringValue() fieldmask.IWrappersPathBuilder
	BytesValue() fieldmask.IWrappersPathBuilder
	Struct() fieldmask.IEndPathBuilder
	ListValue() fieldmask.IEndPathBuilder
	Value() fieldmask.IEndPathBuilder
	Any() fieldmask.IEndPathBuilder
}

// oneOfHolderPathBuilder is the implementation for the field path of OneOfHolder
type oneOfHolderPathBuilder struct {
	fieldPath string // the field path to the current field, empty if it's root
	prefix    string // e.g. "fieldPath." or empty if it's root
}

// NewOneOfHolderPathBuilder creates a new oneOfHolderPathBuilder
func NewOneOfHolderPathBuilder(fieldPath string) IOneOfHolderPathBuilder {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return oneOfHolderPathBuilder{fieldPath: fieldPath, prefix: prefix}
}

// String returns the field path
func (x oneOfHolderPathBuilder) String() string { return x.fieldPath }

func (x oneOfHolderPathBuilder) Empty() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "empty")
}
func (x oneOfHolderPathBuilder) Timestamp() fieldmask.ITimestampPathBuilder {
	return fieldmask.NewTimestampPathBuilder(x.prefix + "timestamp")
}
func (x oneOfHolderPathBuilder) Duration() fieldmask.IDurationPathBuilder {
	return fieldmask.NewDurationPathBuilder(x.prefix + "duration")
}
func (x oneOfHolderPathBuilder) FieldMask() fieldmask.IFieldMaskPathBuilder {
	return fieldmask.NewFieldMaskPathBuilder(x.prefix + "field_mask")
}
func (x oneOfHolderPathBuilder) BoolValue() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "bool_value")
}
func (x oneOfHolderPathBuilder) Int32Value() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "int32_value")
}
func (x oneOfHolderPathBuilder) Int64Value() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "int64_value")
}
func (x oneOfHolderPathBuilder) Uint32Value() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "uint32_value")
}
func (x oneOfHolderPathBuilder) Uint64Value() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "uint64_value")
}
func (x oneOfHolderPathBuilder) FloatValue() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "float_value")
}
func (x oneOfHolderPathBuilder) DoubleValue() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "double_value")
}
func (x oneOfHolderPathBuilder) StringValue() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "string_value")
}
func (x oneOfHolderPathBuilder) BytesValue() fieldmask.IWrappersPathBuilder {
	return fieldmask.NewWrappersPathBuilder(x.prefix + "bytes_value")
}
func (x oneOfHolderPathBuilder) Struct() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "struct")
}
func (x oneOfHolderPathBuilder) ListValue() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "list_value")
}
func (x oneOfHolderPathBuilder) Value() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "value")
}
func (x oneOfHolderPathBuilder) Any() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "any")
}

// PathBuilder returns the field path for OneOfHolder
func (x *OneOfHolder) PathBuilder() IOneOfHolderPathBuilder {
	return NewOneOfHolderPathBuilder("")
}