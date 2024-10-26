#!/bin/bash

# install go tools that defined in tools.go

cd $(dirname $0)

go mod tidy

# Read the tools.go file and extract import paths
# IMPORT_PATHS=$(awk '/import \(/,/\)/' ./tools.go | grep -oP '(?<=_ ")[^"]+')
IMPORT_PATHS=$(awk '/import \(/,/\)/' ./tools.go | grep -Eo '_ "[^"]+' | cut -d'"' -f2)

# Convert the import paths to an array
ALL_TOOLS=()
while IFS= read -r line; do
    ALL_TOOLS+=("$line")
done <<<"$IMPORT_PATHS"

function tools::install() {
    local __tool=$1
    echo "Installing $__tool"
    go install "$__tool"
}

for tool in "${ALL_TOOLS[@]}"; do
    tools::install "$tool"
done

echo ""
echo "install tools success"