# protoc-gen-go-json

This is a plugin for the Google Protocol Buffers compiler
[protoc](https://github.com/protocolbuffers/protobuf) that generates
code to implement [json.Marshaler](https://golang.org/pkg/encoding/json/#Marshaler)
and [json.Unmarshaler](https://golang.org/pkg/encoding/json/#Unmarshaler)
using [protojson](https://pkg.go.dev/google.golang.org/protobuf/encoding/protojson).

This enables Go-generated protobuf messages to be embedded directly within
other structs and encoded with the standard JSON library, since the standard
`encoding/json` library can't encode certain protobuf messages such as
those that contain `oneof` fields.

## Install

```
go get github.com/RyoJerryYu/protoc-gen-go-json
```

Also required:

- [protoc](https://github.com/google/protobuf)
- [protoc-gen-go](https://github.com/golang/protobuf)

## Usage

Define your messages like normal:

```proto
syntax = "proto3";

message Request {
  oneof kind {
    string name = 1;
    int32  code = 2;
  }
}
```

The example message purposely uses a `oneof` since this won't work by
default with `encoding/json`. Next, generate the code:

```
protoc --go_out=. --go-json_out=. request.proto
```

Your output should contain a file `request.pb.json.go` which contains
the implementation of `json.Marshal/Unmarshal` for all your message types.
You can then encode your messages using standard `encoding/json`:

```go
import "encoding/json"

// Marshal
bs, err := json.Marshal(&Request{
  Kind: &Kind_Name{
    Name: "alice",
  },
}

// Unmarshal
var result Request
json.Unmarshal(bs, &result)
```

### Options

The generator supports options has same meaning as `protojson` supports.

#### Marshal Options

- `marshal_allow_partial` - allow messages that have missing required fields to marshal without returning an error. If AllowPartial is false (the default), Marshal will return error if there are any missing required fields.
- `marshal_use_proto_names` - use proto field name instead of lowerCamelCase name in JSON field names.
- `marshal_use_enum_numbers` - emits enum values as numbers
- `marshal_emit_unpopulated` - specifies whether to emit unpopulated fields. It does not emit unpopulated oneof fields or unpopulated extension fields.
- `marshal_emit_default_values` - specifies whether to emit default-valued primitive fields, empty lists, and empty maps.

#### Unmarshal Options

- `unmarshal_allow_partial` - if AllowPartial is set, input for messages that will result in missing required fields will not return an error.
- `unmarshal_discard_unknown` - if DiscardUnknown is set, unknown fields are ignored.

#### Standard Options

It also includes the "standard" options available to all [protogen](https://pkg.go.dev/google.golang.org/protobuf/compiler/protogen?tab=doc)-based plugins:

- `import_path={path}` - Override the import path
- `paths=source_relative` - Derive the output path from the input path
- etc.

### Using With `protoc`

These can be set as part of the `--go-json_out` value:

```sh
protoc --go-json_opt=emit_defaults=true:.
```

You can specify multiple using a `,`:

```sh
protoc --go-json_out=enums_as_ints=true,emit_defaults=true:.
```

Alternatively, you may also specify options using the `--go-json_opt` value:

```sh
protoc --go-json_out:. --go-json_opt=emit_defaults=true,enums_as_ints=true
```