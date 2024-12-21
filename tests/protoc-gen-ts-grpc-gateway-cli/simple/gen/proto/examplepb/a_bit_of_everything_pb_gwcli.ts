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
  return {
    createBody(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(
        `/v1/example/a_bit_of_everything`,
        { ...initReq, method: "POST", body: JSON.stringify(req, fm.replacer) },
      );
    },

    lookup(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoSub2Message.IdMessage>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(
        `/v1/example/a_bit_of_everything/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`,
        { ...initReq, method: "GET" },
      );
    },

    custom(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(
        `/v1/example/a_bit_of_everything/${req.uuid}:custom`,
        { ...initReq, method: "POST" },
      );
    },

    doubleColon(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(
        `/v1/example/a_bit_of_everything/${req.uuid}:custom:custom`,
        { ...initReq, method: "POST" },
      );
    },

    update(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v1/example/a_bit_of_everything/${req.uuid}`,
        { ...initReq, method: "PUT", body: JSON.stringify(req, fm.replacer) },
      );
    },

    updateV2(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.UpdateV2Request>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v2/example/a_bit_of_everything/${req.abe.uuid}`,
        {
          ...initReq,
          method: "PUT",
          body: JSON.stringify(req["abe"], fm.replacer),
        },
      );
    },

    delete(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoSub2Message.IdMessage>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v1/example/a_bit_of_everything/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`,
        { ...initReq, method: "DELETE" },
      );
    },

    getQuery(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v1/example/a_bit_of_everything/query/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`,
        { ...initReq, method: "GET" },
      );
    },

    getRepeatedQuery(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated> {
      return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated>(
        `/v1/example/a_bit_of_everything_repeated/${req.pathRepeatedFloatValue}/${req.pathRepeatedDoubleValue}/${req.pathRepeatedInt64Value}/${req.pathRepeatedUint64Value}/${req.pathRepeatedInt32Value}/${req.pathRepeatedFixed64Value}/${req.pathRepeatedFixed32Value}/${req.pathRepeatedBoolValue}/${req.pathRepeatedStringValue}/${req.pathRepeatedBytesValue}/${req.pathRepeatedUint32Value}/${req.pathRepeatedEnumValue}/${req.pathRepeatedSfixed32Value}/${req.pathRepeatedSfixed64Value}/${req.pathRepeatedSint32Value}/${req.pathRepeatedSint64Value}?${fm.renderURLSearchParams(req, ["pathRepeatedFloatValue", "pathRepeatedDoubleValue", "pathRepeatedInt64Value", "pathRepeatedUint64Value", "pathRepeatedInt32Value", "pathRepeatedFixed64Value", "pathRepeatedFixed32Value", "pathRepeatedBoolValue", "pathRepeatedStringValue", "pathRepeatedBytesValue", "pathRepeatedUint32Value", "pathRepeatedEnumValue", "pathRepeatedSfixed32Value", "pathRepeatedSfixed64Value", "pathRepeatedSint32Value", "pathRepeatedSint64Value"])}`,
        { ...initReq, method: "GET" },
      );
    },

    deepPathEcho(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(
        `/v1/example/deep_path/${req.singleNested.name}`,
        { ...initReq, method: "POST", body: JSON.stringify(req, fm.replacer) },
      );
    },

    noBindings(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufDuration.Duration>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/proto.examplepb.ABitOfEverythingService/NoBindings`,
        { ...initReq, method: "POST", body: JSON.stringify(req, fm.replacer) },
      );
    },

    timeout(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v2/example/timeout?${fm.renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
    },

    errorWithDetails(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v2/example/errorwithdetails?${fm.renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
    },

    getMessageWithBody(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.MessageWithBody>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v2/example/withbody/${req.id}`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(req["data"], fm.replacer),
        },
      );
    },

    postWithEmptyBody(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.Body>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v2/example/postwithemptybody/${req.name}`,
        { ...initReq, method: "POST", body: JSON.stringify(req, fm.replacer) },
      );
    },

    checkGetQueryParams(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(
        `/v1/example/a_bit_of_everything/params/get/${req.singleNested.name}?${fm.renderURLSearchParams(req, ["singleNested.name"])}`,
        { ...initReq, method: "GET" },
      );
    },

    checkNestedEnumGetQueryParams(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(
        `/v1/example/a_bit_of_everything/params/get/nested_enum/${req.singleNested.ok}?${fm.renderURLSearchParams(req, ["singleNested.ok"])}`,
        { ...initReq, method: "GET" },
      );
    },

    checkPostQueryParams(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.ABitOfEverything>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
      return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(
        `/v1/example/a_bit_of_everything/params/post/${req.stringValue}`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(req["single_nested"], fm.replacer),
        },
      );
    },

    overwriteRequestContentType(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.Body>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v2/example/overwriterequestcontenttype`,
        { ...initReq, method: "POST", body: JSON.stringify(req, fm.replacer) },
      );
    },

    overwriteResponseContentType(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufWrappers.StringValue> {
      return fm.fetchRequest<GoogleProtobufWrappers.StringValue>(
        `/v2/example/overwriteresponsecontenttype?${fm.renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
    },

    checkExternalPathEnum(
      req: ProtoExamplepbABitOfEverything.DeepPartial<PathenumPathEnum.MessageWithPathEnum>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v2/${req.value}:check?${fm.renderURLSearchParams(req, ["value"])}`,
        { ...initReq, method: "GET" },
      );
    },

    checkExternalNestedPathEnum(
      req: ProtoExamplepbABitOfEverything.DeepPartial<PathenumPathEnum.MessageWithNestedPathEnum>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v3/${req.value}:check?${fm.renderURLSearchParams(req, ["value"])}`,
        { ...initReq, method: "GET" },
      );
    },

    checkStatus(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<ProtoExamplepbABitOfEverything.CheckStatusResponse> {
      return fm.fetchRequest<ProtoExamplepbABitOfEverything.CheckStatusResponse>(
        `/v1/example/checkStatus?${fm.renderURLSearchParams(req, [])}`,
        { ...initReq, method: "GET" },
      );
    },

    postOneofEnum(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoOneofenumOneofEnum.OneofEnumMessage>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v1/example/oneofenum`,
        {
          ...initReq,
          method: "POST",
          body: JSON.stringify(req["example_enum"], fm.replacer),
        },
      );
    },

    postRequiredMessageType(
      req: ProtoExamplepbABitOfEverything.DeepPartial<ProtoExamplepbABitOfEverything.RequiredMessageTypeRequest>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/v1/example/requiredmessagetype`,
        { ...initReq, method: "POST", body: JSON.stringify(req, fm.replacer) },
      );
    },
  };
}

export function newAnotherServiceWithNoBindings(): ProtoExamplepbABitOfEverything.AnotherServiceWithNoBindingsClient {
  return {
    noBindings(
      req: ProtoExamplepbABitOfEverything.DeepPartial<GoogleProtobufEmpty.Empty>,
      options?: NiceGrpcCommon.CallOptions,
    ): Promise<GoogleProtobufEmpty.Empty> {
      return fm.fetchRequest<GoogleProtobufEmpty.Empty>(
        `/proto.examplepb.AnotherServiceWithNoBindings/NoBindings`,
        { ...initReq, method: "POST", body: JSON.stringify(req, fm.replacer) },
      );
    },
  };
}
