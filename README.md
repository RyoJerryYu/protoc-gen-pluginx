# protoc-gen-pluginx
Useful plugins for protobuf, useful helper classes for protoc plugins, and modules for generating code imports.

## [protoc-gen-go-json](./cmd/protoc-gen-go-json/README.md)

A plugin for generating JSON marshalling and unmarshalling methods using protojson,
works with `protoc-gen-go` .

It is a fork of [github.com/mitchellh/protoc-gen-go-json](https://github.com/mitchellh/protoc-gen-go-json) with some improvements.

## [protoc-gen-go-enumx](./cmd/protoc-gen-go-enumx/README.md)

A plugin for generating enum extension methods, works with `protoc-gen-go` .

## [protoc-gen-go-fieldmask](./cmd/protoc-gen-go-fieldmask/README.md)

A plugin for generating fieldmask paths helper for messages, works with `protoc-gen-go` .

It is a fork of [github.com/idodod/protoc-gen-fieldmask](https://github.com/idodod/protoc-gen-fieldmask) with some improvements.

## [protoc-gen-go-adapter](./cmd/protoc-gen-go-adapter/README.md)

A plugin for generating adapter codes for adapting gRPC server as an gRPC client.

This will be useful when a local sigleton program have many service
implementing the protobuf service, and prefer to call each other
directly in memory without marshalling and unmarshalling the message.
