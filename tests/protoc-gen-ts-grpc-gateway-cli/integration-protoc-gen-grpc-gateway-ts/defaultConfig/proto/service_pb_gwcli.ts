import { Empty } from "../google/protobuf/empty";
import { ExternalRequest, ExternalResponse } from "./msg";
import {
  BinaryRequest,
  BinaryResponse,
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
function queryParam(
  key: string,
  value: Primitive | Primitive[] | undefined | null,
): string[][] {
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

/**
 * Metadata is a type that represents the metadata that can be passed to a call
 */
export type Metadata = Headers;

/**
 * Client is a type that represents the interface of a client object
 */
export type CallOptions = {
  metadata?: Metadata;
};

function metadataToHeaders(metadata: Metadata): Headers {
  const headers = new Headers();

  for (const [key, values] of metadata) {
    for (const value of values) {
      headers.append("Grpc-Metadata-" + key, value);
    }
  }

  return headers;
}

export interface CounterServiceClient {
  increment(
    req: DeepPartial<UnaryRequest>,
    options?: CallOptions,
  ): Promise<UnaryResponse>;
  streamingIncrements(
    req: DeepPartial<StreamingRequest>,
    options?: CallOptions,
  ): AsyncIterable<StreamingResponse>;
  failingIncrement(
    req: DeepPartial<UnaryRequest>,
    options?: CallOptions,
  ): Promise<UnaryResponse>;
  echoBinary(
    req: DeepPartial<BinaryRequest>,
    options?: CallOptions,
  ): Promise<BinaryResponse>;
  httpget(
    req: DeepPartial<HttpGetRequest>,
    options?: CallOptions,
  ): Promise<HttpGetResponse>;
  httppostWithNestedBodyPath(
    req: DeepPartial<HttpPostRequest>,
    options?: CallOptions,
  ): Promise<HttpPostResponse>;
  httppostWithStarBodyPath(
    req: DeepPartial<HttpPostRequest>,
    options?: CallOptions,
  ): Promise<HttpPostResponse>;
  httppatch(
    req: DeepPartial<HttpPatchRequest>,
    options?: CallOptions,
  ): Promise<HttpPatchResponse>;
  httpdelete(
    req: DeepPartial<HttpDeleteRequest>,
    options?: CallOptions,
  ): Promise<Empty>;
  httpdeleteWithParams(
    req: DeepPartial<HttpDeleteWithParamsRequest>,
    options?: CallOptions,
  ): Promise<HttpDeleteWithParamsResponse>;
  externalMessage(
    req: DeepPartial<ExternalRequest>,
    options?: CallOptions,
  ): Promise<ExternalResponse>;
  httpgetWithUrlsearchParams(
    req: DeepPartial<HTTPGetWithURLSearchParamsRequest>,
    options?: CallOptions,
  ): Promise<HTTPGetWithURLSearchParamsResponse>;
  httpgetWithZeroValueUrlsearchParams(
    req: DeepPartial<HTTPGetWithZeroValueURLSearchParamsRequest>,
    options?: CallOptions,
  ): Promise<HTTPGetWithZeroValueURLSearchParamsResponse>;
  httpgetWithOptionalFields(
    req: DeepPartial<OptionalFieldsRequest>,
    options?: CallOptions,
  ): Promise<OptionalFieldsResponse>;
}

export function newCounterService(transport: Transport): CounterServiceClient {
  return {
    async increment(
      req: DeepPartial<UnaryRequest>,
      options?: CallOptions,
    ): Promise<UnaryResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = UnaryRequest.fromPartial(req);
      const body: any = UnaryRequest.toJSON(fullReq);
      const res = await transport.call({
        path: `/main.CounterService/Increment`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
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
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = UnaryRequest.fromPartial(req);
      const body: any = UnaryRequest.toJSON(fullReq);
      const res = await transport.call({
        path: `/main.CounterService/FailingIncrement`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return UnaryResponse.fromJSON(res);
    },

    async echoBinary(
      req: DeepPartial<BinaryRequest>,
      options?: CallOptions,
    ): Promise<BinaryResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = BinaryRequest.fromPartial(req);
      const body: any = BinaryRequest.toJSON(fullReq);
      const res = await transport.call({
        path: `/main.CounterService/EchoBinary`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return BinaryResponse.fromJSON(res);
    },

    async httpget(
      req: DeepPartial<HttpGetRequest>,
      options?: CallOptions,
    ): Promise<HttpGetResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = HttpGetRequest.fromPartial(req);
      const res = await transport.call({
        path: `/api/${pathStr(must(fullReq.numToIncrease))}`,
        method: "GET",
        headers: headers,
      });
      return HttpGetResponse.fromJSON(res);
    },

    async httppostWithNestedBodyPath(
      req: DeepPartial<HttpPostRequest>,
      options?: CallOptions,
    ): Promise<HttpPostResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = HttpPostRequest.fromPartial(req);
      const queryParams = [...queryParam("c", fullReq.c)];
      const body: any = PostRequest.toJSON(must(fullReq.req));
      const res = await transport.call({
        path: `/post/${pathStr(must(fullReq.a))}`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return HttpPostResponse.fromJSON(res);
    },

    async httppostWithStarBodyPath(
      req: DeepPartial<HttpPostRequest>,
      options?: CallOptions,
    ): Promise<HttpPostResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = HttpPostRequest.fromPartial(req);
      const body: any = (() => {
        const body: any = HttpPostRequest.toJSON(fullReq);
        delete body.a;
        delete body.c;
        return body;
      })();
      const res = await transport.call({
        path: `/post/${pathStr(must(fullReq.a))}/${pathStr(must(fullReq.c))}`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return HttpPostResponse.fromJSON(res);
    },

    async httppatch(
      req: DeepPartial<HttpPatchRequest>,
      options?: CallOptions,
    ): Promise<HttpPatchResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = HttpPatchRequest.fromPartial(req);
      const body: any = HttpPatchRequest.toJSON(fullReq);
      const res = await transport.call({
        path: `/patch`,
        method: "PATCH",
        headers: headers,
        body: JSON.stringify(body),
      });
      return HttpPatchResponse.fromJSON(res);
    },

    async httpdelete(
      req: DeepPartial<HttpDeleteRequest>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = HttpDeleteRequest.fromPartial(req);
      const res = await transport.call({
        path: `/delete/${pathStr(must(fullReq.a))}`,
        method: "DELETE",
        headers: headers,
      });
      return Empty.fromJSON(res);
    },

    async httpdeleteWithParams(
      req: DeepPartial<HttpDeleteWithParamsRequest>,
      options?: CallOptions,
    ): Promise<HttpDeleteWithParamsResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = HttpDeleteWithParamsRequest.fromPartial(req);
      const queryParams = [...queryParam("reason", fullReq.reason)];
      const res = await transport.call({
        path: `/delete/${pathStr(must(fullReq.id))}`,
        method: "DELETE",
        headers: headers,
        queryParams: queryParams,
      });
      return HttpDeleteWithParamsResponse.fromJSON(res);
    },

    async externalMessage(
      req: DeepPartial<ExternalRequest>,
      options?: CallOptions,
    ): Promise<ExternalResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ExternalRequest.fromPartial(req);
      const body: any = ExternalRequest.toJSON(fullReq);
      const res = await transport.call({
        path: `/main.CounterService/ExternalMessage`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return ExternalResponse.fromJSON(res);
    },

    async httpgetWithUrlsearchParams(
      req: DeepPartial<HTTPGetWithURLSearchParamsRequest>,
      options?: CallOptions,
    ): Promise<HTTPGetWithURLSearchParamsResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = HTTPGetWithURLSearchParamsRequest.fromPartial(req);
      const queryParams = [
        ...queryParam("b.b", fullReq.b?.b),
        ...queryParam(
          "c",
          fullReq.c?.map((e) => e),
        ),
        ...queryParam("d.d", fullReq.d?.d),
      ];
      const res = await transport.call({
        path: `/api/query/${pathStr(must(fullReq.a))}`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
      });
      return HTTPGetWithURLSearchParamsResponse.fromJSON(res);
    },

    async httpgetWithZeroValueUrlsearchParams(
      req: DeepPartial<HTTPGetWithZeroValueURLSearchParamsRequest>,
      options?: CallOptions,
    ): Promise<HTTPGetWithZeroValueURLSearchParamsResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq =
        HTTPGetWithZeroValueURLSearchParamsRequest.fromPartial(req);
      const queryParams = [
        ...queryParam("a", fullReq.a),
        ...queryParam("b", fullReq.b),
        ...queryParam("c.c", fullReq.c?.c),
        ...queryParam(
          "c.d",
          fullReq.c?.d?.map((e) => e),
        ),
        ...queryParam("c.e", fullReq.c?.e),
      ];
      const res = await transport.call({
        path: `/path/query`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
      });
      return HTTPGetWithZeroValueURLSearchParamsResponse.fromJSON(res);
    },

    async httpgetWithOptionalFields(
      req: DeepPartial<OptionalFieldsRequest>,
      options?: CallOptions,
    ): Promise<OptionalFieldsResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = OptionalFieldsRequest.fromPartial(req);
      const res = await transport.call({
        path: `/optional`,
        method: "GET",
        headers: headers,
      });
      return OptionalFieldsResponse.fromJSON(res);
    },
  };
}
