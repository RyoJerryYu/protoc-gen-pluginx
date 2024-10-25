package e2e

//go:generate go build -o ./protoc-gen-go-json ../../../protoc-gen-go-json
//go:generate protoc --plugin=protoc-gen-go-json=./protoc-gen-go-json --go_out=. --go_opt=paths=source_relative --go-json_out=. --go-json_opt=paths=source_relative e2e.proto
