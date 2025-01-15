package gatewayx

import (
	"bytes"
	"io"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
)

// EventStreamMarshaler is a marshaler that returns each stream message as:
// data: {"result": {...result}}
// This will impliment the MDN EventStream for gRPC-Gateway server stream methods.
// spec: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
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

// UnwrapEventStreamMarshaler is a marshaler that unwraps the result or error field from the response
// it will return the result as:
// data: {...result}
// instead of:
// data: {"result": {...result}}
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
