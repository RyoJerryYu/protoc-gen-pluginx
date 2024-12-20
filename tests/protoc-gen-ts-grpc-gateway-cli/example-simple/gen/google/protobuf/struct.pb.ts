/* eslint-disable */
// @ts-nocheck

/**
 * This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
 */

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };

type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (keyof T extends infer K
      ? K extends string & keyof T
        ? { [k in K]: T[K] } & Absent<T, K>
        : never
      : never);

type StructPBValue =
  | null
  | boolean
  | string
  | number
  | { [key: string]: StructPBValue }
  | StructPBValue[];

export enum NullValue {
  NULL_VALUE = "NULL_VALUE",
}

export type Struct = {
  fields?: Record<string, Value>;
};

type BaseValue = {
};

export type Value = BaseValue &
  OneOf<{
    nullValue: NullValue;
    numberValue: number;
    stringValue: string;
    boolValue: boolean;
    structValue: { [key: string]: StructPBValue };
    listValue: StructPBValue[];
  }>;



export type ListValue = {
  values?: Value[];
};