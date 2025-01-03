package main

import (
	"testing"

	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/gojsonserver/proto/examplepb"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"google.golang.org/protobuf/encoding/protojson"
)

func TestJsonName(t *testing.T) {
	c := examplepb.ABitOfEverything{
		RequiredFieldBehaviorJsonName: "required_field_behavior_json_name",
		RequiredFieldSchemaJsonName:   "required_field_schema_json_name",
	}

	rawDefault, err := protojson.MarshalOptions{}.Marshal(&c)
	require.NoError(t, err)

	rawUseProtoNames, err := protojson.MarshalOptions{UseProtoNames: true}.Marshal(&c)
	require.NoError(t, err)

	assert.Contains(t, string(rawDefault), "required_field_behavior_json_name_custom")
	assert.Contains(t, string(rawDefault), "required_field_schema_json_name_custom")

	assert.Contains(t, string(rawUseProtoNames), "required_field_behavior_json_name")
	assert.Contains(t, string(rawUseProtoNames), "required_field_schema_json_name")
}
