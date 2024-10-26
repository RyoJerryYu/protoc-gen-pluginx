package e2e

//go:generate go build -o ./protoc-gen-go-enumx ../../../cmd/protoc-gen-go-enumx
//go:generate protoc --plugin=protoc-gen-go-enumx=./protoc-gen-go-enumx --go_out=. --go_opt=paths=source_relative --go-enumx_out=. --go-enumx_opt=paths=source_relative e2e.proto
