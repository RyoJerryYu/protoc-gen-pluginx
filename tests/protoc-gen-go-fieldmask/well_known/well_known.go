package well_known

//go:generate go build -o ./protoc-gen-go-fieldmask ../../../cmd/protoc-gen-go-fieldmask
//go:generate protoc --plugin=protoc-gen-go-fieldmask=./protoc-gen-go-fieldmask --go_out=. --go_opt=paths=source_relative --go-fieldmask_out=. --go-fieldmask_opt=paths=source_relative well_known.proto
