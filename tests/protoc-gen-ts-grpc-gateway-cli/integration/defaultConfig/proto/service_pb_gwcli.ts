import { Empty } from "../google/protobuf/empty";
import { CallOptions } from "nice-grpc-common";
import { ExternalRequest, ExternalResponse } from "./msg";
import {
  BinaryRequest,
  BinaryResponse,
  CounterServiceClient,
  DeepPartial,
  HTTPGetWithURLSearchParamsRequest,
  HTTPGetWithURLSearchParamsResponse,
  HTTPGetWithZeroValueURLSearchParamsRequest,
  HTTPGetWithZeroValueURLSearchParamsResponse,
  HttpDeleteRequest,
  HttpDeleteWithParamsRequest,
  HttpDeleteWithParamsResponse,
  HttpGetRequest,
  HttpGetResponse,
  HttpPatchRequest,
  HttpPatchResponse,
  HttpPostRequest,
  HttpPostResponse,
  OptionalFieldsRequest,
  OptionalFieldsResponse,
  PostRequest,
  StreamingRequest,
  StreamingResponse,
  UnaryRequest,
  UnaryResponse,
} from "./service";

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
): string {
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

  return new URLSearchParams(urlSearchParams).toString();
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

export function newCounterService(
  baseUrl: string,
  initReq: Partial<RequestInit> = {},
): CounterServiceClient {
  return {
    async increment(
      req: DeepPartial<UnaryRequest>,
      options?: CallOptions,
    ): Promise<UnaryResponse> {
      const fullReq = UnaryRequest.fromPartial(req);
      const url = new URL(`/main.CounterService/Increment`, baseUrl).href;
      const res = await fetch(url, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(UnaryRequest.toJSON(fullReq)),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return UnaryResponse.fromJSON(body);
    },

    streamingIncrements(
      req: DeepPartial<StreamingRequest>,
      options?: CallOptions,
    ): AsyncIterable<StreamingResponse> {
      throw new Error("not implemented");
    },

    async failingIncrement(
      req: DeepPartial<UnaryRequest>,
      options?: CallOptions,
    ): Promise<UnaryResponse> {
      const fullReq = UnaryRequest.fromPartial(req);
      const url = new URL(`/main.CounterService/FailingIncrement`, baseUrl)
        .href;
      const res = await fetch(url, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(UnaryRequest.toJSON(fullReq)),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return UnaryResponse.fromJSON(body);
    },

    async echoBinary(
      req: DeepPartial<BinaryRequest>,
      options?: CallOptions,
    ): Promise<BinaryResponse> {
      const fullReq = BinaryRequest.fromPartial(req);
      const url = new URL(`/main.CounterService/EchoBinary`, baseUrl).href;
      const res = await fetch(url, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(BinaryRequest.toJSON(fullReq)),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return BinaryResponse.fromJSON(body);
    },

    async hTTPGet(
      req: DeepPartial<HttpGetRequest>,
      options?: CallOptions,
    ): Promise<HttpGetResponse> {
      const fullReq = HttpGetRequest.fromPartial(req);
      const url = new URL(
        `/api/${must(fullReq.numToIncrease)}?${renderURLSearchParams(req, ["numToIncrease"])}`,
        baseUrl,
      ).href;
      const res = await fetch(url, { ...initReq, method: "GET" });
      const body = await res.json();
      if (!res.ok) throw body;
      return HttpGetResponse.fromJSON(body);
    },

    async hTTPPostWithNestedBodyPath(
      req: DeepPartial<HttpPostRequest>,
      options?: CallOptions,
    ): Promise<HttpPostResponse> {
      const fullReq = HttpPostRequest.fromPartial(req);
      const url = new URL(`/post/${must(fullReq.a)}`, baseUrl).href;
      const res = await fetch(url, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(PostRequest.toJSON(must(fullReq.req))),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return HttpPostResponse.fromJSON(body);
    },

    async hTTPPostWithStarBodyPath(
      req: DeepPartial<HttpPostRequest>,
      options?: CallOptions,
    ): Promise<HttpPostResponse> {
      const fullReq = HttpPostRequest.fromPartial(req);
      const url = new URL(
        `/post/${must(fullReq.a)}/${must(fullReq.c)}`,
        baseUrl,
      ).href;
      const res = await fetch(url, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(HttpPostRequest.toJSON(fullReq)),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return HttpPostResponse.fromJSON(body);
    },

    async hTTPPatch(
      req: DeepPartial<HttpPatchRequest>,
      options?: CallOptions,
    ): Promise<HttpPatchResponse> {
      const fullReq = HttpPatchRequest.fromPartial(req);
      const url = new URL(`/patch`, baseUrl).href;
      const res = await fetch(url, {
        ...initReq,
        method: "PATCH",
        body: JSON.stringify(HttpPatchRequest.toJSON(fullReq)),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return HttpPatchResponse.fromJSON(body);
    },

    async hTTPDelete(
      req: DeepPartial<HttpDeleteRequest>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = HttpDeleteRequest.fromPartial(req);
      const url = new URL(
        `/delete/${must(fullReq.a)}?${renderURLSearchParams(req, ["a"])}`,
        baseUrl,
      ).href;
      const res = await fetch(url, { ...initReq, method: "DELETE" });
      const body = await res.json();
      if (!res.ok) throw body;
      return Empty.fromJSON(body);
    },

    async hTTPDeleteWithParams(
      req: DeepPartial<HttpDeleteWithParamsRequest>,
      options?: CallOptions,
    ): Promise<HttpDeleteWithParamsResponse> {
      const fullReq = HttpDeleteWithParamsRequest.fromPartial(req);
      const url = new URL(
        `/delete/${must(fullReq.id)}?${renderURLSearchParams(req, ["id"])}`,
        baseUrl,
      ).href;
      const res = await fetch(url, { ...initReq, method: "DELETE" });
      const body = await res.json();
      if (!res.ok) throw body;
      return HttpDeleteWithParamsResponse.fromJSON(body);
    },

    async externalMessage(
      req: DeepPartial<ExternalRequest>,
      options?: CallOptions,
    ): Promise<ExternalResponse> {
      const fullReq = ExternalRequest.fromPartial(req);
      const url = new URL(`/main.CounterService/ExternalMessage`, baseUrl).href;
      const res = await fetch(url, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(ExternalRequest.toJSON(fullReq)),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return ExternalResponse.fromJSON(body);
    },

    async hTTPGetWithURLSearchParams(
      req: DeepPartial<HTTPGetWithURLSearchParamsRequest>,
      options?: CallOptions,
    ): Promise<HTTPGetWithURLSearchParamsResponse> {
      const fullReq = HTTPGetWithURLSearchParamsRequest.fromPartial(req);
      const url = new URL(
        `/api/query/${must(fullReq.a)}?${renderURLSearchParams(req, ["a"])}`,
        baseUrl,
      ).href;
      const res = await fetch(url, { ...initReq, method: "GET" });
      const body = await res.json();
      if (!res.ok) throw body;
      return HTTPGetWithURLSearchParamsResponse.fromJSON(body);
    },

    async hTTPGetWithZeroValueURLSearchParams(
      req: DeepPartial<HTTPGetWithZeroValueURLSearchParamsRequest>,
      options?: CallOptions,
    ): Promise<HTTPGetWithZeroValueURLSearchParamsResponse> {
      const fullReq =
        HTTPGetWithZeroValueURLSearchParamsRequest.fromPartial(req);
      const url = new URL(
        `/path/query?${renderURLSearchParams(req, [])}`,
        baseUrl,
      ).href;
      const res = await fetch(url, { ...initReq, method: "GET" });
      const body = await res.json();
      if (!res.ok) throw body;
      return HTTPGetWithZeroValueURLSearchParamsResponse.fromJSON(body);
    },

    async hTTPGetWithOptionalFields(
      req: DeepPartial<OptionalFieldsRequest>,
      options?: CallOptions,
    ): Promise<OptionalFieldsResponse> {
      const fullReq = OptionalFieldsRequest.fromPartial(req);
      const url = new URL(
        `/optional?${renderURLSearchParams(req, [])}`,
        baseUrl,
      ).href;
      const res = await fetch(url, { ...initReq, method: "GET" });
      const body = await res.json();
      if (!res.ok) throw body;
      return OptionalFieldsResponse.fromJSON(body);
    },
  };
}
