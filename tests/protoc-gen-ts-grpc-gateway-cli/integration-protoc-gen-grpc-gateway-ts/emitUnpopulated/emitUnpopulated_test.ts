// Tests run against the generated client where `use_static_classes` is set to true.

import { expect } from "chai";
import {
  newCounterService,
  CallParams,
  Transport,
} from "./proto/service_pb_gwcli";
import {
  CounterServiceClient,
  HttpGetRequest,
  OptionalFieldsResponse,
} from "./proto/service";

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

describe("test with emit unpopulated", () => {
  const CounterService = newCounterService(
    fetchTransport("http://localhost:8081"),
  );
  it("http get request with optional fields", async () => {
    const result = await CounterService.hTTPGetWithOptionalFields({});

    const expected: OptionalFieldsResponse = {
      emptyStr: "",
      emptyNumber: 0,
      // empty opt fields will be excluded.
      emptyMsg: undefined,
      emptyOptMsg: undefined,
      emptyOptNumber: undefined,
      emptyOptStr: undefined,

      zeroStr: "",
      zeroNumber: 0,
      zeroMsg: { str: "", optStr: undefined },
      zeroOptStr: "",
      zeroOptNumber: 0,
      zeroOptMsg: { str: "", optStr: undefined },

      definedStr: "hello",
      definedNumber: 123,
      definedMsg: {
        str: "hello",
        optStr: "hello",
      },
      definedOptStr: "hello",
      definedOptNumber: 123,
      definedOptMsg: {
        str: "hello",
        optStr: "hello",
      },
    };
    // opt fields should always be undefined and zero-values should be present.
    expect(result).to.deep.equal(expected);
  });
});
