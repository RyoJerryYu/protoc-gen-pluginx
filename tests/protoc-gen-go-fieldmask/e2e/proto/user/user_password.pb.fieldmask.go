//Code generated by protoc-gen-go-fieldmask. DO NOT EDIT.
//versions:
//- protoc-gen-go-fieldmask v1.0.9
//- protoc 5.28.2
//source: proto/user/user_password.proto

package user

import (
	fieldmask "github.com/RyoJerryYu/protoc-gen-plugins/pkg/fieldmask"
)

// IUserPasswordFieldPath is the interface for the field path of UserPassword
type IUserPasswordFieldPath interface {
	String() string
	Id() fieldmask.IEndFieldPath
	Password() fieldmask.IEndFieldPath
	CreatedAt() fieldmask.ITimestampFieldPath
}

// userPasswordFieldPath is the implementation for the field path of UserPassword
type userPasswordFieldPath struct {
	fieldPath string // the field path to the current field, empty if it's root
	prefix    string // e.g. "fieldPath." or empty if it's root
}

// NewUserPasswordFieldPath creates a new userPasswordFieldPath
func NewUserPasswordFieldPath(fieldPath string) IUserPasswordFieldPath {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return userPasswordFieldPath{fieldPath: fieldPath, prefix: prefix}
}

// String returns the field path
func (x userPasswordFieldPath) String() string { return x.fieldPath }

func (x userPasswordFieldPath) Id() fieldmask.IEndFieldPath {
	return fieldmask.NewEndFieldPath(x.prefix + "id")
}
func (x userPasswordFieldPath) Password() fieldmask.IEndFieldPath {
	return fieldmask.NewEndFieldPath(x.prefix + "password")
}
func (x userPasswordFieldPath) CreatedAt() fieldmask.ITimestampFieldPath {
	return fieldmask.NewTimestampFieldPath(x.prefix + "created_at")
}

// FieldPath returns the field path for UserPassword
func (x *UserPassword) FieldPath() IUserPasswordFieldPath {
	return NewUserPasswordFieldPath("")
}
