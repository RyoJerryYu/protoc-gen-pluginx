package gen

import (
	"fmt"
	"regexp"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils/tsutils"
	"github.com/golang/glog"
	"github.com/iancoleman/strcase"
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

func (g *Generator) must(rootName string, rootMsg *protogen.Message, path string) string {
	syntax := g.GetFieldSyntax(&g.TSOption, rootMsg)(rootName, path)
	return fmt.Sprintf(`must(%s)`, syntax)
}

func (g *Generator) pathStr(in string) string {
	return fmt.Sprintf(`pathStr(%s)`, in)
}

func (g *Generator) queryParam(rootMsg *protogen.Message, key string, value string) string {
	key = g.JsonFieldPath(&g.TSOption, rootMsg)(key)
	return fmt.Sprintf(`queryParam("%s", %s)`, key, value)
}

func (g *Generator) jsonify(in string) string {
	return fmt.Sprintf(`JSON.stringify(%s)`, in)
}
func (g Generator) statementify(in string) string {
	return fmt.Sprintf("(()=>{\n%s\n})()", in)
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
func (g *Generator) renderBody(r *tsutils.TSOption) func(method *protogen.Method, pathParams []string) (string, string) {
	return func(method *protogen.Method, pathParams []string) (string, string) {
		httpOpts := g.httpOptions(method)
		httpBody := "*"         // for unpopulated method, body is always "*"
		bodyMsg := method.Input // Unpopulated rpc, or body == "*", jsonify the whole message
		if httpOpts.Body != nil {
			httpBody = *httpOpts.Body
		}

		if httpBody == "" {
			// only when httpOption exists on method, but body is not specified
			return "", ""
		}

		toJsonStatement := ""
		if httpBody != "*" {
			// body in a field, must found
			bodyField := pluginutils.GetField(method.Input, httpBody)
			toJsonStatement = g.FieldToJson(bodyField)(g.TSRegistry, g.must("fullReq", method.Input, httpBody))
			bodyMsg = bodyField.Message // may be nil
		} else {
			// method.Input should always be a message
			toJsonStatement = g.MessageToJson(method.Input)(g.TSRegistry, "fullReq")
		}

		if bodyMsg == nil {
			// non-message body, no need to deal with path params
			// early return
			return toJsonStatement, httpBody
		}

		deleteStatements := make([]string, 0, len(pathParams))
		for _, pathParam := range pathParams {
			fieldOnBody := pathParam
			if httpBody != "*" {
				if !strings.HasPrefix(pathParam, httpBody+".") {
					// not a param in body, skip
					continue
				}
				fieldOnBody = strings.TrimPrefix(pathParam, httpBody+".")
			}

			deleteStatement := fmt.Sprintf(`delete body.%s;`, g.JsonFieldPath(r, bodyMsg)(fieldOnBody))
			deleteStatements = append(deleteStatements, deleteStatement)
		}

		if len(deleteStatements) == 0 {
			// early return
			return toJsonStatement, httpBody
		}

		buildBody := fmt.Sprintf(`const body: any = %s;
%s;
return body;`, toJsonStatement, strings.Join(deleteStatements, "\n"))

		return g.statementify(buildBody), httpBody
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
			if field.Message != nil && !g.MsgScalarable(field.Message) {
				glog.V(1).Infof("not supporting message fields in query params: %s", param)
				continue
			}

			getFieldSyntax := g.GetFieldSyntax(r, method.Input)("fullReq", param)
			paramValue := getFieldSyntax
			switch {
			case field.Desc.IsList():
				paramValue = g.FieldToJson(field)(g.TSRegistry, getFieldSyntax)
			case field.Message != nil:
				paramValue = fmt.Sprintf(`%s ? %s : undefined`, getFieldSyntax, g.FieldToJson(field)(g.TSRegistry, getFieldSyntax))
			}

			res = append(res, g.queryParam(method.Input, param, paramValue))
		}

		return res
	}
}
