# protoc-gen-ts-grpc-gateway-cli

This is a CLI tool for generating TypeScript gRPC Gateway client code from gRPC service definitions.

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
