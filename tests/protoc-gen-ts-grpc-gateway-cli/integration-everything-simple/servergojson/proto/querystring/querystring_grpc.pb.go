// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             (unknown)
// source: proto/querystring/querystring.proto

package querystring

import (
	context "context"
	examplepb "github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/servergojson/proto/examplepb"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

const (
	QueryStringService_GetEnumQuerystring_FullMethodName           = "/proto.querystring.QueryStringService/GetEnumQuerystring"
	QueryStringService_GetStringQuerystring_FullMethodName         = "/proto.querystring.QueryStringService/GetStringQuerystring"
	QueryStringService_GetRepeatedEnumQuerystring_FullMethodName   = "/proto.querystring.QueryStringService/GetRepeatedEnumQuerystring"
	QueryStringService_GetRepeatedStringQuerystring_FullMethodName = "/proto.querystring.QueryStringService/GetRepeatedStringQuerystring"
	QueryStringService_GetTimestampQuerystring_FullMethodName      = "/proto.querystring.QueryStringService/GetTimestampQuerystring"
	QueryStringService_GetWrapperQuerystring_FullMethodName        = "/proto.querystring.QueryStringService/GetWrapperQuerystring"
)

// QueryStringServiceClient is the client API for QueryStringService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type QueryStringServiceClient interface {
	GetEnumQuerystring(ctx context.Context, in *examplepb.ABitOfEverything, opts ...grpc.CallOption) (*examplepb.ABitOfEverything, error)
	GetStringQuerystring(ctx context.Context, in *examplepb.ABitOfEverything, opts ...grpc.CallOption) (*examplepb.ABitOfEverything, error)
	GetRepeatedEnumQuerystring(ctx context.Context, in *examplepb.ABitOfEverything, opts ...grpc.CallOption) (*examplepb.ABitOfEverything, error)
	GetRepeatedStringQuerystring(ctx context.Context, in *examplepb.ABitOfEverything, opts ...grpc.CallOption) (*examplepb.ABitOfEverything, error)
	GetTimestampQuerystring(ctx context.Context, in *WellKnownTypesHolder, opts ...grpc.CallOption) (*WellKnownTypesHolder, error)
	GetWrapperQuerystring(ctx context.Context, in *WellKnownTypesHolder, opts ...grpc.CallOption) (*WellKnownTypesHolder, error)
}

type queryStringServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewQueryStringServiceClient(cc grpc.ClientConnInterface) QueryStringServiceClient {
	return &queryStringServiceClient{cc}
}

func (c *queryStringServiceClient) GetEnumQuerystring(ctx context.Context, in *examplepb.ABitOfEverything, opts ...grpc.CallOption) (*examplepb.ABitOfEverything, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(examplepb.ABitOfEverything)
	err := c.cc.Invoke(ctx, QueryStringService_GetEnumQuerystring_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryStringServiceClient) GetStringQuerystring(ctx context.Context, in *examplepb.ABitOfEverything, opts ...grpc.CallOption) (*examplepb.ABitOfEverything, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(examplepb.ABitOfEverything)
	err := c.cc.Invoke(ctx, QueryStringService_GetStringQuerystring_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryStringServiceClient) GetRepeatedEnumQuerystring(ctx context.Context, in *examplepb.ABitOfEverything, opts ...grpc.CallOption) (*examplepb.ABitOfEverything, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(examplepb.ABitOfEverything)
	err := c.cc.Invoke(ctx, QueryStringService_GetRepeatedEnumQuerystring_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryStringServiceClient) GetRepeatedStringQuerystring(ctx context.Context, in *examplepb.ABitOfEverything, opts ...grpc.CallOption) (*examplepb.ABitOfEverything, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(examplepb.ABitOfEverything)
	err := c.cc.Invoke(ctx, QueryStringService_GetRepeatedStringQuerystring_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryStringServiceClient) GetTimestampQuerystring(ctx context.Context, in *WellKnownTypesHolder, opts ...grpc.CallOption) (*WellKnownTypesHolder, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(WellKnownTypesHolder)
	err := c.cc.Invoke(ctx, QueryStringService_GetTimestampQuerystring_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *queryStringServiceClient) GetWrapperQuerystring(ctx context.Context, in *WellKnownTypesHolder, opts ...grpc.CallOption) (*WellKnownTypesHolder, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(WellKnownTypesHolder)
	err := c.cc.Invoke(ctx, QueryStringService_GetWrapperQuerystring_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// QueryStringServiceServer is the server API for QueryStringService service.
// All implementations must embed UnimplementedQueryStringServiceServer
// for forward compatibility.
type QueryStringServiceServer interface {
	GetEnumQuerystring(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error)
	GetStringQuerystring(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error)
	GetRepeatedEnumQuerystring(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error)
	GetRepeatedStringQuerystring(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error)
	GetTimestampQuerystring(context.Context, *WellKnownTypesHolder) (*WellKnownTypesHolder, error)
	GetWrapperQuerystring(context.Context, *WellKnownTypesHolder) (*WellKnownTypesHolder, error)
	mustEmbedUnimplementedQueryStringServiceServer()
}

// UnimplementedQueryStringServiceServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedQueryStringServiceServer struct{}

func (UnimplementedQueryStringServiceServer) GetEnumQuerystring(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetEnumQuerystring not implemented")
}
func (UnimplementedQueryStringServiceServer) GetStringQuerystring(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetStringQuerystring not implemented")
}
func (UnimplementedQueryStringServiceServer) GetRepeatedEnumQuerystring(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetRepeatedEnumQuerystring not implemented")
}
func (UnimplementedQueryStringServiceServer) GetRepeatedStringQuerystring(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetRepeatedStringQuerystring not implemented")
}
func (UnimplementedQueryStringServiceServer) GetTimestampQuerystring(context.Context, *WellKnownTypesHolder) (*WellKnownTypesHolder, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTimestampQuerystring not implemented")
}
func (UnimplementedQueryStringServiceServer) GetWrapperQuerystring(context.Context, *WellKnownTypesHolder) (*WellKnownTypesHolder, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetWrapperQuerystring not implemented")
}
func (UnimplementedQueryStringServiceServer) mustEmbedUnimplementedQueryStringServiceServer() {}
func (UnimplementedQueryStringServiceServer) testEmbeddedByValue()                            {}

// UnsafeQueryStringServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to QueryStringServiceServer will
// result in compilation errors.
type UnsafeQueryStringServiceServer interface {
	mustEmbedUnimplementedQueryStringServiceServer()
}

func RegisterQueryStringServiceServer(s grpc.ServiceRegistrar, srv QueryStringServiceServer) {
	// If the following call pancis, it indicates UnimplementedQueryStringServiceServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&QueryStringService_ServiceDesc, srv)
}

func _QueryStringService_GetEnumQuerystring_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(examplepb.ABitOfEverything)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryStringServiceServer).GetEnumQuerystring(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: QueryStringService_GetEnumQuerystring_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryStringServiceServer).GetEnumQuerystring(ctx, req.(*examplepb.ABitOfEverything))
	}
	return interceptor(ctx, in, info, handler)
}

func _QueryStringService_GetStringQuerystring_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(examplepb.ABitOfEverything)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryStringServiceServer).GetStringQuerystring(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: QueryStringService_GetStringQuerystring_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryStringServiceServer).GetStringQuerystring(ctx, req.(*examplepb.ABitOfEverything))
	}
	return interceptor(ctx, in, info, handler)
}

func _QueryStringService_GetRepeatedEnumQuerystring_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(examplepb.ABitOfEverything)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryStringServiceServer).GetRepeatedEnumQuerystring(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: QueryStringService_GetRepeatedEnumQuerystring_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryStringServiceServer).GetRepeatedEnumQuerystring(ctx, req.(*examplepb.ABitOfEverything))
	}
	return interceptor(ctx, in, info, handler)
}

func _QueryStringService_GetRepeatedStringQuerystring_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(examplepb.ABitOfEverything)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryStringServiceServer).GetRepeatedStringQuerystring(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: QueryStringService_GetRepeatedStringQuerystring_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryStringServiceServer).GetRepeatedStringQuerystring(ctx, req.(*examplepb.ABitOfEverything))
	}
	return interceptor(ctx, in, info, handler)
}

func _QueryStringService_GetTimestampQuerystring_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(WellKnownTypesHolder)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryStringServiceServer).GetTimestampQuerystring(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: QueryStringService_GetTimestampQuerystring_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryStringServiceServer).GetTimestampQuerystring(ctx, req.(*WellKnownTypesHolder))
	}
	return interceptor(ctx, in, info, handler)
}

func _QueryStringService_GetWrapperQuerystring_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(WellKnownTypesHolder)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(QueryStringServiceServer).GetWrapperQuerystring(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: QueryStringService_GetWrapperQuerystring_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(QueryStringServiceServer).GetWrapperQuerystring(ctx, req.(*WellKnownTypesHolder))
	}
	return interceptor(ctx, in, info, handler)
}

// QueryStringService_ServiceDesc is the grpc.ServiceDesc for QueryStringService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var QueryStringService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "proto.querystring.QueryStringService",
	HandlerType: (*QueryStringServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "GetEnumQuerystring",
			Handler:    _QueryStringService_GetEnumQuerystring_Handler,
		},
		{
			MethodName: "GetStringQuerystring",
			Handler:    _QueryStringService_GetStringQuerystring_Handler,
		},
		{
			MethodName: "GetRepeatedEnumQuerystring",
			Handler:    _QueryStringService_GetRepeatedEnumQuerystring_Handler,
		},
		{
			MethodName: "GetRepeatedStringQuerystring",
			Handler:    _QueryStringService_GetRepeatedStringQuerystring_Handler,
		},
		{
			MethodName: "GetTimestampQuerystring",
			Handler:    _QueryStringService_GetTimestampQuerystring_Handler,
		},
		{
			MethodName: "GetWrapperQuerystring",
			Handler:    _QueryStringService_GetWrapperQuerystring_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/querystring/querystring.proto",
}