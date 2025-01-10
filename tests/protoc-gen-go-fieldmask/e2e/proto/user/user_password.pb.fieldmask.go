//Code generated by protoc-gen-go-fieldmask. DO NOT EDIT.
//versions:
//- protoc-gen-go-fieldmask v1.0.31
//- protoc (unknown)
//source: proto/user/user_password.proto

package user

import (
	fieldmask "github.com/RyoJerryYu/protoc-gen-pluginx/pkg/fieldmask"
)

// IUserPasswordPathBuilder is the interface for the field path of UserPassword
type IUserPasswordPathBuilder interface {
	String() string
	Id() fieldmask.IEndPathBuilder
	Password() fieldmask.IEndPathBuilder
	CreatedAt() fieldmask.ITimestampPathBuilder
}

// userPasswordPathBuilder is the implementation for the field path of UserPassword
type userPasswordPathBuilder struct {
	fieldPath string // the field path to the current field, empty if it's root
	prefix    string // e.g. "fieldPath." or empty if it's root
}

// NewUserPasswordPathBuilder creates a new userPasswordPathBuilder
func NewUserPasswordPathBuilder(fieldPath string) IUserPasswordPathBuilder {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return userPasswordPathBuilder{fieldPath: fieldPath, prefix: prefix}
}

// String returns the field path
func (x userPasswordPathBuilder) String() string { return x.fieldPath }

func (x userPasswordPathBuilder) Id() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "id")
}
func (x userPasswordPathBuilder) Password() fieldmask.IEndPathBuilder {
	return fieldmask.NewEndPathBuilder(x.prefix + "password")
}
func (x userPasswordPathBuilder) CreatedAt() fieldmask.ITimestampPathBuilder {
	return fieldmask.NewTimestampPathBuilder(x.prefix + "created_at")
}

// PathBuilder returns the field path for UserPassword
func (x *UserPassword) PathBuilder() IUserPasswordPathBuilder {
	return NewUserPasswordPathBuilder("")
}
