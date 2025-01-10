package gatewayx

import (
	"bytes"
	"io"

	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
)

type EventSourceMarshaler struct {
	runtime.Marshaler
}

func (m *EventSourceMarshaler) ContentType(_ interface{}) string {
	return "text/event-stream"
}

func (m *EventSourceMarshaler) Marshal(v interface{}) ([]byte, error) {
	res := bytes.NewBuffer([]byte("data: "))

	raw, err := m.Marshaler.Marshal(v)
	if err != nil {
		return nil, err
	}

	res.Write(raw)
	res.Write([]byte("\n\n"))
	return res.Bytes(), nil
}

func (m EventSourceMarshaler) NewEncoder(w io.Writer) runtime.Encoder {
	return runtime.EncoderFunc(func(v interface{}) error {
		data, err := m.Marshal(v)
		if err != nil {
			return err
		}
		_, err = w.Write(data)
		return err
	})
}
