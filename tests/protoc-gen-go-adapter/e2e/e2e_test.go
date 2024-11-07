package e2e

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"google.golang.org/genproto/googleapis/api/annotations"
)

type mockServer struct {
	UnimplementedGreeterServer
}

// SayHello implements GreeterServer.
func (m *mockServer) SayHello(ctx context.Context, req *HelloRequest) (*HelloReply, error) {
	return &HelloReply{Message: req.Name}, nil
}

// SayHelloPost implements GreeterServer.
func (m *mockServer) SayHelloPost(context.Context, *HelloRequest) (*HelloReply, error) {
	panic("unimplemented")
}

// SayHttp implements GreeterServer.
func (m *mockServer) SayHttp(context.Context, *HelloRequest) (*annotations.Http, error) {
	panic("unimplemented")
}

var _ GreeterServer = (*mockServer)(nil)

func TestAdapter(t *testing.T) {
	s := &mockServer{}
	var cli GreeterClient = &GreeterAdapter{in: s}

	res, err := cli.SayHello(context.Background(), &HelloRequest{Name: "world"})
	require.NoError(t, err)
	assert.Equal(t, "world", res.Message)
}
