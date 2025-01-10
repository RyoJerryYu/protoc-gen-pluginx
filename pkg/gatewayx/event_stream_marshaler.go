package gatewayx

import (
	"bytes"
	"io"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
)

type EventStreamMarshaler struct {
	runtime.Marshaler
}

func (m *EventStreamMarshaler) ContentType(_ interface{}) string {
	return "text/event-stream"
}

func (m *EventStreamMarshaler) Marshal(v interface{}) ([]byte, error) {
	res := bytes.NewBuffer([]byte("data: "))

	raw, err := m.Marshaler.Marshal(v)
	if err != nil {
		return nil, err
	}

	res.Write(raw)
	res.Write([]byte("\n\n"))
	return res.Bytes(), nil
}

func (m EventStreamMarshaler) NewEncoder(w io.Writer) runtime.Encoder {
	return runtime.EncoderFunc(func(v interface{}) error {
		data, err := m.Marshal(v)
		if err != nil {
			return err
		}
		_, err = w.Write(data)
		return err
	})
}

type UnwrapEventStreamMarshaler struct {
	runtime.Marshaler
}

func (m *UnwrapEventStreamMarshaler) ContentType(_ interface{}) string {
	return "text/event-stream"
}

func (m *UnwrapEventStreamMarshaler) Marshal(v interface{}) ([]byte, error) {
	res := bytes.NewBuffer([]byte("data: "))

	if vmap, ok := v.(map[string]interface{}); ok {
		if result, ok := vmap["result"]; ok {
			v = result
		} else if errorJson, ok := vmap["error"]; ok {
			v = errorJson
		}
	}

	raw, err := m.Marshaler.Marshal(v)
	if err != nil {
		return nil, err
	}

	res.Write(raw)
	res.Write([]byte("\n\n"))
	return res.Bytes(), nil
}

func (m UnwrapEventStreamMarshaler) NewEncoder(w io.Writer) runtime.Encoder {
	return runtime.EncoderFunc(func(v interface{}) error {
		data, err := m.Marshal(v)
		if err != nil {
			return err
		}
		_, err = w.Write(data)
		return err
	})
}
