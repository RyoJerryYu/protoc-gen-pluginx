package gen

import (
	"fmt"

	"google.golang.org/genproto/googleapis/api/annotations"
	"google.golang.org/protobuf/proto"
	"google.golang.org/protobuf/reflect/protoreflect"
)

func getHTTPAnnotation(m protoreflect.MethodDescriptor) *annotations.HttpRule {
	option := proto.GetExtension(m.Options(), annotations.E_Http)
	return option.(*annotations.HttpRule)
}

func hasHTTPAnnotation(m protoreflect.MethodDescriptor) bool {
	return getHTTPAnnotation(m) != nil
}

// return method, path
func getHTTPMethodPath(m protoreflect.MethodDescriptor) (string, string) {
	if !hasHTTPAnnotation(m) {
		return "", ""
	}

	rule := getHTTPAnnotation(m)
	pattern := rule.Pattern
	switch pattern.(type) {
	case *annotations.HttpRule_Get:
		return "GET", rule.GetGet()
	case *annotations.HttpRule_Post:
		return "POST", rule.GetPost()
	case *annotations.HttpRule_Put:
		return "PUT", rule.GetPut()
	case *annotations.HttpRule_Patch:
		return "PATCH", rule.GetPatch()
	case *annotations.HttpRule_Delete:
		return "DELETE", rule.GetDelete()
	default:
		panic(fmt.Sprintf("unsupported HTTP method %T", pattern))
	}
}

func getHTTPBody(m protoreflect.MethodDescriptor) *string {
	if !hasHTTPAnnotation(m) {
		return nil
	}
	empty := ""
	rule := getHTTPAnnotation(m)
	pattern := rule.Pattern
	switch pattern.(type) {
	case *annotations.HttpRule_Get:
		return &empty
	default:
		body := rule.GetBody()
		return &body
	}
}
