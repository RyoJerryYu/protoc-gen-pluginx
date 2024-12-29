import { FieldMask } from "../../google/protobuf/field_mask";
import { Base64 } from "js-base64";
import { CallOptions, Metadata } from "nice-grpc-common";
import {
  BodyJSONServiceClient,
  DeepPartial,
  WellKnownTypesHolder,
} from "./bodyjson";
import {
  ABitOfEverything,
  ABitOfEverything_Nested,
  numericEnumToJSON,
} from "../examplepb/a_bit_of_everything";

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
  path = "",
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
  urlPathParams: string[] = [],
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
    [] as string[][],
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
  path: string;
  method: string;
  headers?: Headers | null;
  queryParams?: string[][];
  body?: BodyInit | null;
};

/**
 * Transport is a type that represents the interface of a transport object
 */
export type Transport = {
  call(params: CallParams): Promise<any>;
};

function metadataToHeaders(metadata: Metadata): Headers {
  const headers = new Headers();

  for (const [key, values] of metadata) {
    for (const value of values) {
      headers.append(
        key,
        typeof value === "string" ? value : Base64.fromUint8Array(value),
      );
    }
  }

  return headers;
}

export function newBodyJSONService(
  transport: Transport,
): BodyJSONServiceClient {
  return {
    async postEnumBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/bodyjson/enumbody`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["enum_value"]),
        body: JSON.stringify(numericEnumToJSON(must(fullReq.enumValue))),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async postStringBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/bodyjson/stringbody`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["string_value"]),
        body: JSON.stringify(must(fullReq.stringValue)),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async postRepeatedMessageBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/bodyjson/repeatedmessagebody`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["nested"]),
        body: JSON.stringify(
          must(fullReq.nested).map((e) => ABitOfEverything_Nested.toJSON(e)),
        ),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async postRepeatedStringBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/bodyjson/repeatedstringbody`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["repeated_string_value"]),
        body: JSON.stringify(must(fullReq.repeatedStringValue).map((e) => e)),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async postTimestampBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const res = await transport.call({
        path: `/v1/bodyjson/timestampbody`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["timestamp"]),
        body: JSON.stringify(must(fullReq.timestamp).toISOString()),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async postFieldMaskBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const res = await transport.call({
        path: `/v1/bodyjson/fieldmaskbody`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["field_mask"]),
        body: JSON.stringify(
          FieldMask.toJSON(FieldMask.wrap(must(fullReq.fieldMask))),
        ),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async postStructBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const res = await transport.call({
        path: `/v1/bodyjson/structbody`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["struct"]),
        body: JSON.stringify(must(fullReq.struct)),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async postValueBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const res = await transport.call({
        path: `/v1/bodyjson/valuebody`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["value"]),
        body: JSON.stringify(must(fullReq.value)),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async postListValueBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const res = await transport.call({
        path: `/v1/bodyjson/listvaluebody`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["list_value"]),
        body: JSON.stringify(must(fullReq.listValue)),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async postWrapperBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const res = await transport.call({
        path: `/v1/bodyjson/wrapperbody`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["int64_value"]),
        body: JSON.stringify(must(fullReq.int64Value)),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },
  };
}
// normal fields
