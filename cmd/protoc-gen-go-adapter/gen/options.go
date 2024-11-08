package gen

import (
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"google.golang.org/protobuf/compiler/protogen"
)

const (
	ctxPkg  = protogen.GoImportPath("context")
	grpcPkg = protogen.GoImportPath("google.golang.org/grpc")
)

type Options struct {
	NotGenGRPCAdapter       bool // Not generate GRPC adapter, default to generate
	GenGatewayClientAdapter bool // Generate GRPC Gateway client adapter, default not to generate
}

type Generator struct {
	Options
	pluginutils.GenerateOptions
}

func (g *Generator) ApplyTemplate() error {
	for _, svc := range g.F.Services {
		g.applyService(svc)
	}

	return nil
}

func (g *Generator) applyService(svc *protogen.Service) {
	if !g.Options.NotGenGRPCAdapter {
		g.applyGRPCAdapter(svc)
	}

	if g.Options.GenGatewayClientAdapter {
		g.applyGatewayClientAdapter(svc)
	}
}

func (g *Generator) applyGRPCAdapter(svc *protogen.Service) {
	structName := svc.GoName + "Adapter"

	g.PComment(structName, " is the adapter for ", svc.GoName, " server into ", svc.GoName, " client interface")
	g.P("type ", structName, " struct {")
	g.P("    in ", svc.GoName, "Server")
	g.P("}")
	g.Pf("var _ %sClient = (*%s)(nil)", svc.GoName, structName)
	g.P()
	g.Pf("func New%sAdapter(in %sServer) %sClient {", svc.GoName, svc.GoName, svc.GoName)
	g.P("    return &", structName, "{in: in}")
	g.P("}")
	g.P()

	for _, method := range svc.Methods {
		methodApplyer{
			GenerateOptions: g.GenerateOptions,
			structName:      structName,
		}.applyMethod(method)
	}
}

func (g *Generator) applyGatewayClientAdapter(svc *protogen.Service) {
	structName := svc.GoName + "GatewayClientAdapter"

	g.PComment(structName, " is the adapter for ", svc.GoName, " server into ", svc.GoName, " client interface")
	g.P("type ", structName, " struct {")
	g.P("    in ", svc.GoName, "GatewayClient")
	g.P("}")
	g.Pf("var _ %sClient = (*%s)(nil)", svc.GoName, structName)
	g.P()
	g.Pf("func New%sGatewayClientAdapter(in %sGatewayClient) %sClient {", svc.GoName, svc.GoName, svc.GoName)
	g.P("    return &", structName, "{in: in}")
	g.P("}")
	g.P()

	for _, method := range svc.Methods {
		methodApplyer{
			GenerateOptions: g.GenerateOptions,
			structName:      structName,
		}.applyMethod(method)
	}
}

type methodApplyer struct {
	pluginutils.GenerateOptions
	structName string
}

func (g methodApplyer) applyMethod(method *protogen.Method) {
	ctxType := g.W.QualifiedGoIdent(ctxPkg.Ident("Context"))
	inputType := g.W.QualifiedGoIdent(method.Input.GoIdent)
	outputType := g.W.QualifiedGoIdent(method.Output.GoIdent)
	callOptType := g.W.QualifiedGoIdent(grpcPkg.Ident("CallOption"))
	g.Pf("func (a *%s) %s(ctx %s, req *%s, opts ...%s) (*%s, error) {",
		g.structName,
		method.GoName,
		ctxType,
		inputType,
		callOptType,
		outputType,
	)
	g.Pf("    return a.in.%s(ctx, req)", method.GoName)
	g.P("}")
}
