import { expect } from "chai";
import {
  newCounterService,
  CallParams,
  Transport,
} from "./proto/service_pb_gwcli";
import { CounterServiceClient, HttpGetRequest } from "./proto/service";

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
  const CounterService = newCounterService(
    fetchTransport("http://localhost:8081"),
  );

  it("unary request", async () => {
    const result = await CounterService.increment({ counter: 199 });

    expect(result.result).to.equal(200);
  });

  it("failing unary request", async () => {
    try {
      await CounterService.failingIncrement({ counter: 199 });
      expect.fail("expected call to throw");
    } catch (e) {
      expect(e).to.have.property("message", "this increment does not work");
      expect(e).to.have.property("code", 14);
    }
  });

  // it("streaming request", async () => {
  //   const response = [] as number[];
  //   await CounterService.streamingIncrements(
  //     { counter: 1 },
  //     (resp) => response.push(resp.result),
  //     {
  //       pathPrefix: "http://localhost:8081",
  //     },
  //   );

  //   expect(response).to.deep.equal([2, 3, 4, 5, 6]);
  // });

  it("binary echo", async () => {
    const message = "→ ping";

    const resp = await CounterService.echoBinary({
      data: new TextEncoder().encode(message),
    });

    const bytes = resp.data;
    expect(new TextDecoder().decode(bytes)).to.equal(message);
  });

  it("http get check request", async () => {
    const req = { numToIncrease: 10 } as HttpGetRequest;
    const result = await CounterService.httpget(req);
    expect(result.result).to.equal(11);
  });

  it("http post body check request with nested body path", async () => {
    const result = await CounterService.httppostWithNestedBodyPath({
      a: 10,
      req: { b: 15 },
      c: 0,
    });
    expect(result.postResult).to.equal(25);
  });

  it("http post body check request with star in path", async () => {
    const result = await CounterService.httppostWithStarBodyPath({
      a: 10,
      req: { b: 15 },
      c: 23,
    });
    expect(result.postResult).to.equal(48);
  });

  it("able to communicate with external message reference without package defined", async () => {
    const result = await CounterService.externalMessage({ content: "hello" });
    expect(result.result).to.equal("hello!!");
  });

  it("http patch request with star in path", async () => {
    const result = await CounterService.httppatch({ a: 10, c: 23 });
    expect(result.patchResult).to.equal(33);
  });

  it("http delete check request", async () => {
    const result = await CounterService.httpdelete({ a: 10 });
    expect(result).to.be.empty;
  });

  it("http delete with query params", async () => {
    const result = await CounterService.httpdeleteWithParams({
      id: 10,
      reason: "test",
    });
    expect(result.reason).to.be.equal("test");
  });

  it("http get request with url search parameters", async () => {
    const result = await CounterService.httpgetWithUrlsearchParams({
      a: 10,
      b: { b: 0 },
      c: [23, 25],
      d: { d: 12 },
    });
    expect(result.urlSearchParamsResult).to.equal(70);
  });

  it("http get request with zero value url search parameters", async () => {
    const result = await CounterService.httpgetWithZeroValueUrlsearchParams({
      a: "A",
      b: "",
      c: { c: 1, d: [1, 0, 2], e: false },
    });
    expect(result).to.deep.equal({
      a: "A",
      b: "hello",
      zeroValueMsg: { c: 2, d: [2, 1, 3], e: true },
    });
  });

  it("http get request with optional fields", async () => {
    const result = await CounterService.httpgetWithOptionalFields({});

    expect(result).to.deep.equal({
      // empty scalar fields included
      emptyStr: "",
      emptyNumber: 0,
      // empty message fields not included
      emptyMsg: undefined,

      // empty optional fields not included, even if scalar
      emptyOptStr: undefined,
      emptyOptNumber: undefined,
      emptyOptMsg: undefined,

      // zero fields included, whatever optional or not
      zeroStr: "",
      zeroNumber: 0,
      zeroMsg: {
        str: "",
        optStr: undefined,
      },
      zeroOptStr: "",
      zeroOptNumber: 0,
      zeroOptMsg: {
        str: "",
        optStr: undefined,
      },

      // defined fields are the same as above.
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
    });
  });
});
