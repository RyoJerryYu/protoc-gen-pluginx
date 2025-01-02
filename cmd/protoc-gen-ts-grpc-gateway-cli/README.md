# protoc-gen-ts-grpc-gateway-cli

This is a CLI tool for generating TypeScript gRPC Gateway client code from gRPC service definitions.

This plugin focuses on generating client code for gRPC Gateway, do not care about the openapi specifiction, or the field_behavior option.

This plugin do not fully responsible for the protobuf message marshal/unmarshal, instead, it depends on the `ts_proto` plugin to generate the marshal/unmarshal code.

This plugin designed to implement the Service Client stubs for gRPC gateway, so it do not support multiple HTTP methods for one RPC (That means it do not care about `google.api.http.additional_bindings` option).

## Work with ts_proto

This plugin depends on some flags of ts_proto:

- `outputJsonMethods`: Should be set to true. This plugin depends on that json methods.
- `outputServices`: ts_proto allow set this flag multiple times. Should include `nice-grpc` . This plugin depends on nice-grpc service interface.

Some flags of ts_proto should be set depends on Server Config:

- `snakeToCamel`: If `MarshalOptions.UseProtoNames` was `true` on serverside, ts_proto should not include `json` on it's `snakeToCamel` flag. (You should set this flag to `keys` or `false` manualy, because it's default to `keys_json`)
- `stringEnums`: protoc_grpc_gateway only allow unmarshal number value when the whole body is just a enum value or repeated enum value. stringEnums should set to `false` for this case.

ts_proto do not check oneof at client code, so the gateway cli do not check the oneof duplicated set.

## Flags

### `marshal_use_proto_names`

Whether to use proto names when marshal and unmarshal JSON or not.

Default to `false` . 
When `MarshalOptions.UseProtoNames` was `true` on serverside, this flag should be `true`,
and `snakeToCamel` flag for ts_proto should be `keys` or `false`.

### `ts_proto_key_snake_to_camel`

Whether to use camel case instead of snake case for TypeScript type defination.

Default to `true` .

Usually it should not be change unless `snakeToCamel` flag for ts_proto was manualy set to `false` or `json`.


## TODO: 

### High priority:

- [x] Create: body did not send in request: body did not annotated in rpc option, should send as query params
- [x] CreateBook: do not support query params for post method
- [x] CheckPostQueryParams: query params did not pass to server in post method
- [x] body field do not work well with repeated field
- [x] body field do not work well with scalar field
- [x] body field do not work well with well-known-types
- [x] UpdateBook: field mask did not remove path params
- [x] ErrorWithDetails: throw error with details
- [x] PostOneofEnum: post body only contain one enum field do not work well: protoc-gen-grpc-gateway do not support: force to use enum number.
- [x] body remove field do not support useProtoNames
- [x] GetRepeatedQuery: path param do not work well with repeated
- [x] GetRepeatedQuery: path param do not work well with repeated enum

### low priority:
- [ ] GetRepeatedQuery: path param do not work well with bytes, required base64
- [ ] Create: query params for map field do not work well
- [ ] Create: query params for repeated message field do not work well
- [ ] Create: query params for bytes field do not work well
- [ ] Create: query params for empty message field do not work well
- [ ] Create: query params for `json_name` do not work well
- [ ] CheckGetQueryParams, CheckNestedEnumGetQueryParams: repeated nested query params did not pass to server

### no plan:
- [ ] Exists,CustomOptionsRequest,TraceRequest: do not work well with custom method
- [ ] camelCaseServiceName: camelCase service names are valid
- [ ] NoBindings: jsonify do not work well with duration: ts_proto do not support
- [ ] ErrorWithDetails: throw nice-grpc-error-details: ts_proto do not support json format for Any
- [ ] body field do not work well with map field: protoc-gen-grpc-gateway do not support

### Features that do not support

Do not support `grpc.gateway.protoc_gen_openapiv2.options`, so that:

- Do not support overwrite request content type and response content type.

Do not support `google.api.field_behavior` , so that:

- Do not support `[(google.api.field_behavior) = REQUIRED]` option and `[(google.api.field_behavior) = OUTPUT_ONLY]` option

Do not support what ts_proto is conflict with protojson, so that:

- json_name do not support when useProtoNames: protojson will ignore json_name when `UseProtoNames=true` , but ts_proto do not ignore it.
