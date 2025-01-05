#!/bin/bash

set -e

TEST_DIR=$(dirname $0)
cd $TEST_DIR

INTEGRATION_TEST_DIR=(
    "protoc-gen-ts-grpc-gateway-cli/integration-protoc-gen-grpc-gateway-ts"
    "protoc-gen-ts-grpc-gateway-cli/integration-everything-simple"
)

for dir in ${INTEGRATION_TEST_DIR[@]}; do
    echo "Running integration test in $dir"
    cd $dir
    ./run.js
    cd -
done
