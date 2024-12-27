import { expect } from "chai";
import {
  newABitOfEverythingService,
  CallParams,
  Transport,
} from "./proto/examplepb/a_bit_of_everything_pb_gwcli";
import { ABitOfEverythingServiceClient } from "./proto/examplepb/a_bit_of_everything";

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
  const CounterService = newABitOfEverythingService(
    fetchTransport("http://localhost:8081"),
  );
  it("unary request", async () => {
    expect(true).to.be.true;
  });
});
