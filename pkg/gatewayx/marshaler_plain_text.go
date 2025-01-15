package gatewayx

import (
	"io"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
)

type PlainTextMarshaler struct {
	runtime.Marshaler
}

func (m *PlainTextMarshaler) ContentType(v interface{}) string {
	switch v.(type) {
	case string, []byte:
		return MIMETextPlain
	default:
		return m.Marshaler.ContentType(v)
	}
}

func (m *PlainTextMarshaler) Marshal(v interface{}) ([]byte, error) {
	switch v := v.(type) {
	case string:
		return []byte(v), nil
	case []byte:
		return v, nil
	}
	// if number, bool, or other types, use the default marshaller,
	// JSON marshal would work well for them.
	return m.Marshaler.Marshal(v)
}

func (m PlainTextMarshaler) NewEncoder(w io.Writer) runtime.Encoder {
	return runtime.EncoderFunc(func(v interface{}) error {
		data, err := m.Marshal(v)
		if err != nil {
			return err
		}
		_, err = w.Write(data)
		return err
	})
}
