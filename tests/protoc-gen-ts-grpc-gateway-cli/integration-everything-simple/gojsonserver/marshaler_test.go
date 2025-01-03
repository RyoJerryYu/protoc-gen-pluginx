package main

import (
	"bytes"
	"testing"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/gatewayx"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/gojsonserver/proto/examplepb"
	"github.com/stretchr/testify/require"
)

func TestGenGoJsonMarshaler_Enum(t *testing.T) {
	m := &gatewayx.GenGoJsonMarshaler{}
	raw := []byte(`"ONE"`)
	var v examplepb.NumericEnum
	err := m.NewDecoder(bytes.NewReader(raw)).Decode(&v)
	require.NoError(t, err)
	require.Equal(t, examplepb.NumericEnum_ONE, v)
}

func TestGenGoJsonMarshaler_EnumSlice(t *testing.T) {
	m := &gatewayx.GenGoJsonMarshaler{}
	raw := []byte(`["ONE","ZERO"]`)
	var v []examplepb.NumericEnum
	err := m.NewDecoder(bytes.NewReader(raw)).Decode(&v)
	require.NoError(t, err)
	require.Equal(t, []examplepb.NumericEnum{examplepb.NumericEnum_ONE, examplepb.NumericEnum_ZERO}, v)
}
