package e2e

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestInt(t *testing.T) {
	cases := []struct {
		Value    Enum
		Expected int
	}{
		{Enum_A, 0},
		{Enum_B, 1},
		{Enum_C, 2},
	}

	for _, c := range cases {
		assert.Equal(t, c.Expected, int(c.Value))
		assert.Equal(t, c.Expected, c.Value.Int())
		assert.Equal(t, int64(c.Expected), c.Value.Int64())
		assert.Equal(t, int32(c.Expected), c.Value.Int32())
		assert.Equal(t, uint(c.Expected), c.Value.UInt())
		assert.Equal(t, uint64(c.Expected), c.Value.UInt64())
		assert.Equal(t, uint32(c.Expected), c.Value.UInt32())
	}
}

func TestEnumFrom(t *testing.T) {
	cases := []struct {
		Value    int
		Expected Enum
	}{
		{0, Enum_A},
		{1, Enum_B},
		{2, Enum_C},
	}

	for _, c := range cases {
		assert.Equal(t, c.Expected, EnumFrom(c.Value))
		assert.Equal(t, c.Expected, EnumFrom(int64(c.Value)))
		assert.Equal(t, c.Expected, EnumFrom(int32(c.Value)))
		assert.Equal(t, c.Expected, EnumFrom(uint(c.Value)))
		assert.Equal(t, c.Expected, EnumFrom(uint64(c.Value)))
		assert.Equal(t, c.Expected, EnumFrom(uint32(c.Value)))
		assert.Equal(t, c.Expected, EnumFrom(float32(c.Value)))
		assert.Equal(t, c.Expected, EnumFrom(float64(c.Value)))

		var (
			v     Enum
			valid bool
		)

		v, valid = EnumFromValid(c.Value)
		assert.True(t, valid)
		assert.Equal(t, c.Expected, v)

		v, valid = EnumFromValid(int64(c.Value))
		assert.True(t, valid)
		assert.Equal(t, c.Expected, v)

		v, valid = EnumFromValid(int32(c.Value))
		assert.True(t, valid)
		assert.Equal(t, c.Expected, v)

		v, valid = EnumFromValid(uint(c.Value))
		assert.True(t, valid)
		assert.Equal(t, c.Expected, v)

		v, valid = EnumFromValid(uint64(c.Value))
		assert.True(t, valid)
		assert.Equal(t, c.Expected, v)

		v, valid = EnumFromValid(uint32(c.Value))
		assert.True(t, valid)
		assert.Equal(t, c.Expected, v)

		v, valid = EnumFromValid(float32(c.Value))
		assert.True(t, valid)
		assert.Equal(t, c.Expected, v)

		v, valid = EnumFromValid(float64(c.Value))
		assert.True(t, valid)
		assert.Equal(t, c.Expected, v)
	}
}

func TestFromInvalid(t *testing.T) {
	_, valid := EnumFromValid(42)
	assert.False(t, valid)

	_, valid = EnumFromValid(42.0)
	assert.False(t, valid)
}

func TestEnumFromStr(t *testing.T) {
	cases := []struct {
		Value    string
		Expected Enum
	}{
		{"A", Enum_A},
		{"B", Enum_B},
		{"C", Enum_C},
	}

	for _, c := range cases {
		assert.Equal(t, c.Expected, EnumFromStr(c.Value))

		var (
			v     Enum
			valid bool
		)

		v, valid = EnumFromValidStr(c.Value)
		assert.True(t, valid)
		assert.Equal(t, c.Expected, v)
	}
}

func TestFromStrInvalid(t *testing.T) {
	_, valid := EnumFromValidStr("D")
	assert.False(t, valid)
}

func TestEnumAll(t *testing.T) {
	type testCase struct {
		enum  Enum
		name  string
		value int32
	}

	isInAll := func(all []Enum, tc testCase) bool {
		for _, a := range all {
			if a == tc.enum {
				return true
			}
		}
		return false
	}
	isInAllName := func(all []string, name string) bool {
		for _, n := range all {
			if n == name {
				return true
			}
		}
		return false
	}
	isInAllValue := func(all []int32, value int32) bool {
		for _, v := range all {
			if v == value {
				return true
			}
		}
		return false
	}

	cases := []testCase{
		{Enum_A, "A", 0},
		{Enum_B, "B", 1},
		{Enum_C, "C", 2},
	}

	for _, c := range cases {
		assert.True(t, isInAll(EnumAll(), c))
		assert.True(t, isInAllName(EnumAllName(), c.name))
		assert.True(t, isInAllValue(EnumAllValue(), c.value))
	}
}

func TestEnumAll_Valid(t *testing.T) {
	t.Run("Enum", func(t *testing.T) {
		for _, v := range EnumAll() {
			vStr := v.String()
			vIn32 := v.Int32()
			strV := EnumFromStr(vStr)
			intV := EnumFrom(vIn32)
			assert.Equal(t, v, strV)
			assert.Equal(t, v, intV)
		}
		for _, vStr := range EnumAllName() {
			v, valid := EnumFromValidStr(vStr)
			assert.True(t, valid)
			assert.Equal(t, vStr, v.String())
		}
		for _, vIn32 := range EnumAllValue() {
			v, valid := EnumFromValid(vIn32)
			assert.True(t, valid)
			assert.Equal(t, vIn32, v.Int32())
		}
	})
	t.Run("EnumParent_EnumChild", func(t *testing.T) {
		for _, v := range EnumParent_EnumChildAll() {
			vStr := v.String()
			vIn32 := v.Int32()
			strV := EnumParent_EnumChildFromStr(vStr)
			intV := EnumParent_EnumChildFrom(vIn32)
			assert.Equal(t, v, strV)
			assert.Equal(t, v, intV)
		}
		for _, vStr := range EnumParent_EnumChildAllName() {
			v, valid := EnumParent_EnumChildFromValidStr(vStr)
			assert.True(t, valid)
			assert.Equal(t, vStr, v.String())
		}
		for _, vIn32 := range EnumParent_EnumChildAllValue() {
			v, valid := EnumParent_EnumChildFromValid(vIn32)
			assert.True(t, valid)
			assert.Equal(t, vIn32, v.Int32())
		}
	})
	t.Run("EnumParent2_Enum", func(t *testing.T) {
		for _, v := range EnumParent2_EnumAll() {
			vStr := v.String()
			vIn32 := v.Int32()
			strV := EnumParent2_EnumFromStr(vStr)
			intV := EnumParent2_EnumFrom(vIn32)
			assert.Equal(t, v, strV)
			assert.Equal(t, v, intV)
		}
		for _, vStr := range EnumParent2_EnumAllName() {
			v, valid := EnumParent2_EnumFromValidStr(vStr)
			assert.True(t, valid)
			assert.Equal(t, vStr, v.String())
		}
		for _, vIn32 := range EnumParent2_EnumAllValue() {
			v, valid := EnumParent2_EnumFromValid(vIn32)
			assert.True(t, valid)
			assert.Equal(t, vIn32, v.Int32())
		}
	})
	t.Run("EnumParent3_Enum", func(t *testing.T) {
		for _, v := range EnumParent3_EnumAll() {
			vStr := v.String()
			vIn32 := v.Int32()
			strV := EnumParent3_EnumFromStr(vStr)
			intV := EnumParent3_EnumFrom(vIn32)
			assert.Equal(t, v, strV)
			assert.Equal(t, v, intV)
		}
		for _, vStr := range EnumParent3_EnumAllName() {
			v, valid := EnumParent3_EnumFromValidStr(vStr)
			assert.True(t, valid)
			assert.Equal(t, vStr, v.String())
		}
		for _, vIn32 := range EnumParent3_EnumAllValue() {
			v, valid := EnumParent3_EnumFromValid(vIn32)
			assert.True(t, valid)
			assert.Equal(t, vIn32, v.Int32())
		}
	})
}

func TestNested(t *testing.T) {
	cases := []struct {
		value    EnumParent2_Enum
		expected int
	}{
		{EnumParent2_G, 0},
		{EnumParent2_H, 1},
		{EnumParent2_I, 2},
	}

	for _, c := range cases {
		assert.Equal(t, c.expected, int(c.value))
		assert.Equal(t, c.expected, c.value.Int())
		assert.Equal(t, int64(c.expected), c.value.Int64())
		assert.Equal(t, int32(c.expected), c.value.Int32())
		assert.Equal(t, uint(c.expected), c.value.UInt())
		assert.Equal(t, uint64(c.expected), c.value.UInt64())
		assert.Equal(t, uint32(c.expected), c.value.UInt32())
	}
}
