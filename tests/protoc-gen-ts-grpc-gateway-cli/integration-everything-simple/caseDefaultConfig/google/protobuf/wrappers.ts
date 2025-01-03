// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.3.0
//   protoc               unknown
// source: google/protobuf/wrappers.proto

/* eslint-disable */

export const protobufPackage = "google.protobuf";

/**
 * Wrapper message for `double`.
 *
 * The JSON representation for `DoubleValue` is JSON number.
 */
export interface DoubleValue {
  /** The double value. */
  value: number;
}

/**
 * Wrapper message for `float`.
 *
 * The JSON representation for `FloatValue` is JSON number.
 */
export interface FloatValue {
  /** The float value. */
  value: number;
}

/**
 * Wrapper message for `int64`.
 *
 * The JSON representation for `Int64Value` is JSON string.
 */
export interface Int64Value {
  /** The int64 value. */
  value: number;
}

/**
 * Wrapper message for `uint64`.
 *
 * The JSON representation for `UInt64Value` is JSON string.
 */
export interface UInt64Value {
  /** The uint64 value. */
  value: number;
}

/**
 * Wrapper message for `int32`.
 *
 * The JSON representation for `Int32Value` is JSON number.
 */
export interface Int32Value {
  /** The int32 value. */
  value: number;
}

/**
 * Wrapper message for `uint32`.
 *
 * The JSON representation for `UInt32Value` is JSON number.
 */
export interface UInt32Value {
  /** The uint32 value. */
  value: number;
}

/**
 * Wrapper message for `bool`.
 *
 * The JSON representation for `BoolValue` is JSON `true` and `false`.
 */
export interface BoolValue {
  /** The bool value. */
  value: boolean;
}

/**
 * Wrapper message for `string`.
 *
 * The JSON representation for `StringValue` is JSON string.
 */
export interface StringValue {
  /** The string value. */
  value: string;
}

/**
 * Wrapper message for `bytes`.
 *
 * The JSON representation for `BytesValue` is JSON string.
 */
export interface BytesValue {
  /** The bytes value. */
  value: Uint8Array;
}

function createBaseDoubleValue(): DoubleValue {
  return { value: 0 };
}

export const DoubleValue: MessageFns<DoubleValue> = {
  fromJSON(object: any): DoubleValue {
    return { value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: DoubleValue): unknown {
    const obj: any = {};
    if (message.value !== 0) {
      obj.value = message.value;
    }
    return obj;
  },

  create(base?: DeepPartial<DoubleValue>): DoubleValue {
    return DoubleValue.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<DoubleValue>): DoubleValue {
    const message = createBaseDoubleValue();
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseFloatValue(): FloatValue {
  return { value: 0 };
}

export const FloatValue: MessageFns<FloatValue> = {
  fromJSON(object: any): FloatValue {
    return { value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: FloatValue): unknown {
    const obj: any = {};
    if (message.value !== 0) {
      obj.value = message.value;
    }
    return obj;
  },

  create(base?: DeepPartial<FloatValue>): FloatValue {
    return FloatValue.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<FloatValue>): FloatValue {
    const message = createBaseFloatValue();
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseInt64Value(): Int64Value {
  return { value: 0 };
}

export const Int64Value: MessageFns<Int64Value> = {
  fromJSON(object: any): Int64Value {
    return { value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: Int64Value): unknown {
    const obj: any = {};
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<Int64Value>): Int64Value {
    return Int64Value.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Int64Value>): Int64Value {
    const message = createBaseInt64Value();
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseUInt64Value(): UInt64Value {
  return { value: 0 };
}

export const UInt64Value: MessageFns<UInt64Value> = {
  fromJSON(object: any): UInt64Value {
    return { value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: UInt64Value): unknown {
    const obj: any = {};
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<UInt64Value>): UInt64Value {
    return UInt64Value.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UInt64Value>): UInt64Value {
    const message = createBaseUInt64Value();
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseInt32Value(): Int32Value {
  return { value: 0 };
}

export const Int32Value: MessageFns<Int32Value> = {
  fromJSON(object: any): Int32Value {
    return { value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: Int32Value): unknown {
    const obj: any = {};
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<Int32Value>): Int32Value {
    return Int32Value.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Int32Value>): Int32Value {
    const message = createBaseInt32Value();
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseUInt32Value(): UInt32Value {
  return { value: 0 };
}

export const UInt32Value: MessageFns<UInt32Value> = {
  fromJSON(object: any): UInt32Value {
    return { value: isSet(object.value) ? globalThis.Number(object.value) : 0 };
  },

  toJSON(message: UInt32Value): unknown {
    const obj: any = {};
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<UInt32Value>): UInt32Value {
    return UInt32Value.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<UInt32Value>): UInt32Value {
    const message = createBaseUInt32Value();
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseBoolValue(): BoolValue {
  return { value: false };
}

export const BoolValue: MessageFns<BoolValue> = {
  fromJSON(object: any): BoolValue {
    return {
      value: isSet(object.value) ? globalThis.Boolean(object.value) : false,
    };
  },

  toJSON(message: BoolValue): unknown {
    const obj: any = {};
    if (message.value !== false) {
      obj.value = message.value;
    }
    return obj;
  },

  create(base?: DeepPartial<BoolValue>): BoolValue {
    return BoolValue.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BoolValue>): BoolValue {
    const message = createBaseBoolValue();
    message.value = object.value ?? false;
    return message;
  },
};

function createBaseStringValue(): StringValue {
  return { value: "" };
}

export const StringValue: MessageFns<StringValue> = {
  fromJSON(object: any): StringValue {
    return {
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: StringValue): unknown {
    const obj: any = {};
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create(base?: DeepPartial<StringValue>): StringValue {
    return StringValue.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<StringValue>): StringValue {
    const message = createBaseStringValue();
    message.value = object.value ?? "";
    return message;
  },
};

function createBaseBytesValue(): BytesValue {
  return { value: new Uint8Array(0) };
}

export const BytesValue: MessageFns<BytesValue> = {
  fromJSON(object: any): BytesValue {
    return {
      value: isSet(object.value)
        ? bytesFromBase64(object.value)
        : new Uint8Array(0),
    };
  },

  toJSON(message: BytesValue): unknown {
    const obj: any = {};
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create(base?: DeepPartial<BytesValue>): BytesValue {
    return BytesValue.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<BytesValue>): BytesValue {
    const message = createBaseBytesValue();
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  const bin = globalThis.atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(globalThis.String.fromCharCode(byte));
  });
  return globalThis.btoa(bin.join(""));
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
