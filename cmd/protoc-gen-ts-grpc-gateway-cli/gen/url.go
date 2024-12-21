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
	fieldNameFn := pluginutils.FieldName(r)
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
				fieldName := fieldNameFn(fieldNameRaw)
				part := fmt.Sprintf(`${req.%s}`, fieldName)
				methodURL = strings.ReplaceAll(methodURL, expToReplace, part)
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
			renderURLSearchParamsFn := fmt.Sprintf("${fm.renderURLSearchParams(req, %s)}", urlPathParams)
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

	TSProtoJsonify := func(in string, desc protoreflect.Descriptor) string {
		ident := g.QualifiedTSIdent(pluginutils.TSModule_TSProto(desc.ParentFile()).Ident(string(desc.Name())))
		return `JSON.stringify(` + ident + `.toJSON(` + in + `))`
	}
	if httpBody == nil || *httpBody == "*" {
		bodyMsg := method.Input.Desc
		initRes = append(initRes, [2]string{"body", TSProtoJsonify("fullReq", bodyMsg)})
	} else if *httpBody != "" {
		bodyField := method.Input.Desc.Fields().ByTextName(*httpBody)
		var bodyType protoreflect.Descriptor
		switch bodyField.Kind() {
		case protoreflect.MessageKind:
			bodyType = bodyField.Message()
		case protoreflect.EnumKind:
			bodyType = bodyField.Enum()
		default:
			glog.Fatalf("unsupported body field type: %s", bodyField.Kind())
		}
		initRes = append(initRes, [2]string{"body", TSProtoJsonify(`fullReq.`+*httpBody, bodyType)})
	}

	fields := make([]string, 0, len(initRes))
	for _, v := range initRes {
		fields = append(fields, fmt.Sprintf(`%s: %s`, v[0], v[1]))
	}

	return strings.Join(fields, ", ")
}
