package gen

import (
	"text/template"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

type Options struct {
	pluginutils.TSOption

	// UseStaticClasses will cause the generator to generate a static class in the form ServiceName.MethodName, which is
	// the legacy behavior for this generator. If set to false, the generator will generate a client class with methods
	// as well as static methods exported for each service method.
	UseStaticClasses bool
	// FetchModuleDirectory is the parameter for directory where fetch module will live
	FetchModuleDirectory string
	// FetchModuleFilename is the file name for the individual fetch module
	FetchModuleFilename string
}

type Generator struct {
	Options
	pluginutils.GenerateOptions
}

func (g *Generator) PTmplStr(tmpl string, data interface{}, funcs ...template.FuncMap) {
	funcs = append(funcs, pluginutils.ServiceFmap())
	funcs = append(funcs, template.FuncMap{
		"renderURL":    g.renderURL(&g.TSOption),
		"buildInitReq": g.buildInitReq,
	})
	g.GenerateOptions.PTmplStr(tmpl, data, funcs...)
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
