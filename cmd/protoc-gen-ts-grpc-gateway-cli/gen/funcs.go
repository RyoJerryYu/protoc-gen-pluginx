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

func (g *Generator) TSProto_EnumToJSONFuncName(enum protoreflect.EnumDescriptor) string {
	return tsutils.FunctionCase_TSProto(string(enum.Name())) + "ToJSON"
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

// return (body jsonify string, bodyParam)
func (g *Generator) renderBody(r *tsutils.TSOption) func(method *protogen.Method) (string, string) {
	return func(method *protogen.Method) (string, string) {
		httpOpts := g.httpOptions(method)
		httpBody := httpOpts.Body

		TSProtoJsonify := func(in string, msg *protogen.Message) string {
			ident := g.QualifiedTSIdent(tsutils.TSIdent_TSProto_Message(msg))
			return `JSON.stringify(` + ident + `.toJSON(` + in + `))`
		}
		if httpBody == nil || *httpBody == "*" {
			bodyMsg := method.Input
			return TSProtoJsonify("fullReq", bodyMsg), "*"
		} else if *httpBody == "" {
			return "", ""
		}

		// body in a field
		bodyField := pluginutils.FindFieldByTextName(method.Input, *httpBody)
		switch bodyField.Desc.Kind() {
		case protoreflect.MessageKind:
			bodyType := bodyField.Message
			return TSProtoJsonify(g.must("fullReq", *httpBody), bodyType), *httpBody
		case protoreflect.EnumKind:
			bodyType := bodyField.Enum
			enumModule := tsutils.TSModule_TSProto(bodyType.Desc.ParentFile())
			toJsonIdent := enumModule.Ident(g.TSProto_EnumToJSONFuncName(bodyType.Desc))
			toJsonFunc := g.QualifiedTSIdent(toJsonIdent)
			return toJsonFunc + `(` + g.must("fullReq", *httpBody) + `)`, *httpBody
		default:
			glog.Fatalf("unsupported body field type: %s", bodyField.Desc.Kind())
			return "", ""
		}
	}
}
