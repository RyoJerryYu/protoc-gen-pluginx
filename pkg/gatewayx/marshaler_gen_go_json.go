package gatewayx

import (
	"encoding/json"
	"io"
	"reflect"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	"google.golang.org/protobuf/encoding/protojson"
)

type GenGoJsonMarshaler struct {
	runtime.JSONPb
}

func (m *GenGoJsonMarshaler) Unmarshal(data []byte, v interface{}) error {
	if jsonUnmarshaler, ok := v.(json.Unmarshaler); ok {
		return jsonUnmarshaler.UnmarshalJSON(data)
	}
	return m.JSONPb.Unmarshal(data, v)
}

func (m *GenGoJsonMarshaler) NewDecoder(r io.Reader) runtime.Decoder {
	return GenGoJsonDecoder{
		jsonDecoder:      json.NewDecoder(r),
		UnmarshalOptions: m.UnmarshalOptions,
	}
}

type GenGoJsonDecoder struct {
	jsonDecoder *json.Decoder
	protojson.UnmarshalOptions
}

func (d GenGoJsonDecoder) Decode(v interface{}) error {
	if _, ok := v.(json.Unmarshaler); ok {
		return d.jsonDecoder.Decode(v)
	}
	val := reflect.ValueOf(v)
	if val.Kind() == reflect.Ptr && !val.IsNil() {
		if val.Elem().Kind() == reflect.Slice {
			return d.jsonDecoder.Decode(v)
		}
	}
	JSONPbDecoder := runtime.DecoderWrapper{
		Decoder:          d.jsonDecoder,
		UnmarshalOptions: d.UnmarshalOptions,
	}

	return JSONPbDecoder.Decode(v)
}
