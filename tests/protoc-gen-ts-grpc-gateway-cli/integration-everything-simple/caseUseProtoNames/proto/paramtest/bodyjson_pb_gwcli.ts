import { FieldMask } from "../../google/protobuf/field_mask";
import {
  ABitOfEverything,
  ABitOfEverything_Nested,
} from "../examplepb/a_bit_of_everything";
import { WellKnownTypesHolder } from "./bodyjson";

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
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
      return ABitOfEverything.fromJSON(res);
    },

    async postStringBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
      return ABitOfEverything.fromJSON(res);
    },

    async postRepeatedMessageBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
        ...queryParam("uuid", fullReq.uuid),
        ...queryParam(
          "uuids",
          fullReq.uuids.map((e) => e),
        ),
      ];
      const body: any = must(fullReq.nested).map((e) =>
        ABitOfEverything_Nested.toJSON(e),
      );
      const res = await transport.call({
        path: `/v1/bodyjson/repeatedmessagebody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return ABitOfEverything.fromJSON(res);
    },

    async postRepeatedEnumBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
      return ABitOfEverything.fromJSON(res);
    },

    async postRepeatedStringBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
      return ABitOfEverything.fromJSON(res);
    },

    async postMapMessageBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
          obj[k] = ABitOfEverything_Nested.toJSON(v);
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
      return ABitOfEverything.fromJSON(res);
    },

    async postMapEnumBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
      return ABitOfEverything.fromJSON(res);
    },

    async postMapStringBody(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
      return ABitOfEverything.fromJSON(res);
    },

    async postTimestampBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const queryParams = [
        ...queryParam(
          "bool_value",
          fullReq.boolValue ? fullReq.boolValue : undefined,
        ),
        ...queryParam(
          "bytes_value",
          fullReq.bytesValue ? fullReq.bytesValue : undefined,
        ),
        ...queryParam(
          "double_value",
          fullReq.doubleValue ? fullReq.doubleValue : undefined,
        ),
        ...queryParam(
          "field_mask",
          fullReq.fieldMask
            ? (FieldMask.toJSON(FieldMask.wrap(fullReq.fieldMask)) as string)
            : undefined,
        ),
        ...queryParam(
          "float_value",
          fullReq.floatValue ? fullReq.floatValue : undefined,
        ),
        ...queryParam(
          "int32_value",
          fullReq.int32Value ? fullReq.int32Value : undefined,
        ),
        ...queryParam(
          "int64_value",
          fullReq.int64Value ? fullReq.int64Value : undefined,
        ),
        ...queryParam("payload_check", fullReq.payloadCheck),
        ...queryParam(
          "string_value",
          fullReq.stringValue ? fullReq.stringValue : undefined,
        ),
        ...queryParam(
          "uint32_value",
          fullReq.uint32Value ? fullReq.uint32Value : undefined,
        ),
        ...queryParam(
          "uint64_value",
          fullReq.uint64Value ? fullReq.uint64Value : undefined,
        ),
      ];
      const body: any = must(fullReq.timestamp).toISOString();
      const res = await transport.call({
        path: `/v1/bodyjson/timestampbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async postFieldMaskBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const queryParams = [
        ...queryParam(
          "bool_value",
          fullReq.boolValue ? fullReq.boolValue : undefined,
        ),
        ...queryParam(
          "bytes_value",
          fullReq.bytesValue ? fullReq.bytesValue : undefined,
        ),
        ...queryParam(
          "double_value",
          fullReq.doubleValue ? fullReq.doubleValue : undefined,
        ),
        ...queryParam(
          "float_value",
          fullReq.floatValue ? fullReq.floatValue : undefined,
        ),
        ...queryParam(
          "int32_value",
          fullReq.int32Value ? fullReq.int32Value : undefined,
        ),
        ...queryParam(
          "int64_value",
          fullReq.int64Value ? fullReq.int64Value : undefined,
        ),
        ...queryParam("payload_check", fullReq.payloadCheck),
        ...queryParam(
          "string_value",
          fullReq.stringValue ? fullReq.stringValue : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp ? fullReq.timestamp.toISOString() : undefined,
        ),
        ...queryParam(
          "uint32_value",
          fullReq.uint32Value ? fullReq.uint32Value : undefined,
        ),
        ...queryParam(
          "uint64_value",
          fullReq.uint64Value ? fullReq.uint64Value : undefined,
        ),
      ];
      const body: any = FieldMask.toJSON(
        FieldMask.wrap(must(fullReq.fieldMask)),
      ) as string;
      const res = await transport.call({
        path: `/v1/bodyjson/fieldmaskbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async postStructBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const queryParams = [
        ...queryParam(
          "bool_value",
          fullReq.boolValue ? fullReq.boolValue : undefined,
        ),
        ...queryParam(
          "bytes_value",
          fullReq.bytesValue ? fullReq.bytesValue : undefined,
        ),
        ...queryParam(
          "double_value",
          fullReq.doubleValue ? fullReq.doubleValue : undefined,
        ),
        ...queryParam(
          "field_mask",
          fullReq.fieldMask
            ? (FieldMask.toJSON(FieldMask.wrap(fullReq.fieldMask)) as string)
            : undefined,
        ),
        ...queryParam(
          "float_value",
          fullReq.floatValue ? fullReq.floatValue : undefined,
        ),
        ...queryParam(
          "int32_value",
          fullReq.int32Value ? fullReq.int32Value : undefined,
        ),
        ...queryParam(
          "int64_value",
          fullReq.int64Value ? fullReq.int64Value : undefined,
        ),
        ...queryParam("payload_check", fullReq.payloadCheck),
        ...queryParam(
          "string_value",
          fullReq.stringValue ? fullReq.stringValue : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp ? fullReq.timestamp.toISOString() : undefined,
        ),
        ...queryParam(
          "uint32_value",
          fullReq.uint32Value ? fullReq.uint32Value : undefined,
        ),
        ...queryParam(
          "uint64_value",
          fullReq.uint64Value ? fullReq.uint64Value : undefined,
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
      return WellKnownTypesHolder.fromJSON(res);
    },

    async postValueBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const queryParams = [
        ...queryParam(
          "bool_value",
          fullReq.boolValue ? fullReq.boolValue : undefined,
        ),
        ...queryParam(
          "bytes_value",
          fullReq.bytesValue ? fullReq.bytesValue : undefined,
        ),
        ...queryParam(
          "double_value",
          fullReq.doubleValue ? fullReq.doubleValue : undefined,
        ),
        ...queryParam(
          "field_mask",
          fullReq.fieldMask
            ? (FieldMask.toJSON(FieldMask.wrap(fullReq.fieldMask)) as string)
            : undefined,
        ),
        ...queryParam(
          "float_value",
          fullReq.floatValue ? fullReq.floatValue : undefined,
        ),
        ...queryParam(
          "int32_value",
          fullReq.int32Value ? fullReq.int32Value : undefined,
        ),
        ...queryParam(
          "int64_value",
          fullReq.int64Value ? fullReq.int64Value : undefined,
        ),
        ...queryParam("payload_check", fullReq.payloadCheck),
        ...queryParam(
          "string_value",
          fullReq.stringValue ? fullReq.stringValue : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp ? fullReq.timestamp.toISOString() : undefined,
        ),
        ...queryParam(
          "uint32_value",
          fullReq.uint32Value ? fullReq.uint32Value : undefined,
        ),
        ...queryParam(
          "uint64_value",
          fullReq.uint64Value ? fullReq.uint64Value : undefined,
        ),
      ];
      const body: any = must(fullReq.value);
      const res = await transport.call({
        path: `/v1/bodyjson/valuebody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async postListValueBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const queryParams = [
        ...queryParam(
          "bool_value",
          fullReq.boolValue ? fullReq.boolValue : undefined,
        ),
        ...queryParam(
          "bytes_value",
          fullReq.bytesValue ? fullReq.bytesValue : undefined,
        ),
        ...queryParam(
          "double_value",
          fullReq.doubleValue ? fullReq.doubleValue : undefined,
        ),
        ...queryParam(
          "field_mask",
          fullReq.fieldMask
            ? (FieldMask.toJSON(FieldMask.wrap(fullReq.fieldMask)) as string)
            : undefined,
        ),
        ...queryParam(
          "float_value",
          fullReq.floatValue ? fullReq.floatValue : undefined,
        ),
        ...queryParam(
          "int32_value",
          fullReq.int32Value ? fullReq.int32Value : undefined,
        ),
        ...queryParam(
          "int64_value",
          fullReq.int64Value ? fullReq.int64Value : undefined,
        ),
        ...queryParam("payload_check", fullReq.payloadCheck),
        ...queryParam(
          "string_value",
          fullReq.stringValue ? fullReq.stringValue : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp ? fullReq.timestamp.toISOString() : undefined,
        ),
        ...queryParam(
          "uint32_value",
          fullReq.uint32Value ? fullReq.uint32Value : undefined,
        ),
        ...queryParam(
          "uint64_value",
          fullReq.uint64Value ? fullReq.uint64Value : undefined,
        ),
      ];
      const body: any = must(fullReq.listValue);
      const res = await transport.call({
        path: `/v1/bodyjson/listvaluebody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async postWrapperBody(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const queryParams = [
        ...queryParam(
          "bool_value",
          fullReq.boolValue ? fullReq.boolValue : undefined,
        ),
        ...queryParam(
          "bytes_value",
          fullReq.bytesValue ? fullReq.bytesValue : undefined,
        ),
        ...queryParam(
          "double_value",
          fullReq.doubleValue ? fullReq.doubleValue : undefined,
        ),
        ...queryParam(
          "field_mask",
          fullReq.fieldMask
            ? (FieldMask.toJSON(FieldMask.wrap(fullReq.fieldMask)) as string)
            : undefined,
        ),
        ...queryParam(
          "float_value",
          fullReq.floatValue ? fullReq.floatValue : undefined,
        ),
        ...queryParam(
          "int32_value",
          fullReq.int32Value ? fullReq.int32Value : undefined,
        ),
        ...queryParam("payload_check", fullReq.payloadCheck),
        ...queryParam(
          "string_value",
          fullReq.stringValue ? fullReq.stringValue : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp ? fullReq.timestamp.toISOString() : undefined,
        ),
        ...queryParam(
          "uint32_value",
          fullReq.uint32Value ? fullReq.uint32Value : undefined,
        ),
        ...queryParam(
          "uint64_value",
          fullReq.uint64Value ? fullReq.uint64Value : undefined,
        ),
      ];
      const body: any = must(fullReq.int64Value);
      const res = await transport.call({
        path: `/v1/bodyjson/wrapperbody`,
        method: "POST",
        headers: headers,
        queryParams: queryParams,
        body: JSON.stringify(body),
      });
      return WellKnownTypesHolder.fromJSON(res);
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
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
      return ABitOfEverything.fromJSON(res);
    },

    async getStringQuerystring(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
      return ABitOfEverything.fromJSON(res);
    },

    async getRepeatedEnumQuerystring(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
      return ABitOfEverything.fromJSON(res);
    },

    async getRepeatedStringQuerystring(
      req: DeepPartial<ABitOfEverything>,
      options?: CallOptions,
    ): Promise<ABitOfEverything> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = ABitOfEverything.fromPartial(req);
      const queryParams = [
        ...queryParam("bool_value", fullReq.boolValue),
        ...queryParam("bytes_value", fullReq.bytesValue),
        ...queryParam("double_value", fullReq.doubleValue),
        ...queryParam("enum_value", fullReq.enumValue),
        ...queryParam("enum_value_annotation", fullReq.enumValueAnnotation),
        ...queryParam("fixed32_value", fullReq.fixed32Value),
        ...queryParam("fixed64_value", fullReq.fixed64Value),
        ...queryParam("float_value", fullReq.floatValue),
        ...queryParam("int32_value", fullReq.int32Value),
        ...queryParam("int64_override_type", fullReq.int64OverrideType),
        ...queryParam("int64_value", fullReq.int64Value),
        ...queryParam(
          "nested_annotation.amount",
          fullReq.nestedAnnotation?.amount,
        ),
        ...queryParam("nested_annotation.name", fullReq.nestedAnnotation?.name),
        ...queryParam("nested_annotation.ok", fullReq.nestedAnnotation?.ok),
        ...queryParam("nested_path_enum_value", fullReq.nestedPathEnumValue),
        ...queryParam(
          "nonConventionalNameValue",
          fullReq.nonConventionalNameValue,
        ),
        ...queryParam("oneof_string", fullReq.oneofString),
        ...queryParam("optional_string_field", fullReq.optionalStringField),
        ...queryParam("optional_string_value", fullReq.optionalStringValue),
        ...queryParam(
          "output_only_string_via_field_behavior_annotation",
          fullReq.outputOnlyStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("path_enum_value", fullReq.pathEnumValue),
        ...queryParam(
          "product_id",
          fullReq.productId.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_annotation",
          fullReq.repeatedEnumAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_enum_value",
          fullReq.repeatedEnumValue.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_annotation",
          fullReq.repeatedStringAnnotation.map((e) => e),
        ),
        ...queryParam(
          "repeated_string_value",
          fullReq.repeatedStringValue.map((e) => e),
        ),
        ...queryParam(
          "required_field_behavior_json_name",
          fullReq.requiredFieldBehaviorJsonName,
        ),
        ...queryParam(
          "required_field_schema_json_name",
          fullReq.requiredFieldSchemaJsonName,
        ),
        ...queryParam("required_string_field_1", fullReq.requiredStringField1),
        ...queryParam("required_string_field_2", fullReq.requiredStringField2),
        ...queryParam(
          "required_string_via_field_behavior_annotation",
          fullReq.requiredStringViaFieldBehaviorAnnotation,
        ),
        ...queryParam("sfixed32_value", fullReq.sfixed32Value),
        ...queryParam("sfixed64_value", fullReq.sfixed64Value),
        ...queryParam("single_nested.amount", fullReq.singleNested?.amount),
        ...queryParam("single_nested.name", fullReq.singleNested?.name),
        ...queryParam("single_nested.ok", fullReq.singleNested?.ok),
        ...queryParam("sint32_value", fullReq.sint32Value),
        ...queryParam("sint64_value", fullReq.sint64Value),
        ...queryParam("string_value", fullReq.stringValue),
        ...queryParam(
          "timestamp_value",
          fullReq.timestampValue
            ? fullReq.timestampValue.toISOString()
            : undefined,
        ),
        ...queryParam("trailing_both", fullReq.trailingBoth),
        ...queryParam("trailing_multiline", fullReq.trailingMultiline),
        ...queryParam("trailing_only", fullReq.trailingOnly),
        ...queryParam("trailing_only_dot", fullReq.trailingOnlyDot),
        ...queryParam("uint32_value", fullReq.uint32Value),
        ...queryParam("uint64_value", fullReq.uint64Value),
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
      return ABitOfEverything.fromJSON(res);
    },

    async getTimestampQuerystring(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const queryParams = [
        ...queryParam(
          "bool_value",
          fullReq.boolValue ? fullReq.boolValue : undefined,
        ),
        ...queryParam(
          "bytes_value",
          fullReq.bytesValue ? fullReq.bytesValue : undefined,
        ),
        ...queryParam(
          "double_value",
          fullReq.doubleValue ? fullReq.doubleValue : undefined,
        ),
        ...queryParam(
          "field_mask",
          fullReq.fieldMask
            ? (FieldMask.toJSON(FieldMask.wrap(fullReq.fieldMask)) as string)
            : undefined,
        ),
        ...queryParam(
          "float_value",
          fullReq.floatValue ? fullReq.floatValue : undefined,
        ),
        ...queryParam(
          "int32_value",
          fullReq.int32Value ? fullReq.int32Value : undefined,
        ),
        ...queryParam(
          "int64_value",
          fullReq.int64Value ? fullReq.int64Value : undefined,
        ),
        ...queryParam("payload_check", fullReq.payloadCheck),
        ...queryParam(
          "string_value",
          fullReq.stringValue ? fullReq.stringValue : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp ? fullReq.timestamp.toISOString() : undefined,
        ),
        ...queryParam(
          "uint32_value",
          fullReq.uint32Value ? fullReq.uint32Value : undefined,
        ),
        ...queryParam(
          "uint64_value",
          fullReq.uint64Value ? fullReq.uint64Value : undefined,
        ),
      ];
      const res = await transport.call({
        path: `/v1/querystring/timestampquerystring`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
      });
      return WellKnownTypesHolder.fromJSON(res);
    },

    async getWrapperQuerystring(
      req: DeepPartial<WellKnownTypesHolder>,
      options?: CallOptions,
    ): Promise<WellKnownTypesHolder> {
      const headers = options?.metadata
        ? metadataToHeaders(options.metadata)
        : undefined;
      const fullReq = WellKnownTypesHolder.fromPartial(req);
      const queryParams = [
        ...queryParam(
          "bool_value",
          fullReq.boolValue ? fullReq.boolValue : undefined,
        ),
        ...queryParam(
          "bytes_value",
          fullReq.bytesValue ? fullReq.bytesValue : undefined,
        ),
        ...queryParam(
          "double_value",
          fullReq.doubleValue ? fullReq.doubleValue : undefined,
        ),
        ...queryParam(
          "field_mask",
          fullReq.fieldMask
            ? (FieldMask.toJSON(FieldMask.wrap(fullReq.fieldMask)) as string)
            : undefined,
        ),
        ...queryParam(
          "float_value",
          fullReq.floatValue ? fullReq.floatValue : undefined,
        ),
        ...queryParam(
          "int32_value",
          fullReq.int32Value ? fullReq.int32Value : undefined,
        ),
        ...queryParam(
          "int64_value",
          fullReq.int64Value ? fullReq.int64Value : undefined,
        ),
        ...queryParam("payload_check", fullReq.payloadCheck),
        ...queryParam(
          "string_value",
          fullReq.stringValue ? fullReq.stringValue : undefined,
        ),
        ...queryParam(
          "timestamp",
          fullReq.timestamp ? fullReq.timestamp.toISOString() : undefined,
        ),
        ...queryParam(
          "uint32_value",
          fullReq.uint32Value ? fullReq.uint32Value : undefined,
        ),
        ...queryParam(
          "uint64_value",
          fullReq.uint64Value ? fullReq.uint64Value : undefined,
        ),
      ];
      const res = await transport.call({
        path: `/v1/querystring/wrapperquerystring`,
        method: "GET",
        headers: headers,
        queryParams: queryParams,
      });
      return WellKnownTypesHolder.fromJSON(res);
    },
  };
}
