package e2e

import (
	"context"

	"google.golang.org/grpc"
)

//go:generate protoc --go_out=. --go_opt=paths=source_relative e2e.proto
//go:generate protoc --go-grpc_out=. --go-grpc_opt=paths=source_relative e2e.proto
//go:generate protoc --grpc-gateway_out=. --grpc-gateway_opt=paths=source_relative e2e.proto
//go:generate protoc --grpc-gateway-client_out=. --grpc-gateway-client_opt=paths=source_relative e2e.proto

type GreeterGatewayClientWrapper struct {
	in GreeterGatewayClient
}

// SayHello implements GreeterClient.
func (g *GreeterGatewayClientWrapper) SayHello(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloReply, error) {
	return g.in.SayHello(ctx, in)
}

// SayHelloPost implements GreeterClient.
func (g *GreeterGatewayClientWrapper) SayHelloPost(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloReply, error) {
	return g.in.SayHelloPost(ctx, in)
}

var _ GreeterClient = (*GreeterGatewayClientWrapper)(nil)

type GreeterServerClientWrapper struct {
	in GreeterServer
}

// SayHello implements GreeterClient.
func (g *GreeterServerClientWrapper) SayHello(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloReply, error) {
	return g.in.SayHello(ctx, in)
}

// SayHelloPost implements GreeterClient.
func (g *GreeterServerClientWrapper) SayHelloPost(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloReply, error) {
	return g.in.SayHelloPost(ctx, in)
}

var _ GreeterClient = (*GreeterServerClientWrapper)(nil)
