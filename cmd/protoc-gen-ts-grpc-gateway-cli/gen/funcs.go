package gen

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils/tsutils"
	"github.com/golang/glog"
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

func (g *Generator) must(rootName string, path string) string {
	fieldName := tsutils.FieldName(&g.TSOption)(path)
	fields := strings.Split(fieldName, ".")
	fieldName = strings.Join(fields, "?.")

	return fmt.Sprintf(`must(%s.%s)`, rootName, fieldName)
}

func (g *Generator) jsonify(in string) string {
	return fmt.Sprintf(`JSON.stringify(%s)`, in)
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
				part := fmt.Sprintf(`${%s}`, g.must("fullReq", fieldNameRaw))
				methodURL = strings.ReplaceAll(methodURL, expToReplace, part)
				fieldName := tsutils.FieldName(r)(fieldNameRaw)
				fieldsInPath = append(fieldsInPath, fieldName)
			}
		}

		return methodURL, fieldsInPath
	}
}

func (g *Generator) renderQueryString(r *tsutils.TSOption) func(method *protogen.Method, urlPathParams []string, bodyParam string) string {
	return func(method *protogen.Method, urlPathParams []string, bodyParam string) string {
		// allow query params for all methods, not just GET and DELETE
		// httpOpts := g.httpOptions(method)
		// methodMethod := httpOpts.Method

		if method.Desc.IsStreamingClient() {
			return ""
		}
		if bodyParam == "*" {
			return "" // all fields are in the body, there will be no query params
		}
		usedParamStrs := make([]string, 0, len(urlPathParams))
		for _, pathParam := range urlPathParams {
			usedParamStrs = append(usedParamStrs, fmt.Sprintf(`"%s"`, pathParam))
		}
		if bodyParam != "" {
			usedParamStrs = append(usedParamStrs, fmt.Sprintf(`"%s"`, bodyParam))
		}
		urlPathParamStr := fmt.Sprintf("[%s]", strings.Join(usedParamStrs, ", "))
		renderURLSearchParams := fmt.Sprintf("renderURLSearchParams(req, %s)", urlPathParamStr)
		return renderURLSearchParams
	}
}

func (g *Generator) listify(in string, do func(string) string) string {
	return fmt.Sprintf(`(%s).map((e)=>%s)`, in, do("e"))
}

// return (body jsonify string, bodyParam)
func (g *Generator) renderBody(r *tsutils.TSOption) func(method *protogen.Method) (string, string) {
	return func(method *protogen.Method) (string, string) {
		httpOpts := g.httpOptions(method)
		httpBody := httpOpts.Body

		if httpBody == nil || *httpBody == "*" { // Unpopulated rpc, or body == "*", jsonify the whole message
			bodyMsg := method.Input
			// method.Input should always be a message
			return tsutils.TSProtoMessageToJson(bodyMsg)(g.TSRegistry, "fullReq"), "*"
		} else if *httpBody == "" {
			return "", ""
		}

		// body in a field
		bodyField := pluginutils.FindFieldByTextName(method.Input, *httpBody)
		isList := bodyField.Desc.IsList()

		var toJsonFunc func(g *tsutils.TSRegistry, in string) string
		switch bodyField.Desc.Kind() {
		case protoreflect.MessageKind:
			bodyType := bodyField.Message
			toJsonFunc = tsutils.TSProtoMessageToJson(bodyType)
		case protoreflect.EnumKind:
			bodyType := bodyField.Enum
			toJsonFunc = tsutils.TSProtoEnumToJson(bodyType)
		default:
			glog.Fatalf("unsupported body field type: %s", bodyField.Desc.Kind())
			return "", ""
		}

		if isList {
			return g.listify(g.must("fullReq", *httpBody), func(e string) string {
				return toJsonFunc(g.TSRegistry, e)
			}), *httpBody
		}

		return toJsonFunc(g.TSRegistry, g.must("fullReq", *httpBody)), *httpBody
	}
}
