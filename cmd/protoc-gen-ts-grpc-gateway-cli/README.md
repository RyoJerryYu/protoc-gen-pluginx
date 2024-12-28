# protoc-gen-ts-grpc-gateway-cli

This is a CLI tool for generating TypeScript gRPC Gateway client code from gRPC service definitions.

This plugin focuses on generating client code for gRPC Gateway, do not care about the openapi specifiction, or the field_behavior option.

This plugin do not fully responsible for the protobuf message marshal/unmarshal, instead, it depends on the `ts_proto` plugin to generate the marshal/unmarshal code.

### Work with ts_proto

This plugin depends on some flags of ts_proto:

- outputJsonMethods: Should be set to true.
- outputServices: ts_proto allow set this flag multiple times. Should include `nice-grpc` .

Some flags of ts_proto should be set depends on Server Config:

- snakeToCamel: If `MarshalOptions.UseProtoNames` was `true` on serverside, ts_proto should not include `json` . (set to keys or false, which default to keys_json)

ts_proto do not check oneof at client code, so the gateway cli do not check the oneof duplicated set.

### TODO: 

- [ ] body field do not work well with repeated field
- [ ] UpdatePatch: field mask did not remove path params
- [ ] GetRepeatedQuery: path param do not work well with repeated
- [ ] GetRepeatedQuery: path param do not work well with bytes, required base64
- [ ] NoBindings: jsonify do not work well with well-known-types
- [ ] ErrorWithDetails: throw error with details
- [ ] CheckGetQueryParams, CheckNestedEnumGetQueryParams: nested query params did not pass to server
- [ ] CheckPostQueryParams: query params did not pass to server in post method
- [ ] Exists,CustomOptionsRequest,TraceRequest: do not work well with custom method
- [ ] PostOneofEnum: post body only contain one enum field do not work well: need stringify
- [ ] camelCaseServiceName: camelCase service names are valid

### Features that do not support

- Delete: openapiv2_operation security
- OverwriteRequestContentType:     option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {consumes: "application/x-bar-mime"};
- OverwriteResponseContentType:    option (grpc.gateway.protoc_gen_openapiv2.options.openapiv2_operation) = {produces: "application/text"};
- RequiredMessageTypeRequest:      (google.api.field_behavior) = REQUIRED;
