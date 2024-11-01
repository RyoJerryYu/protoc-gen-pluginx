package compatibility

import (
	"fmt"
	"testing"
	"time"

	"github.com/mennanov/fmutils"
	"github.com/stretchr/testify/assert"
	"google.golang.org/protobuf/types/known/durationpb"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	timestamppb "google.golang.org/protobuf/types/known/timestamppb"
)

func TestCompatibility_FMUtils_Filter(t *testing.T) {
	newH := func() *Holder {
		return &Holder{
			Empty:     &emptypb.Empty{},
			Timestamp: timestamppb.Now(),
			Duration:  durationpb.New(time.Hour),
			Name:      "name",
			Nested: &Holder_NestedInner{
				Name: "nested",
			},
			Outer: &NestedOuter{
				Nested: "nested",
			},
		}
	}
	u := newH()
	// Keeps the fields mentioned in the paths untouched, all the other fields will be cleared.
	fmutils.Filter(u, []string{
		u.PathBuilder().Empty().String(),
		u.PathBuilder().Duration().Seconds().String(),
		u.PathBuilder().Nested().String(),
		u.PathBuilder().Outer().Nested().String(),
	})

	shouldRemain := []interface{}{
		u.Empty,
		u.Duration.Seconds,
		u.Nested,
		u.Nested.Name,
		u.Outer.Nested,
	}

	for i, v := range shouldRemain {
		t.Run(fmt.Sprintf("%d %T %v", i, v, v), func(t *testing.T) {
			assert.NotZero(t, v)
		})
	}

	shouldFilterOut := []interface{}{
		u.Timestamp,
		u.Duration.Nanos,
		u.Name,
	}

	for i, v := range shouldFilterOut {
		t.Run(fmt.Sprintf("%d %T %v", i, v, v), func(t *testing.T) {
			assert.Zero(t, v)
		})
	}
}

func TestCompatibility_FMUtils_Prune(t *testing.T) {
	newH := func() *Holder {
		return &Holder{
			Empty:     &emptypb.Empty{},
			Timestamp: timestamppb.Now(),
			Duration:  durationpb.New(time.Hour + time.Nanosecond),
			Name:      "name",
			Nested: &Holder_NestedInner{
				Name: "nested",
			},
			Outer: &NestedOuter{
				Nested: "nested",
			},
		}
	}
	u := newH()
	// Clears all the fields mentioned in the paths, all the other fields will be left untouched.
	fmutils.Prune(u, []string{
		u.PathBuilder().Empty().String(),
		u.PathBuilder().Duration().Seconds().String(),
		u.PathBuilder().Nested().String(),
		u.PathBuilder().Outer().Nested().String(),
	})

	shouldRemain := []interface{}{
		u.Timestamp,
		u.Duration.Nanos,
		u.Name,
	}

	for i, v := range shouldRemain {
		t.Run(fmt.Sprintf("%d %T %v", i, v, v), func(t *testing.T) {
			assert.NotZero(t, v)
		})
	}

	shouldFilterOut := []interface{}{
		u.Empty,
		u.Duration.Seconds,
		u.Nested,
		u.Outer.Nested,
	}

	for i, v := range shouldFilterOut {
		t.Run(fmt.Sprintf("%d %T %v", i, v, v), func(t *testing.T) {
			assert.Zero(t, v)
		})
	}
}

// // Overwrites the fields in the dst from src.
// // Only the fields listed in the field mask will be copied.
// fmutils.Overwrite(src, dst, []string{"a.b.c", "d"})
func TestCompatibility_FMUtils_Overwrite(t *testing.T) {
	newH := func() *Holder {
		return &Holder{
			Empty:     &emptypb.Empty{},
			Timestamp: timestamppb.Now(),
			Duration:  durationpb.New(time.Hour + time.Nanosecond),
			Name:      "name",
			Nested: &Holder_NestedInner{
				Name: "nested",
			},
			Outer: &NestedOuter{
				Nested: "nested",
			},
		}
	}
	src := newH()
	dst := newH()
	dst.Empty = nil
	dst.Timestamp = nil
	dst.Duration = nil
	dst.Name = ""
	dst.Nested = nil
	dst.Outer = nil

	fmutils.Overwrite(src, dst, []string{
		dst.PathBuilder().Empty().String(),
		dst.PathBuilder().Timestamp().String(),
		dst.PathBuilder().Duration().String(),
		dst.PathBuilder().Name().String(),
		dst.PathBuilder().Nested().String(),
		dst.PathBuilder().Outer().String(),
	})

	assert.Equal(t, src.Empty, dst.Empty)
	assert.Equal(t, src.Timestamp, dst.Timestamp)
	assert.Equal(t, src.Duration, dst.Duration)
	assert.Equal(t, src.Name, dst.Name)
	assert.Equal(t, src.Nested, dst.Nested)
	assert.Equal(t, src.Outer, dst.Outer)
}
