package gatewayx

import (
	"encoding/json"
	"io"
	"reflect"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
)

type GenGoJsonMarshaler struct {
	runtime.JSONPb
}

func (m *GenGoJsonMarshaler) Unmarshal(data []byte, v interface{}) error {
	if _, ok := v.(json.Unmarshaler); ok {
		return json.Unmarshal(data, v)
	}
	val := reflect.ValueOf(v)
	if val.Kind() == reflect.Ptr && !val.IsNil() {
		if val.Elem().Kind() == reflect.Slice {
			return json.Unmarshal(data, v)
		}
	}
	return m.JSONPb.Unmarshal(data, v)
}

func (m *GenGoJsonMarshaler) NewDecoder(r io.Reader) runtime.Decoder {
	return runtime.DecoderFunc(func(v interface{}) error {
		data, err := io.ReadAll(r)
		if err != nil {
			return err
		}
		return m.Unmarshal(data, v)
	})
}
