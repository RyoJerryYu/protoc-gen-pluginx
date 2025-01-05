import { MessageInitShape, create, fromJson, toJson } from "@bufbuild/protobuf";
import {
  Duration,
  DurationSchema,
  Empty,
  EmptySchema,
  FieldMaskSchema,
  StringValue,
  StringValueSchema,
  TimestampSchema,
} from "@bufbuild/protobuf/wkt";
import {
  ABitOfEverything,
  ABitOfEverythingRepeated,
  ABitOfEverythingRepeatedSchema,
  ABitOfEverythingSchema,
  ABitOfEverything_NestedSchema,
  Body,
  BodySchema,
  Book,
  BookSchema,
  CheckStatusResponse,
  CheckStatusResponseSchema,
  CreateBookRequest,
  CreateBookRequestSchema,
  MessageWithBody,
  MessageWithBodySchema,
  RequiredMessageTypeRequest,
  RequiredMessageTypeRequestSchema,
  SnakeEnumRequest,
  SnakeEnumRequestSchema,
  SnakeEnumResponse,
  SnakeEnumResponseSchema,
  UpdateBookRequest,
  UpdateBookRequestSchema,
  UpdateV2Request,
  UpdateV2RequestSchema,
} from "./a_bit_of_everything_pb";
import {
  OneofEnumMessage,
  OneofEnumMessageSchema,
} from "../oneofenum/oneof_enum_pb";
import {
  MessageWithNestedPathEnum,
  MessageWithNestedPathEnumSchema,
  MessageWithPathEnum,
  MessageWithPathEnumSchema,
} from "../pathenum/path_enum_pb";
import { StringMessage, StringMessageSchema } from "../sub/message_pb";
import { IdMessage, IdMessageSchema } from "../sub2/message_pb";

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
      const fullReq = create(
        ABitOfEverythingSchema,
        req as MessageInitShape<typeof ABitOfEverythingSchema>,
      );
      const queryParams = [
        ...queryParam("bytesValue", fullReq.bytesValue),
        ...queryParam("int64OverrideType", fullReq.int64OverrideType),
        ...queryParam(
          "nestedAnnotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nestedAnnotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nestedAnnotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam(
          "oneofString",
          fullReq.oneofValue.case === "oneofString"
            ? fullReq.oneofValue.value
            : undefined,
        ),
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
            ? toJson(TimestampSchema, fullReq.timestampValue)
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
      return fromJson(ABitOfEverythingSchema, res);
    },

    async createBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        ABitOfEverythingSchema,
        req as MessageInitShape<typeof ABitOfEverythingSchema>,
      );
      const body: any = toJson(ABitOfEverythingSchema, fullReq);
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    // Create a book.
    async createBook(
      req: DeepPartial<CreateBookRequest>,
      options?: CallOptions,
    ): Promise<Book> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        CreateBookRequestSchema,
        req as MessageInitShape<typeof CreateBookRequestSchema>,
      );
      const queryParams = [...queryParam("bookId", fullReq.bookId)];
      const body: any = toJson(BookSchema, must(fullReq.book));
      const res = await transport.call({
        path: `/v1/${pathStr(must(fullReq.parent))}/books`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(BookSchema, res);
    },

    async updateBook(
      req: DeepPartial<UpdateBookRequest>,
      options?: CallOptions,
    ): Promise<Book> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        UpdateBookRequestSchema,
        req as MessageInitShape<typeof UpdateBookRequestSchema>,
      );
      const queryParams = [
        ...queryParam("allowMissing", fullReq.allowMissing),
        ...queryParam(
          "updateMask",
          fullReq.updateMask
            ? toJson(FieldMaskSchema, fullReq.updateMask)
            : undefined,
        ),
      ];
      const body: any = (() => {
        const body: any = toJson(BookSchema, must(fullReq.book));
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
      return fromJson(BookSchema, res);
    },

    async lookup(
      req: DeepPartial<IdMessage>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        IdMessageSchema,
        req as MessageInitShape<typeof IdMessageSchema>,
      );
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${pathStr(must(fullReq.uuid))}`,
        method: "GET",
        headers: headers,
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async custom(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        ABitOfEverythingSchema,
        req as MessageInitShape<typeof ABitOfEverythingSchema>,
      );
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
        ...queryParam(
          "oneofString",
          fullReq.oneofValue.case === "oneofString"
            ? fullReq.oneofValue.value
            : undefined,
        ),
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
            ? toJson(TimestampSchema, fullReq.timestampValue)
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
      return fromJson(ABitOfEverythingSchema, res);
    },

    async doubleColon(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        ABitOfEverythingSchema,
        req as MessageInitShape<typeof ABitOfEverythingSchema>,
      );
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
        ...queryParam(
          "oneofString",
          fullReq.oneofValue.case === "oneofString"
            ? fullReq.oneofValue.value
            : undefined,
        ),
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
            ? toJson(TimestampSchema, fullReq.timestampValue)
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
      return fromJson(ABitOfEverythingSchema, res);
    },

    async update(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        ABitOfEverythingSchema,
        req as MessageInitShape<typeof ABitOfEverythingSchema>,
      );
      const body: any = (() => {
        const body: any = toJson(ABitOfEverythingSchema, fullReq);
        delete body.uuid;
        return body;
      })();
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${pathStr(must(fullReq.uuid))}`,
        method: "PUT",
        headers: headers,
        body: JSON.stringify(body),
      });
      return fromJson(EmptySchema, res);
    },

    async updateV2(
      req: DeepPartial<UpdateV2Request>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        UpdateV2RequestSchema,
        req as MessageInitShape<typeof UpdateV2RequestSchema>,
      );
      const queryParams = [
        ...queryParam(
          "updateMask",
          fullReq.updateMask
            ? toJson(FieldMaskSchema, fullReq.updateMask)
            : undefined,
        ),
      ];
      const body: any = (() => {
        const body: any = toJson(ABitOfEverythingSchema, must(fullReq.abe));
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
      return fromJson(EmptySchema, res);
    },

    async delete(
      req: DeepPartial<IdMessage>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        IdMessageSchema,
        req as MessageInitShape<typeof IdMessageSchema>,
      );
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/${pathStr(must(fullReq.uuid))}`,
        method: "DELETE",
        headers: headers,
      });
      return fromJson(EmptySchema, res);
    },

    async getQuery(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        ABitOfEverythingSchema,
        req as MessageInitShape<typeof ABitOfEverythingSchema>,
      );
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
        ...queryParam(
          "oneofString",
          fullReq.oneofValue.case === "oneofString"
            ? fullReq.oneofValue.value
            : undefined,
        ),
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
            ? toJson(TimestampSchema, fullReq.timestampValue)
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
      return fromJson(EmptySchema, res);
    },

    async getRepeatedQuery(
      req: DeepPartial<ABitOfEverythingRepeated>,
      options?: CallOptions,
    ): Promise<ABitOfEverythingRepeated> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        ABitOfEverythingRepeatedSchema,
        req as MessageInitShape<typeof ABitOfEverythingRepeatedSchema>,
      );
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything_repeated/${pathStr(must(fullReq.pathRepeatedFloatValue))}/${pathStr(must(fullReq.pathRepeatedDoubleValue))}/${pathStr(must(fullReq.pathRepeatedInt64Value))}/${pathStr(must(fullReq.pathRepeatedUint64Value))}/${pathStr(must(fullReq.pathRepeatedInt32Value))}/${pathStr(must(fullReq.pathRepeatedFixed64Value))}/${pathStr(must(fullReq.pathRepeatedFixed32Value))}/${pathStr(must(fullReq.pathRepeatedBoolValue))}/${pathStr(must(fullReq.pathRepeatedStringValue))}/${pathStr(must(fullReq.pathRepeatedBytesValue))}/${pathStr(must(fullReq.pathRepeatedUint32Value))}/${pathStr(must(fullReq.pathRepeatedEnumValue))}/${pathStr(must(fullReq.pathRepeatedSfixed32Value))}/${pathStr(must(fullReq.pathRepeatedSfixed64Value))}/${pathStr(must(fullReq.pathRepeatedSint32Value))}/${pathStr(must(fullReq.pathRepeatedSint64Value))}`,
        method: "GET",
        headers: headers,
      });
      return fromJson(ABitOfEverythingRepeatedSchema, res);
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
      const fullReq = create(
        StringMessageSchema,
        req as MessageInitShape<typeof StringMessageSchema>,
      );
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/echo/${pathStr(must(fullReq.value))}`,
        method: "GET",
        headers: headers,
      });
      return fromJson(StringMessageSchema, res);
    },

    async deepPathEcho(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        ABitOfEverythingSchema,
        req as MessageInitShape<typeof ABitOfEverythingSchema>,
      );
      const body: any = (() => {
        const body: any = toJson(ABitOfEverythingSchema, fullReq);
        delete body.singleNested.name;
        return body;
      })();
      const res = await transport.call({
        path: `/v1/example/deep_path/${pathStr(must(fullReq.singleNested?.name))}`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async noBindings(
      req: DeepPartial<Duration>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        DurationSchema,
        req as MessageInitShape<typeof DurationSchema>,
      );
      const body: any = toJson(DurationSchema, fullReq);
      const res = await transport.call({
        path: `/proto.examplepb.ABitOfEverythingService/NoBindings`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return fromJson(EmptySchema, res);
    },

    async timeout(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        EmptySchema,
        req as MessageInitShape<typeof EmptySchema>,
      );
      const res = await transport.call({
        path: `/v2/example/timeout`,
        method: "GET",
        headers: headers,
      });
      return fromJson(EmptySchema, res);
    },

    async errorWithDetails(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        EmptySchema,
        req as MessageInitShape<typeof EmptySchema>,
      );
      const res = await transport.call({
        path: `/v2/example/errorwithdetails`,
        method: "GET",
        headers: headers,
      });
      return fromJson(EmptySchema, res);
    },

    async getMessageWithBody(
      req: DeepPartial<MessageWithBody>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        MessageWithBodySchema,
        req as MessageInitShape<typeof MessageWithBodySchema>,
      );
      const body: any = toJson(BodySchema, must(fullReq.data));
      const res = await transport.call({
        path: `/v2/example/withbody/${pathStr(must(fullReq.id))}`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return fromJson(EmptySchema, res);
    },

    async postWithEmptyBody(
      req: DeepPartial<Body>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        BodySchema,
        req as MessageInitShape<typeof BodySchema>,
      );
      const body: any = (() => {
        const body: any = toJson(BodySchema, fullReq);
        delete body.name;
        return body;
      })();
      const res = await transport.call({
        path: `/v2/example/postwithemptybody/${pathStr(must(fullReq.name))}`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return fromJson(EmptySchema, res);
    },

    async checkGetQueryParams(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        ABitOfEverythingSchema,
        req as MessageInitShape<typeof ABitOfEverythingSchema>,
      );
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
        ...queryParam(
          "oneofString",
          fullReq.oneofValue.case === "oneofString"
            ? fullReq.oneofValue.value
            : undefined,
        ),
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
            ? toJson(TimestampSchema, fullReq.timestampValue)
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
      return fromJson(ABitOfEverythingSchema, res);
    },

    async checkNestedEnumGetQueryParams(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        ABitOfEverythingSchema,
        req as MessageInitShape<typeof ABitOfEverythingSchema>,
      );
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
        ...queryParam(
          "oneofString",
          fullReq.oneofValue.case === "oneofString"
            ? fullReq.oneofValue.value
            : undefined,
        ),
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
            ? toJson(TimestampSchema, fullReq.timestampValue)
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
      return fromJson(ABitOfEverythingSchema, res);
    },

    async checkPostQueryParams(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        ABitOfEverythingSchema,
        req as MessageInitShape<typeof ABitOfEverythingSchema>,
      );
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
        ...queryParam(
          "oneofString",
          fullReq.oneofValue.case === "oneofString"
            ? fullReq.oneofValue.value
            : undefined,
        ),
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
            ? toJson(TimestampSchema, fullReq.timestampValue)
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
      const body: any = toJson(
        ABitOfEverything_NestedSchema,
        must(fullReq.singleNested),
      );
      const res = await transport.call({
        path: `/v1/example/a_bit_of_everything/params/post/${pathStr(must(fullReq.stringValue))}`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async overwriteRequestContentType(
      req: DeepPartial<Body>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        BodySchema,
        req as MessageInitShape<typeof BodySchema>,
      );
      const body: any = toJson(BodySchema, fullReq);
      const res = await transport.call({
        path: `/v2/example/overwriterequestcontenttype`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return fromJson(EmptySchema, res);
    },

    async overwriteResponseContentType(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<StringValue> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        EmptySchema,
        req as MessageInitShape<typeof EmptySchema>,
      );
      const res = await transport.call({
        path: `/v2/example/overwriteresponsecontenttype`,
        method: "GET",
        headers: headers,
      });
      return fromJson(StringValueSchema, res);
    },

    async checkExternalPathEnum(
      req: DeepPartial<MessageWithPathEnum>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        MessageWithPathEnumSchema,
        req as MessageInitShape<typeof MessageWithPathEnumSchema>,
      );
      const res = await transport.call({
        path: `/v2/${pathStr(must(fullReq.value))}:check`,
        method: "GET",
        headers: headers,
      });
      return fromJson(EmptySchema, res);
    },

    async checkExternalNestedPathEnum(
      req: DeepPartial<MessageWithNestedPathEnum>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        MessageWithNestedPathEnumSchema,
        req as MessageInitShape<typeof MessageWithNestedPathEnumSchema>,
      );
      const res = await transport.call({
        path: `/v3/${pathStr(must(fullReq.value))}:check`,
        method: "GET",
        headers: headers,
      });
      return fromJson(EmptySchema, res);
    },

    async checkStatus(
      req: DeepPartial<Empty>,
      options?: CallOptions,
    ): Promise<CheckStatusResponse> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        EmptySchema,
        req as MessageInitShape<typeof EmptySchema>,
      );
      const res = await transport.call({
        path: `/v1/example/checkStatus`,
        method: "GET",
        headers: headers,
      });
      return fromJson(CheckStatusResponseSchema, res);
    },

    async postOneofEnum(
      req: DeepPartial<OneofEnumMessage>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        OneofEnumMessageSchema,
        req as MessageInitShape<typeof OneofEnumMessageSchema>,
      );
      const body: any = must(
        fullReq.one.case === "exampleEnum" ? fullReq.one.value : undefined,
      );
      const res = await transport.call({
        path: `/v1/example/oneofenum`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return fromJson(EmptySchema, res);
    },

    async postRequiredMessageType(
      req: DeepPartial<RequiredMessageTypeRequest>,
      options?: CallOptions,
    ): Promise<Empty> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        RequiredMessageTypeRequestSchema,
        req as MessageInitShape<typeof RequiredMessageTypeRequestSchema>,
      );
      const body: any = toJson(RequiredMessageTypeRequestSchema, fullReq);
      const res = await transport.call({
        path: `/v1/example/requiredmessagetype`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return fromJson(EmptySchema, res);
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
      const fullReq = create(
        EmptySchema,
        req as MessageInitShape<typeof EmptySchema>,
      );
      const body: any = toJson(EmptySchema, fullReq);
      const res = await transport.call({
        path: `/proto.examplepb.AnotherServiceWithNoBindings/NoBindings`,
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
      return fromJson(EmptySchema, res);
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
      const fullReq = create(
        SnakeEnumRequestSchema,
        req as MessageInitShape<typeof SnakeEnumRequestSchema>,
      );
      const res = await transport.call({
        path: `/v1/example/snake/${pathStr(must(fullReq.who))}/${pathStr(must(fullReq.what))}/${pathStr(must(fullReq.where))}`,
        method: "GET",
        headers: headers,
      });
      return fromJson(SnakeEnumResponseSchema, res);
    },
  };
}
