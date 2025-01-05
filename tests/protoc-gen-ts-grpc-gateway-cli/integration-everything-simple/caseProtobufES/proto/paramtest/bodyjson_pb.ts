// @generated by protoc-gen-es v2.2.3 with parameter "target=ts"
// @generated from file proto/paramtest/bodyjson.proto (package proto.paramtest, syntax proto3)
/* eslint-disable */

import type {
  GenFile,
  GenMessage,
  GenService,
} from "@bufbuild/protobuf/codegenv1";
import {
  fileDesc,
  messageDesc,
  serviceDesc,
} from "@bufbuild/protobuf/codegenv1";
import { file_google_api_annotations } from "../../google/api/annotations_pb";
import type {
  Any,
  Duration,
  Empty,
  FieldMask,
  ListValue,
  Timestamp,
  Value,
} from "@bufbuild/protobuf/wkt";
import {
  file_google_protobuf_any,
  file_google_protobuf_duration,
  file_google_protobuf_empty,
  file_google_protobuf_field_mask,
  file_google_protobuf_struct,
  file_google_protobuf_timestamp,
  file_google_protobuf_wrappers,
} from "@bufbuild/protobuf/wkt";
import type { ABitOfEverythingSchema } from "../examplepb/a_bit_of_everything_pb";
import { file_proto_examplepb_a_bit_of_everything } from "../examplepb/a_bit_of_everything_pb";
import type { JsonObject, Message } from "@bufbuild/protobuf";

/**
 * Describes the file proto/paramtest/bodyjson.proto.
 */
export const file_proto_paramtest_bodyjson: GenFile =
  /*@__PURE__*/
  fileDesc(
    "Ch5wcm90by9wYXJhbXRlc3QvYm9keWpzb24ucHJvdG8SD3Byb3RvLnBhcmFtdGVzdCLLBgoUV2VsbEtub3duVHlwZXNIb2xkZXISFQoNcGF5bG9hZF9jaGVjaxhkIAEoCRIhCgNhbnkYASABKAsyFC5nb29nbGUucHJvdG9idWYuQW55EiUKBWVtcHR5GAIgASgLMhYuZ29vZ2xlLnByb3RvYnVmLkVtcHR5EicKBnN0cnVjdBgDIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3QSJQoFdmFsdWUYBCABKAsyFi5nb29nbGUucHJvdG9idWYuVmFsdWUSLgoKbGlzdF92YWx1ZRgFIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5MaXN0VmFsdWUSLQoJdGltZXN0YW1wGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLlRpbWVzdGFtcBIrCghkdXJhdGlvbhgHIAEoCzIZLmdvb2dsZS5wcm90b2J1Zi5EdXJhdGlvbhIuCgpmaWVsZF9tYXNrGAggASgLMhouZ29vZ2xlLnByb3RvYnVmLkZpZWxkTWFzaxIuCgpib29sX3ZhbHVlGAkgASgLMhouZ29vZ2xlLnByb3RvYnVmLkJvb2xWYWx1ZRIwCgtpbnQzMl92YWx1ZRgKIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQzMlZhbHVlEjIKDHVpbnQzMl92YWx1ZRgLIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50MzJWYWx1ZRIwCgtpbnQ2NF92YWx1ZRgMIAEoCzIbLmdvb2dsZS5wcm90b2J1Zi5JbnQ2NFZhbHVlEjIKDHVpbnQ2NF92YWx1ZRgNIAEoCzIcLmdvb2dsZS5wcm90b2J1Zi5VSW50NjRWYWx1ZRIyCgxzdHJpbmdfdmFsdWUYDiABKAsyHC5nb29nbGUucHJvdG9idWYuU3RyaW5nVmFsdWUSMAoLYnl0ZXNfdmFsdWUYDyABKAsyGy5nb29nbGUucHJvdG9idWYuQnl0ZXNWYWx1ZRIyCgxkb3VibGVfdmFsdWUYECABKAsyHC5nb29nbGUucHJvdG9idWYuRG91YmxlVmFsdWUSMAoLZmxvYXRfdmFsdWUYESABKAsyGy5nb29nbGUucHJvdG9idWYuRmxvYXRWYWx1ZTL6DwoPQm9keUpTT05TZXJ2aWNlEn8KDFBvc3RFbnVtQm9keRIhLnByb3RvLmV4YW1wbGVwYi5BQml0T2ZFdmVyeXRoaW5nGiEucHJvdG8uZXhhbXBsZXBiLkFCaXRPZkV2ZXJ5dGhpbmciKYLT5JMCIzoKZW51bV92YWx1ZSIVL3YxL2JvZHlqc29uL2VudW1ib2R5EoUBCg5Qb3N0U3RyaW5nQm9keRIhLnByb3RvLmV4YW1wbGVwYi5BQml0T2ZFdmVyeXRoaW5nGiEucHJvdG8uZXhhbXBsZXBiLkFCaXRPZkV2ZXJ5dGhpbmciLYLT5JMCJzoMc3RyaW5nX3ZhbHVlIhcvdjEvYm9keWpzb24vc3RyaW5nYm9keRKRAQoXUG9zdFJlcGVhdGVkTWVzc2FnZUJvZHkSIS5wcm90by5leGFtcGxlcGIuQUJpdE9mRXZlcnl0aGluZxohLnByb3RvLmV4YW1wbGVwYi5BQml0T2ZFdmVyeXRoaW5nIjCC0+STAio6Bm5lc3RlZCIgL3YxL2JvZHlqc29uL3JlcGVhdGVkbWVzc2FnZWJvZHkSmAEKFFBvc3RSZXBlYXRlZEVudW1Cb2R5EiEucHJvdG8uZXhhbXBsZXBiLkFCaXRPZkV2ZXJ5dGhpbmcaIS5wcm90by5leGFtcGxlcGIuQUJpdE9mRXZlcnl0aGluZyI6gtPkkwI0OhNyZXBlYXRlZF9lbnVtX3ZhbHVlIh0vdjEvYm9keWpzb24vcmVwZWF0ZWRlbnVtYm9keRKeAQoWUG9zdFJlcGVhdGVkU3RyaW5nQm9keRIhLnByb3RvLmV4YW1wbGVwYi5BQml0T2ZFdmVyeXRoaW5nGiEucHJvdG8uZXhhbXBsZXBiLkFCaXRPZkV2ZXJ5dGhpbmciPoLT5JMCODoVcmVwZWF0ZWRfc3RyaW5nX3ZhbHVlIh8vdjEvYm9keWpzb24vcmVwZWF0ZWRzdHJpbmdib2R5EpQBChJQb3N0TWFwTWVzc2FnZUJvZHkSIS5wcm90by5leGFtcGxlcGIuQUJpdE9mRXZlcnl0aGluZxohLnByb3RvLmV4YW1wbGVwYi5BQml0T2ZFdmVyeXRoaW5nIjiC0+STAjI6E21hcHBlZF9uZXN0ZWRfdmFsdWUiGy92MS9ib2R5anNvbi9tYXBtZXNzYWdlYm9keRKEAQoPUG9zdE1hcEVudW1Cb2R5EiEucHJvdG8uZXhhbXBsZXBiLkFCaXRPZkV2ZXJ5dGhpbmcaIS5wcm90by5leGFtcGxlcGIuQUJpdE9mRXZlcnl0aGluZyIrgtPkkwIlOgltYXBfdmFsdWUiGC92MS9ib2R5anNvbi9tYXBlbnVtYm9keRKSAQoRUG9zdE1hcFN0cmluZ0JvZHkSIS5wcm90by5leGFtcGxlcGIuQUJpdE9mRXZlcnl0aGluZxohLnByb3RvLmV4YW1wbGVwYi5BQml0T2ZFdmVyeXRoaW5nIjeC0+STAjE6E21hcHBlZF9zdHJpbmdfdmFsdWUiGi92MS9ib2R5anNvbi9tYXBzdHJpbmdib2R5EpABChFQb3N0VGltZXN0YW1wQm9keRIlLnByb3RvLnBhcmFtdGVzdC5XZWxsS25vd25UeXBlc0hvbGRlcholLnByb3RvLnBhcmFtdGVzdC5XZWxsS25vd25UeXBlc0hvbGRlciItgtPkkwInOgl0aW1lc3RhbXAiGi92MS9ib2R5anNvbi90aW1lc3RhbXBib2R5EpEBChFQb3N0RmllbGRNYXNrQm9keRIlLnByb3RvLnBhcmFtdGVzdC5XZWxsS25vd25UeXBlc0hvbGRlcholLnByb3RvLnBhcmFtdGVzdC5XZWxsS25vd25UeXBlc0hvbGRlciIugtPkkwIoOgpmaWVsZF9tYXNrIhovdjEvYm9keWpzb24vZmllbGRtYXNrYm9keRKHAQoOUG9zdFN0cnVjdEJvZHkSJS5wcm90by5wYXJhbXRlc3QuV2VsbEtub3duVHlwZXNIb2xkZXIaJS5wcm90by5wYXJhbXRlc3QuV2VsbEtub3duVHlwZXNIb2xkZXIiJ4LT5JMCIToGc3RydWN0IhcvdjEvYm9keWpzb24vc3RydWN0Ym9keRKEAQoNUG9zdFZhbHVlQm9keRIlLnByb3RvLnBhcmFtdGVzdC5XZWxsS25vd25UeXBlc0hvbGRlcholLnByb3RvLnBhcmFtdGVzdC5XZWxsS25vd25UeXBlc0hvbGRlciIlgtPkkwIfOgV2YWx1ZSIWL3YxL2JvZHlqc29uL3ZhbHVlYm9keRKRAQoRUG9zdExpc3RWYWx1ZUJvZHkSJS5wcm90by5wYXJhbXRlc3QuV2VsbEtub3duVHlwZXNIb2xkZXIaJS5wcm90by5wYXJhbXRlc3QuV2VsbEtub3duVHlwZXNIb2xkZXIiLoLT5JMCKDoKbGlzdF92YWx1ZSIaL3YxL2JvZHlqc29uL2xpc3R2YWx1ZWJvZHkSjgEKD1Bvc3RXcmFwcGVyQm9keRIlLnByb3RvLnBhcmFtdGVzdC5XZWxsS25vd25UeXBlc0hvbGRlcholLnByb3RvLnBhcmFtdGVzdC5XZWxsS25vd25UeXBlc0hvbGRlciItgtPkkwInOgtpbnQ2NF92YWx1ZSIYL3YxL2JvZHlqc29uL3dyYXBwZXJib2R5MoAHChJRdWVyeVN0cmluZ1NlcnZpY2USgwEKEkdldEVudW1RdWVyeXN0cmluZxIhLnByb3RvLmV4YW1wbGVwYi5BQml0T2ZFdmVyeXRoaW5nGiEucHJvdG8uZXhhbXBsZXBiLkFCaXRPZkV2ZXJ5dGhpbmciJ4LT5JMCIRIfL3YxL3F1ZXJ5c3RyaW5nL2VudW1xdWVyeXN0cmluZxKHAQoUR2V0U3RyaW5nUXVlcnlzdHJpbmcSIS5wcm90by5leGFtcGxlcGIuQUJpdE9mRXZlcnl0aGluZxohLnByb3RvLmV4YW1wbGVwYi5BQml0T2ZFdmVyeXRoaW5nIimC0+STAiMSIS92MS9xdWVyeXN0cmluZy9zdHJpbmdxdWVyeXN0cmluZxKTAQoaR2V0UmVwZWF0ZWRFbnVtUXVlcnlzdHJpbmcSIS5wcm90by5leGFtcGxlcGIuQUJpdE9mRXZlcnl0aGluZxohLnByb3RvLmV4YW1wbGVwYi5BQml0T2ZFdmVyeXRoaW5nIi+C0+STAikSJy92MS9xdWVyeXN0cmluZy9yZXBlYXRlZGVudW1xdWVyeXN0cmluZxKXAQocR2V0UmVwZWF0ZWRTdHJpbmdRdWVyeXN0cmluZxIhLnByb3RvLmV4YW1wbGVwYi5BQml0T2ZFdmVyeXRoaW5nGiEucHJvdG8uZXhhbXBsZXBiLkFCaXRPZkV2ZXJ5dGhpbmciMYLT5JMCKxIpL3YxL3F1ZXJ5c3RyaW5nL3JlcGVhdGVkc3RyaW5ncXVlcnlzdHJpbmcSlQEKF0dldFRpbWVzdGFtcFF1ZXJ5c3RyaW5nEiUucHJvdG8ucGFyYW10ZXN0LldlbGxLbm93blR5cGVzSG9sZGVyGiUucHJvdG8ucGFyYW10ZXN0LldlbGxLbm93blR5cGVzSG9sZGVyIiyC0+STAiYSJC92MS9xdWVyeXN0cmluZy90aW1lc3RhbXBxdWVyeXN0cmluZxKRAQoVR2V0V3JhcHBlclF1ZXJ5c3RyaW5nEiUucHJvdG8ucGFyYW10ZXN0LldlbGxLbm93blR5cGVzSG9sZGVyGiUucHJvdG8ucGFyYW10ZXN0LldlbGxLbm93blR5cGVzSG9sZGVyIiqC0+STAiQSIi92MS9xdWVyeXN0cmluZy93cmFwcGVycXVlcnlzdHJpbmdCzgEKE2NvbS5wcm90by5wYXJhbXRlc3RCDUJvZHlqc29uUHJvdG9QAVpLZ2l0aHViLmNvbS9ncnBjLWVjb3N5c3RlbS9ncnBjLWdhdGV3YXkvdjIvZXhhbXBsZXMvaW50ZXJuYWwvcHJvdG8vcGFyYW10ZXN0ogIDUFBYqgIPUHJvdG8uUGFyYW10ZXN0ygIPUHJvdG9cUGFyYW10ZXN04gIbUHJvdG9cUGFyYW10ZXN0XEdQQk1ldGFkYXRh6gIQUHJvdG86OlBhcmFtdGVzdGIGcHJvdG8z",
    [
      file_google_api_annotations,
      file_google_protobuf_any,
      file_google_protobuf_duration,
      file_google_protobuf_empty,
      file_google_protobuf_field_mask,
      file_google_protobuf_struct,
      file_google_protobuf_timestamp,
      file_google_protobuf_wrappers,
      file_proto_examplepb_a_bit_of_everything,
    ],
  );

/**
 * @generated from message proto.paramtest.WellKnownTypesHolder
 */
export type WellKnownTypesHolder =
  Message<"proto.paramtest.WellKnownTypesHolder"> & {
    /**
     * @generated from field: string payload_check = 100;
     */
    payloadCheck: string;

    /**
     * @generated from field: google.protobuf.Any any = 1;
     */
    any?: Any;

    /**
     * @generated from field: google.protobuf.Empty empty = 2;
     */
    empty?: Empty;

    /**
     * @generated from field: google.protobuf.Struct struct = 3;
     */
    struct?: JsonObject;

    /**
     * @generated from field: google.protobuf.Value value = 4;
     */
    value?: Value;

    /**
     * @generated from field: google.protobuf.ListValue list_value = 5;
     */
    listValue?: ListValue;

    /**
     * @generated from field: google.protobuf.Timestamp timestamp = 6;
     */
    timestamp?: Timestamp;

    /**
     * @generated from field: google.protobuf.Duration duration = 7;
     */
    duration?: Duration;

    /**
     * @generated from field: google.protobuf.FieldMask field_mask = 8;
     */
    fieldMask?: FieldMask;

    /**
     * @generated from field: google.protobuf.BoolValue bool_value = 9;
     */
    boolValue?: boolean;

    /**
     * @generated from field: google.protobuf.Int32Value int32_value = 10;
     */
    int32Value?: number;

    /**
     * @generated from field: google.protobuf.UInt32Value uint32_value = 11;
     */
    uint32Value?: number;

    /**
     * @generated from field: google.protobuf.Int64Value int64_value = 12;
     */
    int64Value?: bigint;

    /**
     * @generated from field: google.protobuf.UInt64Value uint64_value = 13;
     */
    uint64Value?: bigint;

    /**
     * @generated from field: google.protobuf.StringValue string_value = 14;
     */
    stringValue?: string;

    /**
     * @generated from field: google.protobuf.BytesValue bytes_value = 15;
     */
    bytesValue?: Uint8Array;

    /**
     * @generated from field: google.protobuf.DoubleValue double_value = 16;
     */
    doubleValue?: number;

    /**
     * @generated from field: google.protobuf.FloatValue float_value = 17;
     */
    floatValue?: number;
  };

/**
 * Describes the message proto.paramtest.WellKnownTypesHolder.
 * Use `create(WellKnownTypesHolderSchema)` to create a new message.
 */
export const WellKnownTypesHolderSchema: GenMessage<WellKnownTypesHolder> =
  /*@__PURE__*/
  messageDesc(file_proto_paramtest_bodyjson, 0);

/**
 * normal fields
 *
 * @generated from service proto.paramtest.BodyJSONService
 */
export const BodyJSONService: GenService<{
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostEnumBody
   */
  postEnumBody: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostStringBody
   */
  postStringBody: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostRepeatedMessageBody
   */
  postRepeatedMessageBody: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostRepeatedEnumBody
   */
  postRepeatedEnumBody: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostRepeatedStringBody
   */
  postRepeatedStringBody: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostMapMessageBody
   */
  postMapMessageBody: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostMapEnumBody
   */
  postMapEnumBody: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostMapStringBody
   */
  postMapStringBody: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostTimestampBody
   */
  postTimestampBody: {
    methodKind: "unary";
    input: typeof WellKnownTypesHolderSchema;
    output: typeof WellKnownTypesHolderSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostFieldMaskBody
   */
  postFieldMaskBody: {
    methodKind: "unary";
    input: typeof WellKnownTypesHolderSchema;
    output: typeof WellKnownTypesHolderSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostStructBody
   */
  postStructBody: {
    methodKind: "unary";
    input: typeof WellKnownTypesHolderSchema;
    output: typeof WellKnownTypesHolderSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostValueBody
   */
  postValueBody: {
    methodKind: "unary";
    input: typeof WellKnownTypesHolderSchema;
    output: typeof WellKnownTypesHolderSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostListValueBody
   */
  postListValueBody: {
    methodKind: "unary";
    input: typeof WellKnownTypesHolderSchema;
    output: typeof WellKnownTypesHolderSchema;
  };
  /**
   * @generated from rpc proto.paramtest.BodyJSONService.PostWrapperBody
   */
  postWrapperBody: {
    methodKind: "unary";
    input: typeof WellKnownTypesHolderSchema;
    output: typeof WellKnownTypesHolderSchema;
  };
}> = /*@__PURE__*/ serviceDesc(file_proto_paramtest_bodyjson, 0);

/**
 * @generated from service proto.paramtest.QueryStringService
 */
export const QueryStringService: GenService<{
  /**
   * @generated from rpc proto.paramtest.QueryStringService.GetEnumQuerystring
   */
  getEnumQuerystring: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.QueryStringService.GetStringQuerystring
   */
  getStringQuerystring: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.QueryStringService.GetRepeatedEnumQuerystring
   */
  getRepeatedEnumQuerystring: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.QueryStringService.GetRepeatedStringQuerystring
   */
  getRepeatedStringQuerystring: {
    methodKind: "unary";
    input: typeof ABitOfEverythingSchema;
    output: typeof ABitOfEverythingSchema;
  };
  /**
   * @generated from rpc proto.paramtest.QueryStringService.GetTimestampQuerystring
   */
  getTimestampQuerystring: {
    methodKind: "unary";
    input: typeof WellKnownTypesHolderSchema;
    output: typeof WellKnownTypesHolderSchema;
  };
  /**
   * @generated from rpc proto.paramtest.QueryStringService.GetWrapperQuerystring
   */
  getWrapperQuerystring: {
    methodKind: "unary";
    input: typeof WellKnownTypesHolderSchema;
    output: typeof WellKnownTypesHolderSchema;
  };
}> = /*@__PURE__*/ serviceDesc(file_proto_paramtest_bodyjson, 1);
