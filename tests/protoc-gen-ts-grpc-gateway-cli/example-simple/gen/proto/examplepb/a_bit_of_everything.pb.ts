/* eslint-disable */
// @ts-nocheck

/**
 * This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
 */

import * as fm from "../../fetch.pb";
import * as GoogleProtobufDuration from "../../google/protobuf/duration.pb";
import * as GoogleProtobufEmpty from "../../google/protobuf/empty.pb";
import * as GoogleProtobufFieldMask from "../../google/protobuf/field_mask.pb";
import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb";
import * as GoogleRpcStatus from "../../google/rpc/status.pb";
import * as ProtoOneofenumOneofEnum from "../oneofenum/oneof_enum.pb";
import * as PathenumPathEnum from "../pathenum/path_enum.pb";
import * as ProtoSub2Message from "../sub2/message.pb";

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };

type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (keyof T extends infer K
      ? K extends string & keyof T
        ? { [k in K]: T[K] } & Absent<T, K>
        : never
      : never);

export enum NumericEnum {
  ZERO = "ZERO",
  ONE = "ONE",
}

export enum ABitOfEverythingNestedDeepEnum {
  FALSE = "FALSE",
  TRUE = "TRUE",
}

export type ErrorObject = {
  code?: number;
  message?: string;
};

export type ABitOfEverythingNested = {
  name?: string;
  amount?: number;
  ok?: ABitOfEverythingNestedDeepEnum;
};

type BaseABitOfEverything = {
  singleNested?: ABitOfEverythingNested;
  uuid?: string;
  nested?: ABitOfEverythingNested[];
  floatValue?: number;
  doubleValue?: number;
  int64Value?: string;
  uint64Value?: string;
  int32Value?: number;
  fixed64Value?: string;
  fixed32Value?: number;
  boolValue?: boolean;
  stringValue?: string;
  bytesValue?: Uint8Array;
  uint32Value?: number;
  enumValue?: NumericEnum;
  pathEnumValue?: PathenumPathEnum.PathEnum;
  nestedPathEnumValue?: PathenumPathEnum.MessagePathEnumNestedPathEnum;
  sfixed32Value?: number;
  sfixed64Value?: string;
  sint32Value?: number;
  sint64Value?: string;
  repeatedStringValue?: string[];
  mapValue?: Record<string, NumericEnum>;
  mappedStringValue?: Record<string, string>;
  mappedNestedValue?: Record<string, ABitOfEverythingNested>;
  timestampValue?: GoogleProtobufTimestamp.Timestamp;
  repeatedEnumValue?: NumericEnum[];
  repeatedEnumAnnotation?: NumericEnum[];
  enumValueAnnotation?: NumericEnum;
  repeatedStringAnnotation?: string[];
  repeatedNestedAnnotation?: ABitOfEverythingNested[];
  nestedAnnotation?: ABitOfEverythingNested;
  int64OverrideType?: string;
  requiredStringViaFieldBehaviorAnnotation?: string;
  outputOnlyStringViaFieldBehaviorAnnotation?: string;
  productId?: string[];
  optionalStringField?: string;
  requiredStringField1?: string;
  requiredStringField2?: string;
  requiredFieldBehaviorJsonName?: string;
  requiredFieldSchemaJsonName?: string;
  trailingOnly?: string;
  trailingOnlyDot?: string;
  trailingBoth?: string;
  trailingMultiline?: string;
  uuids?: string[];optionalStringValue?: string;
};

export type ABitOfEverything = BaseABitOfEverything &
  OneOf<{
    oneofEmpty: GoogleProtobufEmpty.Empty;
    oneofString: string;
  }>;



export type ABitOfEverythingRepeated = {
  pathRepeatedFloatValue?: number[];
  pathRepeatedDoubleValue?: number[];
  pathRepeatedInt64Value?: string[];
  pathRepeatedUint64Value?: string[];
  pathRepeatedInt32Value?: number[];
  pathRepeatedFixed64Value?: string[];
  pathRepeatedFixed32Value?: number[];
  pathRepeatedBoolValue?: boolean[];
  pathRepeatedStringValue?: string[];
  pathRepeatedBytesValue?: Uint8Array[];
  pathRepeatedUint32Value?: number[];
  pathRepeatedEnumValue?: NumericEnum[];
  pathRepeatedSfixed32Value?: number[];
  pathRepeatedSfixed64Value?: string[];
  pathRepeatedSint32Value?: number[];
  pathRepeatedSint64Value?: string[];
};

export type CheckStatusResponse = {
  status?: GoogleRpcStatus.Status;
};

export type Body = {
  name?: string;
};

export type MessageWithBody = {
  id?: string;
  data?: Body;
};

export type UpdateV2Request = {
  abe?: ABitOfEverything;
  updateMask?: GoogleProtobufFieldMask.FieldMask;
};

export type Book = {
  name?: string;
  id?: string;
  createTime?: GoogleProtobufTimestamp.Timestamp;
};

export type CreateBookRequest = {
  parent?: string;
  book?: Book;
  bookId?: string;
};

export type UpdateBookRequest = {
  book?: Book;
  updateMask?: GoogleProtobufFieldMask.FieldMask;
  allowMissing?: boolean;
};

export type RequiredMessageTypeRequest = {
  id?: string;
  foo?: Foo;
};

export type Foo = {
  bar?: Bar;
};

export type Bar = {
  id?: string;
};

export class ABitOfEverythingService {
  static CreateBody(this:void, req: ABitOfEverything, initReq?: fm.InitReq): Promise<ABitOfEverything> {
    return fm.fetchRequest<ABitOfEverything>(`/v1/example/a_bit_of_everything`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }
  static Lookup(this:void, req: ProtoSub2Message.IdMessage, initReq?: fm.InitReq): Promise<ABitOfEverything> {
    return fm.fetchRequest<ABitOfEverything>(`/v1/example/a_bit_of_everything/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`, {...initReq, method: "GET"});
  }
  static Custom(this:void, req: ABitOfEverything, initReq?: fm.InitReq): Promise<ABitOfEverything> {
    return fm.fetchRequest<ABitOfEverything>(`/v1/example/a_bit_of_everything/${req.uuid}:custom`, {...initReq, method: "POST"});
  }
  static DoubleColon(this:void, req: ABitOfEverything, initReq?: fm.InitReq): Promise<ABitOfEverything> {
    return fm.fetchRequest<ABitOfEverything>(`/v1/example/a_bit_of_everything/${req.uuid}:custom:custom`, {...initReq, method: "POST"});
  }
  static Update(this:void, req: ABitOfEverything, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v1/example/a_bit_of_everything/${req.uuid}`, {...initReq, method: "PUT", body: JSON.stringify(req, fm.replacer)});
  }
  static UpdateV2(this:void, req: UpdateV2Request, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/a_bit_of_everything/${req.abe.uuid}`, {...initReq, method: "PUT", body: JSON.stringify(req["abe"], fm.replacer)});
  }
  static Delete(this:void, req: ProtoSub2Message.IdMessage, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v1/example/a_bit_of_everything/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`, {...initReq, method: "DELETE"});
  }
  static GetQuery(this:void, req: ABitOfEverything, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v1/example/a_bit_of_everything/query/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`, {...initReq, method: "GET"});
  }
  static GetRepeatedQuery(this:void, req: ABitOfEverythingRepeated, initReq?: fm.InitReq): Promise<ABitOfEverythingRepeated> {
    return fm.fetchRequest<ABitOfEverythingRepeated>(`/v1/example/a_bit_of_everything_repeated/${req.pathRepeatedFloatValue}/${req.pathRepeatedDoubleValue}/${req.pathRepeatedInt64Value}/${req.pathRepeatedUint64Value}/${req.pathRepeatedInt32Value}/${req.pathRepeatedFixed64Value}/${req.pathRepeatedFixed32Value}/${req.pathRepeatedBoolValue}/${req.pathRepeatedStringValue}/${req.pathRepeatedBytesValue}/${req.pathRepeatedUint32Value}/${req.pathRepeatedEnumValue}/${req.pathRepeatedSfixed32Value}/${req.pathRepeatedSfixed64Value}/${req.pathRepeatedSint32Value}/${req.pathRepeatedSint64Value}?${fm.renderURLSearchParams(req, ["pathRepeatedFloatValue", "pathRepeatedDoubleValue", "pathRepeatedInt64Value", "pathRepeatedUint64Value", "pathRepeatedInt32Value", "pathRepeatedFixed64Value", "pathRepeatedFixed32Value", "pathRepeatedBoolValue", "pathRepeatedStringValue", "pathRepeatedBytesValue", "pathRepeatedUint32Value", "pathRepeatedEnumValue", "pathRepeatedSfixed32Value", "pathRepeatedSfixed64Value", "pathRepeatedSint32Value", "pathRepeatedSint64Value"])}`, {...initReq, method: "GET"});
  }
  static DeepPathEcho(this:void, req: ABitOfEverything, initReq?: fm.InitReq): Promise<ABitOfEverything> {
    return fm.fetchRequest<ABitOfEverything>(`/v1/example/deep_path/${req.singleNested.name}`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }
  static NoBindings(this:void, req: GoogleProtobufDuration.Duration, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/proto.examplepb.ABitOfEverythingService/NoBindings`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }
  static Timeout(this:void, req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/timeout?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
  }
  static ErrorWithDetails(this:void, req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/errorwithdetails?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
  }
  static GetMessageWithBody(this:void, req: MessageWithBody, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/withbody/${req.id}`, {...initReq, method: "POST", body: JSON.stringify(req["data"], fm.replacer)});
  }
  static PostWithEmptyBody(this:void, req: Body, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/postwithemptybody/${req.name}`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }
  static CheckGetQueryParams(this:void, req: ABitOfEverything, initReq?: fm.InitReq): Promise<ABitOfEverything> {
    return fm.fetchRequest<ABitOfEverything>(`/v1/example/a_bit_of_everything/params/get/${req.singleNested.name}?${fm.renderURLSearchParams(req, ["singleNested.name"])}`, {...initReq, method: "GET"});
  }
  static CheckNestedEnumGetQueryParams(this:void, req: ABitOfEverything, initReq?: fm.InitReq): Promise<ABitOfEverything> {
    return fm.fetchRequest<ABitOfEverything>(`/v1/example/a_bit_of_everything/params/get/nested_enum/${req.singleNested.ok}?${fm.renderURLSearchParams(req, ["singleNested.ok"])}`, {...initReq, method: "GET"});
  }
  static CheckPostQueryParams(this:void, req: ABitOfEverything, initReq?: fm.InitReq): Promise<ABitOfEverything> {
    return fm.fetchRequest<ABitOfEverything>(`/v1/example/a_bit_of_everything/params/post/${req.stringValue}`, {...initReq, method: "POST", body: JSON.stringify(req["single_nested"], fm.replacer)});
  }
  static OverwriteRequestContentType(this:void, req: Body, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/overwriterequestcontenttype`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }
  static OverwriteResponseContentType(this:void, req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<string | null> {
    return fm.fetchRequest<string | null>(`/v2/example/overwriteresponsecontenttype?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
  }
  static CheckExternalPathEnum(this:void, req: PathenumPathEnum.MessageWithPathEnum, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/${req.value}:check?${fm.renderURLSearchParams(req, ["value"])}`, {...initReq, method: "GET"});
  }
  static CheckExternalNestedPathEnum(this:void, req: PathenumPathEnum.MessageWithNestedPathEnum, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v3/${req.value}:check?${fm.renderURLSearchParams(req, ["value"])}`, {...initReq, method: "GET"});
  }
  static CheckStatus(this:void, req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<CheckStatusResponse> {
    return fm.fetchRequest<CheckStatusResponse>(`/v1/example/checkStatus?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
  }
  static PostOneofEnum(this:void, req: ProtoOneofenumOneofEnum.OneofEnumMessage, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v1/example/oneofenum`, {...initReq, method: "POST", body: JSON.stringify(req["example_enum"], fm.replacer)});
  }
  static PostRequiredMessageType(this:void, req: RequiredMessageTypeRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v1/example/requiredmessagetype`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }
}


export class AnotherServiceWithNoBindings {
  static NoBindings(this:void, req: GoogleProtobufEmpty.Empty, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/proto.examplepb.AnotherServiceWithNoBindings/NoBindings`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }
}