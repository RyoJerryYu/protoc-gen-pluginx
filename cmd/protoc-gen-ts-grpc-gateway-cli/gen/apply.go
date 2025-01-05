package gen

import (
	"strings"

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
type Primitive = string | boolean | number | Date | Uint8Array;
type RequestPayload = Record<string, unknown>;
type FlattenedRequestPayload = Record<string, Primitive | Primitive[]>;
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
 * Checks if given value is a plain object
 * Logic copied and adapted from below source:
 * https://github.com/char0n/ramda-adjunct/blob/master/src/isPlainObj.js
 */
function isPlainObject(value: unknown): boolean {
  const isObject =
    Object.prototype.toString.call(value).slice(8, -1) === "Object";
  const isObjLike = value !== null && isObject;

  if (!isObjLike || !isObject) {
    return false;
  }

  const proto: unknown = Object.getPrototypeOf(value);

  const hasObjectConstructor = !!(
    proto &&
    typeof proto === "object" &&
    proto.constructor === Object.prototype.constructor
  );

  return hasObjectConstructor;
}

/**
 * Checks if given value is of a primitive type
 */
function isPrimitive(value: unknown): boolean {
  if(["string", "number", "boolean"].some((t) => typeof value === t)) {
    return true;
  }

  if( value instanceof Date) {
    return true;
  }

  if (value instanceof Uint8Array) {
    return true;
  }

  return false;
}

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
 * Flattens a deeply nested request payload and returns an object
 * with only primitive values and non-empty array of primitive values
 * as per https://github.com/googleapis/googleapis/blob/master/google/api/http.proto
 */
function flattenRequestPayload<T extends RequestPayload>(
  requestPayload: T,
  path = ""
): FlattenedRequestPayload {
  return Object.keys(requestPayload).reduce((acc: T, key: string): T => {
    const value = requestPayload[key];
    const newPath = path ? [path, key].join(".") : key;

    const isNonEmptyPrimitiveArray =
      Array.isArray(value) &&
      value.every((v) => isPrimitive(v)) &&
      value.length > 0;

    let objectToMerge = {};

    if (isPlainObject(value)) {
      objectToMerge = flattenRequestPayload(value as RequestPayload, newPath);
    } else if (isPrimitive(value) || isNonEmptyPrimitiveArray) {
      objectToMerge = { [newPath]: value };
    }

    return { ...acc, ...objectToMerge };
  }, {} as T) as FlattenedRequestPayload;
}

/**
 * Renders a deeply nested request payload into a string of URL search
 * parameters by first flattening the request payload and then removing keys
 * which are already present in the URL path.
 */
function renderURLSearchParams<T extends RequestPayload>(
  requestPayload: T,
  urlPathParams: string[] = []
): string[][] {
  const flattenedRequestPayload = flattenRequestPayload(requestPayload);

  const urlSearchParams = Object.keys(flattenedRequestPayload).reduce(
    (acc: string[][], key: string): string[][] => {
      // key should not be present in the url path as a parameter
      const value = flattenedRequestPayload[key];
      if (urlPathParams.find((f) => f === key)) {
        return acc;
      }
      return Array.isArray(value)
        ? [...acc, ...value.map((m) => [key, toStr(m)])]
        : (acc = [...acc, [key, toStr(value)]]);
    },
    [] as string[][]
  );

  return urlSearchParams;
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

  for (const [key, values] of metadata) {
    for (const value of values) {
      headers.append("Grpc-Metadata-"+key, value);
    }
  }

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
		renderedBody, bodyParam := g.renderBody(&g.TSOption)(method)
		// queryParams
		queryParams := g.renderQueryString(&g.TSOption)(method, pathParams, bodyParam)

		if renderedBody != "" {
			g.Pf("  const body: any = %s;", renderedBody)
			// body jsonify special case
			// remove the path params from the body
			for _, pathParam := range pathParams {
				fieldOnBody := pathParam
				if bodyParam != "*" {
					fieldOnBody = strings.TrimPrefix(pathParam, bodyParam+".")
				}
				// it must exist because it's a path param
				g.Pf("  delete body.%s;", tsutils.JsonFieldName(&g.TSOption)(fieldOnBody))
			}
		}

		g.Pf("  const res = await transport.call({")
		g.Pf("    path: `%s`,", renderedPath)
		g.Pf(`    method: "%s",`, methodMethod)
		g.Pf("    headers: headers,")
		if queryParams != "" {
			g.Pf("    queryParams: %s,", queryParams)
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
