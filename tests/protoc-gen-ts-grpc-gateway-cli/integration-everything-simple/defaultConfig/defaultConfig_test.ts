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
  ABitOfEverythingServiceClient,
  Body,
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
      const res = await fetch(new URL(rpcPath, baseUrl).href, callReq);
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
    requiredFieldBehaviorJsonName: "string",
    requiredFieldSchemaJsonName: "string",
    trailingOnly: "string",
    trailingOnlyDot: "string",
    trailingBoth: "string",
    trailingMultiline: "string",
    uuids: ["uuid"],
  };
}

describe("ABitOfEverythingService", () => {
  const aBitOfEverythingService = newABitOfEverythingService(
    fetchTransport("http://localhost:8081/api"),
  );

  it("CreateBody", async () => {
    const req = newABitOfEverythingNonZero();

    const res = await aBitOfEverythingService.createBody(req);

    expect(res).to.deep.equal(newABitOfEverythingNonZero());
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

  // it("UpdatePatch", async () => {
  //   const req = ABitOfEverything.create({
  //     uuid: "uuid_in_update_patch",
  //     int32Value: 42,
  //   });

  //   const res = await aBitOfEverythingService.updatePatch({
  //     abe: req,
  //   });

  //   expect(res).to.deep.equal(Empty.create());
  // });

  it("Delete", async () => {
    const req = { uuid: "uuid_in_delete" };

    const res = await aBitOfEverythingService.delete(req);

    expect(res).to.deep.equal(Empty.create());
  });

  // it("GetRepeatedQuery", async () => {
  //   const req: ABitOfEverythingRepeated = {
  //     pathRepeatedFloatValue: [1.1, 2.2],
  //     pathRepeatedDoubleValue: [1.1, 2.2],
  //     pathRepeatedInt64Value: [1, 2],
  //     pathRepeatedUint64Value: [1, 2],
  //     pathRepeatedInt32Value: [1, 2],
  //     pathRepeatedFixed64Value: [1, 2],
  //     pathRepeatedFixed32Value: [1, 2],
  //     pathRepeatedBoolValue: [true, false],
  //     pathRepeatedStringValue: ["string1", "string2"],
  //     pathRepeatedBytesValue: [new Uint8Array([1, 2, 3]), new Uint8Array([4, 5, 6])],
  //     pathRepeatedUint32Value: [1, 2],
  //     pathRepeatedEnumValue: [NumericEnum.ONE, NumericEnum.ZERO],
  //     pathRepeatedSfixed32Value: [1, 2],
  //     pathRepeatedSfixed64Value: [1, 2],
  //     pathRepeatedSint32Value: [1, 2],
  //     pathRepeatedSint64Value: [1, 2],
  //   }

  //   const res = await aBitOfEverythingService.getRepeatedQuery(req);

  //   expect(res).to.deep.equal(req);
  // })

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
  // it("ErrorWithDetails")

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

  // it("CheckPostQueryParams", async () => {
  //   const req: Partial<ABitOfEverything> = {
  //     singleNested: {
  //       name: "nested",
  //       amount: 1,
  //       ok: ABitOfEverything_Nested_DeepEnum.TRUE,
  //     },
  //     uuid: "uuid_check_post_query_params",
  //     boolValue: true,
  //     stringValue: "string",
  //     uint32Value: 1,
  //     enumValue: NumericEnum.ONE,
  //     pathEnumValue: PathEnum.DEF,
  //     nestedPathEnumValue: MessagePathEnum_NestedPathEnum.JKL,
  //   };
  //   const res = await aBitOfEverythingService.checkPostQueryParams(req);
  //   expect(res).to.deep.equal(ABitOfEverything.fromPartial(req));
  // });

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

  // it("PostOneofEnum", async () => {
  //   const req: OneofEnumMessage = {
  //     exampleEnum: ExampleEnum.EXAMPLE_ENUM_FIRST,
  //   };
  //   const res = await aBitOfEverythingService.postOneofEnum(req);
  //   expect(res).to.deep.equal(Empty.create());
  // });

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
    fetchTransport("http://localhost:8081/api"),
  );

  it("NoBindings", async () => {
    let errorThrown = false;
    try {
      await anotherServiceWithNoBindings.noBindings({
        seconds: 100,
      });
    } catch (e) {
      errorThrown = true;
      expect(e).to.deep.equal({
        code: 5,
        message: "Not Found",
      });
    }
    expect(errorThrown).to.be.true;
  });
});
