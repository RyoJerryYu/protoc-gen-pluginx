.PHONY: tools
tools:
	@echo "Installing tools..."
	@./tools/tools.sh

.PHONY: generate
generate: tools
	@echo "Generating code..."
	@go generate ./...

.PHONY: test
test: generate
	@echo "Running tests..."
	@go test -v ./...
