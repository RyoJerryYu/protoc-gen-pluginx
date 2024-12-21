import * as GoogleProtobufDuration from "../../google/protobuf/duration";
import * as GoogleProtobufEmpty from "../../google/protobuf/empty";
import * as GoogleProtobufWrappers from "../../google/protobuf/wrappers";
import * as NiceGrpcCommon from "nice-grpc-common";
import * as ProtoExamplepbABitOfEverything from "./a_bit_of_everything";
import * as ProtoOneofenumOneofEnum from "../oneofenum/oneof_enum";
import * as PathenumPathEnum from "../pathenum/path_enum";
import * as ProtoSub2Message from "../sub2/message";
// ABitOfEverything service is used to validate that APIs with complicated
// proto messages and URL templates are still processed correctly.
export function newABitOfEverythingService(): ProtoExamplepbABitOfEverything.ABitOfEverythingServiceClient {
  const initReq = {};
  return {
    async createBody(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(`/v1/example/a_bit_of_everything`, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(
          ProtoExamplepbABitOfEverything.ABitOfEverything.toJSON(fullReq),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async lookup(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoSub2Message.IdMessage>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq = ProtoSub2Message.IdMessage.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async custom(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/${req.uuid}:custom`,
        { ...initReq, method: "POST" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async doubleColon(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/${req.uuid}:custom:custom`,
        { ...initReq, method: "POST" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async update(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(`/v1/example/a_bit_of_everything/${req.uuid}`, {
        ...initReq,
        method: "PUT",
        body: JSON.stringify(
          ProtoExamplepbABitOfEverything.ABitOfEverything.toJSON(fullReq),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async updateV2(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.UpdateV2Request>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        ProtoExamplepbABitOfEverything.UpdateV2Request.fromPartial(req);
      const res = await fetch(
        `/v2/example/a_bit_of_everything/${req.abe.uuid}`,
        {
          ...initReq,
          method: "PUT",
          body: JSON.stringify(
            ProtoExamplepbABitOfEverything.ABitOfEverything.toJSON(fullReq.abe),
          ),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async delete(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoSub2Message.IdMessage>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = ProtoSub2Message.IdMessage.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`,
        { ...initReq, method: "DELETE" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async getQuery(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/query/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async getRepeatedQuery(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated.fromPartial(
          req,
        );
      const res = await fetch(
        `/v1/example/a_bit_of_everything_repeated/${req.pathRepeatedFloatValue}/${req.pathRepeatedDoubleValue}/${req.pathRepeatedInt64Value}/${req.pathRepeatedUint64Value}/${req.pathRepeatedInt32Value}/${req.pathRepeatedFixed64Value}/${req.pathRepeatedFixed32Value}/${req.pathRepeatedBoolValue}/${req.pathRepeatedStringValue}/${req.pathRepeatedBytesValue}/${req.pathRepeatedUint32Value}/${req.pathRepeatedEnumValue}/${req.pathRepeatedSfixed32Value}/${req.pathRepeatedSfixed64Value}/${req.pathRepeatedSint32Value}/${req.pathRepeatedSint64Value}?${fm.renderURLSearchParams(req, ["pathRepeatedFloatValue", "pathRepeatedDoubleValue", "pathRepeatedInt64Value", "pathRepeatedUint64Value", "pathRepeatedInt32Value", "pathRepeatedFixed64Value", "pathRepeatedFixed32Value", "pathRepeatedBoolValue", "pathRepeatedStringValue", "pathRepeatedBytesValue", "pathRepeatedUint32Value", "pathRepeatedEnumValue", "pathRepeatedSfixed32Value", "pathRepeatedSfixed64Value", "pathRepeatedSint32Value", "pathRepeatedSint64Value"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated.fromJSON(
        body,
      );
    },

    async deepPathEcho(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/deep_path/${req.singleNested.name}`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(
            ProtoExamplepbABitOfEverything.ABitOfEverything.toJSON(fullReq),
          ),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async noBindings(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufDuration.Duration>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = GoogleProtobufDuration.Duration.fromPartial(req);
      const res = await fetch(
        `/proto.examplepb.ABitOfEverythingService/NoBindings`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(GoogleProtobufDuration.Duration.toJSON(fullReq)),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async timeout(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = GoogleProtobufEmpty.Empty.fromPartial(req);
      const res = await fetch(
        `/v2/example/timeout?${fm.renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async errorWithDetails(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = GoogleProtobufEmpty.Empty.fromPartial(req);
      const res = await fetch(
        `/v2/example/errorwithdetails?${fm.renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async getMessageWithBody(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.MessageWithBody>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        ProtoExamplepbABitOfEverything.MessageWithBody.fromPartial(req);
      const res = await fetch(`/v2/example/withbody/${req.id}`, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(
          ProtoExamplepbABitOfEverything.Body.toJSON(fullReq.data),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async postWithEmptyBody(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.Body>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = ProtoExamplepbABitOfEverything.Body.fromPartial(req);
      const res = await fetch(`/v2/example/postwithemptybody/${req.name}`, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(
          ProtoExamplepbABitOfEverything.Body.toJSON(fullReq),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async checkGetQueryParams(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/params/get/${req.singleNested.name}?${fm.renderURLSearchParams(req, ["singleNested.name"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async checkNestedEnumGetQueryParams(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/params/get/nested_enum/${req.singleNested.ok}?${fm.renderURLSearchParams(req, ["singleNested.ok"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async checkPostQueryParams(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      const fullReq =
        ProtoExamplepbABitOfEverything.ABitOfEverything.fromPartial(req);
      const res = await fetch(
        `/v1/example/a_bit_of_everything/params/post/${req.stringValue}`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(
            ProtoExamplepbABitOfEverything.Nested.toJSON(fullReq.single_nested),
          ),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.ABitOfEverything.fromJSON(body);
    },

    async overwriteRequestContentType(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.Body>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = ProtoExamplepbABitOfEverything.Body.fromPartial(req);
      const res = await fetch(`/v2/example/overwriterequestcontenttype`, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(
          ProtoExamplepbABitOfEverything.Body.toJSON(fullReq),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async overwriteResponseContentType(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufWrappers.StringValue> {
      const fullReq = GoogleProtobufEmpty.Empty.fromPartial(req);
      const res = await fetch(
        `/v2/example/overwriteresponsecontenttype?${fm.renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufWrappers.StringValue.fromJSON(body);
    },

    async checkExternalPathEnum(
      req: ProtoExamplepbABitOfEverything.DeepPartial<PathenumPathEnum.MessageWithPathEnum>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = PathenumPathEnum.MessageWithPathEnum.fromPartial(req);
      const res = await fetch(
        `/v2/${req.value}:check?${fm.renderURLSearchParams(req, ["value"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async checkExternalNestedPathEnum(
      req: ProtoExamplepbABitOfEverything.DeepPartial<PathenumPathEnum.MessageWithNestedPathEnum>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        PathenumPathEnum.MessageWithNestedPathEnum.fromPartial(req);
      const res = await fetch(
        `/v3/${req.value}:check?${fm.renderURLSearchParams(req, ["value"])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async checkStatus(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.CheckStatusResponse> {
      const fullReq = GoogleProtobufEmpty.Empty.fromPartial(req);
      const res = await fetch(
        `/v1/example/checkStatus?${fm.renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return ProtoExamplepbABitOfEverything.CheckStatusResponse.fromJSON(body);
    },

    async postOneofEnum(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoOneofenumOneofEnum.OneofEnumMessage>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = ProtoOneofenumOneofEnum.OneofEnumMessage.fromPartial(req);
      const res = await fetch(`/v1/example/oneofenum`, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(
          ProtoOneofenumOneofEnum.ExampleEnum.toJSON(fullReq.example_enum),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },

    async postRequiredMessageType(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.RequiredMessageTypeRequest>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq =
        ProtoExamplepbABitOfEverything.RequiredMessageTypeRequest.fromPartial(
          req,
        );
      const res = await fetch(`/v1/example/requiredmessagetype`, {
        ...initReq,
        method: "POST",
        body: JSON.stringify(
          ProtoExamplepbABitOfEverything.RequiredMessageTypeRequest.toJSON(
            fullReq,
          ),
        ),
      });
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },
  };
}

export function newAnotherServiceWithNoBindings(): ProtoExamplepbABitOfEverything.AnotherServiceWithNoBindingsClient {
  const initReq = {};
  return {
    async noBindings(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      const fullReq = GoogleProtobufEmpty.Empty.fromPartial(req);
      const res = await fetch(
        `/proto.examplepb.AnotherServiceWithNoBindings/NoBindings`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(GoogleProtobufEmpty.Empty.toJSON(fullReq)),
        },
      );
      const body = await res.json();
      if (!res.ok) throw body;
      return GoogleProtobufEmpty.Empty.fromJSON(body);
    },
  };
}
