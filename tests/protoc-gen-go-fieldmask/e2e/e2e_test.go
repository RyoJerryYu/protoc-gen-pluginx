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
	assert.Equal(t, "id", u.PathBuilder().Id().String())
	assert.Equal(t, "", u.PathBuilder().String())
	assert.Equal(t, "icon", u.PathBuilder().Icon().String())
	assert.Equal(t, "icon.url", u.PathBuilder().Icon().Url().String())
	assert.Equal(t, "created_at", u.PathBuilder().CreatedAt().String())
	assert.Equal(t, "icon.created_at", u.PathBuilder().Icon().CreatedAt().String())
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

	assert.Equal(t, "id", fe.PathBuilder().Id().String())
	assert.Equal(t, "author.id", fe.PathBuilder().Author().Id().String())
	assert.Equal(t, "author.icon.url", fe.PathBuilder().Author().Icon().Url().String())

}

func TestLocalInOtherFile(t *testing.T) {
	u := user.User{
		Password: &user.UserPassword{
			Password: "123456",
		},
	}

	assert.Equal(t, "password", u.PathBuilder().Password().String())
	assert.Equal(t, "password.password", u.PathBuilder().Password().Password().String())
	assert.Equal(t, "password", u.Password.PathBuilder().Password().String())
	assert.Equal(t, "", u.Password.PathBuilder().String())
}

func TestNested(t *testing.T) {
	i := user.Icon{
		Nested: &user.Icon_Nested{
			SomeField: "some",
		},
	}

	assert.Equal(t, "nested.some_field", i.PathBuilder().Nested().SomeField().String())
	assert.Equal(t, "nested", i.PathBuilder().Nested().String())
	assert.Equal(t, "", i.Nested.PathBuilder().String())
	assert.Equal(t, "some_field", i.Nested.PathBuilder().SomeField().String())
}

func TestWellKnown(t *testing.T) {
	fe := feed.Feed{
		CreatedAt: &timestamppb.Timestamp{
			Seconds: 1,
			Nanos:   2,
		},
	}

	assert.Equal(t, "created_at.seconds", fe.PathBuilder().CreatedAt().Seconds().String())
	assert.Equal(t, "created_at.nanos", fe.PathBuilder().CreatedAt().Nanos().String())

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

	assert.Equal(t, "icon.created_at.seconds", u.PathBuilder().Icon().CreatedAt().Seconds().String())
	assert.Equal(t, "icon.created_at.nanos", u.PathBuilder().Icon().CreatedAt().Nanos().String())
}

func TestEnd(t *testing.T) {
	u := user.User{
		Id: "1",
	}

	assert.Equal(t, "id", u.PathBuilder().Id().String())
	assert.Equal(t, "", u.PathBuilder().String())
	assert.Equal(t, "created_at", u.PathBuilder().CreatedAt().String())             // end at created_at
	assert.Equal(t, "icon.created_at", u.PathBuilder().Icon().CreatedAt().String()) // not end at created_at
}
