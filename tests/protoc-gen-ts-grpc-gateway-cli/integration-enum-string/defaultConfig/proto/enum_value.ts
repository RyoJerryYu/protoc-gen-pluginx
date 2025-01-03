// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.3.0
//   protoc               unknown
// source: proto/enum_value.proto

/* eslint-disable */
import { type CallContext, type CallOptions } from "nice-grpc-common";

export const protobufPackage = "proto";

export enum EnumV {
  ENUM_V_ZERO = 0,
  ENUM_V_ONE = 1,
  ENUM_V_TWO = 2,
  UNRECOGNIZED = -1,
}

export function enumVFromJSON(object: any): EnumV {
  switch (object) {
    case 0:
    case "ENUM_V_ZERO":
      return EnumV.ENUM_V_ZERO;
    case 1:
    case "ENUM_V_ONE":
      return EnumV.ENUM_V_ONE;
    case 2:
    case "ENUM_V_TWO":
      return EnumV.ENUM_V_TWO;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EnumV.UNRECOGNIZED;
  }
}

export function enumVToJSON(object: EnumV): string {
  switch (object) {
    case EnumV.ENUM_V_ZERO:
      return "ENUM_V_ZERO";
    case EnumV.ENUM_V_ONE:
      return "ENUM_V_ONE";
    case EnumV.ENUM_V_TWO:
      return "ENUM_V_TWO";
    case EnumV.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface EnumWrapper {
  enumValue: EnumV;
  repeatedEnumValue: EnumV[];
}

function createBaseEnumWrapper(): EnumWrapper {
  return { enumValue: 0, repeatedEnumValue: [] };
}

export const EnumWrapper: MessageFns<EnumWrapper> = {
  fromJSON(object: any): EnumWrapper {
    return {
      enumValue: isSet(object.enumValue) ? enumVFromJSON(object.enumValue) : 0,
      repeatedEnumValue: globalThis.Array.isArray(object?.repeatedEnumValue)
        ? object.repeatedEnumValue.map((e: any) => enumVFromJSON(e))
        : [],
    };
  },

  toJSON(message: EnumWrapper): unknown {
    const obj: any = {};
    if (message.enumValue !== 0) {
      obj.enumValue = enumVToJSON(message.enumValue);
    }
    if (message.repeatedEnumValue?.length) {
      obj.repeatedEnumValue = message.repeatedEnumValue.map((e) =>
        enumVToJSON(e),
      );
    }
    return obj;
  },

  create(base?: DeepPartial<EnumWrapper>): EnumWrapper {
    return EnumWrapper.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<EnumWrapper>): EnumWrapper {
    const message = createBaseEnumWrapper();
    message.enumValue = object.enumValue ?? 0;
    message.repeatedEnumValue = object.repeatedEnumValue?.map((e) => e) || [];
    return message;
  },
};

/** normal fields */
export type EnumValueServiceDefinition = typeof EnumValueServiceDefinition;
export const EnumValueServiceDefinition = {
  name: "EnumValueService",
  fullName: "proto.EnumValueService",
  methods: {
    postEnumBody: {
      name: "PostEnumBody",
      requestType: EnumWrapper,
      requestStream: false,
      responseType: EnumWrapper,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              35, 58, 10, 101, 110, 117, 109, 95, 118, 97, 108, 117, 101, 34,
              21, 47, 118, 49, 47, 98, 111, 100, 121, 106, 115, 111, 110, 47,
              101, 110, 117, 109, 98, 111, 100, 121,
            ]),
          ],
        },
      },
    },
    postRepeatedEnumBody: {
      name: "PostRepeatedEnumBody",
      requestType: EnumWrapper,
      requestStream: false,
      responseType: EnumWrapper,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              52, 58, 19, 114, 101, 112, 101, 97, 116, 101, 100, 95, 101, 110,
              117, 109, 95, 118, 97, 108, 117, 101, 34, 29, 47, 118, 49, 47, 98,
              111, 100, 121, 106, 115, 111, 110, 47, 114, 101, 112, 101, 97,
              116, 101, 100, 101, 110, 117, 109, 98, 111, 100, 121,
            ]),
          ],
        },
      },
    },
    getEnumQuerystring: {
      name: "GetEnumQuerystring",
      requestType: EnumWrapper,
      requestStream: false,
      responseType: EnumWrapper,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              33, 18, 31, 47, 118, 49, 47, 113, 117, 101, 114, 121, 115, 116,
              114, 105, 110, 103, 47, 101, 110, 117, 109, 113, 117, 101, 114,
              121, 115, 116, 114, 105, 110, 103,
            ]),
          ],
        },
      },
    },
    getRepeatedEnumQuerystring: {
      name: "GetRepeatedEnumQuerystring",
      requestType: EnumWrapper,
      requestStream: false,
      responseType: EnumWrapper,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              41, 18, 39, 47, 118, 49, 47, 113, 117, 101, 114, 121, 115, 116,
              114, 105, 110, 103, 47, 114, 101, 112, 101, 97, 116, 101, 100,
              101, 110, 117, 109, 113, 117, 101, 114, 121, 115, 116, 114, 105,
              110, 103,
            ]),
          ],
        },
      },
    },
  },
} as const;

export interface EnumValueServiceImplementation<CallContextExt = {}> {
  postEnumBody(
    request: EnumWrapper,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<EnumWrapper>>;
  postRepeatedEnumBody(
    request: EnumWrapper,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<EnumWrapper>>;
  getEnumQuerystring(
    request: EnumWrapper,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<EnumWrapper>>;
  getRepeatedEnumQuerystring(
    request: EnumWrapper,
    context: CallContext & CallContextExt,
  ): Promise<DeepPartial<EnumWrapper>>;
}

export interface EnumValueServiceClient<CallOptionsExt = {}> {
  postEnumBody(
    request: DeepPartial<EnumWrapper>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<EnumWrapper>;
  postRepeatedEnumBody(
    request: DeepPartial<EnumWrapper>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<EnumWrapper>;
  getEnumQuerystring(
    request: DeepPartial<EnumWrapper>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<EnumWrapper>;
  getRepeatedEnumQuerystring(
    request: DeepPartial<EnumWrapper>,
    options?: CallOptions & CallOptionsExt,
  ): Promise<EnumWrapper>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
    ? globalThis.Array<DeepPartial<U>>
    : T extends ReadonlyArray<infer U>
      ? ReadonlyArray<DeepPartial<U>>
      : T extends {}
        ? { [K in keyof T]?: DeepPartial<T[K]> }
        : Partial<T>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create(base?: DeepPartial<T>): T;
  fromPartial(object: DeepPartial<T>): T;
}