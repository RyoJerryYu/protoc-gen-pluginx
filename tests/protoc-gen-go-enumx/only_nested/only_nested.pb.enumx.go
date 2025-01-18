//Code generated by protoc-gen-go-enumx. DO NOT EDIT.
//versions:
//- protoc-gen-go-enumx v1.0.34
//- protoc (unknown)
//source: only_nested.proto

package only_nested

import (
	constraints "golang.org/x/exp/constraints"
)

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
