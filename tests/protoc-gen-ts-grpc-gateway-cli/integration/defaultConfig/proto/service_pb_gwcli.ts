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
  url: string;
  method: string;
  queryParams?: string[][];
  body?: BodyInit | null;
};

/**
 * Transport is a type that represents the interface of a transport object
 */
export type Transport = {
  call(params: CallParams): Promise<any>;
};

export function newCounterService(transport: Transport): CounterServiceClient {
  return {
    async increment(
      req: DeepPartial<UnaryRequest>,
      options?: CallOptions,
    ): Promise<UnaryResponse> {
      const fullReq = UnaryRequest.fromPartial(req);
      const res = await transport.call({
        url: `/main.CounterService/Increment`,
        method: "POST",
        body: JSON.stringify(UnaryRequest.toJSON(fullReq)),
      });
      return UnaryResponse.fromJSON(res);
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
      const res = await transport.call({
        url: `/main.CounterService/FailingIncrement`,
        method: "POST",
        body: JSON.stringify(UnaryRequest.toJSON(fullReq)),
      });
      return UnaryResponse.fromJSON(res);
    },

    async echoBinary(
      req: DeepPartial<BinaryRequest>,
      options?: CallOptions,
    ): Promise<BinaryResponse> {
      const fullReq = BinaryRequest.fromPartial(req);
      const res = await transport.call({
        url: `/main.CounterService/EchoBinary`,
        method: "POST",
        body: JSON.stringify(BinaryRequest.toJSON(fullReq)),
      });
      return BinaryResponse.fromJSON(res);
    },

    async hTTPGet(
      req: DeepPartial<HttpGetRequest>,
      options?: CallOptions,
    ): Promise<HttpGetResponse> {
      const fullReq = HttpGetRequest.fromPartial(req);
      const res = await transport.call({
        url: `/api/${must(fullReq.numToIncrease)}`,
        method: "GET",
        queryParams: renderURLSearchParams(req, ["numToIncrease"]),
      });
      return HttpGetResponse.fromJSON(res);
    },

    async hTTPPostWithNestedBodyPath(
      req: DeepPartial<HttpPostRequest>,
      options?: CallOptions,
    ): Promise<HttpPostResponse> {
      const fullReq = HttpPostRequest.fromPartial(req);
      const res = await transport.call({
        url: `/post/${must(fullReq.a)}`,
        method: "POST",
        body: JSON.stringify(PostRequest.toJSON(must(fullReq.req))),
      });
      return HttpPostResponse.fromJSON(res);
    },

    async hTTPPostWithStarBodyPath(
      req: DeepPartial<HttpPostRequest>,
      options?: CallOptions,
    ): Promise<HttpPostResponse> {
      const fullReq = HttpPostRequest.fromPartial(req);
      const res = await transport.call({
        url: `/post/${must(fullReq.a)}/${must(fullReq.c)}`,
        method: "POST",
        body: JSON.stringify(HttpPostRequest.toJSON(fullReq)),
      });
      return HttpPostResponse.fromJSON(res);
    },

    async hTTPPatch(
      req: DeepPartial<HttpPatchRequest>,
      options?: CallOptions,
    ): Promise<HttpPatchResponse> {
      const fullReq = HttpPatchRequest.fromPartial(req);
      const res = await transport.call({
        url: `/patch`,
        method: "PATCH",
        body: JSON.stringify(HttpPatchRequest.toJSON(fullReq)),
      });
      return HttpPatchResponse.fromJSON(res);
    },

    async hTTPDelete(
      req: DeepPartial<HttpDeleteRequest>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = HttpDeleteRequest.fromPartial(req);
      const res = await transport.call({
        url: `/delete/${must(fullReq.a)}`,
        method: "DELETE",
        queryParams: renderURLSearchParams(req, ["a"]),
      });
      return Empty.fromJSON(res);
    },

    async hTTPDeleteWithParams(
      req: DeepPartial<HttpDeleteWithParamsRequest>,
      options?: CallOptions,
    ): Promise<HttpDeleteWithParamsResponse> {
      const fullReq = HttpDeleteWithParamsRequest.fromPartial(req);
      const res = await transport.call({
        url: `/delete/${must(fullReq.id)}`,
        method: "DELETE",
        queryParams: renderURLSearchParams(req, ["id"]),
      });
      return HttpDeleteWithParamsResponse.fromJSON(res);
    },

    async externalMessage(
      req: DeepPartial<ExternalRequest>,
      options?: CallOptions,
    ): Promise<ExternalResponse> {
      const fullReq = ExternalRequest.fromPartial(req);
      const res = await transport.call({
        url: `/main.CounterService/ExternalMessage`,
        method: "POST",
        body: JSON.stringify(ExternalRequest.toJSON(fullReq)),
      });
      return ExternalResponse.fromJSON(res);
    },

    async hTTPGetWithURLSearchParams(
      req: DeepPartial<HTTPGetWithURLSearchParamsRequest>,
      options?: CallOptions,
    ): Promise<HTTPGetWithURLSearchParamsResponse> {
      const fullReq = HTTPGetWithURLSearchParamsRequest.fromPartial(req);
      const res = await transport.call({
        url: `/api/query/${must(fullReq.a)}`,
        method: "GET",
        queryParams: renderURLSearchParams(req, ["a"]),
      });
      return HTTPGetWithURLSearchParamsResponse.fromJSON(res);
    },

    async hTTPGetWithZeroValueURLSearchParams(
      req: DeepPartial<HTTPGetWithZeroValueURLSearchParamsRequest>,
      options?: CallOptions,
    ): Promise<HTTPGetWithZeroValueURLSearchParamsResponse> {
      const fullReq =
        HTTPGetWithZeroValueURLSearchParamsRequest.fromPartial(req);
      const res = await transport.call({
        url: `/path/query`,
        method: "GET",
        queryParams: renderURLSearchParams(req, []),
      });
      return HTTPGetWithZeroValueURLSearchParamsResponse.fromJSON(res);
    },

    async hTTPGetWithOptionalFields(
      req: DeepPartial<OptionalFieldsRequest>,
      options?: CallOptions,
    ): Promise<OptionalFieldsResponse> {
      const fullReq = OptionalFieldsRequest.fromPartial(req);
      const res = await transport.call({
        url: `/optional`,
        method: "GET",
        queryParams: renderURLSearchParams(req, []),
      });
      return OptionalFieldsResponse.fromJSON(res);
    },
  };
}
