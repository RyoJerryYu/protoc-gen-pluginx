import { expect } from "chai";
import {
  newABitOfEverythingService,
  CallParams,
  Transport,
  newAnotherServiceWithNoBindings,
} from "./proto/examplepb/a_bit_of_everything_pb_gwcli";
import {
  ABitOfEverything,
  ABitOfEverything_Nested_DeepEnum,
  ABitOfEverythingRepeated,
  Body,
  Book,
  CheckStatusResponse,
  MessageWithBody,
  NumericEnum,
  RequiredMessageTypeRequest,
} from "./proto/examplepb/a_bit_of_everything";
import {
  MessagePathEnum_NestedPathEnum,
  MessageWithNestedPathEnum,
  MessageWithPathEnum,
  PathEnum,
} from "./proto/pathenum/path_enum";
import { Empty } from "./google/protobuf/empty";
import { Status } from "./google/rpc/status";
import { ExampleEnum, OneofEnumMessage } from "./proto/oneofenum/oneof_enum";
import { StringMessage } from "./proto/sub/message";
import {
  newBodyJSONService,
  newQueryStringService,
} from "./proto/paramtest/bodyjson_pb_gwcli";
import { WellKnownTypesHolder } from "./proto/paramtest/bodyjson";
import { Any } from "./google/protobuf/any";

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
      return resBody;
    },
  };
}

function newABitOfEverythingNonZero(): ABitOfEverything {
  return {
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
    int64Value: 1,
    uint64Value: 1,
    int32Value: 1,
    fixed64Value: 1,
    fixed32Value: 1,
    boolValue: true,
    stringValue: "string",
    bytesValue: new Uint8Array([1, 2, 3]),
    uint32Value: 1,
    enumValue: NumericEnum.ONE,
    pathEnumValue: PathEnum.DEF,
    nestedPathEnumValue: MessagePathEnum_NestedPathEnum.JKL,
    sfixed32Value: 1,
    sfixed64Value: 1,
    sint32Value: 1,
    sint64Value: 1,
    repeatedStringValue: ["string"],
    oneofEmpty: {},
    oneofString: undefined, // oneofEmpty was set, so this should be ignored
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
    timestampValue: new Date("2021-01-01T00:00:00Z"),
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
    int64OverrideType: 1,
    requiredStringViaFieldBehaviorAnnotation: "string",
    outputOnlyStringViaFieldBehaviorAnnotation: "string",
    optionalStringValue: "string",
    productId: ["string"],
    optionalStringField: "string",
    requiredStringField1: "string",
    requiredStringField2: "string",
    // useProtoNames do not support json_name
    // requiredFieldBehaviorJsonName: "string",
    // requiredFieldSchemaJsonName: "string",
    requiredFieldBehaviorJsonName: "",
    requiredFieldSchemaJsonName: "",
    trailingOnly: "string",
    trailingOnlyDot: "string",
    trailingBoth: "string",
    trailingMultiline: "string",
    uuids: ["uuid"],
  };
}

describe("ABitOfEverythingService", () => {
  const aBitOfEverythingService = newABitOfEverythingService(
    fetchTransport("http://localhost:8081/api/"),
  );

  it("Create", async () => {
    // TODO: some query params do no support
    const req: Partial<ABitOfEverything> = {
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
      int64Value: 1,
      uint64Value: 1,
      int32Value: 1,
      fixed64Value: 1,
      fixed32Value: 1,
      boolValue: true,
      stringValue: "strprefix/string",
      bytesValue: new Uint8Array([1, 2, 3]),
      uint32Value: 1,
      enumValue: NumericEnum.ONE,
      pathEnumValue: PathEnum.DEF,
      nestedPathEnumValue: MessagePathEnum_NestedPathEnum.JKL,
      sfixed32Value: 1,
      sfixed64Value: 1,
      sint32Value: 1,
      sint64Value: 1,
      repeatedStringValue: ["string"],
      // oneofEmpty: {},
      oneofString: undefined, // oneofEmpty was set, so this should be ignored
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
      timestampValue: new Date("2021-01-01T00:00:00Z"),
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
      int64OverrideType: 1,
      requiredStringViaFieldBehaviorAnnotation: "string",
      outputOnlyStringViaFieldBehaviorAnnotation: "string",
      optionalStringValue: "string",
      productId: ["string", "string2"],
      optionalStringField: "string",
      requiredStringField1: "string",
      requiredStringField2: "string",
      // requiredFieldBehaviorJsonName: "string",
      // requiredFieldSchemaJsonName: "string",
      trailingOnly: "string",
      trailingOnlyDot: "string",
      trailingBoth: "string",
      trailingMultiline: "string",
      uuids: ["uuid", "uuid2"],
    };

    const res = await aBitOfEverythingService.create(req);

    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("CreateBody", async () => {
    const req = newABitOfEverythingNonZero();

    const res = await aBitOfEverythingService.createBody(req);

    expect(res).to.deep.equal(newABitOfEverythingNonZero());
  });

  it("CreateBook", async () => {
    const req: Book = Book.create({
      name: "book_name",
      createTime: new Date("2021-01-01T00:00:00Z"),
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
    const req: Book = Book.create({
      name: "publishers/123/books/book_name",
      id: "book_id",
    });

    const res = await aBitOfEverythingService.updateBook({
      book: req,
    });

    expect(res).to.deep.equal({
      name: "publishers/123/books/book_name",
      id: "book_id",
      createTime: new Date("2021-01-01T00:00:00Z"),
    });
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
    const req = ABitOfEverything.create({
      uuid: "uuid_in_update",
      int32Value: 42,
    });

    const res = await aBitOfEverythingService.update(req);

    expect(res).to.deep.equal(Empty.create());
  });

  it("Delete", async () => {
    const req = { uuid: "uuid_in_delete" };

    const res = await aBitOfEverythingService.delete(req);

    expect(res).to.deep.equal(Empty.create());
  });

  it("GetRepeatedQuery", async () => {
    const req: Partial<ABitOfEverythingRepeated> = {
      pathRepeatedFloatValue: [1.1, 2.2],
      pathRepeatedDoubleValue: [1.1, 2.2],
      pathRepeatedInt64Value: [1, 2],
      pathRepeatedUint64Value: [1, 2],
      pathRepeatedInt32Value: [1, 2],
      pathRepeatedFixed64Value: [1, 2],
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
      pathRepeatedSfixed64Value: [1, 2],
      pathRepeatedSint32Value: [1, 2],
      pathRepeatedSint64Value: [1, 2],
    };

    const res = await aBitOfEverythingService.getRepeatedQuery(req);

    expect(res).to.deep.equal(ABitOfEverythingRepeated.fromPartial(req));
  });

  it("Echo", async () => {
    const req: StringMessage = {
      value: "string",
    };
    const res = await aBitOfEverythingService.echo(req);
    expect(res).to.deep.equal(req);
  });

  it("DeepPathEcho", async () => {
    const req = newABitOfEverythingNonZero();
    const res = await aBitOfEverythingService.deepPathEcho(req);
    expect(res).to.deep.equal(newABitOfEverythingNonZero());
  });

  // it("NoBindings", async () => {
  //   const res = await aBitOfEverythingService.noBindings({
  //     seconds: 100,
  //   });
  //   expect(res).to.deep.equal(Empty.create());
  // });
  // it("Timeout")
  it("ErrorWithDetails", async () => {
    let errorThrown = false;
    try {
      await aBitOfEverythingService.errorWithDetails({});
    } catch (e) {
      errorThrown = true;
      // useProtoNames should in snake_case
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
      const status = Status.fromJSON(e);
      expect(status.code).to.equal(7);
      expect(status.message).to.equal("permission denied");
      expect(status.details).to.have.length(1);
      // ts_proto do not support Any pack
      // const book = Book.fromJSON(status.details[0]);
      // but we have the original JSON, so we can parse it
      const book = Book.fromJSON(e.details[0]);
      expect(book).to.deep.equal({
        createTime: new Date("2021-01-01T00:00:00Z"),
        id: "book_id",
        name: "book_name",
      });
    }
    expect(errorThrown).to.be.true;
  });

  it("GetMessageWithBody", async () => {
    const req = MessageWithBody.create({
      id: "id_with_body",
      data: {
        name: "name_with_body",
      },
    });
    const res = await aBitOfEverythingService.getMessageWithBody(req);
    expect(res).to.deep.equal(Empty.create());
  });

  it("PostWithEmptyBody", async () => {
    const req = Body.create({
      name: "name_with_body",
    });
    const res = await aBitOfEverythingService.postWithEmptyBody(req);
    expect(res).to.deep.equal(Empty.create());
  });

  it("CheckGetQueryParams", async () => {
    const req: Partial<ABitOfEverything> = {
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
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("CheckNestedEnumGetQueryParams", async () => {
    const req: Partial<ABitOfEverything> = {
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
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("CheckPostQueryParams", async () => {
    const req: Partial<ABitOfEverything> = {
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
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("OverwriteRequestContentType", async () => {
    const req: Body = {
      name: "name_with_body",
    };
    const res = await aBitOfEverythingService.overwriteRequestContentType(req);
    expect(res).to.deep.equal(Empty.create());
  });

  // it("OverwriteResponseContentType", async () => {
  //   const res = await aBitOfEverythingService.overwriteResponseContentType({});
  //   expect(res).to.deep.equal({ value: "response_string_value" });
  // });

  it("CheckExternalPathEnum", async () => {
    const req: MessageWithPathEnum = {
      value: PathEnum.DEF,
    };
    const res = await aBitOfEverythingService.checkExternalPathEnum(req);
    expect(res).to.deep.equal(Empty.create());
  });

  it("CheckExternalNestedPathEnum", async () => {
    const req: MessageWithNestedPathEnum = {
      value: MessagePathEnum_NestedPathEnum.JKL,
    };
    const res = await aBitOfEverythingService.checkExternalNestedPathEnum(req);
    expect(res).to.deep.equal(Empty.create());
  });

  it("CheckStatus", async () => {
    const res = await aBitOfEverythingService.checkStatus({});
    expect(res).to.deep.equal(
      CheckStatusResponse.create({
        status: { code: 7, message: "OK" },
      }),
    );
  });

  it("PostOneofEnum", async () => {
    const req: OneofEnumMessage = {
      exampleEnum: ExampleEnum.EXAMPLE_ENUM_FIRST,
    };
    const res = await aBitOfEverythingService.postOneofEnum(req);
    expect(res).to.deep.equal(Empty.create());
  });

  it("PostRequiredMessageType", async () => {
    const req: RequiredMessageTypeRequest = {
      id: "id_required_message_type",
      foo: {
        bar: {
          id: "id_foo_bar",
        },
      },
    };
    const res = await aBitOfEverythingService.postRequiredMessageType(req);
    expect(res).to.deep.equal(Empty.create());
  });
});

describe("AnotherServiceWithNoBindings", () => {
  const anotherServiceWithNoBindings = newAnotherServiceWithNoBindings(
    fetchTransport("http://localhost:8081/api/"),
  );

  it("NoBindings", async () => {
    let errorThrown = false;
    try {
      await anotherServiceWithNoBindings.noBindings({
        seconds: 100,
      });
    } catch (e) {
      errorThrown = true;
      expect(Status.fromJSON(e)).to.deep.equal(
        Status.fromJSON({
          code: 5,
          message: "Not Found",
        }),
      );
    }
    expect(errorThrown).to.be.true;
  });
});

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
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("PostStringBody", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      stringValue: "string",
    };
    const res = await bodyJsonService.postStringBody(req);
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  // repeated

  it("PostRepeatedMessageBody", async () => {
    const req: Partial<ABitOfEverything> = {
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
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("PostRepeatedEnumBody", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      repeatedEnumValue: [NumericEnum.ONE],
    };
    const res = await bodyJsonService.postRepeatedEnumBody(req);
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("PostRepeatedStringBody", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      repeatedStringValue: ["string"],
    };
    const res = await bodyJsonService.postRepeatedStringBody(req);
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
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
  //   expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
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
  //   expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  // });

  // Well-known types

  it("PostTimestampBody", async () => {
    const req: Partial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      timestamp: new Date("2021-01-01T00:00:00Z"),
    };
    const res = await bodyJsonService.postTimestampBody(req);
    expect(res).to.deep.equal(WellKnownTypesHolder.fromPartial(req));
  });

  it("PostFieldMaskBody", async () => {
    const req: Partial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      fieldMask: ["f.bar", "f.baz"],
    };
    const res = await bodyJsonService.postFieldMaskBody(req);
    expect(res).to.deep.equal(WellKnownTypesHolder.fromPartial(req));
  });

  it("PostStructBody", async () => {
    const req: Partial<WellKnownTypesHolder> = {
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
    expect(res).to.deep.equal(WellKnownTypesHolder.fromPartial(req));
  });
  it("PostValueBody", async () => {
    const req: Partial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      value: "value",
    };
    const res = await bodyJsonService.postValueBody(req);
    expect(res).to.deep.equal(WellKnownTypesHolder.fromPartial(req));
  });

  it("PostListValueBody", async () => {
    const req: Partial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      listValue: ["list_value", "list_value2"],
    };
    const res = await bodyJsonService.postListValueBody(req);
    expect(res).to.deep.equal(WellKnownTypesHolder.fromPartial(req));
  });

  it("PostWrapperBody", async () => {
    const req: Partial<WellKnownTypesHolder> = {
      payloadCheck: "payload_check",
      int64Value: 1,
    };
    const res = await bodyJsonService.postWrapperBody(req);
    expect(res).to.deep.equal(WellKnownTypesHolder.fromPartial(req));
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
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("GetStringQuerystring", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      stringValue: "string",
    };
    const res = await queryStringService.getStringQuerystring(req);
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("GetRepeatedEnumQuerystring", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      repeatedEnumValue: [NumericEnum.ONE, NumericEnum.ZERO],
    };
    const res = await queryStringService.getRepeatedEnumQuerystring(req);
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("GetRepeatedStringQuerystring", async () => {
    const req: Partial<ABitOfEverything> = {
      int32Value: 1,
      repeatedStringValue: ["string", "string2"],
    };
    const res = await queryStringService.getRepeatedStringQuerystring(req);
    expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  });

  it("GetTimestampQuerystring", async () => {
    const req: Partial<WellKnownTypesHolder> = {
      int32Value: 1,
      timestamp: new Date("2021-01-01T00:00:00Z"),
    };
    const res = await queryStringService.getTimestampQuerystring(req);
    expect(res).to.deep.equal(WellKnownTypesHolder.fromPartial(req));
  });

  it("GetWrapperQuerystring", async () => {
    const req: Partial<WellKnownTypesHolder> = {
      int32Value: 1,
      stringValue: "string",
    };
    const res = await queryStringService.getWrapperQuerystring(req);
    expect(res).to.deep.equal(WellKnownTypesHolder.fromPartial(req));
  });
});
