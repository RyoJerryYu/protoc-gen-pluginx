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

describe("test with original proto names", () => {
  const CounterService = newCounterService(
    fetchTransport("http://localhost:8081"),
  );
  it("http get check request", async () => {
    const req = { num_to_increase: 10 } as HttpGetRequest;
    const result = await CounterService.hTTPGet(req);
    expect(result.result).to.equal(11);
  });

  it("http post body check request with nested body path", async () => {
    const result = await CounterService.hTTPPostWithNestedBodyPath({
      a: 10,
      req: { b: 15 },
      c: 0,
    });
    expect(result.post_result).to.equal(25);
  });

  it("http post body check request with star in path", async () => {
    const result = await CounterService.hTTPPostWithStarBodyPath({
      a: 10,
      req: { b: 15 },
      c: 23,
    });
    expect(result.post_result).to.equal(48);
  });

  it("http patch request with star in path", async () => {
    const result = await CounterService.hTTPPatch({ a: 10, c: 23 });
    expect(result.patch_result).to.equal(33);
  });

  it("http delete check request", async () => {
    const result = await CounterService.hTTPDelete({ a: 10 });
    expect(result).to.be.empty;
  });

  it("http get request with url search parameters", async () => {
    const result = await CounterService.hTTPGetWithURLSearchParams({
      a: 10,
      b: { b: 0 },
      c: [23, 25],
      d: { d: 12 },
    });
    expect(result.url_search_params_result).to.equal(70);
  });

  it("http get request with zero value url search parameters", async () => {
    const result = await CounterService.hTTPGetWithZeroValueURLSearchParams({
      a: "A",
      b: "",
      c: { c: 1, d: [1, 0, 2], e: false },
    });
    expect(result).to.deep.equal({
      a: "A",
      b: "hello",
      zero_value_msg: { c: 2, d: [2, 1, 3], e: true },
    });
  });

  it("http get request with optional fields", async () => {
    const result = await CounterService.hTTPGetWithOptionalFields({});

    const expectResult: OptionalFieldsResponse = {
      // all empty fields will be excluded.
      empty_str: "",
      empty_number: 0,
      empty_msg: undefined,
      empty_opt_str: undefined,
      empty_opt_number: undefined,
      empty_opt_msg: undefined,

      zero_str: "",
      zero_number: 0,
      zero_msg: { str: "", opt_str: undefined },
      zero_opt_str: "",
      zero_opt_number: 0,
      zero_opt_msg: { str: "", opt_str: undefined },

      // defined fields are the same as above.
      defined_str: "hello",
      defined_number: 123,
      defined_msg: {
        str: "hello",
        opt_str: "hello",
      },
      defined_opt_str: "hello",
      defined_opt_number: 123,
      defined_opt_msg: {
        str: "hello",
        opt_str: "hello",
      },
    };

    expect(result).to.deep.equal(expectResult);
  });
});
