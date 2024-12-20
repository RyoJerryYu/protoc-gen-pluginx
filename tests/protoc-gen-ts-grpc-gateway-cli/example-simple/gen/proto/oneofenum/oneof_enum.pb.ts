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

export enum ExampleEnum {
  EXAMPLE_ENUM_UNSPECIFIED = "EXAMPLE_ENUM_UNSPECIFIED",
  EXAMPLE_ENUM_FIRST = "EXAMPLE_ENUM_FIRST",
}

type BaseOneofEnumMessage = {
};

export type OneofEnumMessage = BaseOneofEnumMessage &
  OneOf<{
    exampleEnum: ExampleEnum;
  }>;