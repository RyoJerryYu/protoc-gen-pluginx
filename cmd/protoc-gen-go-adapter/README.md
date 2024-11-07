# protoc-gen-go-adapter

This is a plugin for the Google Protocol Buffers compiler
[protoc](https://github.com/protocolbuffers/protobuf) that generates
adapter class for gRPC server to adapt into a gRPC client interface.

This will be useful when a local sigleton program have many service
implementing the protobuf service, and prefer to call each other
directly in memory without marshalling and unmarshalling the message.
