VERSION := "unknown"

BIN := $(shell pwd)/bin
export PATH := $(BIN):$(PATH)

.PHONY: bins
bins:
	@echo "Building binaries..."
	@go build -o $(BIN) ./cmd/...
	@echo "Binaries built."

.PHONY: tools
tools:
	@echo "Installing tools..."
	@cd tests && go mod tidy
	@./tests/tools/tools.sh
	@echo "Tools installed."

.PHONY: generate
generate: tools bins
	@echo "Generating code..."
	@go generate ./...
	@cd tests && go generate ./...
	@echo "Code generated."

.PHONY: test test-unit test-integration
test: test-unit test-integration

test-unit:
	@echo "Running unit tests..."
	@go test -v ./...
	@echo "Unit tests passed."

test-integration: generate
	@echo "Running tests..."
	@cd tests && go test -v ./...
	@echo "Tests passed."

.PHONY: check_version write_version
check_version:
	@if [ "$(VERSION)" = "unknown" ]; then \
		echo "Version not set. Please set the VERSION environment variable."; \
		exit 1; \
	fi

write_version: check_version
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
	@git push origin release/$(VERSION)

# the release command for ci
# do not execute this command locally
# use `make tag` , then create a PR and merge it
# the ci will release the version
.PHONY: release
release:
	@echo "Releasing version..."
	@echo "Version: $(VERSION)"
	@echo "Release go modules"
	@git tag -a $(VERSION) -m "Version $(VERSION)"
	@git push origin $(VERSION)
	@echo "Release buf modules"
	@buf push --git-metadata
	@echo "Version $(VERSION) released."