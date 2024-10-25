.PHONY: generate
generate:
	@echo "Generating code..."
	@go generate ./...

.PHONY: test
test:
	@echo "Running tests..."
	@go test -v ./...