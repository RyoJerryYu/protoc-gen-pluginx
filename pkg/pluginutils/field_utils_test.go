package pluginutils

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

func TestCombine(t *testing.T) {
	tests := []struct {
		in            [][]string
		wantUnion     []string
		wantIntersect []string
		wantSubstract []string
	}{
		{
			in: [][]string{
				{},
				{},
			},
			wantUnion:     []string{},
			wantIntersect: []string{},
			wantSubstract: []string{},
		},
		{
			in: [][]string{
				{"a"},
				{},
			},
			wantUnion:     []string{"a"},
			wantIntersect: []string{},
			wantSubstract: []string{"a"},
		},
		{
			in: [][]string{
				{"a"},
				{"a"},
			},
			wantUnion:     []string{"a"},
			wantIntersect: []string{"a"},
			wantSubstract: []string{},
		},
		{
			in: [][]string{
				{"a"},
				{"b"},
				{"c"},
			},
			wantUnion:     []string{"a", "b", "c"},
			wantIntersect: []string{},
			wantSubstract: []string{"a"},
		},
		{
			in: [][]string{
				{"a", "b"},
				{"b.b"},
				{"b"},
				{"b", "a.A"},
				{"b", "c", "c.a", "c.b"},
			},
			wantUnion:     []string{"a", "b", "c"},
			wantIntersect: []string{"b.b"},
			wantSubstract: []string{},
		},
		{
			in: [][]string{
				{"a.b", "a.c.d"},
				{"a"},
			},
			wantUnion:     []string{"a"},
			wantIntersect: []string{"a.b", "a.c.d"},
			wantSubstract: []string{},
		},
		{
			in: [][]string{
				{},
				{"a.b", "a.c", "d"},
			},
			wantUnion:     []string{"a.b", "a.c", "d"},
			wantIntersect: []string{},
			wantSubstract: []string{},
		},
		{
			in: [][]string{
				{"a.b", "a.c", "d"},
				{},
			},
			wantUnion:     []string{"a.b", "a.c", "d"},
			wantIntersect: []string{},
			wantSubstract: []string{"a.b", "a.c", "d"},
		},
		{
			in: [][]string{
				{"a.b", "a.c", "d"},
				{"a.c"},
			},
			wantUnion:     []string{"a.b", "a.c", "d"},
			wantIntersect: []string{"a.c"},
			wantSubstract: []string{"a.b", "d"},
		},
	}

	for _, tt := range tests {
		t.Run("", func(t *testing.T) {
			var masks = tt.in

			union := Union(masks[0], masks[1], masks[2:]...)
			gotUnion := union
			assert.Len(t, gotUnion, len(tt.wantUnion))
			if len(tt.wantUnion) > 0 {
				assert.EqualValues(t, tt.wantUnion, gotUnion)
			}

			intersect := Intersect(masks[0], masks[1], masks[2:]...)
			gotIntersect := intersect
			assert.Len(t, gotIntersect, len(tt.wantIntersect))
			if len(tt.wantIntersect) > 0 {
				assert.EqualValues(t, tt.wantIntersect, gotIntersect)
			}

			substract := Substract(masks[0], masks[1], masks[2:]...)
			gotSubstract := substract
			assert.Len(t, gotSubstract, len(tt.wantSubstract))
			if len(tt.wantSubstract) > 0 {
				assert.EqualValues(t, tt.wantSubstract, gotSubstract)
			}
		})
	}
}

func TestGetField(t *testing.T) {
	require.NotPanics(t, func() {
		in := wrapperspb.Bool(true)
		res1 := GetFieldProtoreflect(in.ProtoReflect().Descriptor(), "value")
		assert.NotNil(t, res1)
		res2 := GetFieldProtoreflect(in.ProtoReflect().Descriptor(), "value.abc")
		assert.Nil(t, res2)
	})
}
