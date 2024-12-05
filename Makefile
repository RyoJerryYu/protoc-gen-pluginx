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

.PHONY: write_version
write_version:
	@echo $(VERSION) > ./pkg/version/VERSION

.PHONY: tag
tag: write_version
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
	@gh pr create --title "Release $(VERSION)" --body "Release version $(VERSION)" --base main --head release/$(VERSION)
