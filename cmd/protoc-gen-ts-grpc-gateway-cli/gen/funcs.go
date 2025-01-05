package gen

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils/tsutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/protobufx"
	"github.com/golang/glog"
	"github.com/iancoleman/strcase"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

type httpOptions struct {
	Method string
	URL    string
	Body   *string // nil if no HTTP Option, empty string if no body specified
}

// get the http options for a method
// it will return a valid httpOptions object, even if the method does not have an HTTP annotation
// if the method does not have an HTTP annotation, it will return the default values valid for the unpoulated rpc
func (g *Generator) httpOptions(method *protogen.Method) *httpOptions {
	httpMethod := "POST"
	url := fmt.Sprintf(`/%s/%s`, method.Parent.Desc.FullName(), method.Desc.Name())

	if hasHTTPAnnotation(method.Desc) {
		hm, u := getHTTPMethodPath(method.Desc)
		if hm != "" && u != "" {
			httpMethod = hm
			url = u
		}
	}
	body := getHTTPBody(method.Desc)

	return &httpOptions{
		Method: httpMethod,
		URL:    url,
		Body:   body,
	}
}

var (
	// match {field} or {field=pattern}, return param and pattern
	pathParamRegexp = regexp.MustCompile(`{([^=}/]+)(?:=([^}]+))?}`)
)

func (g *Generator) must(rootName string, rootMsg *protogen.Message, path string) string {
	syntax := g.GetFieldSyntax(&g.TSOption, rootMsg)(rootName, path)
	return fmt.Sprintf(`must(%s)`, syntax)
}

func (g *Generator) pathStr(in string) string {
	return fmt.Sprintf(`pathStr(%s)`, in)
}

func (g *Generator) queryParam(key string, value string) string {
	key = tsutils.JsonFieldName(&g.TSOption)(key)
	return fmt.Sprintf(`queryParam("%s", %s)`, key, value)
}

func (g *Generator) jsonify(in string) string {
	return fmt.Sprintf(`JSON.stringify(%s)`, in)
}

func (g *Generator) MethodName(method *protogen.Method) string {
	return strcase.ToLowerCamel(string(method.GoName))
}

// return (URL string, pathParams)
func (g *Generator) renderPath(r *tsutils.TSOption) func(method *protogen.Method) (string, []string) {
	return func(method *protogen.Method) (string, []string) {
		httpOpts := g.httpOptions(method)
		methodURL := httpOpts.URL
		matches := pathParamRegexp.FindAllStringSubmatch(methodURL, -1)
		fieldsInPath := make([]string, 0, len(matches))
		if len(matches) > 0 {
			glog.V(2).Infof("url matches: %+v", matches)
			for _, m := range matches {
				expToReplace := m[0]
				fieldNameRaw := m[1]
				// fieldValuePattern := m[2]
				part := fmt.Sprintf(`${%s}`, g.pathStr(g.must("fullReq", method.Input, fieldNameRaw)))
				methodURL = strings.ReplaceAll(methodURL, expToReplace, part)
				fieldsInPath = append(fieldsInPath, fieldNameRaw)
			}
		}

		return methodURL, fieldsInPath
	}
}

// return (body jsonify string, bodyParam)
func (g *Generator) renderBody(r *tsutils.TSOption) func(method *protogen.Method) (string, string) {
	return func(method *protogen.Method) (string, string) {
		httpOpts := g.httpOptions(method)
		httpBody := httpOpts.Body

		if httpBody == nil || *httpBody == "*" { // Unpopulated rpc, or body == "*", jsonify the whole message
			bodyMsg := method.Input
			// method.Input should always be a message
			return g.MessageToJson(bodyMsg)(g.TSRegistry, "fullReq"), "*"
		} else if *httpBody == "" {
			return "", ""
		}

		// body in a field
		bodyField := pluginutils.FindFieldByTextName(method.Input, *httpBody)
		return g.FieldToJson(bodyField)(g.TSRegistry, g.must("fullReq", method.Input, *httpBody)), *httpBody
	}
}

func (g *Generator) renderQueryString(r *tsutils.TSOption) func(method *protogen.Method, pathParams []string, bodyParam string) []string {
	return func(method *protogen.Method, urlPathParams []string, bodyParam string) []string {
		// allow query params for all methods, not just GET and DELETE
		// httpOpts := g.httpOptions(method)
		// methodMethod := httpOpts.Method

		if method.Desc.IsStreamingClient() {
			return nil
		}
		if bodyParam == "*" {
			return nil // all fields are in the body, there will be no query params
		}

		usedParams := urlPathParams[:]
		if bodyParam != "" {
			usedParams = append(usedParams, bodyParam)
		}

		allFieldPaths := pluginutils.ListPaths("", method.Input.Desc, pluginutils.EndWithJsonScalar)
		queryParams := pluginutils.Substract(allFieldPaths, usedParams)
		var res []string // [ [param, fieldSyntax] ]
		for _, param := range queryParams {
			field := pluginutils.GetField(method.Input, param)
			if field == nil {
				glog.V(1).Infof("field not found: %s", param)
				continue
			}

			if field.Desc.IsMap() {
				glog.V(1).Infof("not supporting map fields in query params: %s", param)
				continue
			}
			if field.Message != nil && !g.isQueryParamSupportedMessage(field.Message.Desc) {
				glog.V(1).Infof("not supporting message fields in query params: %s", param)
				continue
			}

			getFieldSyntax := g.GetFieldSyntax(&g.TSOption, method.Input)("fullReq", param)
			paramValue := fmt.Sprintf(`%s ? %s : undefined`, getFieldSyntax, g.FieldToJson(field)(g.TSRegistry, getFieldSyntax))

			res = append(res, g.queryParam(param, paramValue))
		}

		return res
	}
}

func (g *Generator) isQueryParamSupportedMessage(msg protoreflect.MessageDescriptor) bool {
	if !protobufx.IsWellKnownType(msg) {
		return false
	}
	notSupportedMessage := []protoreflect.FullName{
		protobufx.Any_message_fullname,
		protobufx.Empty_message_fullname,
		protobufx.Struct_message_fullname,
		protobufx.Value_message_fullname,
		protobufx.ListValue_message_fullname,
		protobufx.Duration_message_fullname,
	}
	for _, n := range notSupportedMessage {
		if msg.FullName() == n {
			return false
		}
	}
	return true
}
