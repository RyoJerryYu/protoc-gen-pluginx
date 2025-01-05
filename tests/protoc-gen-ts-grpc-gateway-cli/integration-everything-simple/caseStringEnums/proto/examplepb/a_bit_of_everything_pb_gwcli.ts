import { Duration } from "../../google/protobuf/duration";
import { Empty } from "../../google/protobuf/empty";
import { FieldMask } from "../../google/protobuf/field_mask";
import { StringValue } from "../../google/protobuf/wrappers";
import {
  ABitOfEverything,
  ABitOfEverythingRepeated,
  ABitOfEverything_Nested,
  Body,
  Book,
  CheckStatusResponse,
  CreateBookRequest,
  MessageWithBody,
  RequiredMessageTypeRequest,
  SnakeEnumRequest,
  SnakeEnumResponse,
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

// ABitOfEverything service is used to validate that APIs with complicated
// proto messages and URL templates are still processed correctly.
export interface ABitOfEverythingServiceClient {
  create(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  createBody(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  createBook(
    req: DeepPartial<CreateBookRequest>,
    options?: CallOptions,
  ): Promise<Book>;
  updateBook(
    req: DeepPartial<UpdateBookRequest>,
    options?: CallOptions,
  ): Promise<Book>;
  lookup(
    req: DeepPartial<IdMessage>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  custom(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  doubleColon(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  update(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<Empty>;
  updateV2(
    req: DeepPartial<UpdateV2Request>,
    options?: CallOptions,
  ): Promise<Empty>;
  delete(req: DeepPartial<IdMessage>, options?: CallOptions): Promise<Empty>;
  getQuery(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<Empty>;
  getRepeatedQuery(
    req: DeepPartial<ABitOfEverythingRepeated>,
    options?: CallOptions,
  ): Promise<ABitOfEverythingRepeated>;
  echo(
    req: DeepPartial<StringMessage>,
    options?: CallOptions,
  ): Promise<StringMessage>;
  deepPathEcho(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  noBindings(req: DeepPartial<Duration>, options?: CallOptions): Promise<Empty>;
  timeout(req: DeepPartial<Empty>, options?: CallOptions): Promise<Empty>;
  errorWithDetails(
    req: DeepPartial<Empty>,
    options?: CallOptions,
  ): Promise<Empty>;
  getMessageWithBody(
    req: DeepPartial<MessageWithBody>,
    options?: CallOptions,
  ): Promise<Empty>;
  postWithEmptyBody(
    req: DeepPartial<Body>,
    options?: CallOptions,
  ): Promise<Empty>;
  checkGetQueryParams(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  checkNestedEnumGetQueryParams(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  checkPostQueryParams(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  overwriteRequestContentType(
    req: DeepPartial<Body>,
    options?: CallOptions,
  ): Promise<Empty>;
  overwriteResponseContentType(
    req: DeepPartial<Empty>,
    options?: CallOptions,
  ): Promise<StringValue>;
  checkExternalPathEnum(
    req: DeepPartial<MessageWithPathEnum>,
    options?: CallOptions,
  ): Promise<Empty>;
  checkExternalNestedPathEnum(
    req: DeepPartial<MessageWithNestedPathEnum>,
    options?: CallOptions,
  ): Promise<Empty>;
  checkStatus(
    req: DeepPartial<Empty>,
    options?: CallOptions,
  ): Promise<CheckStatusResponse>;
  postOneofEnum(
    req: DeepPartial<OneofEnumMessage>,
    options?: CallOptions,
  ): Promise<Empty>;
  postRequiredMessageType(
    req: DeepPartial<RequiredMessageTypeRequest>,
    options?: CallOptions,
  ): Promise<Empty>;
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
      const queryParams = [
        ...queryParam("bytesValue", fullReq.bytesValue),
        ...queryParam("int64OverrideType", fullReq.int64OverrideType),
        ...queryParam(
          "nestedAnnotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nestedAnnotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nestedAnnotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("oneofString", fullReq.oneofString),
        ...queryParam("optionalStringField", fullReq.optionalStringField),
        ...queryParam("optionalStringValue", fullReq.optionalStringValue),
        ...queryParam(
          "outputOnlyStringViaFieldBehaviorAnnotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam(
          "productId",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumAnnotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumValue",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringAnnotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringValue",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name_custom",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name_custom",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("requiredStringField1", fullReq.requiredStringField1),
        ...queryParam("requiredStringField2", fullReq.requiredStringField2),
        ...queryParam(
          "requiredStringViaFieldBehaviorAnnotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("singleNested.amount", fullReq.singleNested?.amount),
        ...queryParam("singleNested.name", fullReq.singleNested?.name),
        ...queryParam("singleNested.ok", fullReq.singleNested?.ok),
        ...queryParam(
          "timestampValue",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailingBoth", fullReq.trailingBoth),
        ...queryParam("trailingMultiline", fullReq.trailingMultiline),
        ...queryParam("trailingOnly", fullReq.trailingOnly),
        ...queryParam("trailingOnlyDot", fullReq.trailingOnlyDot),
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${pathStr(must(fullReq.floatValue))}/${pathStr(must(fullReq.doubleValue))}/${pathStr(must(fullReq.int64Value))}/separator/${pathStr(must(fullReq.uint64Value))}/${pathStr(must(fullReq.int32Value))}/${pathStr(must(fullReq.fixed64Value))}/${pathStr(must(fullReq.fixed32Value))}/${pathStr(must(fullReq.boolValue))}/${pathStr(must(fullReq.stringValue))}/${pathStr(must(fullReq.uint32Value))}/${pathStr(must(fullReq.sfixed32Value))}/${pathStr(must(fullReq.sfixed64Value))}/${pathStr(must(fullReq.sint32Value))}/${pathStr(must(fullReq.sint64Value))}/${pathStr(must(fullReq.nonConventionalNameValue))}/${pathStr(must(fullReq.enumValue))}/${pathStr(must(fullReq.pathEnumValue))}/${pathStr(must(fullReq.nestedPathEnumValue))}/${pathStr(must(fullReq.enumValueAnnotation))}`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
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
      const queryParams = [...queryParam("bookId", fullReq.bookId)];
      const body: any = Book.toJSON(must(fullReq.book));
      const res = await transport.call({
        path: `/v1/${pathStr(must(fullReq.parent))}/books`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
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
      const queryParams = [
        ...queryParam("allowMissing", fullReq.allowMissing),
        ...queryParam(
          "updateMask",
          fullReq.updateMask
            ? (FieldMask.toJSON(FieldMask.wrap(fullReq.updateMask)) as string)
            : undefined,
        ),
      ];
      const body: any = (() => {
        const body: any = Book.toJSON(must(fullReq.book));
        delete body.name;
        return body;
      })();
      const res = await transport.call({
        path: `/v1/${pathStr(must(fullReq.book?.name))}`,
        method: "PATCH",
        headers: headers,
        queryParams: queryParams,
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
        path: `/v1/example/a_bit_of_everything/${pathStr(must(fullReq.uuid))}`,
        method: "GET",
        headers: headers,
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
      const queryParams = [
        ...queryParam("boolValue", fullReq.boolValue),
        ...queryParam("bytesValue", fullReq.bytesValue),
        ...queryParam("doubleValue", fullReq.doubleValue),
        ...queryParam("enumValue", fullReq.enumValue),
        ...queryParam("enumValueAnnotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32Value", fullReq.fixed32Value),
        ...queryParam("fixed64Value", fullReq.fixed64Value),
        ...queryParam("floatValue", fullReq.floatValue),
        ...queryParam("int32Value", fullReq.int32Value),
        ...queryParam("int64OverrideType", fullReq.int64OverrideType),
        ...queryParam("int64Value", fullReq.int64Value),
        ...queryParam(
          "nestedAnnotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nestedAnnotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nestedAnnotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nestedPathEnumValue", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneofString", fullReq.oneofString),
        ...queryParam("optionalStringField", fullReq.optionalStringField),
        ...queryParam("optionalStringValue", fullReq.optionalStringValue),
        ...queryParam(
          "outputOnlyStringViaFieldBehaviorAnnotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("pathEnumValue", fullReq.pathEnumValue),
        ...queryParam(
          "productId",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumAnnotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumValue",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringAnnotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringValue",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name_custom",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name_custom",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("requiredStringField1", fullReq.requiredStringField1),
        ...queryParam("requiredStringField2", fullReq.requiredStringField2),
        ...queryParam(
          "requiredStringViaFieldBehaviorAnnotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32Value", fullReq.sfixed32Value),
        ...queryParam("sfixed64Value", fullReq.sfixed64Value),
        ...queryParam("singleNested.amount", fullReq.singleNested?.amount),
        ...queryParam("singleNested.name", fullReq.singleNested?.name),
        ...queryParam("singleNested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32Value", fullReq.sint32Value),
        ...queryParam("sint64Value", fullReq.sint64Value),
        ...queryParam("stringValue", fullReq.stringValue),
        ...queryParam(
          "timestampValue",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailingBoth", fullReq.trailingBoth),
        ...queryParam("trailingMultiline", fullReq.trailingMultiline),
        ...queryParam("trailingOnly", fullReq.trailingOnly),
        ...queryParam("trailingOnlyDot", fullReq.trailingOnlyDot),
        ...queryParam("uint32Value", fullReq.uint32Value),
        ...queryParam("uint64Value", fullReq.uint64Value),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${pathStr(must(fullReq.uuid))}:custom`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
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
      const queryParams = [
        ...queryParam("boolValue", fullReq.boolValue),
        ...queryParam("bytesValue", fullReq.bytesValue),
        ...queryParam("doubleValue", fullReq.doubleValue),
        ...queryParam("enumValue", fullReq.enumValue),
        ...queryParam("enumValueAnnotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32Value", fullReq.fixed32Value),
        ...queryParam("fixed64Value", fullReq.fixed64Value),
        ...queryParam("floatValue", fullReq.floatValue),
        ...queryParam("int32Value", fullReq.int32Value),
        ...queryParam("int64OverrideType", fullReq.int64OverrideType),
        ...queryParam("int64Value", fullReq.int64Value),
        ...queryParam(
          "nestedAnnotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nestedAnnotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nestedAnnotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nestedPathEnumValue", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneofString", fullReq.oneofString),
        ...queryParam("optionalStringField", fullReq.optionalStringField),
        ...queryParam("optionalStringValue", fullReq.optionalStringValue),
        ...queryParam(
          "outputOnlyStringViaFieldBehaviorAnnotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("pathEnumValue", fullReq.pathEnumValue),
        ...queryParam(
          "productId",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumAnnotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumValue",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringAnnotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringValue",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name_custom",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name_custom",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("requiredStringField1", fullReq.requiredStringField1),
        ...queryParam("requiredStringField2", fullReq.requiredStringField2),
        ...queryParam(
          "requiredStringViaFieldBehaviorAnnotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32Value", fullReq.sfixed32Value),
        ...queryParam("sfixed64Value", fullReq.sfixed64Value),
        ...queryParam("singleNested.amount", fullReq.singleNested?.amount),
        ...queryParam("singleNested.name", fullReq.singleNested?.name),
        ...queryParam("singleNested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32Value", fullReq.sint32Value),
        ...queryParam("sint64Value", fullReq.sint64Value),
        ...queryParam("stringValue", fullReq.stringValue),
        ...queryParam(
          "timestampValue",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailingBoth", fullReq.trailingBoth),
        ...queryParam("trailingMultiline", fullReq.trailingMultiline),
        ...queryParam("trailingOnly", fullReq.trailingOnly),
        ...queryParam("trailingOnlyDot", fullReq.trailingOnlyDot),
        ...queryParam("uint32Value", fullReq.uint32Value),
        ...queryParam("uint64Value", fullReq.uint64Value),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${pathStr(must(fullReq.uuid))}:custom:custom`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
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
      const body: any = (() => {
        const body: any = ABitOfEverything.toJSON(fullReq);
        delete body.uuid;
        return body;
      })();
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${pathStr(must(fullReq.uuid))}`,
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
      const queryParams = [
        ...queryParam(
          "updateMask",
          fullReq.updateMask
            ? (FieldMask.toJSON(FieldMask.wrap(fullReq.updateMask)) as string)
            : undefined,
        ),
      ];
      const body: any = (() => {
        const body: any = ABitOfEverything.toJSON(must(fullReq.abe));
        delete body.uuid;
        return body;
      })();
      const res = await transport.call({
        path: `/v2/example/a_bit_of_everything/${pathStr(must(fullReq.abe?.uuid))}`,
        method: "PUT",
        headers: headers,
        queryParams: queryParams,
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
        path: `/v1/example/a_bit_of_everything/${pathStr(must(fullReq.uuid))}`,
        method: "DELETE",
        headers: headers,
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
      const queryParams = [
        ...queryParam("boolValue", fullReq.boolValue),
        ...queryParam("bytesValue", fullReq.bytesValue),
        ...queryParam("doubleValue", fullReq.doubleValue),
        ...queryParam("enumValue", fullReq.enumValue),
        ...queryParam("enumValueAnnotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32Value", fullReq.fixed32Value),
        ...queryParam("fixed64Value", fullReq.fixed64Value),
        ...queryParam("floatValue", fullReq.floatValue),
        ...queryParam("int32Value", fullReq.int32Value),
        ...queryParam("int64OverrideType", fullReq.int64OverrideType),
        ...queryParam("int64Value", fullReq.int64Value),
        ...queryParam(
          "nestedAnnotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nestedAnnotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nestedAnnotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nestedPathEnumValue", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneofString", fullReq.oneofString),
        ...queryParam("optionalStringField", fullReq.optionalStringField),
        ...queryParam("optionalStringValue", fullReq.optionalStringValue),
        ...queryParam(
          "outputOnlyStringViaFieldBehaviorAnnotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("pathEnumValue", fullReq.pathEnumValue),
        ...queryParam(
          "productId",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumAnnotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumValue",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringAnnotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringValue",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name_custom",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name_custom",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("requiredStringField1", fullReq.requiredStringField1),
        ...queryParam("requiredStringField2", fullReq.requiredStringField2),
        ...queryParam(
          "requiredStringViaFieldBehaviorAnnotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32Value", fullReq.sfixed32Value),
        ...queryParam("sfixed64Value", fullReq.sfixed64Value),
        ...queryParam("singleNested.amount", fullReq.singleNested?.amount),
        ...queryParam("singleNested.name", fullReq.singleNested?.name),
        ...queryParam("singleNested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32Value", fullReq.sint32Value),
        ...queryParam("sint64Value", fullReq.sint64Value),
        ...queryParam("stringValue", fullReq.stringValue),
        ...queryParam(
          "timestampValue",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailingBoth", fullReq.trailingBoth),
        ...queryParam("trailingMultiline", fullReq.trailingMultiline),
        ...queryParam("trailingOnly", fullReq.trailingOnly),
        ...queryParam("trailingOnlyDot", fullReq.trailingOnlyDot),
        ...queryParam("uint32Value", fullReq.uint32Value),
        ...queryParam("uint64Value", fullReq.uint64Value),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/query/${pathStr(must(fullReq.uuid))}`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
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
        path: `/v1/example/a_bit_of_everything_repeated/${pathStr(must(fullReq.pathRepeatedFloatValue))}/${pathStr(must(fullReq.pathRepeatedDoubleValue))}/${pathStr(must(fullReq.pathRepeatedInt64Value))}/${pathStr(must(fullReq.pathRepeatedUint64Value))}/${pathStr(must(fullReq.pathRepeatedInt32Value))}/${pathStr(must(fullReq.pathRepeatedFixed64Value))}/${pathStr(must(fullReq.pathRepeatedFixed32Value))}/${pathStr(must(fullReq.pathRepeatedBoolValue))}/${pathStr(must(fullReq.pathRepeatedStringValue))}/${pathStr(must(fullReq.pathRepeatedBytesValue))}/${pathStr(must(fullReq.pathRepeatedUint32Value))}/${pathStr(must(fullReq.pathRepeatedEnumValue))}/${pathStr(must(fullReq.pathRepeatedSfixed32Value))}/${pathStr(must(fullReq.pathRepeatedSfixed64Value))}/${pathStr(must(fullReq.pathRepeatedSint32Value))}/${pathStr(must(fullReq.pathRepeatedSint64Value))}`,
        method: "GET",
        headers: headers,
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
        path: `/v1/example/a_bit_of_everything/echo/${pathStr(must(fullReq.value))}`,
        method: "GET",
        headers: headers,
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
      const body: any = (() => {
        const body: any = ABitOfEverything.toJSON(fullReq);
        delete body.singleNested.name;
        return body;
      })();
      const res = await transport.call({
        path: `/v1/example/deep_path/${pathStr(must(fullReq.singleNested?.name))}`,
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
      const res = await transport.call({
        path: `/v2/example/withbody/${pathStr(must(fullReq.id))}`,
        method: "POST",
        headers: headers,
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
      const body: any = (() => {
        const body: any = Body.toJSON(fullReq);
        delete body.name;
        return body;
      })();
      const res = await transport.call({
        path: `/v2/example/postwithemptybody/${pathStr(must(fullReq.name))}`,
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
      const queryParams = [
        ...queryParam("boolValue", fullReq.boolValue),
        ...queryParam("bytesValue", fullReq.bytesValue),
        ...queryParam("doubleValue", fullReq.doubleValue),
        ...queryParam("enumValue", fullReq.enumValue),
        ...queryParam("enumValueAnnotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32Value", fullReq.fixed32Value),
        ...queryParam("fixed64Value", fullReq.fixed64Value),
        ...queryParam("floatValue", fullReq.floatValue),
        ...queryParam("int32Value", fullReq.int32Value),
        ...queryParam("int64OverrideType", fullReq.int64OverrideType),
        ...queryParam("int64Value", fullReq.int64Value),
        ...queryParam(
          "nestedAnnotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nestedAnnotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nestedAnnotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nestedPathEnumValue", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneofString", fullReq.oneofString),
        ...queryParam("optionalStringField", fullReq.optionalStringField),
        ...queryParam("optionalStringValue", fullReq.optionalStringValue),
        ...queryParam(
          "outputOnlyStringViaFieldBehaviorAnnotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("pathEnumValue", fullReq.pathEnumValue),
        ...queryParam(
          "productId",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumAnnotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumValue",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringAnnotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringValue",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name_custom",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name_custom",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("requiredStringField1", fullReq.requiredStringField1),
        ...queryParam("requiredStringField2", fullReq.requiredStringField2),
        ...queryParam(
          "requiredStringViaFieldBehaviorAnnotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32Value", fullReq.sfixed32Value),
        ...queryParam("sfixed64Value", fullReq.sfixed64Value),
        ...queryParam("singleNested.amount", fullReq.singleNested?.amount),
        ...queryParam("singleNested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32Value", fullReq.sint32Value),
        ...queryParam("sint64Value", fullReq.sint64Value),
        ...queryParam("stringValue", fullReq.stringValue),
        ...queryParam(
          "timestampValue",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailingBoth", fullReq.trailingBoth),
        ...queryParam("trailingMultiline", fullReq.trailingMultiline),
        ...queryParam("trailingOnly", fullReq.trailingOnly),
        ...queryParam("trailingOnlyDot", fullReq.trailingOnlyDot),
        ...queryParam("uint32Value", fullReq.uint32Value),
        ...queryParam("uint64Value", fullReq.uint64Value),
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/params/get/${pathStr(must(fullReq.singleNested?.name))}`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
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
      const queryParams = [
        ...queryParam("boolValue", fullReq.boolValue),
        ...queryParam("bytesValue", fullReq.bytesValue),
        ...queryParam("doubleValue", fullReq.doubleValue),
        ...queryParam("enumValue", fullReq.enumValue),
        ...queryParam("enumValueAnnotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32Value", fullReq.fixed32Value),
        ...queryParam("fixed64Value", fullReq.fixed64Value),
        ...queryParam("floatValue", fullReq.floatValue),
        ...queryParam("int32Value", fullReq.int32Value),
        ...queryParam("int64OverrideType", fullReq.int64OverrideType),
        ...queryParam("int64Value", fullReq.int64Value),
        ...queryParam(
          "nestedAnnotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nestedAnnotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nestedAnnotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nestedPathEnumValue", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneofString", fullReq.oneofString),
        ...queryParam("optionalStringField", fullReq.optionalStringField),
        ...queryParam("optionalStringValue", fullReq.optionalStringValue),
        ...queryParam(
          "outputOnlyStringViaFieldBehaviorAnnotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("pathEnumValue", fullReq.pathEnumValue),
        ...queryParam(
          "productId",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumAnnotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumValue",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringAnnotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringValue",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name_custom",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name_custom",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("requiredStringField1", fullReq.requiredStringField1),
        ...queryParam("requiredStringField2", fullReq.requiredStringField2),
        ...queryParam(
          "requiredStringViaFieldBehaviorAnnotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32Value", fullReq.sfixed32Value),
        ...queryParam("sfixed64Value", fullReq.sfixed64Value),
        ...queryParam("singleNested.amount", fullReq.singleNested?.amount),
        ...queryParam("singleNested.name", fullReq.singleNested?.name),
        ...queryParam("sint32Value", fullReq.sint32Value),
        ...queryParam("sint64Value", fullReq.sint64Value),
        ...queryParam("stringValue", fullReq.stringValue),
        ...queryParam(
          "timestampValue",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailingBoth", fullReq.trailingBoth),
        ...queryParam("trailingMultiline", fullReq.trailingMultiline),
        ...queryParam("trailingOnly", fullReq.trailingOnly),
        ...queryParam("trailingOnlyDot", fullReq.trailingOnlyDot),
        ...queryParam("uint32Value", fullReq.uint32Value),
        ...queryParam("uint64Value", fullReq.uint64Value),
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/params/get/nested_enum/${pathStr(must(fullReq.singleNested?.ok))}`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
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
      const queryParams = [
        ...queryParam("boolValue", fullReq.boolValue),
        ...queryParam("bytesValue", fullReq.bytesValue),
        ...queryParam("doubleValue", fullReq.doubleValue),
        ...queryParam("enumValue", fullReq.enumValue),
        ...queryParam("enumValueAnnotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32Value", fullReq.fixed32Value),
        ...queryParam("fixed64Value", fullReq.fixed64Value),
        ...queryParam("floatValue", fullReq.floatValue),
        ...queryParam("int32Value", fullReq.int32Value),
        ...queryParam("int64OverrideType", fullReq.int64OverrideType),
        ...queryParam("int64Value", fullReq.int64Value),
        ...queryParam(
          "nestedAnnotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nestedAnnotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nestedAnnotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nestedPathEnumValue", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneofString", fullReq.oneofString),
        ...queryParam("optionalStringField", fullReq.optionalStringField),
        ...queryParam("optionalStringValue", fullReq.optionalStringValue),
        ...queryParam(
          "outputOnlyStringViaFieldBehaviorAnnotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("pathEnumValue", fullReq.pathEnumValue),
        ...queryParam(
          "productId",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumAnnotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedEnumValue",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringAnnotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeatedStringValue",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name_custom",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name_custom",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("requiredStringField1", fullReq.requiredStringField1),
        ...queryParam("requiredStringField2", fullReq.requiredStringField2),
        ...queryParam(
          "requiredStringViaFieldBehaviorAnnotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32Value", fullReq.sfixed32Value),
        ...queryParam("sfixed64Value", fullReq.sfixed64Value),
        ...queryParam("sint32Value", fullReq.sint32Value),
        ...queryParam("sint64Value", fullReq.sint64Value),
        ...queryParam(
          "timestampValue",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailingBoth", fullReq.trailingBoth),
        ...queryParam("trailingMultiline", fullReq.trailingMultiline),
        ...queryParam("trailingOnly", fullReq.trailingOnly),
        ...queryParam("trailingOnlyDot", fullReq.trailingOnlyDot),
        ...queryParam("uint32Value", fullReq.uint32Value),
        ...queryParam("uint64Value", fullReq.uint64Value),
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const body: any = ABitOfEverything_Nested.toJSON(
        must(fullReq.singleNested),
      );
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/params/post/${pathStr(must(fullReq.stringValue))}`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
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
        path: `/v2/${pathStr(must(fullReq.value))}:check`,
        method: "GET",
        headers: headers,
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
        path: `/v3/${pathStr(must(fullReq.value))}:check`,
        method: "GET",
        headers: headers,
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
export interface AnotherServiceWithNoBindingsClient {
  noBindings(req: DeepPartial<Empty>, options?: CallOptions): Promise<Empty>;
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

export interface SnakeEnumServiceClient {
  snakeEnum(
    req: DeepPartial<SnakeEnumRequest>,
    options?: CallOptions,
  ): Promise<SnakeEnumResponse>;
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
        path: `/v1/example/snake/${pathStr(must(fullReq.who))}/${pathStr(must(fullReq.what))}/${pathStr(must(fullReq.where))}`,
        method: "GET",
        headers: headers,
      });
      return SnakeEnumResponse.fromJSON(res);
    },
  };
}
