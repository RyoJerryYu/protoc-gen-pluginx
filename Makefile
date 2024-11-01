VERSION := "unknown"


.PHONY: tools
tools:
	@echo "Installing tools..."
	@./tests/tools/tools.sh

.PHONY: generate
generate: tools
	@echo "Generating code..."
	@cd tests && go generate ./...

.PHONY: test
test: generate
	@echo "Running tests..."
	@cd tests && go test -v ./...

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
