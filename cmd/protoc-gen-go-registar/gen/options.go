package gen

import (
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"google.golang.org/protobuf/compiler/protogen"
)

const (
	ctxPkg     = protogen.GoImportPath("context")
	runtimePkg = protogen.GoImportPath("github.com/grpc-ecosystem/grpc-gateway/v2/runtime")
	grpcPkg    = protogen.GoImportPath("google.golang.org/grpc")
)

type Options struct {
	NotGenGRPC           bool   // Not generate GRPC adapter, default to generate
	GenGateway           bool   // Generate GRPC Gateway client adapter, default not to generate
	GWRegisterFuncSuffix string // Suffix for gateway register function, default to "Handler"
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
	if !g.Options.NotGenGRPC || g.Options.GenGateway {
		g.applyStruct(svc)
	}
	if !g.Options.NotGenGRPC {
		g.applyGRPC(svc)
	}

	if g.Options.GenGateway {
		g.applyGateway(svc)
	}
}

func (g *Generator) structName(svc *protogen.Service) string {
	structName := svc.GoName + "Registar"
	return structName
}

func (g *Generator) applyStruct(svc *protogen.Service) {
	structName := g.structName(svc)

	g.PComment(structName, " is the adapter for ", svc.GoName, " server into ", svc.GoName, " client interface")
	g.P("type ", structName, " struct {")
	g.Pf("    in func()%sServer", svc.GoName)
	g.P("}")
	g.P("")
	g.Pf("func New%s(in func()%sServer) %s {", structName, svc.GoName, structName)
	g.Pf("    return %s{ in: in}", structName)
	g.P("}")
}

func (g *Generator) applyGRPC(svc *protogen.Service) {
	structName := g.structName(svc)

	g.Pf("func (r %s) RegisterServer(server *%s) {", structName, grpcPkg.Ident("Server"))
	g.Pf("    Register%sServer(server, r.in())", svc.GoName)
	g.Pf("}")
}

func (g *Generator) applyGateway(svc *protogen.Service) {
	structName := g.structName(svc)

	g.P("func (r ", structName, ") RegisterGw(ctx ", ctxPkg.Ident("Context"), ", mux *", runtimePkg.Ident("ServeMux"), ", conn *", grpcPkg.Ident("ClientConn"), ") {")
	g.Pf("    Register%s%s(ctx, mux, conn)", svc.GoName, g.Options.GWRegisterFuncSuffix)
	g.Pf("}")
	g.P("func (r ", structName, ") RegisterGwServer(ctx ", ctxPkg.Ident("Context"), ", mux *", runtimePkg.Ident("ServeMux"), ") {")
	g.Pf("    Register%s%sServer(ctx, mux, r.in())", svc.GoName, g.Options.GWRegisterFuncSuffix)
	g.Pf("}")
	g.P("func (r ", structName, ") RegisterGwFromEndpoint(ctx ", ctxPkg.Ident("Context"), ", mux *", runtimePkg.Ident("ServeMux"), ", endpoint string, opts []", grpcPkg.Ident("DialOption"), ") {")
	g.Pf("    Register%s%sFromEndpoint(ctx, mux, endpoint, opts)", svc.GoName, g.Options.GWRegisterFuncSuffix)
	g.Pf("}")
	g.P("func (r ", structName, ") RegisterGwClient(ctx ", ctxPkg.Ident("Context"), ", mux *", runtimePkg.Ident("ServeMux"), ", client ", svc.GoName, "Client) {")
	g.Pf("    Register%s%sClient(ctx, mux, client)", svc.GoName, g.Options.GWRegisterFuncSuffix)
	g.Pf("}")
}
