//Code generated by protoc-gen-go-registar. DO NOT EDIT.
//versions:
//- protoc-gen-go-registar v1.0.30
//- protoc (unknown)
//source: e2e.proto

package e2e

import (
	context "context"
	runtime "github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	grpc "google.golang.org/grpc"
)

// GreeterRegistar  is the adapter for  Greeter  server into  Greeter  client interface
type GreeterRegistar struct {
	in func() GreeterServer
}

func NewGreeterRegistar(in func() GreeterServer) GreeterRegistar {
	return GreeterRegistar{in: in}
}
func (r GreeterRegistar) RegisterServer(server *grpc.Server) {
	RegisterGreeterServer(server, r.in())
}
func (r GreeterRegistar) RegisterGw(ctx context.Context, mux *runtime.ServeMux, conn *grpc.ClientConn) {
	RegisterGreeterHandler(ctx, mux, conn)
}
func (r GreeterRegistar) RegisterGwServer(ctx context.Context, mux *runtime.ServeMux) {
	RegisterGreeterHandlerServer(ctx, mux, r.in())
}
func (r GreeterRegistar) RegisterGwFromEndpoint(ctx context.Context, mux *runtime.ServeMux, endpoint string, opts []grpc.DialOption) {
	RegisterGreeterHandlerFromEndpoint(ctx, mux, endpoint, opts)
}
func (r GreeterRegistar) RegisterGwClient(ctx context.Context, mux *runtime.ServeMux, client GreeterClient) {
	RegisterGreeterHandlerClient(ctx, mux, client)
}
