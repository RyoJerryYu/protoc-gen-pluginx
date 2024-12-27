//go:build tools

package tools

// import the command line tools we used in the project

import (
	_ "github.com/RyoJerryYu/go-utilx/cmd/gogenx"
	_ "github.com/akuity/grpc-gateway-client/protoc-gen-grpc-gateway-client"
	_ "github.com/bold-commerce/protoc-gen-struct-transformer"
	_ "github.com/bufbuild/buf/cmd/buf"
	_ "github.com/dpup/protoc-gen-grpc-gateway-ts"
	_ "github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-grpc-gateway"
	_ "github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2"
	_ "google.golang.org/grpc/cmd/protoc-gen-go-grpc"
	_ "google.golang.org/protobuf/cmd/protoc-gen-go"
)
