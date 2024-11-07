package e2e

//go:generate go build -o ./protoc-gen-go-adapter ../../../cmd/protoc-gen-go-adapter
//go:generate protoc --go_out=. --go_opt=paths=source_relative e2e.proto
//go:generate protoc --go-grpc_out=. --go-grpc_opt=paths=source_relative e2e.proto
//go:generate protoc --grpc-gateway_out=. --grpc-gateway_opt=paths=source_relative e2e.proto
//go:generate protoc --grpc-gateway-client_out=. --grpc-gateway-client_opt=paths=source_relative e2e.proto
//go:generate protoc --plugin=protoc-gen-go-adapter=./protoc-gen-go-adapter --go-adapter_out=. --go-adapter_opt=paths=source_relative,gen_gateway_client_adapter=true,logtostderr=true e2e.proto
