VERSION := "unknown"


.PHONY: tools
tools:
	@echo "Installing tools..."
	@cd tests && go mod tidy
	@./tests/tools/tools.sh
	@echo "Tools installed."

.PHONY: generate
generate: tools
	@echo "Generating code..."
	@go generate ./...
	@cd tests && go generate ./...
	@echo "Code generated."

.PHONY: test
test: generate
	@echo "Running tests..."
	@cd tests && go test -v ./...
	@echo "Tests passed."

.PHONY: tag
tag:
	@echo "Tagging version..."
	@echo "Version: $(VERSION)"
	@git checkout -b release/$(VERSION)
	@echo $(VERSION) > ./pkg/version/VERSION
	@$(MAKE) test
	@git add .
	@git commit -m "Bump version to $(VERSION)"
	@git tag -a $(VERSION) -m "Version $(VERSION)"
	@git push origin release/$(VERSION)
	@git push origin $(VERSION)
