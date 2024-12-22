import { Duration } from "../../google/protobuf/duration";
import { Empty } from "../../google/protobuf/empty";
import { StringValue } from "../../google/protobuf/wrappers";
import { CallOptions } from "nice-grpc-common";
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

// ABitOfEverything service is used to validate that APIs with complicated
// proto messages and URL templates are still processed correctly.
export function newABitOfEverythingService(
  baseUrl: string,
  initReq: Partial<RequestInit> = {},
): ABitOfEverythingServiceClient {
  return {
    async createBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const fullReq = ABitOfEverything.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = JSON.stringify(ABitOfEverything.toJSON(fullReq));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return ABitOfEverything.fromJSON(resBody);
    },

    async lookup(
      req: DeepPartial<IdMessage>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const fullReq = IdMessage.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything/${must(fullReq.uuid)}`;
      const queryParams = renderURLSearchParams(req, ["uuid"]);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return ABitOfEverything.fromJSON(resBody);
    },

    async custom(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const fullReq = ABitOfEverything.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything/${must(fullReq.uuid)}:custom`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return ABitOfEverything.fromJSON(resBody);
    },

    async doubleColon(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const fullReq = ABitOfEverything.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything/${must(fullReq.uuid)}:custom:custom`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return ABitOfEverything.fromJSON(resBody);
    },

    async update(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = ABitOfEverything.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything/${must(fullReq.uuid)}`;
      const queryParams = [] as string[][];
      const method = "PUT";
      const body = JSON.stringify(ABitOfEverything.toJSON(fullReq));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async updateV2(
      req: DeepPartial<UpdateV2Request>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = UpdateV2Request.fromPartial(req);
      const rpcPath = `/v2/example/a_bit_of_everything/${must(fullReq.abe?.uuid)}`;
      const queryParams = [] as string[][];
      const method = "PUT";
      const body = JSON.stringify(ABitOfEverything.toJSON(must(fullReq.abe)));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async delete(
      req: DeepPartial<IdMessage>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = IdMessage.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything/${must(fullReq.uuid)}`;
      const queryParams = renderURLSearchParams(req, ["uuid"]);
      const method = "DELETE";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async getQuery(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = ABitOfEverything.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything/query/${must(fullReq.uuid)}`;
      const queryParams = renderURLSearchParams(req, ["uuid"]);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async getRepeatedQuery(
      req: DeepPartial<ABitOfEverythingRepeated>,
      options?: CallOptions,
    ): Promise<ABitOfEverythingRepeated> {
      const fullReq = ABitOfEverythingRepeated.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything_repeated/${must(fullReq.pathRepeatedFloatValue)}/${must(fullReq.pathRepeatedDoubleValue)}/${must(fullReq.pathRepeatedInt64Value)}/${must(fullReq.pathRepeatedUint64Value)}/${must(fullReq.pathRepeatedInt32Value)}/${must(fullReq.pathRepeatedFixed64Value)}/${must(fullReq.pathRepeatedFixed32Value)}/${must(fullReq.pathRepeatedBoolValue)}/${must(fullReq.pathRepeatedStringValue)}/${must(fullReq.pathRepeatedBytesValue)}/${must(fullReq.pathRepeatedUint32Value)}/${must(fullReq.pathRepeatedEnumValue)}/${must(fullReq.pathRepeatedSfixed32Value)}/${must(fullReq.pathRepeatedSfixed64Value)}/${must(fullReq.pathRepeatedSint32Value)}/${must(fullReq.pathRepeatedSint64Value)}`;
      const queryParams = renderURLSearchParams(req, [
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
      ]);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return ABitOfEverythingRepeated.fromJSON(resBody);
    },

    async deepPathEcho(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const fullReq = ABitOfEverything.fromPartial(req);
      const rpcPath = `/v1/example/deep_path/${must(fullReq.singleNested?.name)}`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = JSON.stringify(ABitOfEverything.toJSON(fullReq));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return ABitOfEverything.fromJSON(resBody);
    },

    async noBindings(
      req: DeepPartial<Duration>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = Duration.fromPartial(req);
      const rpcPath = `/proto.examplepb.ABitOfEverythingService/NoBindings`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = JSON.stringify(Duration.toJSON(fullReq));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async timeout(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = Empty.fromPartial(req);
      const rpcPath = `/v2/example/timeout`;
      const queryParams = renderURLSearchParams(req, []);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async errorWithDetails(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = Empty.fromPartial(req);
      const rpcPath = `/v2/example/errorwithdetails`;
      const queryParams = renderURLSearchParams(req, []);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async getMessageWithBody(
      req: DeepPartial<MessageWithBody>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = MessageWithBody.fromPartial(req);
      const rpcPath = `/v2/example/withbody/${must(fullReq.id)}`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = JSON.stringify(Body.toJSON(must(fullReq.data)));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async postWithEmptyBody(
      req: DeepPartial<Body>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = Body.fromPartial(req);
      const rpcPath = `/v2/example/postwithemptybody/${must(fullReq.name)}`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = JSON.stringify(Body.toJSON(fullReq));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async checkGetQueryParams(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const fullReq = ABitOfEverything.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything/params/get/${must(fullReq.singleNested?.name)}`;
      const queryParams = renderURLSearchParams(req, ["singleNested.name"]);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return ABitOfEverything.fromJSON(resBody);
    },

    async checkNestedEnumGetQueryParams(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const fullReq = ABitOfEverything.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything/params/get/nested_enum/${must(fullReq.singleNested?.ok)}`;
      const queryParams = renderURLSearchParams(req, ["singleNested.ok"]);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return ABitOfEverything.fromJSON(resBody);
    },

    async checkPostQueryParams(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const fullReq = ABitOfEverything.fromPartial(req);
      const rpcPath = `/v1/example/a_bit_of_everything/params/post/${must(fullReq.stringValue)}`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = JSON.stringify(
        ABitOfEverything_Nested.toJSON(must(fullReq.singleNested)),
      );
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return ABitOfEverything.fromJSON(resBody);
    },

    async overwriteRequestContentType(
      req: DeepPartial<Body>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = Body.fromPartial(req);
      const rpcPath = `/v2/example/overwriterequestcontenttype`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = JSON.stringify(Body.toJSON(fullReq));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async overwriteResponseContentType(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<StringValue> {
      const fullReq = Empty.fromPartial(req);
      const rpcPath = `/v2/example/overwriteresponsecontenttype`;
      const queryParams = renderURLSearchParams(req, []);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return StringValue.fromJSON(resBody);
    },

    async checkExternalPathEnum(
      req: DeepPartial<MessageWithPathEnum>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = MessageWithPathEnum.fromPartial(req);
      const rpcPath = `/v2/${must(fullReq.value)}:check`;
      const queryParams = renderURLSearchParams(req, ["value"]);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async checkExternalNestedPathEnum(
      req: DeepPartial<MessageWithNestedPathEnum>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = MessageWithNestedPathEnum.fromPartial(req);
      const rpcPath = `/v3/${must(fullReq.value)}:check`;
      const queryParams = renderURLSearchParams(req, ["value"]);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async checkStatus(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<CheckStatusResponse> {
      const fullReq = Empty.fromPartial(req);
      const rpcPath = `/v1/example/checkStatus`;
      const queryParams = renderURLSearchParams(req, []);
      const method = "GET";
      const body = "";
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return CheckStatusResponse.fromJSON(resBody);
    },

    async postOneofEnum(
      req: DeepPartial<OneofEnumMessage>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = OneofEnumMessage.fromPartial(req);
      const rpcPath = `/v1/example/oneofenum`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = exampleEnumToJSON(must(fullReq.exampleEnum));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },

    async postRequiredMessageType(
      req: DeepPartial<RequiredMessageTypeRequest>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = RequiredMessageTypeRequest.fromPartial(req);
      const rpcPath = `/v1/example/requiredmessagetype`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = JSON.stringify(RequiredMessageTypeRequest.toJSON(fullReq));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },
  };
}

export function newAnotherServiceWithNoBindings(
  baseUrl: string,
  initReq: Partial<RequestInit> = {},
): AnotherServiceWithNoBindingsClient {
  return {
    async noBindings(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<Empty> {
      const fullReq = Empty.fromPartial(req);
      const rpcPath = `/proto.examplepb.AnotherServiceWithNoBindings/NoBindings`;
      const queryParams = [] as string[][];
      const method = "POST";
      const body = JSON.stringify(Empty.toJSON(fullReq));
      let rpcUrl = rpcPath;
      if (queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcUrl += "?" + searchParams.toString();
      }
      let callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      const url = new URL(rpcUrl, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      return Empty.fromJSON(resBody);
    },
  };
}
