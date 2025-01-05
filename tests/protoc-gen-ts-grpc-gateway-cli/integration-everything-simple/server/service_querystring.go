package main

import (
	"context"

	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/examplepb"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/paramtest"
)

type QueryStringService struct {
	paramtest.UnimplementedQueryStringServiceServer
}

var _ paramtest.QueryStringServiceServer = (*QueryStringService)(nil)

// GetEnumQuerystring implements querystring.QueryStringServiceServer.
func (q *QueryStringService) GetEnumQuerystring(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// GetRepeatedEnumQuerystring implements querystring.QueryStringServiceServer.
func (q *QueryStringService) GetRepeatedEnumQuerystring(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// GetRepeatedStringQuerystring implements querystring.QueryStringServiceServer.
func (q *QueryStringService) GetRepeatedStringQuerystring(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// GetStringQuerystring implements querystring.QueryStringServiceServer.
func (q *QueryStringService) GetStringQuerystring(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// GetTimestampQuerystring implements querystring.QueryStringServiceServer.
func (q *QueryStringService) GetTimestampQuerystring(ctx context.Context, req *paramtest.WellKnownTypesHolder) (*paramtest.WellKnownTypesHolder, error) {
	return req, nil
}

// GetWrapperQuerystring implements querystring.QueryStringServiceServer.
func (q *QueryStringService) GetWrapperQuerystring(ctx context.Context, req *paramtest.WellKnownTypesHolder) (*paramtest.WellKnownTypesHolder, error) {
	return req, nil
}
