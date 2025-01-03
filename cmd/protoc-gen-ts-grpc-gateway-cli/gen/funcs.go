package gen

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils/tsutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
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

func (g *Generator) pathStr(in string) string {
	return fmt.Sprintf(`pathStr(%s)`, in)
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
				part := fmt.Sprintf(`${%s}`, g.pathStr(g.must("fullReq", fieldNameRaw)))
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
			return tsutils.TSProtoMessageToJson(bodyMsg)(g.TSRegistry, "fullReq"), "*"
		} else if *httpBody == "" {
			return "", ""
		}

		// body in a field
		bodyField := pluginutils.FindFieldByTextName(method.Input, *httpBody)
		return tsutils.TSProtoFieldToJson(bodyField)(g.TSRegistry, g.must("fullReq", *httpBody)), *httpBody
	}
}

func (g *Generator) renderQueryString(r *tsutils.TSOption) func(method *protogen.Method, pathParams []string, bodyParam string) string {
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

		usedParams := urlPathParams[:]
		if bodyParam != "" {
			usedParams = append(usedParams, bodyParam)
		}
		usedParamStrs := make([]string, 0, len(usedParams))
		for _, param := range usedParams {
			param = tsutils.FieldName(&g.TSOption)(param)
			usedParamStrs = append(usedParamStrs, fmt.Sprintf(`"%s"`, param))
		}
		urlPathParamStr := fmt.Sprintf("[%s]", strings.Join(usedParamStrs, ", "))
		renderURLSearchParams := fmt.Sprintf("renderURLSearchParams(req, %s)", urlPathParamStr)
		return renderURLSearchParams
	}
}
