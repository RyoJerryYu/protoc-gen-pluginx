package main

import (
	"context"

	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/bodyjson"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/examplepb"
)

type BodyJSONService struct {
	bodyjson.UnimplementedBodyJSONServiceServer
}

var _ bodyjson.BodyJSONServiceServer = (*BodyJSONService)(nil)

// PostEnumBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostEnumBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostRepeatedMessageBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostRepeatedMessageBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostRepeatedEnumBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostRepeatedEnumBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostRepeatedStringBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostRepeatedStringBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostStringBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostStringBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostFieldMaskBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostFieldMaskBody(ctx context.Context, req *bodyjson.WellKnownTypesHolder) (*bodyjson.WellKnownTypesHolder, error) {
	return req, nil
}

// PostListValueBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostListValueBody(ctx context.Context, req *bodyjson.WellKnownTypesHolder) (*bodyjson.WellKnownTypesHolder, error) {
	return req, nil
}

// PostStructBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostStructBody(ctx context.Context, req *bodyjson.WellKnownTypesHolder) (*bodyjson.WellKnownTypesHolder, error) {
	return req, nil
}

// PostTimestampBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostTimestampBody(ctx context.Context, req *bodyjson.WellKnownTypesHolder) (*bodyjson.WellKnownTypesHolder, error) {
	return req, nil
}

// PostValueBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostValueBody(ctx context.Context, req *bodyjson.WellKnownTypesHolder) (*bodyjson.WellKnownTypesHolder, error) {
	return req, nil
}

// PostWrapperBody implements bodyjson.BodyJSONServiceServer.
func (b *BodyJSONService) PostWrapperBody(ctx context.Context, req *bodyjson.WellKnownTypesHolder) (*bodyjson.WellKnownTypesHolder, error) {
	return req, nil
}
