//Code generated by protoc-gen-go-fieldmask. DO NOT EDIT.
//versions:
//- protoc-gen-go-fieldmask v1.0.14
//- protoc 5.28.3
//source: compatibility.proto

package compatibility

import (
	fieldmask "github.com/RyoJerryYu/protoc-gen-pluginx/pkg/fieldmask"
)

// IHolderPathBuilder is the interface for the field path of Holder
type IHolderPathBuilder interface {
	String() string
	Empty() fieldmask.IEndPathBuilder
	Timestamp() fieldmask.ITimestampPathBuilder
	Duration() fieldmask.IDurationPathBuilder
	Name() fieldmask.IEndPathBuilder
	Nested() IHolder_NestedInnerPathBuilder
	Outer() INestedOuterPathBuilder
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
func (x holderPathBuilder) Name() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "name")
}
func (x holderPathBuilder) Nested() IHolder_NestedInnerPathBuilder {
	return NewHolder_NestedInnerPathBuilder(x.prefix + "nested")
}
func (x holderPathBuilder) Outer() INestedOuterPathBuilder {
	return NewNestedOuterPathBuilder(x.prefix + "outer")
}

// PathBuilder returns the field path for Holder
func (x *Holder) PathBuilder() IHolderPathBuilder {
	return NewHolderPathBuilder("")
}

// IHolder_NestedInnerPathBuilder is the interface for the field path of Holder_NestedInner
type IHolder_NestedInnerPathBuilder interface {
	String() string
	Name() fieldmask.IEndPathBuilder
}

// holder_NestedInnerPathBuilder is the implementation for the field path of Holder_NestedInner
type holder_NestedInnerPathBuilder struct {
	fieldPath string // the field path to the current field, empty if it's root
	prefix    string // e.g. "fieldPath." or empty if it's root
}

// NewHolder_NestedInnerPathBuilder creates a new holder_NestedInnerPathBuilder
func NewHolder_NestedInnerPathBuilder(fieldPath string) IHolder_NestedInnerPathBuilder {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return holder_NestedInnerPathBuilder{fieldPath: fieldPath, prefix: prefix}
}

// String returns the field path
func (x holder_NestedInnerPathBuilder) String() string { return x.fieldPath }

func (x holder_NestedInnerPathBuilder) Name() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "name")
}

// PathBuilder returns the field path for Holder_NestedInner
func (x *Holder_NestedInner) PathBuilder() IHolder_NestedInnerPathBuilder {
	return NewHolder_NestedInnerPathBuilder("")
}

// INestedOuterPathBuilder is the interface for the field path of NestedOuter
type INestedOuterPathBuilder interface {
	String() string
	Nested() fieldmask.IEndPathBuilder
}

// nestedOuterPathBuilder is the implementation for the field path of NestedOuter
type nestedOuterPathBuilder struct {
	fieldPath string // the field path to the current field, empty if it's root
	prefix    string // e.g. "fieldPath." or empty if it's root
}

// NewNestedOuterPathBuilder creates a new nestedOuterPathBuilder
func NewNestedOuterPathBuilder(fieldPath string) INestedOuterPathBuilder {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return nestedOuterPathBuilder{fieldPath: fieldPath, prefix: prefix}
}

// String returns the field path
func (x nestedOuterPathBuilder) String() string { return x.fieldPath }

func (x nestedOuterPathBuilder) Nested() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "nested")
}

// PathBuilder returns the field path for NestedOuter
func (x *NestedOuter) PathBuilder() INestedOuterPathBuilder {
	return NewNestedOuterPathBuilder("")
}
