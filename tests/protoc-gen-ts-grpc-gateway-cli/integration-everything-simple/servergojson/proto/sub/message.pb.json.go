//Code generated by protoc-gen-go-json. DO NOT EDIT.
//versions:
//- protoc-gen-go-json v1.0.29
//- protoc (unknown)
//source: proto/sub/message.proto

package sub

import (
	protojson "google.golang.org/protobuf/encoding/protojson"
)

// MarshalJSON implements json.Marshaler
func (msg *StringMessage) MarshalJSON() ([]byte, error) {
	return protojson.MarshalOptions{}.Marshal(msg)
}

// UnmarshalJSON implements json.Unmarshaler
func (msg *StringMessage) UnmarshalJSON(b []byte) error {
	return protojson.UnmarshalOptions{}.Unmarshal(b, msg)
}
