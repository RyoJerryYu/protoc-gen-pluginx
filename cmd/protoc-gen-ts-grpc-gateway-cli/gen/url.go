package gen

import (
	"fmt"
	"net/url"
	"regexp"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

type httpOptions struct {
	Method string
	URL    string
	Body   *string
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

func (g *Generator) renderURL(r *pluginutils.TSOption) func(method *protogen.Method) string {
	return func(method *protogen.Method) string {
		// httpMethod, httpURL :=
		httpOpts := g.httpOptions(method)
		methodURL := httpOpts.URL
		methodMethod := httpOpts.Method
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
				fieldName := pluginutils.FieldName(r)(fieldNameRaw)
				fieldsInPath = append(fieldsInPath, fmt.Sprintf(`"%s"`, fieldName))
			}
		}
		urlPathParams := fmt.Sprintf("[%s]", strings.Join(fieldsInPath, ", "))

		// httpMethod

		if !method.Desc.IsStreamingClient() &&
			(methodMethod == "GET" || methodMethod == "DELETE") {
			// parse the url to check for query string
			parsedURL, err := url.Parse(methodURL)
			if err != nil {
				return fmt.Sprintf("`%s`", methodURL)
			}
			renderURLSearchParamsFn := fmt.Sprintf("${new URLSearchParams(renderURLSearchParams(req, %s)).toString()}", urlPathParams)
			// prepend "&" if query string is present otherwise prepend "?"
			// trim leading "&" if present before prepending it
			if parsedURL.RawQuery != "" {
				methodURL = strings.TrimRight(methodURL, "&") + "&" + renderURLSearchParamsFn
			} else {
				methodURL += "?" + renderURLSearchParamsFn
			}
		}
		return fmt.Sprintf("`%s`", methodURL)
	}
}

func (g *Generator) buildInitReq(method *protogen.Method) string {
	httpOpts := g.httpOptions(method)
	httpMethod := httpOpts.Method
	httpBody := httpOpts.Body

	initRes := [][2]string{
		{"method", fmt.Sprintf(`"%s"`, httpMethod)},
	}

	TSProtoJsonify := func(in string, msg *protogen.Message) string {
		ident := g.QualifiedTSIdent(pluginutils.TSIdent_TSProto_Message(msg))
		return `JSON.stringify(` + ident + `.toJSON(` + in + `))`
	}
	if httpBody == nil || *httpBody == "*" {
		bodyMsg := method.Input
		initRes = append(initRes, [2]string{"body", TSProtoJsonify("fullReq", bodyMsg)})
	} else if *httpBody != "" {
		bodyField := pluginutils.FindFieldByTextName(method.Input, *httpBody)
		switch bodyField.Desc.Kind() {
		case protoreflect.MessageKind:
			bodyType := bodyField.Message
			jsonify := TSProtoJsonify(g.must("fullReq", *httpBody), bodyType)
			initRes = append(initRes, [2]string{"body", jsonify})
		case protoreflect.EnumKind:
			bodyType := bodyField.Enum
			enumModule := pluginutils.TSModule_TSProto(bodyType.Desc.ParentFile())
			toJsonIdent := enumModule.Ident(g.TSProto_EnumToJSONFuncName(bodyType.Desc))
			toJsonFunc := g.QualifiedTSIdent(toJsonIdent)
			initRes = append(initRes, [2]string{"body", toJsonFunc + `(` + g.must("fullReq", *httpBody) + `)`})
		default:
			glog.Fatalf("unsupported body field type: %s", bodyField.Desc.Kind())
		}
	}

	fields := make([]string, 0, len(initRes))
	for _, v := range initRes {
		fields = append(fields, fmt.Sprintf(`%s: %s`, v[0], v[1]))
	}

	return strings.Join(fields, ", ")
}

func (g *Generator) must(rootName string, path string) string {
	fieldName := pluginutils.FieldName(&g.TSOption)(path)
	fields := strings.Split(fieldName, ".")
	fieldName = strings.Join(fields, "?.")

	return fmt.Sprintf(`must(%s.%s)`, rootName, fieldName)
}

func (g *Generator) TSProto_EnumToJSONFuncName(enum protoreflect.EnumDescriptor) string {
	return pluginutils.FunctionCase_TSProto(string(enum.Name())) + "ToJSON"
}
