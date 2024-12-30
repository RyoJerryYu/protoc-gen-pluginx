import { Duration } from "../../google/protobuf/duration";
import { Empty } from "../../google/protobuf/empty";
import { StringValue } from "../../google/protobuf/wrappers";
import { Base64 } from "js-base64";
import { CallOptions, Metadata } from "nice-grpc-common";
import {
  ABitOfEverything,
  ABitOfEverythingRepeated,
  ABitOfEverythingServiceClient,
  ABitOfEverything_Nested,
  AnotherServiceWithNoBindingsClient,
  Body,
  CheckStatusResponse,
  DeepPartial,
  MessageWithBody,
  RequiredMessageTypeRequest,
  UpdateV2Request,
} from "./a_bit_of_everything";
import { OneofEnumMessage, exampleEnumToJSON } from "../oneofenum/oneof_enum";
import {
  MessageWithNestedPathEnum,
  MessageWithPathEnum,
} from "../pathenum/path_enum";
import { IdMessage } from "../sub2/message";

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

// ABitOfEverything service is used to validate that APIs with complicated
// proto messages and URL templates are still processed correctly.
export function newABitOfEverythingService(
  transport: Transport,
): ABitOfEverythingServiceClient {
  return {
    async createBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const body: any = ABitOfEverything.toJSON(fullReq);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async lookup(
      req: DeepPartial<IdMessage>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = IdMessage.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${must(fullReq.uuid)}`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["uuid"]),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async custom(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${must(fullReq.uuid)}:custom`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["uuid"]),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async doubleColon(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${must(fullReq.uuid)}:custom:custom`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["uuid"]),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async update(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const body: any = ABitOfEverything.toJSON(fullReq);
      delete body.uuid;
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${must(fullReq.uuid)}`,
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });
      return Empty.fromJSON(res);
    },

    async updateV2(
      req: DeepPartial<UpdateV2Request>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = UpdateV2Request.fromPartial(req);
      const body: any = ABitOfEverything.toJSON(must(fullReq.abe));
      delete body.uuid;
      const res = await transport.call({
        path: `/v2/example/a_bit_of_everything/${must(fullReq.abe?.uuid)}`,
        method: "PUT",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["abe.uuid", "abe"]),
        body: JSON.stringify(body),
      });
      return Empty.fromJSON(res);
    },

    async delete(
      req: DeepPartial<IdMessage>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = IdMessage.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${must(fullReq.uuid)}`,
        method: "DELETE",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["uuid"]),
      });
      return Empty.fromJSON(res);
    },

    async getQuery(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/query/${must(fullReq.uuid)}`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["uuid"]),
      });
      return Empty.fromJSON(res);
    },

    async getRepeatedQuery(
      req: DeepPartial<ABitOfEverythingRepeated>,
      options?: CallOptions,
    ): Promise<ABitOfEverythingRepeated> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverythingRepeated.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything_repeated/${must(fullReq.pathRepeatedFloatValue)}/${must(fullReq.pathRepeatedDoubleValue)}/${must(fullReq.pathRepeatedInt64Value)}/${must(fullReq.pathRepeatedUint64Value)}/${must(fullReq.pathRepeatedInt32Value)}/${must(fullReq.pathRepeatedFixed64Value)}/${must(fullReq.pathRepeatedFixed32Value)}/${must(fullReq.pathRepeatedBoolValue)}/${must(fullReq.pathRepeatedStringValue)}/${must(fullReq.pathRepeatedBytesValue)}/${must(fullReq.pathRepeatedUint32Value)}/${must(fullReq.pathRepeatedEnumValue)}/${must(fullReq.pathRepeatedSfixed32Value)}/${must(fullReq.pathRepeatedSfixed64Value)}/${must(fullReq.pathRepeatedSint32Value)}/${must(fullReq.pathRepeatedSint64Value)}`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, [
          "pathRepeatedFloatValue",
          "pathRepeatedDoubleValue",
          "pathRepeatedInt64Value",
          "pathRepeatedUint64Value",
          "pathRepeatedInt32Value",
          "pathRepeatedFixed64Value",
          "pathRepeatedFixed32Value",
          "pathRepeatedBoolValue",
          "pathRepeatedStringValue",
          "pathRepeatedBytesValue",
          "pathRepeatedUint32Value",
          "pathRepeatedEnumValue",
          "pathRepeatedSfixed32Value",
          "pathRepeatedSfixed64Value",
          "pathRepeatedSint32Value",
          "pathRepeatedSint64Value",
        ]),
      });
      return ABitOfEverythingRepeated.fromJSON(res);
    },

    async deepPathEcho(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const body: any = ABitOfEverything.toJSON(fullReq);
      delete body.singleNested.name;
      const res = await transport.call({
        path: `/v1/example/deep_path/${must(fullReq.singleNested?.name)}`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async noBindings(
      req: DeepPartial<Duration>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = Duration.fromPartial(req);
      const body: any = Duration.toJSON(fullReq);
      const res = await transport.call({
        path: `/proto.examplepb.ABitOfEverythingService/NoBindings`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return Empty.fromJSON(res);
    },

    async timeout(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = Empty.fromPartial(req);
      const res = await transport.call({
        path: `/v2/example/timeout`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, []),
      });
      return Empty.fromJSON(res);
    },

    async errorWithDetails(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = Empty.fromPartial(req);
      const res = await transport.call({
        path: `/v2/example/errorwithdetails`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, []),
      });
      return Empty.fromJSON(res);
    },

    async getMessageWithBody(
      req: DeepPartial<MessageWithBody>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = MessageWithBody.fromPartial(req);
      const body: any = Body.toJSON(must(fullReq.data));
      delete body.id;
      const res = await transport.call({
        path: `/v2/example/withbody/${must(fullReq.id)}`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["id", "data"]),
        body: JSON.stringify(body),
      });
      return Empty.fromJSON(res);
    },

    async postWithEmptyBody(
      req: DeepPartial<Body>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = Body.fromPartial(req);
      const body: any = Body.toJSON(fullReq);
      delete body.name;
      const res = await transport.call({
        path: `/v2/example/postwithemptybody/${must(fullReq.name)}`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return Empty.fromJSON(res);
    },

    async checkGetQueryParams(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/params/get/${must(fullReq.singleNested?.name)}`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["singleNested.name"]),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async checkNestedEnumGetQueryParams(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/params/get/nested_enum/${must(fullReq.singleNested?.ok)}`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["singleNested.ok"]),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async checkPostQueryParams(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const body: any = ABitOfEverything_Nested.toJSON(
        must(fullReq.singleNested),
      );
      delete body.stringValue;
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/params/post/${must(fullReq.stringValue)}`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, [
          "stringValue",
          "singleNested",
        ]),
        body: JSON.stringify(body),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async overwriteRequestContentType(
      req: DeepPartial<Body>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = Body.fromPartial(req);
      const body: any = Body.toJSON(fullReq);
      const res = await transport.call({
        path: `/v2/example/overwriterequestcontenttype`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return Empty.fromJSON(res);
    },

    async overwriteResponseContentType(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<StringValue> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = Empty.fromPartial(req);
      const res = await transport.call({
        path: `/v2/example/overwriteresponsecontenttype`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, []),
      });
      return StringValue.fromJSON(res);
    },

    async checkExternalPathEnum(
      req: DeepPartial<MessageWithPathEnum>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = MessageWithPathEnum.fromPartial(req);
      const res = await transport.call({
        path: `/v2/${must(fullReq.value)}:check`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["value"]),
      });
      return Empty.fromJSON(res);
    },

    async checkExternalNestedPathEnum(
      req: DeepPartial<MessageWithNestedPathEnum>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = MessageWithNestedPathEnum.fromPartial(req);
      const res = await transport.call({
        path: `/v3/${must(fullReq.value)}:check`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["value"]),
      });
      return Empty.fromJSON(res);
    },

    async checkStatus(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<CheckStatusResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = Empty.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/checkStatus`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, []),
      });
      return CheckStatusResponse.fromJSON(res);
    },

    async postOneofEnum(
      req: DeepPartial<OneofEnumMessage>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = OneofEnumMessage.fromPartial(req);
      const body: any = exampleEnumToJSON(must(fullReq.exampleEnum));
      const res = await transport.call({
        path: `/v1/example/oneofenum`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["exampleEnum"]),
        body: JSON.stringify(body),
      });
      return Empty.fromJSON(res);
    },

    async postRequiredMessageType(
      req: DeepPartial<RequiredMessageTypeRequest>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = RequiredMessageTypeRequest.fromPartial(req);
      const body: any = RequiredMessageTypeRequest.toJSON(fullReq);
      const res = await transport.call({
        path: `/v1/example/requiredmessagetype`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return Empty.fromJSON(res);
    },
  };
}

export function newAnotherServiceWithNoBindings(
  transport: Transport,
): AnotherServiceWithNoBindingsClient {
  return {
    async noBindings(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = Empty.fromPartial(req);
      const body: any = Empty.toJSON(fullReq);
      const res = await transport.call({
        path: `/proto.examplepb.AnotherServiceWithNoBindings/NoBindings`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return Empty.fromJSON(res);
    },
  };
}
