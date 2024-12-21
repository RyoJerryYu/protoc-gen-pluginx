import * as GoogleProtobufDuration from "../../google/protobuf/duration";
import * as GoogleProtobufEmpty from "../../google/protobuf/empty";
import * as GoogleProtobufWrappers from "../../google/protobuf/wrappers";
import * as NiceGrpcCommon from "nice-grpc-common";
import * as ProtoExamplepbABitOfEverything from "./a_bit_of_everything";
import * as ProtoOneofenumOneofEnum from "../oneofenum/oneof_enum";
import * as PathenumPathEnum from "../pathenum/path_enum";
import * as ProtoSub2Message from "../sub2/message";

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

// ABitOfEverything service is used to validate that APIs with complicated
// proto messages and URL templates are still processed correctly.
export function newABitOfEverythingService(): ProtoExamplepbABitOfEverything.ABitOfEverythingServiceClient {
  const initReq = {};
  return {
    async createBody(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(`/v1/example/a_bit_of_everything`, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(
          ProtoExamplepbABitOfEverything.ABitOfEverything.toJSON(fullReq),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async lookup(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoSub2Message.IdMessage>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq = ProtoSub2Message.IdMessage.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/${must(req.uuid)}?${renderURLSearchParams(req, ["uuid"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async custom(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/${must(req.uuid)}:custom`,
        { ...initReq, method: "POST" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async doubleColon(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/${must(req.uuid)}:custom:custom`,
        { ...initReq, method: "POST" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async update(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/${must(req.uuid)}`,
        {
          ...initReq,
          method: "PUT",
          body: JSON.stringify(
            ProtoExamplepbABitOfEverything.ABitOfEverything.toJSON(fullReq),
          ),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async updateV2(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.UpdateV2Request>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        ProtoExamplepbABitOfEverything.UpdateV2Request.fromPartial(req);
      const res = await fetch(
        `/v2/example/a_bit_of_everything/${must(req.abe?.uuid)}`,
        {
          ...initReq,
          method: "PUT",
          body: JSON.stringify(
            ProtoExamplepbABitOfEverything.ABitOfEverything.toJSON(
              must(fullReq.abe),
            ),
          ),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async delete(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoSub2Message.IdMessage>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = ProtoSub2Message.IdMessage.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/${must(req.uuid)}?${renderURLSearchParams(req, ["uuid"])}`,
        { ...initReq, method: "DELETE" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async getQuery(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/query/${must(req.uuid)}?${renderURLSearchParams(req, ["uuid"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async getRepeatedQuery(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated.fromPartial(
          req,
        );
      const res = await fetch(
        `/v1/example/a_bit_of_everything_repeated/${must(req.pathRepeatedFloatValue)}/${must(req.pathRepeatedDoubleValue)}/${must(req.pathRepeatedInt64Value)}/${must(req.pathRepeatedUint64Value)}/${must(req.pathRepeatedInt32Value)}/${must(req.pathRepeatedFixed64Value)}/${must(req.pathRepeatedFixed32Value)}/${must(req.pathRepeatedBoolValue)}/${must(req.pathRepeatedStringValue)}/${must(req.pathRepeatedBytesValue)}/${must(req.pathRepeatedUint32Value)}/${must(req.pathRepeatedEnumValue)}/${must(req.pathRepeatedSfixed32Value)}/${must(req.pathRepeatedSfixed64Value)}/${must(req.pathRepeatedSint32Value)}/${must(req.pathRepeatedSint64Value)}?${renderURLSearchParams(req, ["pathRepeatedFloatValue", "pathRepeatedDoubleValue", "pathRepeatedInt64Value", "pathRepeatedUint64Value", "pathRepeatedInt32Value", "pathRepeatedFixed64Value", "pathRepeatedFixed32Value", "pathRepeatedBoolValue", "pathRepeatedStringValue", "pathRepeatedBytesValue", "pathRepeatedUint32Value", "pathRepeatedEnumValue", "pathRepeatedSfixed32Value", "pathRepeatedSfixed64Value", "pathRepeatedSint32Value", "pathRepeatedSint64Value"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated.fromJSON(
        body,
      );
    },

    async deepPathEcho(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/deep_path/${must(req.singleNested?.name)}`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(
            ProtoExamplepbABitOfEverything.ABitOfEverything.toJSON(fullReq),
          ),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async noBindings(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufDuration.Duration>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = GoogleProtobufDuration.Duration.fromPartial(req);
      const res = await fetch(
        `/proto.examplepb.ABitOfEverythingService/NoBindings`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(GoogleProtobufDuration.Duration.toJSON(fullReq)),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async timeout(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = GoogleProtobufEmpty.Empty.fromPartial(req);
      const res = await fetch(
        `/v2/example/timeout?${renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async errorWithDetails(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = GoogleProtobufEmpty.Empty.fromPartial(req);
      const res = await fetch(
        `/v2/example/errorwithdetails?${renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async getMessageWithBody(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.MessageWithBody>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        ProtoExamplepbABitOfEverything.MessageWithBody.fromPartial(req);
      const res = await fetch(`/v2/example/withbody/${must(req.id)}`, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(
          ProtoExamplepbABitOfEverything.Body.toJSON(must(fullReq.data)),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async postWithEmptyBody(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.Body>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = ProtoExamplepbABitOfEverything.Body.fromPartial(req);
      const res = await fetch(
        `/v2/example/postwithemptybody/${must(req.name)}`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(
            ProtoExamplepbABitOfEverything.Body.toJSON(fullReq),
          ),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async checkGetQueryParams(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/params/get/${must(req.singleNested?.name)}&${renderURLSearchParams(req, ["singleNested.name"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async checkNestedEnumGetQueryParams(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/params/get/nested_enum/${must(req.singleNested?.ok)}&${renderURLSearchParams(req, ["singleNested.ok"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async checkPostQueryParams(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/params/post/${must(req.stringValue)}`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(
            ProtoExamplepbABitOfEverything.Nested.toJSON(
              must(fullReq.singleNested),
            ),
          ),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async overwriteRequestContentType(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.Body>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = ProtoExamplepbABitOfEverything.Body.fromPartial(req);
      const res = await fetch(`/v2/example/overwriterequestcontenttype`, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(
          ProtoExamplepbABitOfEverything.Body.toJSON(fullReq),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async overwriteResponseContentType(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufWrappers.StringValue> {
      const fullReq = GoogleProtobufEmpty.Empty.fromPartial(req);
      const res = await fetch(
        `/v2/example/overwriteresponsecontenttype?${renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufWrappers.StringValue.fromJSON(body);
    },

    async checkExternalPathEnum(
      req: ProtoExamplepbABitOfEverything.DeepPartial<PathenumPathEnum.MessageWithPathEnum>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = PathenumPathEnum.MessageWithPathEnum.fromPartial(req);
      const res = await fetch(
        `/v2/${must(req.value)}:check?${renderURLSearchParams(req, ["value"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async checkExternalNestedPathEnum(
      req: ProtoExamplepbABitOfEverything.DeepPartial<PathenumPathEnum.MessageWithNestedPathEnum>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        PathenumPathEnum.MessageWithNestedPathEnum.fromPartial(req);
      const res = await fetch(
        `/v3/${must(req.value)}:check?${renderURLSearchParams(req, ["value"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async checkStatus(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.CheckStatusResponse> {
      const fullReq = GoogleProtobufEmpty.Empty.fromPartial(req);
      const res = await fetch(
        `/v1/example/checkStatus?${renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.CheckStatusResponse.fromJSON(body);
    },

    async postOneofEnum(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoOneofenumOneofEnum.OneofEnumMessage>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = ProtoOneofenumOneofEnum.OneofEnumMessage.fromPartial(req);
      const res = await fetch(`/v1/example/oneofenum`, {
        ...initReq,
        method: "POST",
        body: ProtoOneofenumOneofEnum.exampleEnumToJSON(
          must(fullReq.exampleEnum),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async postRequiredMessageType(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.RequiredMessageTypeRequest>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        ProtoExamplepbABitOfEverything.RequiredMessageTypeRequest.fromPartial(
          req,
        );
      const res = await fetch(`/v1/example/requiredmessagetype`, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(
          ProtoExamplepbABitOfEverything.RequiredMessageTypeRequest.toJSON(
            fullReq,
          ),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },
  };
}

export function newAnotherServiceWithNoBindings(): ProtoExamplepbABitOfEverything.AnotherServiceWithNoBindingsClient {
  const initReq = {};
  return {
    async noBindings(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = GoogleProtobufEmpty.Empty.fromPartial(req);
      const res = await fetch(
        `/proto.examplepb.AnotherServiceWithNoBindings/NoBindings`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(GoogleProtobufEmpty.Empty.toJSON(fullReq)),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },
  };
}
