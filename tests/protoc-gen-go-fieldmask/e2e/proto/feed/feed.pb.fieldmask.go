//Code generated by protoc-gen-go-fieldmask. DO NOT EDIT.
//versions:
//- protoc-gen-go-fieldmask v1.0.11
//- protoc 5.28.2
//source: proto/feed/feed.proto

package feed

import (
	fieldmask "github.com/RyoJerryYu/protoc-gen-pluginx/pkg/fieldmask"
	user "github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-go-fieldmask/e2e/proto/user"
)

// IFeedPathBuilder is the interface for the field path of Feed
type IFeedPathBuilder interface {
	String() string
	Id() fieldmask.IEndPathBuilder
	Title() fieldmask.IEndPathBuilder
	Author() user.IUserPathBuilder
	CreatedAt() fieldmask.ITimestampPathBuilder
	NestedFromOther() user.IIcon_NestedPathBuilder
}

// feedPathBuilder is the implementation for the field path of Feed
type feedPathBuilder struct {
	fieldPath string // the field path to the current field, empty if it's root
	prefix    string // e.g. "fieldPath." or empty if it's root
}

// NewFeedPathBuilder creates a new feedPathBuilder
func NewFeedPathBuilder(fieldPath string) IFeedPathBuilder {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return feedPathBuilder{fieldPath: fieldPath, prefix: prefix}
}

// String returns the field path
func (x feedPathBuilder) String() string { return x.fieldPath }

func (x feedPathBuilder) Id() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "id")
}
func (x feedPathBuilder) Title() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "title")
}
func (x feedPathBuilder) Author() user.IUserPathBuilder {
	return user.NewUserPathBuilder(x.prefix + "author")
}
func (x feedPathBuilder) CreatedAt() fieldmask.ITimestampPathBuilder {
	return fieldmask.NewTimestampPathBuilder(x.prefix + "created_at")
}
func (x feedPathBuilder) NestedFromOther() user.IIcon_NestedPathBuilder {
	return user.NewIcon_NestedPathBuilder(x.prefix + "nested_from_other")
}

// PathBuilder returns the field path for Feed
func (x *Feed) PathBuilder() IFeedPathBuilder {
	return NewFeedPathBuilder("")
}
