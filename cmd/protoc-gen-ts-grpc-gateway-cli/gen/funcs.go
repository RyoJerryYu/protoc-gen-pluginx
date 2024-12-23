package gen

import (
	"fmt"
	"strings"
	"text/template"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
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
	jsBase64       = pluginutils.TSModule{ModuleName: "JsBase64", Path: "js-base64"}
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
	serviceModule := pluginutils.TSModule_TSProto(service.Desc.ParentFile())
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
	input := pluginutils.TSIdent_TSProto_Message(method.Input)
	output := pluginutils.TSIdent_TSProto_Message(method.Output)
	methodModule := pluginutils.TSModule_TSProto(method.Desc.ParentFile())

	g.P(method.Comments.Leading)
	glog.V(3).Infof("method location: %s, %s", method.Location.SourceFile, method.Location.Path)

	if method.Desc.IsStreamingServer() {
		g.Pf("%s(", pluginutils.FunctionCase_TSProto(method.GoName))
		g.Pf("  req: %s<%s>,", methodModule.Ident("DeepPartial"), input)
		g.Pf("  options?: %s,", niceGrpcCommon.Ident("CallOptions"))
		g.Pf("): AsyncIterable<%s> {", output)
		g.Pf("  throw new Error('not implemented');")
		g.Pf("},")

	} else {
		g.Pf("async %s(", pluginutils.FunctionCase_TSProto(method.GoName))
		g.Pf("  req: %s<%s>,", methodModule.Ident("DeepPartial"), input)
		g.Pf("  options?: %s,", niceGrpcCommon.Ident("CallOptions"))
		g.Pf("): Promise<%s> {", output)
		g.Pf("  const headers = options?.metadata ? metadataToHeaders(options.metadata) : undefined;")
		g.Pf("  const fullReq = %s.fromPartial(req);", input)
		// METHOD
		methodMethod := g.httpOptions(method).Method
		// path, return pathParams
		renderedPath, pathParams := g.renderPath(&g.TSOption)(method)
		// queryParams
		queryParams := g.renderQueryString(&g.TSOption)(method, pathParams)
		// body
		renderedBody := g.renderBody(&g.TSOption)(method)

		g.Pf("  const res = await transport.call({")
		g.Pf("    path: `%s`,", renderedPath)
		g.Pf(`    method: "%s",`, methodMethod)
		g.Pf("    headers: headers,")
		if queryParams != "" {
			g.Pf("    queryParams: %s,", queryParams)
		}
		if renderedBody != "" {
			g.Pf("    body: %s,", renderedBody)
		}
		g.Pf("  });")
		g.Pf("  return %s.fromJSON(res);", output)
		g.Pf("},")
	}
	g.P(method.Comments.Trailing)
}

// return the URL string and the pathParams
func (g *Generator) renderPath(r *pluginutils.TSOption) func(method *protogen.Method) (string, []string) {
	return func(method *protogen.Method) (string, []string) {
		httpOpts := g.httpOptions(method)
		methodURL := httpOpts.URL
		matches := pathParamRegexp.FindAllStringSubmatch(methodURL, -1)
		fieldsInPath := make([]string, 0, len(matches))
		if len(matches) > 0 {
			glog.V(2).Infof("url matches: %+v", matches)
			for _, m := range matches {
				expToReplace := m[0]
				fieldNameRaw := m[1]
				// fieldValuePattern := m[2]
				part := fmt.Sprintf(`${%s}`, g.must("fullReq", fieldNameRaw))
				methodURL = strings.ReplaceAll(methodURL, expToReplace, part)
				fieldName := pluginutils.FieldName(r)(fieldNameRaw)
				fieldsInPath = append(fieldsInPath, fieldName)
			}
		}

		return methodURL, fieldsInPath
	}
}

func (g *Generator) renderQueryString(r *pluginutils.TSOption) func(method *protogen.Method, urlPathParams []string) string {
	return func(method *protogen.Method, urlPathParams []string) string {
		httpOpts := g.httpOptions(method)
		methodMethod := httpOpts.Method
		if method.Desc.IsStreamingClient() || (methodMethod != "GET" && methodMethod != "DELETE") {
			return ""
		}
		urlPathParamStrs := make([]string, 0, len(urlPathParams))
		for _, pathParam := range urlPathParams {
			urlPathParamStrs = append(urlPathParamStrs, fmt.Sprintf(`"%s"`, pathParam))
		}
		urlPathParamStr := fmt.Sprintf("[%s]", strings.Join(urlPathParamStrs, ", "))
		renderURLSearchParams := fmt.Sprintf("renderURLSearchParams(req, %s)", urlPathParamStr)
		return renderURLSearchParams
	}
}

func (g *Generator) renderBody(r *pluginutils.TSOption) func(method *protogen.Method) string {
	return func(method *protogen.Method) string {
		httpOpts := g.httpOptions(method)
		httpBody := httpOpts.Body

		TSProtoJsonify := func(in string, msg *protogen.Message) string {
			ident := g.QualifiedTSIdent(pluginutils.TSIdent_TSProto_Message(msg))
			return `JSON.stringify(` + ident + `.toJSON(` + in + `))`
		}
		if httpBody == nil || *httpBody == "*" {
			bodyMsg := method.Input
			return TSProtoJsonify("fullReq", bodyMsg)
		} else if *httpBody == "" {
			return ""
		}

		// body in a field
		bodyField := pluginutils.FindFieldByTextName(method.Input, *httpBody)
		switch bodyField.Desc.Kind() {
		case protoreflect.MessageKind:
			bodyType := bodyField.Message
			return TSProtoJsonify(g.must("fullReq", *httpBody), bodyType)
		case protoreflect.EnumKind:
			bodyType := bodyField.Enum
			enumModule := pluginutils.TSModule_TSProto(bodyType.Desc.ParentFile())
			toJsonIdent := enumModule.Ident(g.TSProto_EnumToJSONFuncName(bodyType.Desc))
			toJsonFunc := g.QualifiedTSIdent(toJsonIdent)
			return toJsonFunc + `(` + g.must("fullReq", *httpBody) + `)`
		default:
			glog.Fatalf("unsupported body field type: %s", bodyField.Desc.Kind())
			return ""
		}
	}
}
