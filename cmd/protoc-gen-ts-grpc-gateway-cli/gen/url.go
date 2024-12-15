package gen

import (
	"fmt"
	"net/url"
	"regexp"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
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
	pathParamRegexp = regexp.MustCompile(`{([^=]+)(?:=([^}]+))?}`)
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
	m := `method: "` + httpMethod + `"`
	fields := []string{m}
	if httpBody == nil || *httpBody == "*" {
		fields = append(fields, "body: JSON.stringify(req, fm.replacer)")
	} else if *httpBody != "" {
		fields = append(fields, `body: JSON.stringify(req["`+*httpBody+`"], fm.replacer)`)
	}

	return strings.Join(fields, ", ")
}
