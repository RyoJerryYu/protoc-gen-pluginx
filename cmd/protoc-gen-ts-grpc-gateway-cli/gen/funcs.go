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

var (
	niceGrpcCommon = pluginutils.TSModule{ModuleName: "NiceGrpcCommon", Path: "nice-grpc-common"}
)

type Generator struct {
	Options
	Generator pluginutils.GenerateOptions
	*pluginutils.TSRegistry
}

func (g *Generator) PTmplStr(tmpl string, data interface{}, funcs ...template.FuncMap) {
	funcs = append(funcs, g.ServiceFmap())
	funcs = append(funcs, template.FuncMap{
		"renderURL":    g.renderURL(&g.TSOption),
		"buildInitReq": g.buildInitReq,
	})
	g.TSRegistry.PTmplStr(tmpl, data, funcs...)
}

func (g *Generator) ApplyTemplate() error {
	// g.applyFile()

	// services do not nest, so we can apply them directly
	for _, s := range g.Generator.F.Services {
		g.applyService(s)
	}
	g.Apply(g.Generator.W)
	return nil
}

func (g *Generator) applyFile() {
	g.P(`
type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;
// DeepPartial allow all fields and all sub-fields to be optional.
// Used for rpc Request types.
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
    ? globalThis.Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>;
`)
}

func (g *Generator) applyService(service *protogen.Service) {
	serviceModule := pluginutils.TSModule_TSProto(service.Desc.ParentFile())
	for _, leadingDetached := range service.Comments.LeadingDetached {
		g.P(leadingDetached)
	}
	g.P(service.Comments.Leading)
	g.P("export function new", service.GoName, "(): ", serviceModule.Ident(service.GoName+"Client"), " {")
	g.P("  const initReq = {}")
	g.P("return {")

	for _, method := range service.Methods {
		g.applyMethod(method)
	}
	g.P("};")
	g.P("}")
	g.P(service.Comments.Trailing)
}

func (g *Generator) applyMethod(method *protogen.Method) {
	input := pluginutils.TSModule_TSProto(method.Input.Desc.ParentFile()).Ident(method.Input.GoIdent.GoName)
	output := pluginutils.TSModule_TSProto(method.Output.Desc.ParentFile()).Ident(method.Output.GoIdent.GoName)
	methodModule := pluginutils.TSModule_TSProto(method.Desc.ParentFile())

	g.P(method.Comments.Leading)
	glog.V(3).Infof("method location: %s, %s", method.Location.SourceFile, method.Location.Path)

	if method.Desc.IsStreamingServer() {
		g.Pf(`%s(
		req: %s<%s>,
		entityNotifier?: fm.NotifyStreamEntityArrival<%s>,
		initReq?: fm.InitReq,
	): Promise<void> {
		return fm.fetchStreamingRequest<%s>(%s, entityNotifier, {...req, %s});
  	},
`,
			method.GoName,
			niceGrpcCommon.Ident("DeepPartial"),
			input,
			output,
			output,
			g.renderURL(&g.TSOption)(method),
			g.buildInitReq(method),
		)

	} else {
		// return fm.fetchRequest<%s>(%s, {...req, %s});
		// output,
		// g.renderURL(&g.TSOption)(method),
		// g.buildInitReq(method),
		g.Pf("async %s(", pluginutils.FunctionCase(method.GoName))
		g.Pf("  req: %s<%s>,", methodModule.Ident("DeepPartial"), input)
		g.Pf("  options?: %s,", niceGrpcCommon.Ident("CallOptions"))
		g.Pf("): Promise<%s> {", output)
		g.Pf("  const fullReq = %s.fromPartial(req);", input)
		g.Pf("  const res = await fetch(%s, {...initReq, %s});", g.renderURL(&g.TSOption)(method), g.buildInitReq(method))
		g.Pf("  const body = await res.json();")
		g.Pf("  if (!res.ok) throw body;")
		g.Pf("  return %s.fromJSON(body);", output)
		g.Pf("},")
	}
	g.P(method.Comments.Trailing)
}
