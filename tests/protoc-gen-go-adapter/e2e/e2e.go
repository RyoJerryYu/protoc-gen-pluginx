package e2e

import (
	"context"

	"google.golang.org/genproto/googleapis/api/annotations"
	"google.golang.org/grpc"
)

//go:generate protoc --go_out=. --go_opt=paths=source_relative e2e.proto
//go:generate protoc --go-grpc_out=. --go-grpc_opt=paths=source_relative e2e.proto
//go:generate protoc --grpc-gateway_out=. --grpc-gateway_opt=paths=source_relative e2e.proto
//go:generate protoc --grpc-gateway-client_out=. --grpc-gateway-client_opt=paths=source_relative e2e.proto

type GreeterGatewayClientAdapter struct {
	in GreeterGatewayClient
}

// SayHttp implements GreeterClient.
func (g *GreeterGatewayClientAdapter) SayHttp(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*annotations.Http, error) {
	return g.in.SayHttp(ctx, in)
}

// SayHello implements GreeterClient.
func (g *GreeterGatewayClientAdapter) SayHello(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloReply, error) {
	return g.in.SayHello(ctx, in)
}

// SayHelloPost implements GreeterClient.
func (g *GreeterGatewayClientAdapter) SayHelloPost(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloReply, error) {
	return g.in.SayHelloPost(ctx, in)
}

var _ GreeterClient = (*GreeterGatewayClientAdapter)(nil)

type GreeterServerClientAdapter struct {
	in GreeterServer
}

// SayHttp implements GreeterClient.
func (g *GreeterServerClientAdapter) SayHttp(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*annotations.Http, error) {
	return g.in.SayHttp(ctx, in)
}

// SayHello implements GreeterClient.
func (g *GreeterServerClientAdapter) SayHello(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloReply, error) {
	return g.in.SayHello(ctx, in)
}

// SayHelloPost implements GreeterClient.
func (g *GreeterServerClientAdapter) SayHelloPost(ctx context.Context, in *HelloRequest, opts ...grpc.CallOption) (*HelloReply, error) {
	return g.in.SayHelloPost(ctx, in)
}

var _ GreeterClient = (*GreeterServerClientAdapter)(nil)
