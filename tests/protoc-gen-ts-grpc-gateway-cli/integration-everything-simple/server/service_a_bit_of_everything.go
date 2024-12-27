package main

import (
	"context"

	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/examplepb"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/oneofenum"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/pathenum"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/sub2"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

type ABitOfEverythingService struct {
	examplepb.UnimplementedABitOfEverythingServiceServer
}

var _ examplepb.ABitOfEverythingServiceServer = (*ABitOfEverythingService)(nil)

// CreateBody implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CreateBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// CheckExternalNestedPathEnum implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckExternalNestedPathEnum(ctx context.Context, req *pathenum.MessageWithNestedPathEnum) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// CheckExternalPathEnum implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckExternalPathEnum(ctx context.Context, req *pathenum.MessageWithPathEnum) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// CheckGetQueryParams implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckGetQueryParams(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// CheckNestedEnumGetQueryParams implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckNestedEnumGetQueryParams(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// CheckPostQueryParams implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckPostQueryParams(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// CheckStatus implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckStatus(ctx context.Context, req *emptypb.Empty) (*examplepb.CheckStatusResponse, error) {
	panic("unimplemented")
}

// Custom implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Custom(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// DeepPathEcho implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) DeepPathEcho(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// Delete implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Delete(ctx context.Context, req *sub2.IdMessage) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// DoubleColon implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) DoubleColon(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// ErrorWithDetails implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) ErrorWithDetails(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// GetMessageWithBody implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) GetMessageWithBody(ctx context.Context, req *examplepb.MessageWithBody) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// GetQuery implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) GetQuery(ctx context.Context, req *examplepb.ABitOfEverything) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// GetRepeatedQuery implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) GetRepeatedQuery(ctx context.Context, req *examplepb.ABitOfEverythingRepeated) (*examplepb.ABitOfEverythingRepeated, error) {
	panic("unimplemented")
}

// Lookup implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Lookup(ctx context.Context, req *sub2.IdMessage) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// NoBindings implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) NoBindings(ctx context.Context, req *durationpb.Duration) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// OverwriteRequestContentType implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) OverwriteRequestContentType(ctx context.Context, req *examplepb.Body) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// OverwriteResponseContentType implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) OverwriteResponseContentType(ctx context.Context, req *emptypb.Empty) (*wrapperspb.StringValue, error) {
	panic("unimplemented")
}

// PostOneofEnum implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) PostOneofEnum(ctx context.Context, req *oneofenum.OneofEnumMessage) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// PostRequiredMessageType implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) PostRequiredMessageType(ctx context.Context, req *examplepb.RequiredMessageTypeRequest) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// PostWithEmptyBody implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) PostWithEmptyBody(ctx context.Context, req *examplepb.Body) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// Timeout implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Timeout(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// Update implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Update(ctx context.Context, req *examplepb.ABitOfEverything) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// UpdateV2 implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) UpdateV2(ctx context.Context, req *examplepb.UpdateV2Request) (*emptypb.Empty, error) {
	panic("unimplemented")
}
