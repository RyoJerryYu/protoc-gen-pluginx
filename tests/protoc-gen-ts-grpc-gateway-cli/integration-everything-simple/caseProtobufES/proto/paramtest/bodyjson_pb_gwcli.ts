import { MessageInitShape, create, fromJson, toJson } from "@bufbuild/protobuf";
import {
  BoolValueSchema,
  BytesValueSchema,
  DoubleValueSchema,
  DurationSchema,
  FieldMaskSchema,
  FloatValueSchema,
  Int32ValueSchema,
  Int64ValueSchema,
  ListValueSchema,
  StringValueSchema,
  TimestampSchema,
  UInt32ValueSchema,
  UInt64ValueSchema,
  ValueSchema,
} from "@bufbuild/protobuf/wkt";
import {
  ABitOfEverything,
  ABitOfEverythingSchema,
  ABitOfEverything_NestedSchema,
} from "../examplepb/a_bit_of_everything_pb";
import {
  WellKnownTypesHolder,
  WellKnownTypesHolderSchema,
} from "./bodyjson_pb";

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

export interface BodyJSONServiceClient {
  postEnumBody(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  postStringBody(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  postRepeatedMessageBody(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  postRepeatedEnumBody(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  postRepeatedStringBody(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  postMapMessageBody(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  postMapEnumBody(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  postMapStringBody(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  postTimestampBody(
    req: DeepPartial<WellKnownTypesHolder>,
    options?: CallOptions,
  ): Promise<WellKnownTypesHolder>;
  postFieldMaskBody(
    req: DeepPartial<WellKnownTypesHolder>,
    options?: CallOptions,
  ): Promise<WellKnownTypesHolder>;
  postStructBody(
    req: DeepPartial<WellKnownTypesHolder>,
    options?: CallOptions,
  ): Promise<WellKnownTypesHolder>;
  postValueBody(
    req: DeepPartial<WellKnownTypesHolder>,
    options?: CallOptions,
  ): Promise<WellKnownTypesHolder>;
  postListValueBody(
    req: DeepPartial<WellKnownTypesHolder>,
    options?: CallOptions,
  ): Promise<WellKnownTypesHolder>;
  postWrapperBody(
    req: DeepPartial<WellKnownTypesHolder>,
    options?: CallOptions,
  ): Promise<WellKnownTypesHolder>;
}
// normal fields

export function newBodyJSONService(
  transport: Transport,
): BodyJSONServiceClient {
  return {
    async postEnumBody(
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const body: any = must(fullReq.enumValue);
      const res = await transport.call({
        path: `/v1/bodyjson/enumbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async postStringBody(
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
      const body: any = must(fullReq.stringValue);
      const res = await transport.call({
        path: `/v1/bodyjson/stringbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async postRepeatedMessageBody(
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const body: any = must(fullReq.nested).map((e) =>
        toJson(ABitOfEverything_NestedSchema, e),
      );
      const res = await transport.call({
        path: `/v1/bodyjson/repeatedmessagebody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async postRepeatedEnumBody(
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const body: any = must(fullReq.repeatedEnumValue).map((e) => e);
      const res = await transport.call({
        path: `/v1/bodyjson/repeatedenumbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async postRepeatedStringBody(
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const body: any = must(fullReq.repeatedStringValue).map((e) => e);
      const res = await transport.call({
        path: `/v1/bodyjson/repeatedstringbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async postMapMessageBody(
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const body: any = ((s) => {
        const entries = Object.entries(s);
        const obj: any = {};
        for (const [k, v] of entries) {
          obj[k] = toJson(ABitOfEverything_NestedSchema, v);
        }
        return obj;
      })(must(fullReq.mappedNestedValue));
      const res = await transport.call({
        path: `/v1/bodyjson/mapmessagebody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async postMapEnumBody(
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const body: any = ((s) => {
        const entries = Object.entries(s);
        const obj: any = {};
        for (const [k, v] of entries) {
          obj[k] = v;
        }
        return obj;
      })(must(fullReq.mapValue));
      const res = await transport.call({
        path: `/v1/bodyjson/mapenumbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async postMapStringBody(
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const body: any = ((s) => {
        const entries = Object.entries(s);
        const obj: any = {};
        for (const [k, v] of entries) {
          obj[k] = v;
        }
        return obj;
      })(must(fullReq.mappedStringValue));
      const res = await transport.call({
        path: `/v1/bodyjson/mapstringbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async postTimestampBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        WellKnownTypesHolderSchema,
        req as MessageInitShape<typeof WellKnownTypesHolderSchema>,
      );
      const queryParams = [
        ...queryParam(
          "boolValue",
          fullReq.boolValue
            ? toJson(
                BoolValueSchema,
                create(BoolValueSchema, { value: fullReq.boolValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "bytesValue",
          fullReq.bytesValue
            ? toJson(
                BytesValueSchema,
                create(BytesValueSchema, { value: fullReq.bytesValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "doubleValue",
          fullReq.doubleValue
            ? toJson(
                DoubleValueSchema,
                create(DoubleValueSchema, { value: fullReq.doubleValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "duration",
          fullReq.duration
            ? toJson(DurationSchema, fullReq.duration)
            : undefined,
        ),
        ...queryParam(
          "fieldMask",
          fullReq.fieldMask
            ? toJson(FieldMaskSchema, fullReq.fieldMask)
            : undefined,
        ),
        ...queryParam(
          "floatValue",
          fullReq.floatValue
            ? toJson(
                FloatValueSchema,
                create(FloatValueSchema, { value: fullReq.floatValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "int32Value",
          fullReq.int32Value
            ? toJson(
                Int32ValueSchema,
                create(Int32ValueSchema, { value: fullReq.int32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "int64Value",
          fullReq.int64Value
            ? toJson(
                Int64ValueSchema,
                create(Int64ValueSchema, { value: fullReq.int64Value }),
              )
            : undefined,
        ),
        ...queryParam("payloadCheck", fullReq.payloadCheck),
        ...queryParam(
          "stringValue",
          fullReq.stringValue
            ? toJson(
                StringValueSchema,
                create(StringValueSchema, { value: fullReq.stringValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "uint32Value",
          fullReq.uint32Value
            ? toJson(
                UInt32ValueSchema,
                create(UInt32ValueSchema, { value: fullReq.uint32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "uint64Value",
          fullReq.uint64Value
            ? toJson(
                UInt64ValueSchema,
                create(UInt64ValueSchema, { value: fullReq.uint64Value }),
              )
            : undefined,
        ),
      ];
      const body: any = toJson(TimestampSchema, must(fullReq.timestamp));
      const res = await transport.call({
        path: `/v1/bodyjson/timestampbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(WellKnownTypesHolderSchema, res);
    },

    async postFieldMaskBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        WellKnownTypesHolderSchema,
        req as MessageInitShape<typeof WellKnownTypesHolderSchema>,
      );
      const queryParams = [
        ...queryParam(
          "boolValue",
          fullReq.boolValue
            ? toJson(
                BoolValueSchema,
                create(BoolValueSchema, { value: fullReq.boolValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "bytesValue",
          fullReq.bytesValue
            ? toJson(
                BytesValueSchema,
                create(BytesValueSchema, { value: fullReq.bytesValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "doubleValue",
          fullReq.doubleValue
            ? toJson(
                DoubleValueSchema,
                create(DoubleValueSchema, { value: fullReq.doubleValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "duration",
          fullReq.duration
            ? toJson(DurationSchema, fullReq.duration)
            : undefined,
        ),
        ...queryParam(
          "floatValue",
          fullReq.floatValue
            ? toJson(
                FloatValueSchema,
                create(FloatValueSchema, { value: fullReq.floatValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "int32Value",
          fullReq.int32Value
            ? toJson(
                Int32ValueSchema,
                create(Int32ValueSchema, { value: fullReq.int32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "int64Value",
          fullReq.int64Value
            ? toJson(
                Int64ValueSchema,
                create(Int64ValueSchema, { value: fullReq.int64Value }),
              )
            : undefined,
        ),
        ...queryParam("payloadCheck", fullReq.payloadCheck),
        ...queryParam(
          "stringValue",
          fullReq.stringValue
            ? toJson(
                StringValueSchema,
                create(StringValueSchema, { value: fullReq.stringValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp
            ? toJson(TimestampSchema, fullReq.timestamp)
            : undefined,
        ),
        ...queryParam(
          "uint32Value",
          fullReq.uint32Value
            ? toJson(
                UInt32ValueSchema,
                create(UInt32ValueSchema, { value: fullReq.uint32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "uint64Value",
          fullReq.uint64Value
            ? toJson(
                UInt64ValueSchema,
                create(UInt64ValueSchema, { value: fullReq.uint64Value }),
              )
            : undefined,
        ),
      ];
      const body: any = toJson(FieldMaskSchema, must(fullReq.fieldMask));
      const res = await transport.call({
        path: `/v1/bodyjson/fieldmaskbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(WellKnownTypesHolderSchema, res);
    },

    async postStructBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        WellKnownTypesHolderSchema,
        req as MessageInitShape<typeof WellKnownTypesHolderSchema>,
      );
      const queryParams = [
        ...queryParam(
          "boolValue",
          fullReq.boolValue
            ? toJson(
                BoolValueSchema,
                create(BoolValueSchema, { value: fullReq.boolValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "bytesValue",
          fullReq.bytesValue
            ? toJson(
                BytesValueSchema,
                create(BytesValueSchema, { value: fullReq.bytesValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "doubleValue",
          fullReq.doubleValue
            ? toJson(
                DoubleValueSchema,
                create(DoubleValueSchema, { value: fullReq.doubleValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "duration",
          fullReq.duration
            ? toJson(DurationSchema, fullReq.duration)
            : undefined,
        ),
        ...queryParam(
          "fieldMask",
          fullReq.fieldMask
            ? toJson(FieldMaskSchema, fullReq.fieldMask)
            : undefined,
        ),
        ...queryParam(
          "floatValue",
          fullReq.floatValue
            ? toJson(
                FloatValueSchema,
                create(FloatValueSchema, { value: fullReq.floatValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "int32Value",
          fullReq.int32Value
            ? toJson(
                Int32ValueSchema,
                create(Int32ValueSchema, { value: fullReq.int32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "int64Value",
          fullReq.int64Value
            ? toJson(
                Int64ValueSchema,
                create(Int64ValueSchema, { value: fullReq.int64Value }),
              )
            : undefined,
        ),
        ...queryParam("payloadCheck", fullReq.payloadCheck),
        ...queryParam(
          "stringValue",
          fullReq.stringValue
            ? toJson(
                StringValueSchema,
                create(StringValueSchema, { value: fullReq.stringValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp
            ? toJson(TimestampSchema, fullReq.timestamp)
            : undefined,
        ),
        ...queryParam(
          "uint32Value",
          fullReq.uint32Value
            ? toJson(
                UInt32ValueSchema,
                create(UInt32ValueSchema, { value: fullReq.uint32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "uint64Value",
          fullReq.uint64Value
            ? toJson(
                UInt64ValueSchema,
                create(UInt64ValueSchema, { value: fullReq.uint64Value }),
              )
            : undefined,
        ),
      ];
      const body: any = must(fullReq.struct);
      const res = await transport.call({
        path: `/v1/bodyjson/structbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(WellKnownTypesHolderSchema, res);
    },

    async postValueBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        WellKnownTypesHolderSchema,
        req as MessageInitShape<typeof WellKnownTypesHolderSchema>,
      );
      const queryParams = [
        ...queryParam(
          "boolValue",
          fullReq.boolValue
            ? toJson(
                BoolValueSchema,
                create(BoolValueSchema, { value: fullReq.boolValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "bytesValue",
          fullReq.bytesValue
            ? toJson(
                BytesValueSchema,
                create(BytesValueSchema, { value: fullReq.bytesValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "doubleValue",
          fullReq.doubleValue
            ? toJson(
                DoubleValueSchema,
                create(DoubleValueSchema, { value: fullReq.doubleValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "duration",
          fullReq.duration
            ? toJson(DurationSchema, fullReq.duration)
            : undefined,
        ),
        ...queryParam(
          "fieldMask",
          fullReq.fieldMask
            ? toJson(FieldMaskSchema, fullReq.fieldMask)
            : undefined,
        ),
        ...queryParam(
          "floatValue",
          fullReq.floatValue
            ? toJson(
                FloatValueSchema,
                create(FloatValueSchema, { value: fullReq.floatValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "int32Value",
          fullReq.int32Value
            ? toJson(
                Int32ValueSchema,
                create(Int32ValueSchema, { value: fullReq.int32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "int64Value",
          fullReq.int64Value
            ? toJson(
                Int64ValueSchema,
                create(Int64ValueSchema, { value: fullReq.int64Value }),
              )
            : undefined,
        ),
        ...queryParam("payloadCheck", fullReq.payloadCheck),
        ...queryParam(
          "stringValue",
          fullReq.stringValue
            ? toJson(
                StringValueSchema,
                create(StringValueSchema, { value: fullReq.stringValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp
            ? toJson(TimestampSchema, fullReq.timestamp)
            : undefined,
        ),
        ...queryParam(
          "uint32Value",
          fullReq.uint32Value
            ? toJson(
                UInt32ValueSchema,
                create(UInt32ValueSchema, { value: fullReq.uint32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "uint64Value",
          fullReq.uint64Value
            ? toJson(
                UInt64ValueSchema,
                create(UInt64ValueSchema, { value: fullReq.uint64Value }),
              )
            : undefined,
        ),
      ];
      const body: any = toJson(ValueSchema, must(fullReq.value));
      const res = await transport.call({
        path: `/v1/bodyjson/valuebody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(WellKnownTypesHolderSchema, res);
    },

    async postListValueBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        WellKnownTypesHolderSchema,
        req as MessageInitShape<typeof WellKnownTypesHolderSchema>,
      );
      const queryParams = [
        ...queryParam(
          "boolValue",
          fullReq.boolValue
            ? toJson(
                BoolValueSchema,
                create(BoolValueSchema, { value: fullReq.boolValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "bytesValue",
          fullReq.bytesValue
            ? toJson(
                BytesValueSchema,
                create(BytesValueSchema, { value: fullReq.bytesValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "doubleValue",
          fullReq.doubleValue
            ? toJson(
                DoubleValueSchema,
                create(DoubleValueSchema, { value: fullReq.doubleValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "duration",
          fullReq.duration
            ? toJson(DurationSchema, fullReq.duration)
            : undefined,
        ),
        ...queryParam(
          "fieldMask",
          fullReq.fieldMask
            ? toJson(FieldMaskSchema, fullReq.fieldMask)
            : undefined,
        ),
        ...queryParam(
          "floatValue",
          fullReq.floatValue
            ? toJson(
                FloatValueSchema,
                create(FloatValueSchema, { value: fullReq.floatValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "int32Value",
          fullReq.int32Value
            ? toJson(
                Int32ValueSchema,
                create(Int32ValueSchema, { value: fullReq.int32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "int64Value",
          fullReq.int64Value
            ? toJson(
                Int64ValueSchema,
                create(Int64ValueSchema, { value: fullReq.int64Value }),
              )
            : undefined,
        ),
        ...queryParam("payloadCheck", fullReq.payloadCheck),
        ...queryParam(
          "stringValue",
          fullReq.stringValue
            ? toJson(
                StringValueSchema,
                create(StringValueSchema, { value: fullReq.stringValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp
            ? toJson(TimestampSchema, fullReq.timestamp)
            : undefined,
        ),
        ...queryParam(
          "uint32Value",
          fullReq.uint32Value
            ? toJson(
                UInt32ValueSchema,
                create(UInt32ValueSchema, { value: fullReq.uint32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "uint64Value",
          fullReq.uint64Value
            ? toJson(
                UInt64ValueSchema,
                create(UInt64ValueSchema, { value: fullReq.uint64Value }),
              )
            : undefined,
        ),
      ];
      const body: any = toJson(ListValueSchema, must(fullReq.listValue));
      const res = await transport.call({
        path: `/v1/bodyjson/listvaluebody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(WellKnownTypesHolderSchema, res);
    },

    async postWrapperBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        WellKnownTypesHolderSchema,
        req as MessageInitShape<typeof WellKnownTypesHolderSchema>,
      );
      const queryParams = [
        ...queryParam(
          "boolValue",
          fullReq.boolValue
            ? toJson(
                BoolValueSchema,
                create(BoolValueSchema, { value: fullReq.boolValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "bytesValue",
          fullReq.bytesValue
            ? toJson(
                BytesValueSchema,
                create(BytesValueSchema, { value: fullReq.bytesValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "doubleValue",
          fullReq.doubleValue
            ? toJson(
                DoubleValueSchema,
                create(DoubleValueSchema, { value: fullReq.doubleValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "duration",
          fullReq.duration
            ? toJson(DurationSchema, fullReq.duration)
            : undefined,
        ),
        ...queryParam(
          "fieldMask",
          fullReq.fieldMask
            ? toJson(FieldMaskSchema, fullReq.fieldMask)
            : undefined,
        ),
        ...queryParam(
          "floatValue",
          fullReq.floatValue
            ? toJson(
                FloatValueSchema,
                create(FloatValueSchema, { value: fullReq.floatValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "int32Value",
          fullReq.int32Value
            ? toJson(
                Int32ValueSchema,
                create(Int32ValueSchema, { value: fullReq.int32Value }),
              )
            : undefined,
        ),
        ...queryParam("payloadCheck", fullReq.payloadCheck),
        ...queryParam(
          "stringValue",
          fullReq.stringValue
            ? toJson(
                StringValueSchema,
                create(StringValueSchema, { value: fullReq.stringValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp
            ? toJson(TimestampSchema, fullReq.timestamp)
            : undefined,
        ),
        ...queryParam(
          "uint32Value",
          fullReq.uint32Value
            ? toJson(
                UInt32ValueSchema,
                create(UInt32ValueSchema, { value: fullReq.uint32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "uint64Value",
          fullReq.uint64Value
            ? toJson(
                UInt64ValueSchema,
                create(UInt64ValueSchema, { value: fullReq.uint64Value }),
              )
            : undefined,
        ),
      ];
      const body: any = toJson(
        Int64ValueSchema,
        create(Int64ValueSchema, { value: must(fullReq.int64Value) }),
      );
      const res = await transport.call({
        path: `/v1/bodyjson/wrapperbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return fromJson(WellKnownTypesHolderSchema, res);
    },
  };
}
// normal fields

export interface QueryStringServiceClient {
  getEnumQuerystring(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  getStringQuerystring(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  getRepeatedEnumQuerystring(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  getRepeatedStringQuerystring(
    req: DeepPartial<ABitOfEverything>,
    options?: CallOptions,
  ): Promise<ABitOfEverything>;
  getTimestampQuerystring(
    req: DeepPartial<WellKnownTypesHolder>,
    options?: CallOptions,
  ): Promise<WellKnownTypesHolder>;
  getWrapperQuerystring(
    req: DeepPartial<WellKnownTypesHolder>,
    options?: CallOptions,
  ): Promise<WellKnownTypesHolder>;
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const res = await transport.call({
        path: `/v1/querystring/enumquerystring`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async getStringQuerystring(
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const res = await transport.call({
        path: `/v1/querystring/stringquerystring`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async getRepeatedEnumQuerystring(
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const res = await transport.call({
        path: `/v1/querystring/repeatedenumquerystring`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async getRepeatedStringQuerystring(
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
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const res = await transport.call({
        path: `/v1/querystring/repeatedstringquerystring`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
      });
      return fromJson(ABitOfEverythingSchema, res);
    },

    async getTimestampQuerystring(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        WellKnownTypesHolderSchema,
        req as MessageInitShape<typeof WellKnownTypesHolderSchema>,
      );
      const queryParams = [
        ...queryParam(
          "boolValue",
          fullReq.boolValue
            ? toJson(
                BoolValueSchema,
                create(BoolValueSchema, { value: fullReq.boolValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "bytesValue",
          fullReq.bytesValue
            ? toJson(
                BytesValueSchema,
                create(BytesValueSchema, { value: fullReq.bytesValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "doubleValue",
          fullReq.doubleValue
            ? toJson(
                DoubleValueSchema,
                create(DoubleValueSchema, { value: fullReq.doubleValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "duration",
          fullReq.duration
            ? toJson(DurationSchema, fullReq.duration)
            : undefined,
        ),
        ...queryParam(
          "fieldMask",
          fullReq.fieldMask
            ? toJson(FieldMaskSchema, fullReq.fieldMask)
            : undefined,
        ),
        ...queryParam(
          "floatValue",
          fullReq.floatValue
            ? toJson(
                FloatValueSchema,
                create(FloatValueSchema, { value: fullReq.floatValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "int32Value",
          fullReq.int32Value
            ? toJson(
                Int32ValueSchema,
                create(Int32ValueSchema, { value: fullReq.int32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "int64Value",
          fullReq.int64Value
            ? toJson(
                Int64ValueSchema,
                create(Int64ValueSchema, { value: fullReq.int64Value }),
              )
            : undefined,
        ),
        ...queryParam("payloadCheck", fullReq.payloadCheck),
        ...queryParam(
          "stringValue",
          fullReq.stringValue
            ? toJson(
                StringValueSchema,
                create(StringValueSchema, { value: fullReq.stringValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp
            ? toJson(TimestampSchema, fullReq.timestamp)
            : undefined,
        ),
        ...queryParam(
          "uint32Value",
          fullReq.uint32Value
            ? toJson(
                UInt32ValueSchema,
                create(UInt32ValueSchema, { value: fullReq.uint32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "uint64Value",
          fullReq.uint64Value
            ? toJson(
                UInt64ValueSchema,
                create(UInt64ValueSchema, { value: fullReq.uint64Value }),
              )
            : undefined,
        ),
      ];
      const res = await transport.call({
        path: `/v1/querystring/timestampquerystring`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
      });
      return fromJson(WellKnownTypesHolderSchema, res);
    },

    async getWrapperQuerystring(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = create(
        WellKnownTypesHolderSchema,
        req as MessageInitShape<typeof WellKnownTypesHolderSchema>,
      );
      const queryParams = [
        ...queryParam(
          "boolValue",
          fullReq.boolValue
            ? toJson(
                BoolValueSchema,
                create(BoolValueSchema, { value: fullReq.boolValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "bytesValue",
          fullReq.bytesValue
            ? toJson(
                BytesValueSchema,
                create(BytesValueSchema, { value: fullReq.bytesValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "doubleValue",
          fullReq.doubleValue
            ? toJson(
                DoubleValueSchema,
                create(DoubleValueSchema, { value: fullReq.doubleValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "duration",
          fullReq.duration
            ? toJson(DurationSchema, fullReq.duration)
            : undefined,
        ),
        ...queryParam(
          "fieldMask",
          fullReq.fieldMask
            ? toJson(FieldMaskSchema, fullReq.fieldMask)
            : undefined,
        ),
        ...queryParam(
          "floatValue",
          fullReq.floatValue
            ? toJson(
                FloatValueSchema,
                create(FloatValueSchema, { value: fullReq.floatValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "int32Value",
          fullReq.int32Value
            ? toJson(
                Int32ValueSchema,
                create(Int32ValueSchema, { value: fullReq.int32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "int64Value",
          fullReq.int64Value
            ? toJson(
                Int64ValueSchema,
                create(Int64ValueSchema, { value: fullReq.int64Value }),
              )
            : undefined,
        ),
        ...queryParam("payloadCheck", fullReq.payloadCheck),
        ...queryParam(
          "stringValue",
          fullReq.stringValue
            ? toJson(
                StringValueSchema,
                create(StringValueSchema, { value: fullReq.stringValue }),
              )
            : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp
            ? toJson(TimestampSchema, fullReq.timestamp)
            : undefined,
        ),
        ...queryParam(
          "uint32Value",
          fullReq.uint32Value
            ? toJson(
                UInt32ValueSchema,
                create(UInt32ValueSchema, { value: fullReq.uint32Value }),
              )
            : undefined,
        ),
        ...queryParam(
          "uint64Value",
          fullReq.uint64Value
            ? toJson(
                UInt64ValueSchema,
                create(UInt64ValueSchema, { value: fullReq.uint64Value }),
              )
            : undefined,
        ),
      ];
      const res = await transport.call({
        path: `/v1/querystring/wrapperquerystring`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
      });
      return fromJson(WellKnownTypesHolderSchema, res);
    },
  };
}
