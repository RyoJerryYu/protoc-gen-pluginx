import { Base64 } from "js-base64";
import { CallOptions, Metadata } from "nice-grpc-common";
import { ABitOfEverything } from "../examplepb/a_bit_of_everything";
import {
  DeepPartial,
  QueryStringServiceClient,
  WellKnownTypesHolder,
} from "./querystring";

type Primitive = string | boolean | number | Date | Uint8Array;
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
  if (["string", "number", "boolean"].some((t) => typeof value === t)) {
    return true;
  }

  if (value instanceof Date) {
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
        ? [...acc, ...value.map((m) => [key, toStr(m)])]
        : (acc = [...acc, [key, toStr(value)]]);
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

export function newQueryStringService(
  transport: Transport,
): QueryStringServiceClient {
  return {
    async getEnumQuerystring(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/querystring/enumquerystring`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, []),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async getStringQuerystring(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/querystring/stringquerystring`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, []),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async getRepeatedEnumQuerystring(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/querystring/repeatedenumquerystring`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, []),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async getRepeatedStringQuerystring(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/querystring/repeatedstringquerystring`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, []),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async getTimestampQuerystring(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const res = await transport.call({
        path: `/v1/querystring/timestampquerystring`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, []),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async getWrapperQuerystring(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const res = await transport.call({
        path: `/v1/querystring/wrapperquerystring`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, []),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },
  };
}
