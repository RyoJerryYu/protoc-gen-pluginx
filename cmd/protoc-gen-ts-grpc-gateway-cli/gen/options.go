package gen

import (
	"fmt"
	"log/slog"
	"net/url"
	"regexp"
	"strings"
	"text/template"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

type Options struct {
	UseProtoNames    bool
	UseStaticClasses bool
	EmitUnpopulated  bool

	FetchModuleDirectory string
	FetchModuleFilename  string
	TsImportRoots        string
	TsImportRootAliases  string

	EnableStylingCheck bool
}

type Generator struct {
	Options
	pluginutils.GenerateOptions
}

func (g *Generator) PTmplStr(tmpl string, data interface{}, funcs ...template.FuncMap) {
	r := pluginutils.Registry{
		TSOption: pluginutils.TSOption{
			UseProtoNames: g.UseProtoNames,
		},
	}
	funcs = append(funcs, pluginutils.ServiceFmap())
	funcs = append(funcs, template.FuncMap{
		"renderURL":    renderURL(&r),
		"buildInitReq": buildInitReq,
	})
	g.GenerateOptions.PTmplStr(tmpl, data, funcs...)
}
func renderURL(r *pluginutils.Registry) func(method *protogen.Method) string {
	fieldNameFn := pluginutils.FieldName(r)
	return func(method *protogen.Method) string {
		methodURL := "method.URL"
		reg := regexp.MustCompile("{([^}]+)}")
		matches := reg.FindAllStringSubmatch(methodURL, -1)
		fieldsInPath := make([]string, 0, len(matches))
		if len(matches) > 0 {
			slog.Debug("url matches", slog.Any("matches", matches))
			for _, m := range matches {
				expToReplace := m[0]
				fieldName := fieldNameFn(m[1])
				part := fmt.Sprintf(`${req.%s}`, fieldName)
				methodURL = strings.ReplaceAll(methodURL, expToReplace, part)
				fieldsInPath = append(fieldsInPath, fmt.Sprintf(`"%s"`, fieldName))
			}
		}
		urlPathParams := fmt.Sprintf("[%s]", strings.Join(fieldsInPath, ", "))

		if !method.Desc.IsStreamingClient() &&
			// (method.HTTPMethod == "GET" || method.HTTPMethod == "DELETE")
			true {
			// parse the url to check for query string
			parsedURL, err := url.Parse(methodURL)
			if err != nil {
				return methodURL
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
		return methodURL
	}
}

func buildInitReq(method *protogen.Method) string {
	httpMethod := "method.HTTPMethod"
	m := `method: "` + httpMethod + `"`
	fields := []string{m}
	// if method.HTTPRequestBody == nil || *method.HTTPRequestBody == "*" {
	// 	fields = append(fields, "body: JSON.stringify(req, fm.replacer)")
	// } else if *method.HTTPRequestBody != "" {
	// 	fields = append(fields, `body: JSON.stringify(req["`+*method.HTTPRequestBody+`"], fm.replacer)`)
	// }

	return strings.Join(fields, ", ")
}

func (g *Generator) ApplyTemplate() error {
	// services do not nest, so we can apply them directly
	for _, s := range g.F.Services {
		g.applyService(s)
	}
	return nil
}

func (g *Generator) applyService(service *protogen.Service) {
	for _, leadingDetached := range service.Comments.LeadingDetached {
		g.P(leadingDetached)
	}
	g.P("export class ", service.GoName, " {")
	g.P(service.Comments.Leading)

	for _, method := range service.Methods {
		g.applyMethod(method)
	}
	g.P("}")
	g.P(service.Comments.Trailing)
}

func (g *Generator) applyMethod(method *protogen.Method) {
	for _, leadingDetached := range method.Comments.LeadingDetached {
		g.P(leadingDetached)
	}
	g.P(method.Comments.Leading)
	glog.V(3).Infof("method location: %s, %s", method.Location.SourceFile, method.Location.Path)
	if method.Desc.IsStreamingServer() {
		tmpl := `
  static {{.GoName}}(this:void, req: {{tsType .Input, .Location}}, entityNotifier?: fm.NotifyStreamEntityArrival<{{tsType .Output .Location}}>, initReq?: fm.InitReq): Promise<void> {
    return fm.fetchStreamingRequest<{{tsType .Output .Location}}>({{renderURL .}}, entityNotifier, {...initReq, {{buildInitReq .}}});
  }
`
		g.PTmplStr(tmpl, method)
	} else {
		tmpl := `
  static {{.GoName}}(this:void, req: {{tsType .Input .Location}}, initReq?: fm.InitReq): Promise<{{tsType .Output .Location}}> {
    return fm.fetchRequest<{{tsType .Output .Location}}>({{renderURL .}}, {...initReq, {{buildInitReq .}}});
  }
`
		g.PTmplStr(tmpl, method)
	}
	g.P(method.Comments.Trailing)
}
