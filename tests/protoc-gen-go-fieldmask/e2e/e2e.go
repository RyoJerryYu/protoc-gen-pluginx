package e2e

//go:generate protoc --go_out=. --go_opt=paths=source_relative proto/user/user.proto proto/feed/feed.proto
//go:generate go build -o ./protoc-gen-go-fieldmask ../../../cmd/protoc-gen-go-fieldmask
//go:generate protoc --plugin=protoc-gen-go-fieldmask=./protoc-gen-go-fieldmask --go_out=. --go_opt=paths=source_relative --go-fieldmask_out=. --go-fieldmask_opt=paths=source_relative,logtostderr=true,v=1 proto/user/user_password.proto
//go:generate protoc --plugin=protoc-gen-go-fieldmask=./protoc-gen-go-fieldmask --go_out=. --go_opt=paths=source_relative --go-fieldmask_out=. --go-fieldmask_opt=paths=source_relative,logtostderr=true,v=1 proto/user/user.proto
//go:generate protoc --plugin=protoc-gen-go-fieldmask=./protoc-gen-go-fieldmask --go_out=. --go_opt=paths=source_relative --go-fieldmask_out=. --go-fieldmask_opt=paths=source_relative,logtostderr=true,v=1 proto/feed/feed.proto
