# protoc-gen-go-enumx

`protoc-gen-go-enumx` is a protoc plugin that generates Go enum types from
proto3 enums. This is useful because Go does not have a built-in enum type,
and proto3 enums did not directly implement some methods such as `FromString` , `IsValid` , `All` .
