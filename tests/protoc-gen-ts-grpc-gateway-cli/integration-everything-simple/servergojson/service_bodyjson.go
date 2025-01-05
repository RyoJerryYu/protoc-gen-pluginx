package main

import (
	"context"

	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/servergojson/proto/examplepb"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/servergojson/proto/paramtest"
)

type BodyJSONService struct {
	paramtest.UnimplementedBodyJSONServiceServer
}

var _ paramtest.BodyJSONServiceServer = (*BodyJSONService)(nil)

// PostEnumBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostEnumBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostRepeatedMessageBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostRepeatedMessageBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostRepeatedEnumBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostRepeatedEnumBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostRepeatedStringBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostRepeatedStringBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostStringBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostStringBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostMapEnumBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostMapEnumBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostMapMessageBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostMapMessageBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostMapStringBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostMapStringBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// PostFieldMaskBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostFieldMaskBody(ctx context.Context, req *paramtest.WellKnownTypesHolder) (*paramtest.WellKnownTypesHolder, error) {
	return req, nil
}

// PostListValueBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostListValueBody(ctx context.Context, req *paramtest.WellKnownTypesHolder) (*paramtest.WellKnownTypesHolder, error) {
	return req, nil
}

// PostStructBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostStructBody(ctx context.Context, req *paramtest.WellKnownTypesHolder) (*paramtest.WellKnownTypesHolder, error) {
	return req, nil
}

// PostTimestampBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostTimestampBody(ctx context.Context, req *paramtest.WellKnownTypesHolder) (*paramtest.WellKnownTypesHolder, error) {
	return req, nil
}

// PostValueBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostValueBody(ctx context.Context, req *paramtest.WellKnownTypesHolder) (*paramtest.WellKnownTypesHolder, error) {
	return req, nil
}

// PostWrapperBody implements paramtest.BodyJSONServiceServer.
func (b *BodyJSONService) PostWrapperBody(ctx context.Context, req *paramtest.WellKnownTypesHolder) (*paramtest.WellKnownTypesHolder, error) {
	return req, nil
}
