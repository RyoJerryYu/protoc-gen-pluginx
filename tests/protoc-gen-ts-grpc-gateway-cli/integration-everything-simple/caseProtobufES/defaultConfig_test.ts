import { expect } from "chai";
import {
  newABitOfEverythingService,
  CallParams,
  Transport,
  newAnotherServiceWithNoBindings,
  DeepPartial,
} from "./proto/examplepb/a_bit_of_everything_pb_gwcli";
import {
  ABitOfEverything,
  ABitOfEverything_Nested_DeepEnum,
  ABitOfEverythingRepeated,
  ABitOfEverythingRepeatedSchema,
  ABitOfEverythingSchema,
  Body,
  BodySchema,
  Book,
  BookSchema,
  CheckStatusResponse,
  CheckStatusResponseSchema,
  MessageWithBody,
  MessageWithBodySchema,
  NumericEnum,
  RequiredMessageTypeRequest,
  RequiredMessageTypeRequestSchema,
} from "./proto/examplepb/a_bit_of_everything_pb";
import {
  MessagePathEnum_NestedPathEnum,
  MessageWithNestedPathEnum,
  MessageWithNestedPathEnumSchema,
  MessageWithPathEnum,
  MessageWithPathEnumSchema,
  PathEnum,
} from "./proto/pathenum/path_enum_pb";
import {
  anyIs,
  AnySchema,
  anyUnpack,
  anyUnpackTo,
  Empty,
  EmptySchema,
  ListValueSchema,
  timestampFromDate,
  ValueSchema,
} from "@bufbuild/protobuf/wkt";
import { Status, StatusSchema } from "./google/rpc/status_pb";
import {
  ExampleEnum,
  OneofEnumMessage,
  OneofEnumMessageSchema,
} from "./proto/oneofenum/oneof_enum_pb";
import { StringMessage, StringMessageSchema } from "./proto/sub/message_pb";
import {
  newBodyJSONService,
  newQueryStringService,
} from "./proto/paramtest/bodyjson_pb_gwcli";
import {
  WellKnownTypesHolder,
  WellKnownTypesHolderSchema,
} from "./proto/paramtest/bodyjson_pb";
import { Any } from "@bufbuild/protobuf/wkt";
import {
  create,
  DescMessage,
  fromJson,
  MessageInitShape,
  MessageShape,
  createRegistry,
  toJson,
} from "@bufbuild/protobuf";

function fetchTransport(
  baseUrl: string,
  initReq: Partial<RequestInit> = {},
): Transport {
  return {
    async call({
      path,
      method,
      headers,
      queryParams,
      body,
    }: CallParams): Promise<any> {
      let rpcPath = path;
      if (queryParams && queryParams.length > 0) {
        const searchParams = new URLSearchParams(queryParams);
        rpcPath += "?" + searchParams.toString();
      }
      const callReq = { ...initReq, method: method };
      if (body) {
        callReq.body = body;
      }
      if (headers) {
        callReq.headers = headers;
      }
      const url = new URL("." + rpcPath, baseUrl).href;
      const res = await fetch(url, callReq);
      const resBody = await res.json();
      if (!res.ok) throw resBody;
      // console.log("res of", url, ": ", resBody);
      return resBody;
    },
  };
}

const registry = createRegistry(BookSchema);

function fromPartial<T extends DescMessage>(
  schema: T,
  partial: DeepPartial<MessageShape<T>>,
): MessageShape<T> {
  return create(schema, partial as MessageInitShape<T>);
}
function newABitOfEverythingNonZero(): ABitOfEverything {
  return create(ABitOfEverythingSchema, {
    singleNested: {
      name: "nested",
      amount: 1,
      ok: ABitOfEverything_Nested_DeepEnum.TRUE,
    },
    uuid: "uuid",
    nested: [
      {
        name: "nested",
        amount: 1,
        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      },
    ],
    floatValue: 1.1,
    doubleValue: 1.1,
    int64Value: BigInt(1),
    uint64Value: BigInt(1),
    int32Value: 1,
    fixed64Value: BigInt(1),
    fixed32Value: 1,
    boolValue: true,
    stringValue: "string",
    bytesValue: new Uint8Array([1, 2, 3]),
    uint32Value: 1,
    enumValue: NumericEnum.ONE,
    pathEnumValue: PathEnum.DEF,
    nestedPathEnumValue: MessagePathEnum_NestedPathEnum.JKL,
    sfixed32Value: 1,
    sfixed64Value: BigInt(1),
    sint32Value: 1,
    sint64Value: BigInt(1),
    repeatedStringValue: ["string"],
    oneofValue: {
      case: "oneofEmpty",
      value: {},
    },
    // oneofEmpty: create(EmptySchema),
    // oneofString: undefined, // oneofEmpty was set, so this should be ignored
    mapValue: {
      some_one: NumericEnum.ONE,
      some_zero: NumericEnum.ZERO,
    },
    mappedStringValue: {
      some_one: "one",
      some_zero: "zero",
    },
    mappedNestedValue: {
      some_one: {
        name: "one",
        amount: 1,
        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      },
      some_zero: {
        name: "zero",
        amount: 0,
        ok: ABitOfEverything_Nested_DeepEnum.FALSE,
      },
    },
    nonConventionalNameValue: "string",
    timestampValue: timestampFromDate(new Date("2021-01-01T00:00:00Z")),
    repeatedEnumValue: [NumericEnum.ONE],
    repeatedEnumAnnotation: [NumericEnum.ONE],
    enumValueAnnotation: NumericEnum.ONE,
    repeatedStringAnnotation: ["string"],
    repeatedNestedAnnotation: [
      {
        name: "nested",
        amount: 1,
        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      },
    ],
    nestedAnnotation: {
      name: "nested",
      amount: 1,
      ok: ABitOfEverything_Nested_DeepEnum.TRUE,
    },
    int64OverrideType: BigInt(1),
    requiredStringViaFieldBehaviorAnnotation: "string",
    outputOnlyStringViaFieldBehaviorAnnotation: "string",
    optionalStringValue: "string",
    productId: ["string"],
    optionalStringField: "string",
    requiredStringField1: "string",
    requiredStringField2: "string",
    requiredFieldBehaviorJsonName: "string",
    requiredFieldSchemaJsonName: "string",
    trailingOnly: "string",
    trailingOnlyDot: "string",
    trailingBoth: "string",
    trailingMultiline: "string",
    uuids: ["uuid"],
  });
}

describe("ABitOfEverythingService", () => {
  const aBitOfEverythingService = newABitOfEverythingService(
    fetchTransport("http://localhost:8081/api/"),
  );

  it("Create", async () => {
    // TODO: some query params do no support
    const req: DeepPartial<ABitOfEverything> = {
      singleNested: {
        name: "nested",
        amount: 1,
        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      },
      uuid: "uuid",
      // nested: [
      //   {
      //     name: "nested",
      //     amount: 1,
      //     ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      //   },
      // ],
      floatValue: 1.1,
      doubleValue: 1.1,
      int64Value: BigInt(1),
      uint64Value: BigInt(1),
      int32Value: 1,
      fixed64Value: BigInt(1),
      fixed32Value: 1,
      boolValue: true,
      stringValue: "strprefix/string",
      bytesValue: new Uint8Array([1, 2, 3]),
      uint32Value: 1,
      enumValue: NumericEnum.ONE,
      pathEnumValue: PathEnum.DEF,
      nestedPathEnumValue: MessagePathEnum_NestedPathEnum.JKL,
      sfixed32Value: 1,
      sfixed64Value: BigInt(1),
      sint32Value: 1,
      sint64Value: BigInt(1),
      repeatedStringValue: ["string", "string2"],
      // oneofValue: {
      //   case: "oneofEmpty",
      //   value: {},
      // },
      // oneofEmpty: {},
      // oneofString: undefined, // oneofEmpty was set, so this should be ignored
      // mapValue: {
      //   some_one: NumericEnum.ONE,
      //   some_zero: NumericEnum.ZERO,
      // },
      // mappedStringValue: {
      //   some_one: "one",
      //   some_zero: "zero",
      // },
      // mappedNestedValue: {
      //   some_one: {
      //     name: "one",
      //     amount: 1,
      //     ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      //   },
      //   some_zero: {
      //     name: "zero",
      //     amount: 0,
      //     ok: ABitOfEverything_Nested_DeepEnum.FALSE,
      //   },
      // },
      nonConventionalNameValue: "string",
      timestampValue: timestampFromDate(new Date("2021-01-01T00:00:00Z")),
      repeatedEnumValue: [NumericEnum.ONE, NumericEnum.ZERO],
      repeatedEnumAnnotation: [NumericEnum.ONE, NumericEnum.ZERO],
      enumValueAnnotation: NumericEnum.ONE,
      repeatedStringAnnotation: ["string", "string2"],
      // repeatedNestedAnnotation: [
      //   {
      //     name: "nested",
      //     amount: 1,
      //     ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      //   },
      // ],
      nestedAnnotation: {
        name: "nested",
        amount: 1,
        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      },
      int64OverrideType: BigInt(1),
      requiredStringViaFieldBehaviorAnnotation: "string",
      outputOnlyStringViaFieldBehaviorAnnotation: "string",
      optionalStringValue: "string",
      productId: ["string", "string2"],
      optionalStringField: "string",
      requiredStringField1: "string",
      requiredStringField2: "string",
      requiredFieldBehaviorJsonName: "string",
      requiredFieldSchemaJsonName: "string",
      trailingOnly: "string",
      trailingOnlyDot: "string",
      trailingBoth: "string",
      trailingMultiline: "string",
      uuids: ["uuid", "uuid2"],
    };

    const res = await aBitOfEverythingService.create(req);

    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("CreateBody", async () => {
    const req = newABitOfEverythingNonZero();

    const res = await aBitOfEverythingService.createBody(req);

    expect(res).to.deep.equal(newABitOfEverythingNonZero());
  });

  it("CreateBook", async () => {
    const req: Book = create(BookSchema, {
      name: "book_name",
      createTime: timestampFromDate(new Date("2021-01-01T00:00:00Z")),
      id: "original_id",
    });

    const res = await aBitOfEverythingService.createBook({
      book: req,
      bookId: "book_id",
      parent: "publishers/123",
    });

    req.id = "book_id";

    expect(res).to.deep.equal(req);
  });

  it("UpdateBook", async () => {
    const req: Book = create(BookSchema, {
      name: "publishers/123/books/book_name",
      id: "book_id",
    });

    const res = await aBitOfEverythingService.updateBook({
      book: req,
    });

    expect(res).to.deep.equal(
      create(BookSchema, {
        name: "publishers/123/books/book_name",
        id: "book_id",
        createTime: timestampFromDate(new Date("2021-01-01T00:00:00Z")),
      }),
    );
  });

  it("Lookup", async () => {
    const req = { uuid: "uuid_in_req" };

    const res = await aBitOfEverythingService.lookup(req);

    const expect_res = newABitOfEverythingNonZero();
    expect_res.uuid = "uuid_in_req";

    expect(res).to.deep.equal(expect_res);
  });

  it("Custom", async () => {
    const req = newABitOfEverythingNonZero();

    const res = await aBitOfEverythingService.createBody(req);

    expect(res).to.deep.equal(newABitOfEverythingNonZero());
  });

  it("DoubleColon", async () => {
    const req = newABitOfEverythingNonZero();

    const res = await aBitOfEverythingService.createBody(req);

    expect(res).to.deep.equal(newABitOfEverythingNonZero());
  });

  it("Update", async () => {
    const req = create(ABitOfEverythingSchema, {
      uuid: "uuid_in_update",
      int32Value: 42,
    });

    const res = await aBitOfEverythingService.update(req);

    expect(res).to.deep.equal(create(EmptySchema));
  });

  it("Delete", async () => {
    const req = { uuid: "uuid_in_delete" };

    const res = await aBitOfEverythingService.delete(req);

    expect(res).to.deep.equal(create(EmptySchema));
  });

  it("GetRepeatedQuery", async () => {
    const req: Partial<ABitOfEverythingRepeated> = {
      pathRepeatedFloatValue: [1.1, 2.2],
      pathRepeatedDoubleValue: [1.1, 2.2],
      pathRepeatedInt64Value: [BigInt(1), BigInt(2)],
      pathRepeatedUint64Value: [BigInt(1), BigInt(2)],
      pathRepeatedInt32Value: [1, 2],
      pathRepeatedFixed64Value: [BigInt(1), BigInt(2)],
      pathRepeatedFixed32Value: [1, 2],
      pathRepeatedBoolValue: [true, false],
      pathRepeatedStringValue: ["string1", "string2"],
      pathRepeatedBytesValue: [
        new Uint8Array([1, 2, 3]),
        new Uint8Array([4, 5, 6]),
      ],
      pathRepeatedUint32Value: [1, 2],
      pathRepeatedEnumValue: [NumericEnum.ONE, NumericEnum.ZERO],
      pathRepeatedSfixed32Value: [1, 2],
      pathRepeatedSfixed64Value: [BigInt(1), BigInt(2)],
      pathRepeatedSint32Value: [1, 2],
      pathRepeatedSint64Value: [BigInt(1), BigInt(2)],
    };

    const res = await aBitOfEverythingService.getRepeatedQuery(req);

    expect(res).to.deep.equal(fromPartial(ABitOfEverythingRepeatedSchema, req));
  });

  it("Echo", async () => {
    const req: StringMessage = create(StringMessageSchema, {
      value: "string",
    });
    const res = await aBitOfEverythingService.echo(req);
    expect(res).to.deep.equal(req);
  });

  it("DeepPathEcho", async () => {
    const req = newABitOfEverythingNonZero();
    const res = await aBitOfEverythingService.deepPathEcho(req);
    expect(res).to.deep.equal(newABitOfEverythingNonZero());
  });

  it("NoBindings", async () => {
    const res = await aBitOfEverythingService.noBindings({
      seconds: BigInt(100),
    });
    expect(res).to.deep.equal(create(EmptySchema));
  });
  // it("Timeout")
  it("ErrorWithDetails", async () => {
    let errorThrown = false;
    try {
      await aBitOfEverythingService.errorWithDetails({});
    } catch (e) {
      errorThrown = true;
      // expect(e).to.deep.equal({
      //   code: 7,
      //   message: "permission denied",
      //   details: [
      //     {
      //       "@type": "type.googleapis.com/proto.examplepb.Book",
      //       createTime: "2021-01-01T00:00:00Z",
      //       id: "book_id",
      //       name: "book_name",
      //     },
      //   ],
      // });
      const status = fromJson(StatusSchema, e, { registry: registry });
      expect(status.code).to.equal(7);
      expect(status.message).to.equal("permission denied");
      expect(status.details).to.have.length(1);
      // ts_proto do not support Any pack
      // const book = Book.fromJSON(status.details[0]);
      // but we have the original JSON, so we can parse it
      expect(anyIs(status.details[0], BookSchema)).to.be.true;
      const book = anyUnpack(status.details[0], BookSchema);
      expect(book).to.deep.equal(
        create(BookSchema, {
          createTime: timestampFromDate(new Date("2021-01-01T00:00:00Z")),
          id: "book_id",
          name: "book_name",
        }),
      );

      // any from JSON
      const any = fromJson(AnySchema, e.details[0], { registry: registry });
      expect(anyIs(any, BookSchema)).to.be.true;
      const book2 = anyUnpack(any, BookSchema);
      expect(book2).to.deep.equal(
        create(BookSchema, {
          createTime: timestampFromDate(new Date("2021-01-01T00:00:00Z")),
          id: "book_id",
          name: "book_name",
        }),
      );
    }
    expect(errorThrown).to.be.true;
  });

  it("GetMessageWithBody", async () => {
    const req = create(MessageWithBodySchema, {
      id: "id_with_body",
      data: {
        name: "name_with_body",
      },
    });
    const res = await aBitOfEverythingService.getMessageWithBody(req);
    expect(res).to.deep.equal(create(EmptySchema));
  });

  it("PostWithEmptyBody", async () => {
    const req = create(BodySchema, {
      name: "name_with_body",
    });
    const res = await aBitOfEverythingService.postWithEmptyBody(req);
    expect(res).to.deep.equal(create(EmptySchema));
  });

  it("CheckGetQueryParams", async () => {
    const req: DeepPartial<ABitOfEverything> = {
      singleNested: {
        name: "nested",
        amount: 1,
        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      },
      uuid: "uuid_check_get_query_params",
      boolValue: true,
      stringValue: "string",
      uint32Value: 1,
      enumValue: NumericEnum.ONE,
      pathEnumValue: PathEnum.DEF,
      nestedPathEnumValue: MessagePathEnum_NestedPathEnum.JKL,
    };
    const res = await aBitOfEverythingService.checkGetQueryParams(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("CheckNestedEnumGetQueryParams", async () => {
    const req: DeepPartial<ABitOfEverything> = {
      singleNested: {
        name: "nested",
        amount: 1,
        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      },
      uuid: "uuid_check_nested_enum_get_query_params",
      boolValue: true,
      stringValue: "string",
      uint32Value: 1,
      enumValue: NumericEnum.ONE,
      pathEnumValue: PathEnum.DEF,
      nestedPathEnumValue: MessagePathEnum_NestedPathEnum.JKL,
    };
    const res =
      await aBitOfEverythingService.checkNestedEnumGetQueryParams(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("CheckPostQueryParams", async () => {
    const req: DeepPartial<ABitOfEverything> = {
      singleNested: {
        name: "nested",
        amount: 1,
        ok: ABitOfEverything_Nested_DeepEnum.TRUE,
      },
      uuid: "uuid_check_post_query_params",
      boolValue: true,
      stringValue: "string",
      uint32Value: 1,
      enumValue: NumericEnum.ONE,
      pathEnumValue: PathEnum.DEF,
      nestedPathEnumValue: MessagePathEnum_NestedPathEnum.JKL,
    };
    const res = await aBitOfEverythingService.checkPostQueryParams(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("OverwriteRequestContentType", async () => {
    const req: Body = create(BodySchema, {
      name: "name_with_body",
    });
    const res = await aBitOfEverythingService.overwriteRequestContentType(req);
    expect(res).to.deep.equal(create(EmptySchema));
  });

  // it("OverwriteResponseContentType", async () => {
  //   const res = await aBitOfEverythingService.overwriteResponseContentType({});
  //   expect(res).to.deep.equal({ value: "response_string_value" });
  // });

  it("CheckExternalPathEnum", async () => {
    const req: MessageWithPathEnum = create(MessageWithPathEnumSchema, {
      value: PathEnum.DEF,
    });
    const res = await aBitOfEverythingService.checkExternalPathEnum(req);
    expect(res).to.deep.equal(create(EmptySchema));
  });

  it("CheckExternalNestedPathEnum", async () => {
    const req: MessageWithNestedPathEnum = create(
      MessageWithNestedPathEnumSchema,
      {
        value: MessagePathEnum_NestedPathEnum.JKL,
      },
    );
    const res = await aBitOfEverythingService.checkExternalNestedPathEnum(req);
    expect(res).to.deep.equal(create(EmptySchema));
  });

  it("CheckStatus", async () => {
    const res = await aBitOfEverythingService.checkStatus({});
    expect(res).to.deep.equal(
      create(CheckStatusResponseSchema, {
        status: { code: 7, message: "OK" },
      }),
    );
  });

  it("PostOneofEnum", async () => {
    const req: OneofEnumMessage = create(OneofEnumMessageSchema, {
      one: {
        case: "exampleEnum",
        value: ExampleEnum.FIRST,
      },
    });
    const res = await aBitOfEverythingService.postOneofEnum(req);
    expect(res).to.deep.equal(create(EmptySchema));
  });

  it("PostRequiredMessageType", async () => {
    const req: RequiredMessageTypeRequest = create(
      RequiredMessageTypeRequestSchema,
      {
        id: "id_required_message_type",
        foo: {
          bar: {
            id: "id_foo_bar",
          },
        },
      },
    );
    const res = await aBitOfEverythingService.postRequiredMessageType(req);
    expect(res).to.deep.equal(create(EmptySchema));
  });
});

// describe("AnotherServiceWithNoBindings", () => {
//   const anotherServiceWithNoBindings = newAnotherServiceWithNoBindings(
//     fetchTransport("http://localhost:8081/api/"),
//   );

//   it("NoBindings", async () => {
//     let errorThrown = false;
//     try {
//       await anotherServiceWithNoBindings.noBindings({
//         seconds: 100,
//       });
//     } catch (e) {
//       errorThrown = true;
//       expect(Status.fromJSON(e)).to.deep.equal(
//         Status.fromJSON({
//           code: 5,
//           message: "Not Found",
//         }),
//       );
//     }
//     expect(errorThrown).to.be.true;
//   });
// });

describe("BodyJsonService", () => {
  const bodyJsonService = newBodyJSONService(
    fetchTransport("http://localhost:8081/api/"),
  );

  // body field

  it("PostEnumBody", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      enumValue: NumericEnum.ONE,
    };
    const res = await bodyJsonService.postEnumBody(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("PostStringBody", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      stringValue: "string",
    };
    const res = await bodyJsonService.postStringBody(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  // repeated

  it("PostRepeatedMessageBody", async () => {
    const req: DeepPartial<ABitOfEverything> = {
      int32Value: 1,
      nested: [
        {
          name: "nested",
          amount: 1,
          ok: ABitOfEverything_Nested_DeepEnum.TRUE,
        },
      ],
    };
    const res = await bodyJsonService.postRepeatedMessageBody(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("PostRepeatedEnumBody", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      repeatedEnumValue: [NumericEnum.ONE],
    };
    const res = await bodyJsonService.postRepeatedEnumBody(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("PostRepeatedStringBody", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      repeatedStringValue: ["string"],
    };
    const res = await bodyJsonService.postRepeatedStringBody(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  // map field

  // it("PostMapMessageBody", async () => {
  //   const req: Partial<ABitOfEverything> = {
  //     int32Value: 1,
  //     mappedNestedValue: {
  //       some_one: {
  //         name: "one",
  //         amount: 1,
  //         ok: ABitOfEverything_Nested_DeepEnum.TRUE,
  //       },
  //       some_zero: {
  //         name: "zero",
  //         amount: 0,
  //         ok: ABitOfEverything_Nested_DeepEnum.FALSE,
  //       },
  //     },
  //   };
  //   const res = await bodyJsonService.postMapMessageBody(req);
  //   expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema,req));
  // });

  // it("PostMapStringBody", async () => {
  //   const req: Partial<ABitOfEverything> = {
  //     int32Value: 1,
  //     mappedStringValue: {
  //       some_one: "one",
  //       some_zero: "zero",
  //     },
  //   };
  //   const res = await bodyJsonService.postMapStringBody(req);
  //   expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema,req));
  // });

  // Well-known types

  it("PostTimestampBody", async () => {
    const req: DeepPartial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      timestamp: timestampFromDate(new Date("2021-01-01T00:00:00Z")),
    };
    const res = await bodyJsonService.postTimestampBody(req);
    delete res.value; // protobuf-es recognizes value as null when server emit unpopulated field, ignore it
    expect(res).to.deep.equal(fromPartial(WellKnownTypesHolderSchema, req));
  });

  it("PostFieldMaskBody", async () => {
    const req: DeepPartial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      fieldMask: {
        paths: ["f.bar", "f.baz"],
      },
    };
    const res = await bodyJsonService.postFieldMaskBody(req);
    delete res.value; // protobuf-es recognizes value as null when server emit unpopulated field, ignore it
    expect(res).to.deep.equal(fromPartial(WellKnownTypesHolderSchema, req));
  });

  it("PostStructBody", async () => {
    const req: DeepPartial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      struct: {
        fields: {
          key: {
            stringValue: "string",
          },
          anyList: ["any_list", "any_list2"],
        },
      },
    };
    const res = await bodyJsonService.postStructBody(req);
    delete res.value; // protobuf-es recognizes value as null when server emit unpopulated field, ignore it
    expect(res).to.deep.equal(fromPartial(WellKnownTypesHolderSchema, req));
  });
  it("PostValueBody", async () => {
    const req: DeepPartial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      value: fromJson(ValueSchema, "value"),
    };
    const res = await bodyJsonService.postValueBody(req);
    expect(res).to.deep.equal(fromPartial(WellKnownTypesHolderSchema, req));
  });

  it("PostListValueBody", async () => {
    const req: DeepPartial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      listValue: fromJson(ListValueSchema, ["list_value", "list_value2"]),
    };
    const res = await bodyJsonService.postListValueBody(req);
    delete res.value; // protobuf-es recognizes value as null when server emit unpopulated field, ignore it
    expect(res).to.deep.equal(fromPartial(WellKnownTypesHolderSchema, req));
  });

  it("PostWrapperBody", async () => {
    const req: DeepPartial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      int64Value: BigInt(1),
    };
    const res = await bodyJsonService.postWrapperBody(req);
    delete res.value; // protobuf-es recognizes value as null when server emit unpopulated field, ignore it
    expect(res).to.deep.equal(fromPartial(WellKnownTypesHolderSchema, req));
  });
});

describe("QueryStringService", () => {
  const queryStringService = newQueryStringService(
    fetchTransport("http://localhost:8081/api/"),
  );

  it("GetEnumQuerystring", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      enumValue: NumericEnum.ONE,
    };
    const res = await queryStringService.getEnumQuerystring(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("GetStringQuerystring", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      stringValue: "string",
    };
    const res = await queryStringService.getStringQuerystring(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("GetRepeatedEnumQuerystring", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      repeatedEnumValue: [NumericEnum.ONE, NumericEnum.ZERO],
    };
    const res = await queryStringService.getRepeatedEnumQuerystring(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("GetRepeatedStringQuerystring", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      repeatedStringValue: ["string", "string2"],
    };
    const res = await queryStringService.getRepeatedStringQuerystring(req);
    expect(res).to.deep.equal(fromPartial(ABitOfEverythingSchema, req));
  });

  it("GetTimestampQuerystring", async () => {
    const req: DeepPartial<WellKnownTypesHolder> = {
      int32Value: 1,
      timestamp: timestampFromDate(new Date("2021-01-01T00:00:00Z")),
    };
    const res = await queryStringService.getTimestampQuerystring(req);
    delete res.value; // protobuf-es recognizes value as null when server emit unpopulated field, ignore it
    expect(res).to.deep.equal(fromPartial(WellKnownTypesHolderSchema, req));
  });

  it("GetWrapperQuerystring", async () => {
    const req: DeepPartial<WellKnownTypesHolder> = {
      int32Value: 1,
      stringValue: "string",
    };
    const res = await queryStringService.getWrapperQuerystring(req);
    delete res.value; // protobuf-es recognizes value as null when server emit unpopulated field, ignore it
    expect(res).to.deep.equal(fromPartial(WellKnownTypesHolderSchema, req));
  });
});
