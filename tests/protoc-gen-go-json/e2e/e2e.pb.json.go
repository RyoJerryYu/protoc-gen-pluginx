//Code generated by protoc-gen-go-json. DO NOT EDIT.
//versions:
//- protoc-gen-go-json v1.0.20
//- protoc (unknown)
//source: e2e.proto

package e2e

import (
	protojson "google.golang.org/protobuf/encoding/protojson"
)

// MarshalJSON implements json.Marshaler
func (msg *Basic) MarshalJSON() ([]byte, error) {
	return protojson.MarshalOptions{}.Marshal(msg)
}

// UnmarshalJSON implements json.Unmarshaler
func (msg *Basic) UnmarshalJSON(b []byte) error {
	return protojson.UnmarshalOptions{}.Unmarshal(b, msg)
}

// MarshalJSON implements json.Marshaler
func (msg *Nested) MarshalJSON() ([]byte, error) {
	return protojson.MarshalOptions{}.Marshal(msg)
}

// UnmarshalJSON implements json.Unmarshaler
func (msg *Nested) UnmarshalJSON(b []byte) error {
	return protojson.UnmarshalOptions{}.Unmarshal(b, msg)
}

// MarshalJSON implements json.Marshaler
func (msg *Nested_Message) MarshalJSON() ([]byte, error) {
	return protojson.MarshalOptions{}.Marshal(msg)
}

// UnmarshalJSON implements json.Unmarshaler
func (msg *Nested_Message) UnmarshalJSON(b []byte) error {
	return protojson.UnmarshalOptions{}.Unmarshal(b, msg)
}
