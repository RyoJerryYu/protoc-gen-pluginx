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

// CheckExternalNestedPathEnum implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckExternalNestedPathEnum(context.Context, *pathenum.MessageWithNestedPathEnum) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// CheckExternalPathEnum implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckExternalPathEnum(context.Context, *pathenum.MessageWithPathEnum) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// CheckGetQueryParams implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckGetQueryParams(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// CheckNestedEnumGetQueryParams implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckNestedEnumGetQueryParams(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// CheckPostQueryParams implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckPostQueryParams(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// CheckStatus implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckStatus(context.Context, *emptypb.Empty) (*examplepb.CheckStatusResponse, error) {
	panic("unimplemented")
}

// CreateBody implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CreateBody(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// Custom implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Custom(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// DeepPathEcho implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) DeepPathEcho(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// Delete implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Delete(context.Context, *sub2.IdMessage) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// DoubleColon implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) DoubleColon(context.Context, *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// ErrorWithDetails implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) ErrorWithDetails(context.Context, *emptypb.Empty) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// GetMessageWithBody implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) GetMessageWithBody(context.Context, *examplepb.MessageWithBody) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// GetQuery implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) GetQuery(context.Context, *examplepb.ABitOfEverything) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// GetRepeatedQuery implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) GetRepeatedQuery(context.Context, *examplepb.ABitOfEverythingRepeated) (*examplepb.ABitOfEverythingRepeated, error) {
	panic("unimplemented")
}

// Lookup implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Lookup(context.Context, *sub2.IdMessage) (*examplepb.ABitOfEverything, error) {
	panic("unimplemented")
}

// NoBindings implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) NoBindings(context.Context, *durationpb.Duration) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// OverwriteRequestContentType implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) OverwriteRequestContentType(context.Context, *examplepb.Body) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// OverwriteResponseContentType implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) OverwriteResponseContentType(context.Context, *emptypb.Empty) (*wrapperspb.StringValue, error) {
	panic("unimplemented")
}

// PostOneofEnum implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) PostOneofEnum(context.Context, *oneofenum.OneofEnumMessage) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// PostRequiredMessageType implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) PostRequiredMessageType(context.Context, *examplepb.RequiredMessageTypeRequest) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// PostWithEmptyBody implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) PostWithEmptyBody(context.Context, *examplepb.Body) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// Timeout implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Timeout(context.Context, *emptypb.Empty) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// Update implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Update(context.Context, *examplepb.ABitOfEverything) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// UpdateV2 implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) UpdateV2(context.Context, *examplepb.UpdateV2Request) (*emptypb.Empty, error) {
	panic("unimplemented")
}
