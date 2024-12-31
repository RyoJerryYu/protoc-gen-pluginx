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
  Book,
  CheckStatusResponse,
  CreateBookRequest,
  DeepPartial,
  MessageWithBody,
  RequiredMessageTypeRequest,
  SnakeEnumRequest,
  SnakeEnumResponse,
  SnakeEnumServiceClient,
  UpdateBookRequest,
  UpdateV2Request,
} from "./a_bit_of_everything";
import { OneofEnumMessage } from "../oneofenum/oneof_enum";
import {
  MessageWithNestedPathEnum,
  MessageWithPathEnum,
} from "../pathenum/path_enum";
import { StringMessage } from "../sub/message";
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
    // Create a new ABitOfEverything
    //
    // This API creates a new ABitOfEverything
    async create(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${must(fullReq.floatValue)}/${must(fullReq.doubleValue)}/${must(fullReq.int64Value)}/separator/${must(fullReq.uint64Value)}/${must(fullReq.int32Value)}/${must(fullReq.fixed64Value)}/${must(fullReq.fixed32Value)}/${must(fullReq.boolValue)}/${must(fullReq.stringValue)}/${must(fullReq.uint32Value)}/${must(fullReq.sfixed32Value)}/${must(fullReq.sfixed64Value)}/${must(fullReq.sint32Value)}/${must(fullReq.sint64Value)}/${must(fullReq.nonConventionalNameValue)}/${must(fullReq.enumValue)}/${must(fullReq.pathEnumValue)}/${must(fullReq.nestedPathEnumValue)}/${must(fullReq.enumValueAnnotation)}`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, [
          "floatValue",
          "doubleValue",
          "int64Value",
          "uint64Value",
          "int32Value",
          "fixed64Value",
          "fixed32Value",
          "boolValue",
          "stringValue",
          "uint32Value",
          "sfixed32Value",
          "sfixed64Value",
          "sint32Value",
          "sint64Value",
          "nonConventionalNameValue",
          "enumValue",
          "pathEnumValue",
          "nestedPathEnumValue",
          "enumValueAnnotation",
        ]),
      });
      return ABitOfEverything.fromJSON(res);
    },

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

    // Create a book.
    async createBook(
      req: DeepPartial<CreateBookRequest>,
      options?: CallOptions,
    ): Promise<Book> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = CreateBookRequest.fromPartial(req);
      const body: any = Book.toJSON(must(fullReq.book));
      delete body.parent;
      const res = await transport.call({
        path: `/v1/${must(fullReq.parent)}/books`,
        method: "POST",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["parent", "book"]),
        body: JSON.stringify(body),
      });
      return Book.fromJSON(res);
    },

    async updateBook(
      req: DeepPartial<UpdateBookRequest>,
      options?: CallOptions,
    ): Promise<Book> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = UpdateBookRequest.fromPartial(req);
      const body: any = Book.toJSON(must(fullReq.book));
      delete body.name;
      const res = await transport.call({
        path: `/v1/${must(fullReq.book?.name)}`,
        method: "PATCH",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["book.name", "book"]),
        body: JSON.stringify(body),
      });
      return Book.fromJSON(res);
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

    // Echo allows posting a StringMessage value.
    //
    // It also exposes multiple bindings.
    //
    // This makes it useful when validating that the OpenAPI v2 API
    // description exposes documentation correctly on all paths
    // defined as additional_bindings in the proto.
    async echo(
      req: DeepPartial<StringMessage>,
      options?: CallOptions,
    ): Promise<StringMessage> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = StringMessage.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/echo/${must(fullReq.value)}`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["value"]),
      });
      return StringMessage.fromJSON(res);
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
      const body: any = must(fullReq.exampleEnum);
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

// // camelCase and lowercase service names are valid but not recommended (use TitleCase instead)
// service camelCaseServiceName {
//   rpc Empty(google.protobuf.Empty) returns (google.protobuf.Empty) {
//     option (google.api.http) = {get: "/v2/example/empty"};
//   }
// }
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

export function newSnakeEnumService(
  transport: Transport,
): SnakeEnumServiceClient {
  return {
    async snakeEnum(
      req: DeepPartial<SnakeEnumRequest>,
      options?: CallOptions,
    ): Promise<SnakeEnumResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = SnakeEnumRequest.fromPartial(req);
      const res = await transport.call({
        path: `/v1/example/snake/${must(fullReq.who)}/${must(fullReq.what)}/${must(fullReq.where)}`,
        method: "GET",
        headers: headers,
        queryParams: renderURLSearchParams(req, ["who", "what", "where"]),
      });
      return SnakeEnumResponse.fromJSON(res);
    },
  };
}
