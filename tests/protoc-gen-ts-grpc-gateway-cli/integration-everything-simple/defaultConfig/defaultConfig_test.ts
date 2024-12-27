import { expect } from "chai";
import {
  newABitOfEverythingService,
  CallParams,
  Transport,
} from "./proto/examplepb/a_bit_of_everything_pb_gwcli";
import {
  ABitOfEverything,
  ABitOfEverything_Nested_DeepEnum,
  ABitOfEverythingServiceClient,
  NumericEnum,
} from "./proto/examplepb/a_bit_of_everything";
import {
  MessagePathEnum_NestedPathEnum,
  PathEnum,
} from "./proto/pathenum/path_enum";

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

describe("test default configuration", () => {
  const aBitOfEverythingService = newABitOfEverythingService(
    fetchTransport("http://localhost:8081"),
  );
  it("create body", async () => {
    const req: ABitOfEverything = {
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

    const res = await aBitOfEverythingService.createBody(req);

    expect(res).to.deep.equal(req);
  });
});
