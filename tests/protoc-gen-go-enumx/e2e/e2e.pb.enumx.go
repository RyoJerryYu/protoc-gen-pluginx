//Code generated by protoc-gen-go-enumx. DO NOT EDIT.
//versions:
//- protoc-gen-go-enumx v1.0.30
//- protoc (unknown)
//source: e2e.proto

package e2e

import (
	constraints "golang.org/x/exp/constraints"
)

func (x Enum) Int() int       { return int(x) }
func (x Enum) Int64() int64   { return int64(x) }
func (x Enum) Int32() int32   { return int32(x) }
func (x Enum) UInt() uint     { return uint(x) }
func (x Enum) UInt64() uint64 { return uint64(x) }
func (x Enum) UInt32() uint32 { return uint32(x) }

// EnumFrom returns the Enum for the given integers, or the zero value if not found.
func EnumFrom[T constraints.Integer | constraints.Float](s T) Enum {
	return Enum(s)
}

// EnumFromValid is like EnumFrom, but returns an extra boolean value to check if the conversion is valid.
func EnumFromValid[T constraints.Integer | constraints.Float](s T) (Enum, bool) {
	_, valid := Enum_name[int32(s)]
	return Enum(s), valid
}

// EnumFromStr returns the Enum for the given string, or the zero value if not found.
func EnumFromStr(s string) Enum {
	return Enum(Enum_value[s])
}

// EnumFromValidStr is like EnumFromStr, but returns an extra boolean value to check if the conversion is valid.
func EnumFromValidStr(s string) (Enum, bool) {
	v, valid := Enum_value[s]
	return Enum(v), valid
}

var _Enum_all = []Enum{
	Enum_A,
	Enum_B,
	Enum_C,
}
var _Enum_allName = []string{
	"Enum_A",
	"Enum_B",
	"Enum_C",
}
var _Enum_allValue = []int32{
	0,
	1,
	2,
}

// EnumAll returns all the values of the Enum enum.
func EnumAll() []Enum {
	return _Enum_all[:]
}

// EnumAllName returns all the names of the Enum enum.
func EnumAllName() []string {
	return _Enum_allName[:]
}

// EnumAllValue returns all the values of the Enum enum.
func EnumAllValue() []int32 {
	return _Enum_allValue[:]
}

func (x EnumParent_EnumChild) Int() int       { return int(x) }
func (x EnumParent_EnumChild) Int64() int64   { return int64(x) }
func (x EnumParent_EnumChild) Int32() int32   { return int32(x) }
func (x EnumParent_EnumChild) UInt() uint     { return uint(x) }
func (x EnumParent_EnumChild) UInt64() uint64 { return uint64(x) }
func (x EnumParent_EnumChild) UInt32() uint32 { return uint32(x) }

// EnumParent_EnumChildFrom returns the EnumParent_EnumChild for the given integers, or the zero value if not found.
func EnumParent_EnumChildFrom[T constraints.Integer | constraints.Float](s T) EnumParent_EnumChild {
	return EnumParent_EnumChild(s)
}

// EnumParent_EnumChildFromValid is like EnumParent_EnumChildFrom, but returns an extra boolean value to check if the conversion is valid.
func EnumParent_EnumChildFromValid[T constraints.Integer | constraints.Float](s T) (EnumParent_EnumChild, bool) {
	_, valid := EnumParent_EnumChild_name[int32(s)]
	return EnumParent_EnumChild(s), valid
}

// EnumParent_EnumChildFromStr returns the EnumParent_EnumChild for the given string, or the zero value if not found.
func EnumParent_EnumChildFromStr(s string) EnumParent_EnumChild {
	return EnumParent_EnumChild(EnumParent_EnumChild_value[s])
}

// EnumParent_EnumChildFromValidStr is like EnumParent_EnumChildFromStr, but returns an extra boolean value to check if the conversion is valid.
func EnumParent_EnumChildFromValidStr(s string) (EnumParent_EnumChild, bool) {
	v, valid := EnumParent_EnumChild_value[s]
	return EnumParent_EnumChild(v), valid
}

var _EnumParent_EnumChild_all = []EnumParent_EnumChild{
	EnumParent_D,
	EnumParent_E,
	EnumParent_F,
}
var _EnumParent_EnumChild_allName = []string{
	"EnumParent_D",
	"EnumParent_E",
	"EnumParent_F",
}
var _EnumParent_EnumChild_allValue = []int32{
	0,
	1,
	2,
}

// EnumParent_EnumChildAll returns all the values of the EnumParent_EnumChild enum.
func EnumParent_EnumChildAll() []EnumParent_EnumChild {
	return _EnumParent_EnumChild_all[:]
}

// EnumParent_EnumChildAllName returns all the names of the EnumParent_EnumChild enum.
func EnumParent_EnumChildAllName() []string {
	return _EnumParent_EnumChild_allName[:]
}

// EnumParent_EnumChildAllValue returns all the values of the EnumParent_EnumChild enum.
func EnumParent_EnumChildAllValue() []int32 {
	return _EnumParent_EnumChild_allValue[:]
}

func (x EnumParent2_Enum) Int() int       { return int(x) }
func (x EnumParent2_Enum) Int64() int64   { return int64(x) }
func (x EnumParent2_Enum) Int32() int32   { return int32(x) }
func (x EnumParent2_Enum) UInt() uint     { return uint(x) }
func (x EnumParent2_Enum) UInt64() uint64 { return uint64(x) }
func (x EnumParent2_Enum) UInt32() uint32 { return uint32(x) }

// EnumParent2_EnumFrom returns the EnumParent2_Enum for the given integers, or the zero value if not found.
func EnumParent2_EnumFrom[T constraints.Integer | constraints.Float](s T) EnumParent2_Enum {
	return EnumParent2_Enum(s)
}

// EnumParent2_EnumFromValid is like EnumParent2_EnumFrom, but returns an extra boolean value to check if the conversion is valid.
func EnumParent2_EnumFromValid[T constraints.Integer | constraints.Float](s T) (EnumParent2_Enum, bool) {
	_, valid := EnumParent2_Enum_name[int32(s)]
	return EnumParent2_Enum(s), valid
}

// EnumParent2_EnumFromStr returns the EnumParent2_Enum for the given string, or the zero value if not found.
func EnumParent2_EnumFromStr(s string) EnumParent2_Enum {
	return EnumParent2_Enum(EnumParent2_Enum_value[s])
}

// EnumParent2_EnumFromValidStr is like EnumParent2_EnumFromStr, but returns an extra boolean value to check if the conversion is valid.
func EnumParent2_EnumFromValidStr(s string) (EnumParent2_Enum, bool) {
	v, valid := EnumParent2_Enum_value[s]
	return EnumParent2_Enum(v), valid
}

var _EnumParent2_Enum_all = []EnumParent2_Enum{
	EnumParent2_G,
	EnumParent2_H,
	EnumParent2_I,
}
var _EnumParent2_Enum_allName = []string{
	"EnumParent2_G",
	"EnumParent2_H",
	"EnumParent2_I",
}
var _EnumParent2_Enum_allValue = []int32{
	0,
	1,
	2,
}

// EnumParent2_EnumAll returns all the values of the EnumParent2_Enum enum.
func EnumParent2_EnumAll() []EnumParent2_Enum {
	return _EnumParent2_Enum_all[:]
}

// EnumParent2_EnumAllName returns all the names of the EnumParent2_Enum enum.
func EnumParent2_EnumAllName() []string {
	return _EnumParent2_Enum_allName[:]
}

// EnumParent2_EnumAllValue returns all the values of the EnumParent2_Enum enum.
func EnumParent2_EnumAllValue() []int32 {
	return _EnumParent2_Enum_allValue[:]
}

func (x EnumParent3_Enum) Int() int       { return int(x) }
func (x EnumParent3_Enum) Int64() int64   { return int64(x) }
func (x EnumParent3_Enum) Int32() int32   { return int32(x) }
func (x EnumParent3_Enum) UInt() uint     { return uint(x) }
func (x EnumParent3_Enum) UInt64() uint64 { return uint64(x) }
func (x EnumParent3_Enum) UInt32() uint32 { return uint32(x) }

// EnumParent3_EnumFrom returns the EnumParent3_Enum for the given integers, or the zero value if not found.
func EnumParent3_EnumFrom[T constraints.Integer | constraints.Float](s T) EnumParent3_Enum {
	return EnumParent3_Enum(s)
}

// EnumParent3_EnumFromValid is like EnumParent3_EnumFrom, but returns an extra boolean value to check if the conversion is valid.
func EnumParent3_EnumFromValid[T constraints.Integer | constraints.Float](s T) (EnumParent3_Enum, bool) {
	_, valid := EnumParent3_Enum_name[int32(s)]
	return EnumParent3_Enum(s), valid
}

// EnumParent3_EnumFromStr returns the EnumParent3_Enum for the given string, or the zero value if not found.
func EnumParent3_EnumFromStr(s string) EnumParent3_Enum {
	return EnumParent3_Enum(EnumParent3_Enum_value[s])
}

// EnumParent3_EnumFromValidStr is like EnumParent3_EnumFromStr, but returns an extra boolean value to check if the conversion is valid.
func EnumParent3_EnumFromValidStr(s string) (EnumParent3_Enum, bool) {
	v, valid := EnumParent3_Enum_value[s]
	return EnumParent3_Enum(v), valid
}

var _EnumParent3_Enum_all = []EnumParent3_Enum{
	EnumParent3_J,
	EnumParent3_K,
	EnumParent3_L,
}
var _EnumParent3_Enum_allName = []string{
	"EnumParent3_J",
	"EnumParent3_K",
	"EnumParent3_L",
}
var _EnumParent3_Enum_allValue = []int32{
	0,
	1,
	2,
}

// EnumParent3_EnumAll returns all the values of the EnumParent3_Enum enum.
func EnumParent3_EnumAll() []EnumParent3_Enum {
	return _EnumParent3_Enum_all[:]
}

// EnumParent3_EnumAllName returns all the names of the EnumParent3_Enum enum.
func EnumParent3_EnumAllName() []string {
	return _EnumParent3_Enum_allName[:]
}

// EnumParent3_EnumAllValue returns all the values of the EnumParent3_Enum enum.
func EnumParent3_EnumAllValue() []int32 {
	return _EnumParent3_Enum_allValue[:]
}
