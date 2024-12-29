package main

import (
	"context"

	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/examplepb"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/oneofenum"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/pathenum"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/sub"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/sub2"
	apistatus "google.golang.org/genproto/googleapis/rpc/status"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/durationpb"
	"google.golang.org/protobuf/types/known/emptypb"
	"google.golang.org/protobuf/types/known/timestamppb"
	"google.golang.org/protobuf/types/known/wrapperspb"
)

type ABitOfEverythingService struct {
	examplepb.UnimplementedABitOfEverythingServiceServer
}

var _ examplepb.ABitOfEverythingServiceServer = (*ABitOfEverythingService)(nil)

func assertErrf(format string, args ...interface{}) error {
	return status.Errorf(codes.InvalidArgument, format, args...)
}

// Create implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Create(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// CreateBody implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CreateBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// CreateBook implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CreateBook(ctx context.Context, req *examplepb.CreateBookRequest) (*examplepb.Book, error) {
	if req.Parent != "publishers/123" {
		return nil, assertErrf("expected req.Parent is publishers/123, got %q", req.Parent)
	}
	if req.BookId != "book_id" {
		return nil, assertErrf("expected req.BookId is book_id, got %q", req.BookId)
	}
	req.Book.Id = req.BookId
	return req.Book, nil
}

// UpdateBook implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) UpdateBook(ctx context.Context, req *examplepb.UpdateBookRequest) (*examplepb.Book, error) {
	if req.AllowMissing {
		return nil, assertErrf("expected req.AllowMissing is false, got %v", req.AllowMissing)
	}
	if req.Book.Name != "publishers/123/books/book_name" {
		return nil, assertErrf("expected req.Book.Name is publishers/123/books/book_name, got %q", req.Book.Name)
	}
	if req.Book.Id != "book_id" {
		return nil, assertErrf("expected req.Book.Id is book_id, got %q", req.Book.Id)
	}

	paths := req.UpdateMask.GetPaths()
	if len(paths) != 1 || paths[0] != "id" {
		return nil, assertErrf("expected req.UpdateMask.Paths is [\"id\"], got %v", paths)
	}

	req.Book.CreateTime = &timestamppb.Timestamp{
		Seconds: 1609459200, // 2021-01-01T00:00:00Z
	}

	return req.Book, nil
}

// Lookup implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Lookup(ctx context.Context, req *sub2.IdMessage) (*examplepb.ABitOfEverything, error) {
	res := aBitOfEverythingNonZero()
	res.Uuid = req.Uuid
	return res, nil
}

// Custom implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Custom(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// DoubleColon implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) DoubleColon(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// Update implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Update(ctx context.Context, req *examplepb.ABitOfEverything) (*emptypb.Empty, error) {
	if req.Uuid != "uuid_in_update" {
		return nil, assertErrf("expected req.Uuid is uuid_in_update, got %q", req.Uuid)
	}

	if req.Int32Value != 42 {
		return nil, assertErrf("expected req.Int32Value is 42, got %d", req.Int32Value)
	}

	return &emptypb.Empty{}, nil
}

// UpdateV2 implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) UpdateV2(ctx context.Context, req *examplepb.UpdateV2Request) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// UpdatePatch implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) UpdatePatch(ctx context.Context, req *examplepb.UpdateV2Request) (*emptypb.Empty, error) {
	if req.Abe.Uuid != "uuid_in_update_patch" {
		return nil, assertErrf("expected req.Abe.Uuid is uuid_in_update_patch, got %q", req.Abe.Uuid)
	}

	if req.Abe.Int32Value != 42 {
		return nil, assertErrf("expected req.Abe.Int32Value is 42, got %d", req.Abe.Int32Value)
	}

	path := req.UpdateMask.GetPaths()
	if len(path) != 1 || path[0] != "int32_value" {
		return nil, assertErrf("expected req.UpdateMask.Paths is [\"int32_value\"], got %v", path)
	}

	return &emptypb.Empty{}, nil
}

// Delete implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Delete(ctx context.Context, req *sub2.IdMessage) (*emptypb.Empty, error) {
	if req.Uuid != "uuid_in_delete" {
		return nil, assertErrf("expected req.Uuid is uuid_in_delete, got %q", req.Uuid)
	}

	return &emptypb.Empty{}, nil
}

// GetRepeatedQuery implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) GetRepeatedQuery(ctx context.Context, req *examplepb.ABitOfEverythingRepeated) (*examplepb.ABitOfEverythingRepeated, error) {
	return req, nil
}

// Echo implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Echo(ctx context.Context, req *sub.StringMessage) (*sub.StringMessage, error) {
	return req, nil
}

// DeepPathEcho implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) DeepPathEcho(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// GetMessageWithBody implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) GetMessageWithBody(ctx context.Context, req *examplepb.MessageWithBody) (*emptypb.Empty, error) {
	if req.Id != "id_with_body" {
		return nil, assertErrf("expected req.Id is id_with_body, got %q", req.Id)
	}
	if req.Data.Name != "name_with_body" {
		return nil, assertErrf("expected req.Data.Name is name_with_body, got %q", req.Data.Name)
	}

	return &emptypb.Empty{}, nil
}

// PostWithEmptyBody implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) PostWithEmptyBody(ctx context.Context, req *examplepb.Body) (*emptypb.Empty, error) {
	if req.Name != "name_with_body" {
		return nil, assertErrf("expected req.Name is name_with_empty_body, got %q", req.Name)
	}

	return &emptypb.Empty{}, nil
}

// CheckGetQueryParams implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckGetQueryParams(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// CheckNestedEnumGetQueryParams implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckNestedEnumGetQueryParams(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// CheckPostQueryParams implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckPostQueryParams(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// OverwriteRequestContentType implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) OverwriteRequestContentType(ctx context.Context, req *examplepb.Body) (*emptypb.Empty, error) {
	if req.Name != "name_with_body" {
		return nil, assertErrf("expected req.Name is name_with_body, got %q", req.Name)
	}

	return &emptypb.Empty{}, nil
}

// OverwriteResponseContentType implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) OverwriteResponseContentType(ctx context.Context, req *emptypb.Empty) (*wrapperspb.StringValue, error) {
	return &wrapperspb.StringValue{Value: "response_string_value"}, nil
}

// CheckExternalPathEnum implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckExternalPathEnum(ctx context.Context, req *pathenum.MessageWithPathEnum) (*emptypb.Empty, error) {
	if req.Value != pathenum.PathEnum_DEF {
		return nil, assertErrf("expected req.Value is PathEnum_DEF, got %q", req.Value)
	}

	return &emptypb.Empty{}, nil
}

// CheckExternalNestedPathEnum implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckExternalNestedPathEnum(ctx context.Context, req *pathenum.MessageWithNestedPathEnum) (*emptypb.Empty, error) {
	if req.Value != pathenum.MessagePathEnum_JKL {
		return nil, assertErrf("expected req.Value is MessagePathEnum_JKL, got %q", req.Value)
	}

	return &emptypb.Empty{}, nil
}

// CheckStatus implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) CheckStatus(ctx context.Context, req *emptypb.Empty) (*examplepb.CheckStatusResponse, error) {
	return &examplepb.CheckStatusResponse{
		Status: &apistatus.Status{
			Code:    int32(codes.PermissionDenied),
			Message: "OK",
		},
	}, nil
}

// PostOneofEnum implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) PostOneofEnum(ctx context.Context, req *oneofenum.OneofEnumMessage) (*emptypb.Empty, error) {
	switch v := req.One.(type) {
	case *oneofenum.OneofEnumMessage_ExampleEnum:
	default:
		return nil, assertErrf("expected req.One is OneofEnumMessage_ExampleEnum, got %T", v)
	}

	v := req.GetExampleEnum()
	if v != oneofenum.ExampleEnum_EXAMPLE_ENUM_FIRST {
		return nil, assertErrf("expected req.ExampleEnum is EXAMPLE_ENUM_FIRST, got %q", v)
	}

	return &emptypb.Empty{}, nil
}

// PostRequiredMessageType implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) PostRequiredMessageType(ctx context.Context, req *examplepb.RequiredMessageTypeRequest) (*emptypb.Empty, error) {
	if req.Id != "id_required_message_type" {
		return nil, assertErrf("expected req.Id is id, got %q", req.Id)
	}

	if req.Foo.Bar.Id != "id_foo_bar" {
		return nil, assertErrf("expected req.Foo.Bar.Id is id_foo_bar, got %q", req.Foo.Bar.Id)
	}

	return &emptypb.Empty{}, nil
}

// PostRepeatedMessageBody implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) PostRepeatedMessageBody(ctx context.Context, req *examplepb.ABitOfEverything) (*examplepb.ABitOfEverything, error) {
	return req, nil
}

// ErrorWithDetails implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) ErrorWithDetails(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// GetQuery implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) GetQuery(ctx context.Context, req *examplepb.ABitOfEverything) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// NoBindings implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) NoBindings(ctx context.Context, req *durationpb.Duration) (*emptypb.Empty, error) {
	panic("unimplemented")
}

// Timeout implements examplepb.ABitOfEverythingServiceServer.
func (a *ABitOfEverythingService) Timeout(ctx context.Context, req *emptypb.Empty) (*emptypb.Empty, error) {
	panic("unimplemented")
}

/*
*

	function newABitOfEverythingNonZero(): ABitOfEverything {
	  return {
	    singleNested: {
	      name: "nested",
	      amount: 1,
	      ok: ABitOfEverything_Nested_DeepEnum.TRUE,
	    },
	    uuid: "uuid",
	    nested: [
	      {
	        name: "nested",
	        amount: 1,
	        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
	      },
	    ],
	    floatValue: 1.1,
	    doubleValue: 1.1,
	    int64Value: 1,
	    uint64Value: 1,
	    int32Value: 1,
	    fixed64Value: 1,
	    fixed32Value: 1,
	    boolValue: true,
	    stringValue: "string",
	    bytesValue: new Uint8Array([1, 2, 3]),
	    uint32Value: 1,
	    enumValue: NumericEnum.ONE,
	    pathEnumValue: PathEnum.DEF,
	    nestedPathEnumValue: MessagePathEnum_NestedPathEnum.JKL,
	    sfixed32Value: 1,
	    sfixed64Value: 1,
	    sint32Value: 1,
	    sint64Value: 1,
	    repeatedStringValue: ["string"],
	    oneofEmpty: {},
	    oneofString: undefined, // oneofEmpty was set, so this should be ignored
	    mapValue: {
	      some_one: NumericEnum.ONE,
	      some_zero: NumericEnum.ZERO,
	    },
	    mappedStringValue: {
	      some_one: "one",
	      some_zero: "zero",
	    },
	    mappedNestedValue: {
	      some_one: {
	        name: "one",
	        amount: 1,
	        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
	      },
	      some_zero: {
	        name: "zero",
	        amount: 0,
	        ok: ABitOfEverything_Nested_DeepEnum.FALSE,
	      },
	    },
	    nonConventionalNameValue: "string",
	    timestampValue: new Date("2021-01-01T00:00:00Z"),
	    repeatedEnumValue: [NumericEnum.ONE],
	    repeatedEnumAnnotation: [NumericEnum.ONE],
	    enumValueAnnotation: NumericEnum.ONE,
	    repeatedStringAnnotation: ["string"],
	    repeatedNestedAnnotation: [
	      {
	        name: "nested",
	        amount: 1,
	        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
	      },
	    ],
	    nestedAnnotation: {
	      name: "nested",
	      amount: 1,
	      ok: ABitOfEverything_Nested_DeepEnum.TRUE,
	    },
	    int64OverrideType: 1,
	    requiredStringViaFieldBehaviorAnnotation: "string",
	    outputOnlyStringViaFieldBehaviorAnnotation: "string",
	    optionalStringValue: "string",
	    productId: ["string"],
	    optionalStringField: "string",
	    requiredStringField1: "string",
	    requiredStringField2: "string",
	    requiredFieldBehaviorJsonName: "string",
	    requiredFieldSchemaJsonName: "string",
	    trailingOnly: "string",
	    trailingOnlyDot: "string",
	    trailingBoth: "string",
	    trailingMultiline: "string",
	    uuids: ["uuid"],
	  };
	}
*/
func aBitOfEverythingNonZero() *examplepb.ABitOfEverything {
	return &examplepb.ABitOfEverything{
		SingleNested: &examplepb.ABitOfEverything_Nested{
			Name:   "nested",
			Amount: 1,
			Ok:     examplepb.ABitOfEverything_Nested_TRUE,
		},
		Uuid: "uuid",
		Nested: []*examplepb.ABitOfEverything_Nested{
			{
				Name:   "nested",
				Amount: 1,
				Ok:     examplepb.ABitOfEverything_Nested_TRUE,
			},
		},
		FloatValue:          1.1,
		DoubleValue:         1.1,
		Int64Value:          1,
		Uint64Value:         1,
		Int32Value:          1,
		Fixed64Value:        1,
		Fixed32Value:        1,
		BoolValue:           true,
		StringValue:         "string",
		BytesValue:          []byte{1, 2, 3},
		Uint32Value:         1,
		EnumValue:           examplepb.NumericEnum_ONE,
		PathEnumValue:       pathenum.PathEnum_DEF,
		NestedPathEnumValue: pathenum.MessagePathEnum_JKL,
		Sfixed32Value:       1,
		Sfixed64Value:       1,
		Sint32Value:         1,
		Sint64Value:         1,
		RepeatedStringValue: []string{"string"},
		OneofValue: &examplepb.ABitOfEverything_OneofEmpty{
			OneofEmpty: &emptypb.Empty{},
		},
		MapValue: map[string]examplepb.NumericEnum{
			"some_one":  examplepb.NumericEnum_ONE,
			"some_zero": examplepb.NumericEnum_ZERO,
		},
		MappedStringValue: map[string]string{
			"some_one":  "one",
			"some_zero": "zero",
		},
		MappedNestedValue: map[string]*examplepb.ABitOfEverything_Nested{
			"some_one": {
				Name:   "one",
				Amount: 1,
				Ok:     examplepb.ABitOfEverything_Nested_TRUE,
			},
			"some_zero": {
				Name:   "zero",
				Amount: 0,
				Ok:     examplepb.ABitOfEverything_Nested_FALSE,
			},
		},
		NonConventionalNameValue: "string",
		TimestampValue: &timestamppb.Timestamp{
			Seconds: 1609459200, // 2021-01-01T00:00:00Z
		},
		RepeatedEnumValue: []examplepb.NumericEnum{
			examplepb.NumericEnum_ONE,
		},
		RepeatedEnumAnnotation: []examplepb.NumericEnum{
			examplepb.NumericEnum_ONE,
		},
		EnumValueAnnotation:      examplepb.NumericEnum_ONE,
		RepeatedStringAnnotation: []string{"string"},
		RepeatedNestedAnnotation: []*examplepb.ABitOfEverything_Nested{
			{
				Name:   "nested",
				Amount: 1,
				Ok:     examplepb.ABitOfEverything_Nested_TRUE,
			},
		},
		NestedAnnotation: &examplepb.ABitOfEverything_Nested{
			Name:   "nested",
			Amount: 1,
			Ok:     examplepb.ABitOfEverything_Nested_TRUE,
		},
		Int64OverrideType:                          1,
		RequiredStringViaFieldBehaviorAnnotation:   "string",
		OutputOnlyStringViaFieldBehaviorAnnotation: "string",
		OptionalStringValue:                        StringPtr("string"),
		ProductId:                                  []string{"string"},
		OptionalStringField:                        "string",
		RequiredStringField_1:                      "string",
		RequiredStringField_2:                      "string",
		RequiredFieldBehaviorJsonName:              "string",
		RequiredFieldSchemaJsonName:                "string",
		TrailingOnly:                               "string",
		TrailingOnlyDot:                            "string",
		TrailingBoth:                               "string",
		TrailingMultiline:                          "string",
		Uuids:                                      []string{"uuid"},
	}
}

func StringPtr(s string) *string {
	return &s
}
