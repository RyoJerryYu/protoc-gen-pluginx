package e2e

import (
	"testing"

	"github.com/RyoJerryYu/protoc-gen-plugins/tests/protoc-gen-go-fieldmask/e2e/proto/feed"
	"github.com/RyoJerryYu/protoc-gen-plugins/tests/protoc-gen-go-fieldmask/e2e/proto/user"
	"github.com/stretchr/testify/assert"
	"google.golang.org/protobuf/types/known/timestamppb"
)

func TestPathLocal(t *testing.T) {
	u := user.User{
		Id: "1",
	}
	assert.Equal(t, "id", u.FieldPath().Id())
	assert.Equal(t, "", u.FieldPath().String())
	assert.Equal(t, "icon", u.FieldPath().Icon().String())
	assert.Equal(t, "icon.url", u.FieldPath().Icon().Url())
	assert.Equal(t, "created_at", u.FieldPath().CreatedAt())
	assert.Equal(t, "icon.created_at", u.FieldPath().Icon().CreatedAt().String())
}

func TestPathImport(t *testing.T) {
	fe := feed.Feed{
		Id: "1",
		Author: &user.User{
			Id: "1",
			Icon: &user.Icon{
				Url: "http://example.com",
			},
		},
	}

	assert.Equal(t, "id", fe.FieldPath().Id())
	assert.Equal(t, "author.id", fe.FieldPath().Author().Id())
	assert.Equal(t, "author.icon.url", fe.FieldPath().Author().Icon().Url())

}

func TestLocalInOtherFile(t *testing.T) {
	u := user.User{
		Password: &user.UserPassword{
			Password: "123456",
		},
	}

	assert.Equal(t, "password", u.FieldPath().Password().String())
	assert.Equal(t, "password.password", u.FieldPath().Password().Password())
	assert.Equal(t, "password", u.Password.FieldPath().Password())
	assert.Equal(t, "", u.Password.FieldPath().String())
}

func TestNested(t *testing.T) {
	i := user.Icon{
		Nested: &user.Icon_Nested{
			SomeField: "some",
		},
	}

	assert.Equal(t, "nested.some_field", i.FieldPath().Nested().SomeField())
	assert.Equal(t, "nested", i.FieldPath().Nested().String())
	assert.Equal(t, "", i.Nested.FieldPath().String())
	assert.Equal(t, "some_field", i.Nested.FieldPath().SomeField())
}

func TestWellKnown(t *testing.T) {
	fe := feed.Feed{
		CreatedAt: &timestamppb.Timestamp{
			Seconds: 1,
			Nanos:   2,
		},
	}

	assert.Equal(t, "created_at.seconds", fe.FieldPath().CreatedAt().Seconds())
	assert.Equal(t, "created_at.nanos", fe.FieldPath().CreatedAt().Nanos())

	u := user.User{
		CreatedAt: &timestamppb.Timestamp{
			Seconds: 1,
			Nanos:   2,
		},

		Icon: &user.Icon{
			CreatedAt: &timestamppb.Timestamp{
				Seconds: 1,
				Nanos:   2,
			},
		},
	}

	assert.Equal(t, "icon.created_at.seconds", u.FieldPath().Icon().CreatedAt().Seconds())
	assert.Equal(t, "icon.created_at.nanos", u.FieldPath().Icon().CreatedAt().Nanos())
}

func TestEnd(t *testing.T) {
	u := user.User{
		Id: "1",
	}

	assert.Equal(t, "id", u.FieldPath().Id())
	assert.Equal(t, "", u.FieldPath().String())
	assert.Equal(t, "created_at", u.FieldPath().CreatedAt())                      // end at created_at
	assert.Equal(t, "icon.created_at", u.FieldPath().Icon().CreatedAt().String()) // not end at created_at
}
