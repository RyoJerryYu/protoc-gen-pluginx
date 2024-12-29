package gen

import (
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils/tsutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

type Options struct {
	tsutils.TSOption

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
	niceGrpcCommon = tsutils.TSModule{ModuleName: "NiceGrpcCommon", Path: "nice-grpc-common"}
	jsBase64       = tsutils.TSModule{ModuleName: "JsBase64", Path: "js-base64"}
)

type Generator struct {
	Options
	Generator pluginutils.GenerateOptions
	*tsutils.TSRegistry
}

func (g *Generator) ApplyTemplate() error {
	g.applyHelperFunc()

	// services do not nest, so we can apply them directly
	for _, s := range g.Generator.F.Services {
		g.applyService(s)
	}
	g.Apply(g.Generator.W)
	return nil
}

func (g *Generator) applyHelperFunc() {
	s := `
type Primitive = string | boolean | number;
type RequestPayload = Record<string, unknown>;
type FlattenedRequestPayload = Record<string, Primitive | Primitive[]>;

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
  return ["string", "number", "boolean"].some((t) => typeof value === t);
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
        ? [...acc, ...value.map((m) => [key, m.toString()])]
        : (acc = [...acc, [key, value.toString()]]);
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
`
	g.P(s)
	g.Pf(`function metadataToHeaders(metadata: %s): Headers {
  const headers = new Headers();

  for (const [key, values] of metadata) {
    for (const value of values) {
      headers.append(
        key,
        typeof value === 'string' ? value : %s.fromUint8Array(value),
      );
    }
  }

  return headers;
}
`,
		niceGrpcCommon.Ident("Metadata"),
		jsBase64.Ident("Base64"),
	)
	g.P("")
}

func (g *Generator) applyService(service *protogen.Service) {
	serviceModule := tsutils.TSModule_TSProto(service.Desc.ParentFile())
	for _, leadingDetached := range service.Comments.LeadingDetached {
		g.P(leadingDetached)
	}
	g.P(service.Comments.Leading)
	g.P("export function new", service.GoName, "(transport: Transport): ", serviceModule.Ident(service.GoName+"Client"), " {")
	g.P("return {")

	for _, method := range service.Methods {
		g.applyMethod(method)
	}
	g.P("};")
	g.P("}")
	g.P(service.Comments.Trailing)
}

func (g *Generator) applyMethod(method *protogen.Method) {
	input := tsutils.TSIdent_TSProto_Message(method.Input)
	output := tsutils.TSIdent_TSProto_Message(method.Output)
	methodModule := tsutils.TSModule_TSProto(method.Desc.ParentFile())

	g.P(method.Comments.Leading)
	glog.V(3).Infof("method location: %s, %s", method.Location.SourceFile, method.Location.Path)

	if method.Desc.IsStreamingServer() {
		g.Pf("%s(", tsutils.FunctionCase_TSProto(method.GoName))
		g.Pf("  req: %s<%s>,", methodModule.Ident("DeepPartial"), input)
		g.Pf("  options?: %s,", niceGrpcCommon.Ident("CallOptions"))
		g.Pf("): AsyncIterable<%s> {", output)
		g.Pf("  throw new Error('not implemented');")
		g.Pf("},")

	} else {
		g.Pf("async %s(", tsutils.FunctionCase_TSProto(method.GoName))
		g.Pf("  req: %s<%s>,", methodModule.Ident("DeepPartial"), input)
		g.Pf("  options?: %s,", niceGrpcCommon.Ident("CallOptions"))
		g.Pf("): Promise<%s> {", output)
		g.Pf("  const headers = options?.metadata ? metadataToHeaders(options.metadata) : undefined;")
		g.Pf("  const fullReq = %s.fromPartial(req);", input)
		// METHOD
		methodMethod := g.httpOptions(method).Method
		// path, return pathParams
		renderedPath, pathParams := g.renderPath(&g.TSOption)(method)
		// body
		renderedBody, bodyParam := g.renderBody(&g.TSOption)(method)
		// queryParams
		queryParams := g.renderQueryString(&g.TSOption)(method, pathParams, bodyParam)

		g.Pf("  const res = await transport.call({")
		g.Pf("    path: `%s`,", renderedPath)
		g.Pf(`    method: "%s",`, methodMethod)
		g.Pf("    headers: headers,")
		if queryParams != "" {
			g.Pf("    queryParams: %s,", queryParams)
		}
		if renderedBody != "" {
			g.Pf("    body: %s,", g.jsonify(renderedBody))
		}
		g.Pf("  });")
		g.Pf("  return %s.fromJSON(res);", output)
		g.Pf("},")
	}
	g.P(method.Comments.Trailing)
}
