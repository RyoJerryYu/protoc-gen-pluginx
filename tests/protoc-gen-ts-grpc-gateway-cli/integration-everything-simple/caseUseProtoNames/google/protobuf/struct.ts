// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.3.0
//   protoc               unknown
// source: google/protobuf/struct.proto

/* eslint-disable */

export const protobufPackage = "google.protobuf";

/**
 * `NullValue` is a singleton enumeration to represent the null value for the
 * `Value` type union.
 *
 * The JSON representation for `NullValue` is JSON `null`.
 */
export enum NullValue {
  /** NULL_VALUE - Null value. */
  NULL_VALUE = 0,
  UNRECOGNIZED = -1,
}

export function nullValueFromJSON(object: any): NullValue {
  switch (object) {
    case 0:
    case "NULL_VALUE":
      return NullValue.NULL_VALUE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return NullValue.UNRECOGNIZED;
  }
}

export function nullValueToJSON(object: NullValue): string {
  switch (object) {
    case NullValue.NULL_VALUE:
      return "NULL_VALUE";
    case NullValue.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * `Struct` represents a structured data value, consisting of fields
 * which map to dynamically typed values. In some languages, `Struct`
 * might be supported by a native representation. For example, in
 * scripting languages like JS a struct is represented as an
 * object. The details of that representation are described together
 * with the proto support for the language.
 *
 * The JSON representation for `Struct` is JSON object.
 */
export interface Struct {
  /** Unordered map of dynamically typed values. */
  fields: { [key: string]: any | undefined };
}

export interface Struct_FieldsEntry {
  key: string;
  value: any | undefined;
}

/**
 * `Value` represents a dynamically typed value which can be either
 * null, a number, a string, a boolean, a recursive struct value, or a
 * list of values. A producer of value is expected to set one of these
 * variants. Absence of any variant indicates an error.
 *
 * The JSON representation for `Value` is JSON value.
 */
export interface Value {
  /** Represents a null value. */
  nullValue?: NullValue | undefined;
  /** Represents a double value. */
  numberValue?: number | undefined;
  /** Represents a string value. */
  stringValue?: string | undefined;
  /** Represents a boolean value. */
  boolValue?: boolean | undefined;
  /** Represents a structured value. */
  structValue?: { [key: string]: any } | undefined;
  /** Represents a repeated `Value`. */
  listValue?: Array<any> | undefined;
}

/**
 * `ListValue` is a wrapper around a repeated field of values.
 *
 * The JSON representation for `ListValue` is JSON array.
 */
export interface ListValue {
  /** Repeated field of dynamically typed values. */
  values: any[];
}

function createBaseStruct(): Struct {
  return { fields: {} };
}

export const Struct: MessageFns<Struct> & StructWrapperFns = {
  fromJSON(object: any): Struct {
    return {
      fields: isObject(object.fields)
        ? Object.entries(object.fields).reduce<{
            [key: string]: any | undefined;
          }>((acc, [key, value]) => {
            acc[key] = value as any | undefined;
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: Struct): unknown {
    const obj: any = {};
    if (message.fields) {
      const entries = Object.entries(message.fields);
      if (entries.length > 0) {
        obj.fields = {};
        entries.forEach(([k, v]) => {
          obj.fields[k] = v;
        });
      }
    }
    return obj;
  },

  create(base?: DeepPartial<Struct>): Struct {
    return Struct.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Struct>): Struct {
    const message = createBaseStruct();
    message.fields = Object.entries(object.fields ?? {}).reduce<{
      [key: string]: any | undefined;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
    return message;
  },

  wrap(object: { [key: string]: any } | undefined): Struct {
    const struct = createBaseStruct();

    if (object !== undefined) {
      for (const key of Object.keys(object)) {
        struct.fields[key] = object[key];
      }
    }
    return struct;
  },

  unwrap(message: Struct): { [key: string]: any } {
    const object: { [key: string]: any } = {};
    if (message.fields) {
      for (const key of Object.keys(message.fields)) {
        object[key] = message.fields[key];
      }
    }
    return object;
  },
};

function createBaseStruct_FieldsEntry(): Struct_FieldsEntry {
  return { key: "", value: undefined };
}

export const Struct_FieldsEntry: MessageFns<Struct_FieldsEntry> = {
  fromJSON(object: any): Struct_FieldsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object?.value) ? object.value : undefined,
    };
  },

  toJSON(message: Struct_FieldsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create(base?: DeepPartial<Struct_FieldsEntry>): Struct_FieldsEntry {
    return Struct_FieldsEntry.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Struct_FieldsEntry>): Struct_FieldsEntry {
    const message = createBaseStruct_FieldsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

function createBaseValue(): Value {
  return {
    nullValue: undefined,
    numberValue: undefined,
    stringValue: undefined,
    boolValue: undefined,
    structValue: undefined,
    listValue: undefined,
  };
}

export const Value: MessageFns<Value> & AnyValueWrapperFns = {
  fromJSON(object: any): Value {
    return {
      nullValue: isSet(object.null_value)
        ? nullValueFromJSON(object.null_value)
        : undefined,
      numberValue: isSet(object.number_value)
        ? globalThis.Number(object.number_value)
        : undefined,
      stringValue: isSet(object.string_value)
        ? globalThis.String(object.string_value)
        : undefined,
      boolValue: isSet(object.bool_value)
        ? globalThis.Boolean(object.bool_value)
        : undefined,
      structValue: isObject(object.struct_value)
        ? object.struct_value
        : undefined,
      listValue: globalThis.Array.isArray(object.list_value)
        ? [...object.list_value]
        : undefined,
    };
  },

  toJSON(message: Value): unknown {
    const obj: any = {};
    if (message.nullValue !== undefined) {
      obj.null_value = nullValueToJSON(message.nullValue);
    }
    if (message.numberValue !== undefined) {
      obj.number_value = message.numberValue;
    }
    if (message.stringValue !== undefined) {
      obj.string_value = message.stringValue;
    }
    if (message.boolValue !== undefined) {
      obj.bool_value = message.boolValue;
    }
    if (message.structValue !== undefined) {
      obj.struct_value = message.structValue;
    }
    if (message.listValue !== undefined) {
      obj.list_value = message.listValue;
    }
    return obj;
  },

  create(base?: DeepPartial<Value>): Value {
    return Value.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Value>): Value {
    const message = createBaseValue();
    message.nullValue = object.nullValue ?? undefined;
    message.numberValue = object.numberValue ?? undefined;
    message.stringValue = object.stringValue ?? undefined;
    message.boolValue = object.boolValue ?? undefined;
    message.structValue = object.structValue ?? undefined;
    message.listValue = object.listValue ?? undefined;
    return message;
  },

  wrap(value: any): Value {
    const result = createBaseValue();
    if (value === null) {
      result.nullValue = NullValue.NULL_VALUE;
    } else if (typeof value === "boolean") {
      result.boolValue = value;
    } else if (typeof value === "number") {
      result.numberValue = value;
    } else if (typeof value === "string") {
      result.stringValue = value;
    } else if (globalThis.Array.isArray(value)) {
      result.listValue = value;
    } else if (typeof value === "object") {
      result.structValue = value;
    } else if (typeof value !== "undefined") {
      throw new globalThis.Error("Unsupported any value type: " + typeof value);
    }
    return result;
  },

  unwrap(
    message: any,
  ): string | number | boolean | Object | null | Array<any> | undefined {
    if (message.stringValue !== undefined) {
      return message.stringValue;
    } else if (message?.numberValue !== undefined) {
      return message.numberValue;
    } else if (message?.boolValue !== undefined) {
      return message.boolValue;
    } else if (message?.structValue !== undefined) {
      return message.structValue as any;
    } else if (message?.listValue !== undefined) {
      return message.listValue;
    } else if (message?.nullValue !== undefined) {
      return null;
    }
    return undefined;
  },
};

function createBaseListValue(): ListValue {
  return { values: [] };
}

export const ListValue: MessageFns<ListValue> & ListValueWrapperFns = {
  fromJSON(object: any): ListValue {
    return {
      values: globalThis.Array.isArray(object?.values)
        ? [...object.values]
        : [],
    };
  },

  toJSON(message: ListValue): unknown {
    const obj: any = {};
    if (message.values?.length) {
      obj.values = message.values;
    }
    return obj;
  },

  create(base?: DeepPartial<ListValue>): ListValue {
    return ListValue.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<ListValue>): ListValue {
    const message = createBaseListValue();
    message.values = object.values?.map((e) => e) || [];
    return message;
  },

  wrap(array: Array<any> | undefined): ListValue {
    const result = createBaseListValue();
    result.values = array ?? [];
    return result;
  },

  unwrap(message: ListValue): Array<any> {
    if (
      message?.hasOwnProperty("values") &&
      globalThis.Array.isArray(message.values)
    ) {
      return message.values;
    } else {
      return message as any;
    }
  },
};

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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create(base?: DeepPartial<T>): T;
  fromPartial(object: DeepPartial<T>): T;
}

export interface StructWrapperFns {
  wrap(object: { [key: string]: any } | undefined): Struct;
  unwrap(message: Struct): { [key: string]: any };
}

export interface AnyValueWrapperFns {
  wrap(value: any): Value;
  unwrap(
    message: any,
  ): string | number | boolean | Object | null | Array<any> | undefined;
}

export interface ListValueWrapperFns {
  wrap(array: Array<any> | undefined): ListValue;
  unwrap(message: ListValue): Array<any>;
}
