package e2e

// type ServiceRegistar interface {
// 	RegisterServer(grpcServer *grpc.Server)
// 	RegisterGw(ctx context.Context, mux *runtime.ServeMux, cliConn *grpc.ClientConn)
// 	RegisterGwServer(ctx context.Context, mux *runtime.ServeMux)
// 	RegisterGwFromEndpoint(ctx context.Context, mux *runtime.ServeMux, endpoint string, opts []grpc.DialOption)
// }

// type mockServer struct {
// 	UnimplementedGreeterServer
// }

// // SayHello implements GreeterServer.
// func (m *mockServer) SayHello(ctx context.Context, req *HelloRequest) (*HelloReply, error) {
// 	return &HelloReply{Message: req.Name}, nil
// }

// // SayHelloPost implements GreeterServer.
// func (m *mockServer) SayHelloPost(context.Context, *HelloRequest) (*HelloReply, error) {
// 	panic("unimplemented")
// }

// // SayHttp implements GreeterServer.
// func (m *mockServer) SayHttp(context.Context, *HelloRequest) (*annotations.Http, error) {
// 	panic("unimplemented")
// }

// var _ GreeterServer = (*mockServer)(nil)

// func TestAdapter(t *testing.T) {
// 	newSvr := func() GreeterServer {
// 		return &mockServer{}
// 	}

// 	require.NotPanics(t, func() {
// 		registar := NewGreeterRegistar(newSvr)
// 		registar.RegisterServer(grpc.NewServer())
// 		registar.RegisterGw(context.Background(), runtime.NewServeMux(), nil)
// 		registar.RegisterGwServer(context.Background(), runtime.NewServeMux())
// 		registar.RegisterGwFromEndpoint(context.Background(), runtime.NewServeMux(), "", nil)
// 	})
// }
