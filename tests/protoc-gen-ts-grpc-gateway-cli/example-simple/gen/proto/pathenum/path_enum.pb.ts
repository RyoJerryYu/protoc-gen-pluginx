/* eslint-disable */
// @ts-nocheck

/**
 * This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
 */


export enum PathEnum {
  ABC = "ABC",
  DEF = "DEF",
}

export enum snake_case_for_import {
  value_x = "value_x",
  value_y = "value_y",
}

export enum MessagePathEnumNestedPathEnum {
  GHI = "GHI",
  JKL = "JKL",
}

export type MessagePathEnum = Record<string, never>;

export type MessageWithPathEnum = {
  value?: PathEnum;
};

export type MessageWithNestedPathEnum = {
  value?: MessagePathEnumNestedPathEnum;
};