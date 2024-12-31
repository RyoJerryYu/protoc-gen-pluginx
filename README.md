# protoc-gen-pluginx

[![GitHub release (latest by date)](https://img.shields.io/github/v/tag/RyoJerryYu/protoc-gen-pluginx)](https://github.com/RyoJerryYu/protoc-gen-pluginx/tags)
[![GitHub](https://img.shields.io/github/license/RyoJerryYu/protoc-gen-pluginx)](https://github.com/RyoJerryYu/protoc-gen-pluginx/blob/master/LICENSE)
[![Go Reference](https://pkg.go.dev/badge/github.com/RyoJerryYu/protoc-gen-pluginx.svg)](https://pkg.go.dev/github.com/RyoJerryYu/protoc-gen-pluginx)

Useful plugins for protobuf, useful helper classes for protoc plugins, and modules for generating code imports.

## [protoc-gen-go-adapter](./cmd/protoc-gen-go-adapter/README.md) 🚀

A plugin for generating adapter codes for adapting gRPC server as a gRPC client.

This is useful when a local singleton program has many services implementing the protobuf service and prefers to call each other directly in memory without marshalling and unmarshalling the message.

## [protoc-gen-go-enumx](./cmd/protoc-gen-go-enumx/README.md) 🎨

A plugin for generating enum extension methods, works with `protoc-gen-go`.

## [protoc-gen-go-fieldmask](./cmd/protoc-gen-go-fieldmask/README.md) 🛠️

A plugin for generating fieldmask paths helper for messages, works with `protoc-gen-go`.

It is a fork of [github.com/idodod/protoc-gen-fieldmask](https://github.com/idodod/protoc-gen-fieldmask) with some improvements.

## [protoc-gen-go-json](./cmd/protoc-gen-go-json/README.md) 📦

A plugin for generating JSON marshalling and unmarshalling methods using protojson, works with `protoc-gen-go`.

It is a fork of [github.com/mitchellh/protoc-gen-go-json](https://github.com/mitchellh/protoc-gen-go-json) with some improvements.

## [protoc-gen-go-setter](./cmd/protoc-gen-go-setter/README.md) ✨

A plugin for generating setter methods for protobuf messages.

It is useful for different messages to implement the same interface.

## [protoc-gen-ts-grpc-gateway-cli](./cmd/protoc-gen-ts-grpc-gateway-cli/README.md) 🌐

A plugin for generating gRPC-Gateway client stubs for TypeScript.

It has full compatibility with [ts-proto](https://github.com/stephenh/ts-proto) and compatibility with [nice-grpc](https://github.com/deeplay-io/nice-grpc) client interfaces in most situations.

It can cover all the features that the [official gRPC-Gateway Client](https://github.com/grpc-ecosystem/protoc-gen-grpc-gateway-ts) can implement, and it can also cover more features defined in the official documentation.
