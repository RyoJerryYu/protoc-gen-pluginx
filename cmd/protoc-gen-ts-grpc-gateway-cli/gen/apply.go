package gen

import (
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils/tsutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

type Options struct {
	tsutils.TSOption
}

type Generator struct {
	Options
	Generator pluginutils.GenerateOptions
	*tsutils.TSRegistry
	tsutils.Definition
}

func (g *Generator) ApplyTemplate() error {
	g.applyHelperFunc()

	// services do not nest, so we can apply them directly
	for _, s := range g.Generator.F.Services {
		g.applyClientIface(s)
		g.applyService(s)
	}
	g.Apply(g.Generator.W)
	return nil
}

func (g *Generator) applyHelperFunc() {
	s := `
type Primitive = string | boolean | number | Date | Uint8Array | bigint;
export type DeepPartial<T> = T extends Primitive
  ? T
  : T extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>;

/**
 * Convert a primitive value to a string that can be used in a URL search parameter
 */
function toStr(param: Primitive): string {
  if (param instanceof Date) {
    return param.toISOString();
  }

  if (param instanceof Uint8Array) {
    const bin: string[] = [];
    param.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }

  return param.toString();
}

/**
 * Convert a primitive value or an array of primitive values to a string that can be used in a URL path parameter
 */
function pathStr(param: Primitive | Primitive[]): string {
  if (Array.isArray(param)) {
    return param.map((p) => toStr(p)).join(",");
  }
  return toStr(param);
}

/**
 * Convert a key-value pair to a URL search parameter
 */
function queryParam(key: string, value: Primitive | Primitive[] | undefined | null): string[][] {
  if (value === undefined || value === null) {
    return [];
  }
  return Array.isArray(value)
    ? value.map((v) => [key, toStr(v)])
    : [[key, toStr(value)]];
}

/**
 * must is a utility function that throws an error if the given value is null or undefined
 */
function must<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new Error("Value is null or undefined");
  }
  return value;
}

/**
 * CallParams is a type that represents the parameters that are passed to the transport's call method
 */
export type CallParams = {
    path: string,
    method: string,
	headers?: Headers | null,
    queryParams?: string[][],
    body?: BodyInit | null,
}

/**
 * Transport is a type that represents the interface of a transport object
 */
export type Transport = {
  call(
    params: CallParams,
  ): Promise<any>;
}

/**
 * Metadata is a type that represents the metadata that can be passed to a call
 */
export type Metadata = Headers;

/**
 * Client is a type that represents the interface of a client object
 */
export type CallOptions = {
  metadata?: Metadata;
}

function metadataToHeaders(metadata: Metadata): Headers {
  const headers = new Headers();

  metadata.forEach((value, key) => {
    headers.append("Grpc-Metadata-"+key, value);
  })

  return headers;
}
`
	g.P(s)
	g.P("")
}

func (g *Generator) clientIfaceIdent(service *protogen.Service) string {
	return service.GoName + "Client"
}

func (g *Generator) applyClientIface(service *protogen.Service) {
	g.P(service.Comments.Leading)
	g.P("export interface ", g.clientIfaceIdent(service), " {")
	for _, method := range service.Methods {
		if method.Desc.IsStreamingServer() {
			g.Pf("%s(req: DeepPartial<%s>, options?: CallOptions): AsyncIterable<%s>;", g.MethodName(method), g.TSIdentMsg(method.Input), g.TSIdentMsg(method.Output))
			continue
		}
		g.Pf("%s(req: DeepPartial<%s>, options?: CallOptions): Promise<%s>;", g.MethodName(method), g.TSIdentMsg(method.Input), g.TSIdentMsg(method.Output))
	}
	g.P("}")
	g.P(service.Comments.Trailing)
}

func (g *Generator) applyService(service *protogen.Service) {
	g.P(service.Comments.Leading)
	g.P("export function new", service.GoName, "(transport: Transport): ", g.clientIfaceIdent(service), " {")
	g.P("return {")

	for _, method := range service.Methods {
		g.applyMethod(method)
	}
	g.P("};")
	g.P("}")
	g.P(service.Comments.Trailing)
}

func (g *Generator) applyMethod(method *protogen.Method) {
	input := g.TSIdentMsg(method.Input)
	output := g.TSIdentMsg(method.Output)

	g.P(method.Comments.Leading)
	glog.V(3).Infof("method location: %s, %s", method.Location.SourceFile, method.Location.Path)

	if method.Desc.IsStreamingServer() {
		g.Pf("%s(", g.MethodName(method))
		g.Pf("  req: DeepPartial<%s>,", input)
		g.Pf("  options?: CallOptions,")
		g.Pf("): AsyncIterable<%s> {", output)
		g.Pf("  throw new Error('not implemented');")
		g.Pf("},")

	} else {
		g.Pf("async %s(", g.MethodName(method))
		g.Pf("  req: DeepPartial<%s>,", input)
		g.Pf("  options?: CallOptions,")
		g.Pf("): Promise<%s> {", output)
		g.Pf("  const headers = options?.metadata ? metadataToHeaders(options.metadata) : undefined;")
		g.Pf("  const fullReq = %s;", g.MsgFromPartial(method.Input)(g.TSRegistry, "req"))
		// METHOD
		methodMethod := g.httpOptions(method).Method
		// path, return pathParams
		renderedPath, pathParams := g.renderPath(&g.TSOption)(method)
		// body
		renderedBody, bodyParam := g.renderBody(&g.TSOption)(method, pathParams)
		// renderedQuery
		renderedQuery := g.renderQueryString(&g.TSOption)(method, pathParams, bodyParam)

		if len(renderedQuery) > 0 {
			g.Pf("  const queryParams = [")
			for _, qp := range renderedQuery {
				g.P("...", qp, ",")
			}
			g.Pf("  ];")
		}

		if bodyParam != "" {
			g.Pf("  const body: any = %s;", renderedBody)
		}

		g.Pf("  const res = await transport.call({")
		g.Pf("    path: `%s`,", renderedPath)
		g.Pf(`    method: "%s",`, methodMethod)
		g.Pf("    headers: headers,")
		if len(renderedQuery) > 0 {
			g.Pf("    queryParams: queryParams,")
		}
		if renderedBody != "" {
			g.Pf("    body: %s,", g.jsonify("body"))
		}
		g.Pf("  });")
		g.Pf("  return %s;", g.MsgFromJson(method.Output)(g.TSRegistry, "res"))
		g.Pf("},")
	}
	g.P(method.Comments.Trailing)
}
