import * as ProtoExamplepbABitOfEverything from './a_bit_of_everything';
import * as ProtoSub2Message from '../sub2/message';
import * as PathenumPathEnum from '../pathenum/path_enum';
import * as ProtoOneofenumOneofEnum from '../oneofenum/oneof_enum';
import * as NiceGrpcWeb from '../../nice-grpc-web';
export function newABitOfEverythingService(): NiceGrpcWeb.Client<ProtoExamplepbABitOfEverything.ABitOfEverythingServiceDefinition> {
// ABitOfEverything service is used to validate that APIs with complicated
// proto messages and URL templates are still processed correctly.

return {


  CreateBody(
    req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
    options?: CallOptions
  ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
    return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }



  Lookup(
    req: Partial<ProtoSub2Message.IdMessage>, 
    options?: CallOptions
  ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
    return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`, {...initReq, method: "GET"});
  }



  Custom(
    req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
    options?: CallOptions
  ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
    return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/${req.uuid}:custom`, {...initReq, method: "POST"});
  }



  DoubleColon(
    req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
    options?: CallOptions
  ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
    return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/${req.uuid}:custom:custom`, {...initReq, method: "POST"});
  }



  Update(
    req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v1/example/a_bit_of_everything/${req.uuid}`, {...initReq, method: "PUT", body: JSON.stringify(req, fm.replacer)});
  }



  UpdateV2(
    req: Partial<ProtoExamplepbABitOfEverything.UpdateV2Request>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v2/example/a_bit_of_everything/${req.abe.uuid}`, {...initReq, method: "PUT", body: JSON.stringify(req["abe"], fm.replacer)});
  }



  Delete(
    req: Partial<ProtoSub2Message.IdMessage>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v1/example/a_bit_of_everything/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`, {...initReq, method: "DELETE"});
  }



  GetQuery(
    req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v1/example/a_bit_of_everything/query/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`, {...initReq, method: "GET"});
  }



  GetRepeatedQuery(
    req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated>, 
    options?: CallOptions
  ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated> {
    return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated>(`/v1/example/a_bit_of_everything_repeated/${req.pathRepeatedFloatValue}/${req.pathRepeatedDoubleValue}/${req.pathRepeatedInt64Value}/${req.pathRepeatedUint64Value}/${req.pathRepeatedInt32Value}/${req.pathRepeatedFixed64Value}/${req.pathRepeatedFixed32Value}/${req.pathRepeatedBoolValue}/${req.pathRepeatedStringValue}/${req.pathRepeatedBytesValue}/${req.pathRepeatedUint32Value}/${req.pathRepeatedEnumValue}/${req.pathRepeatedSfixed32Value}/${req.pathRepeatedSfixed64Value}/${req.pathRepeatedSint32Value}/${req.pathRepeatedSint64Value}?${fm.renderURLSearchParams(req, ["pathRepeatedFloatValue", "pathRepeatedDoubleValue", "pathRepeatedInt64Value", "pathRepeatedUint64Value", "pathRepeatedInt32Value", "pathRepeatedFixed64Value", "pathRepeatedFixed32Value", "pathRepeatedBoolValue", "pathRepeatedStringValue", "pathRepeatedBytesValue", "pathRepeatedUint32Value", "pathRepeatedEnumValue", "pathRepeatedSfixed32Value", "pathRepeatedSfixed64Value", "pathRepeatedSint32Value", "pathRepeatedSint64Value"])}`, {...initReq, method: "GET"});
  }



  DeepPathEcho(
    req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
    options?: CallOptions
  ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
    return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/deep_path/${req.singleNested.name}`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }



  NoBindings(
    req: Partial<unknown>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/proto.examplepb.ABitOfEverythingService/NoBindings`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }



  Timeout(
    req: Partial<{}>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v2/example/timeout?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
  }



  ErrorWithDetails(
    req: Partial<{}>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v2/example/errorwithdetails?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
  }



  GetMessageWithBody(
    req: Partial<ProtoExamplepbABitOfEverything.MessageWithBody>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v2/example/withbody/${req.id}`, {...initReq, method: "POST", body: JSON.stringify(req["data"], fm.replacer)});
  }



  PostWithEmptyBody(
    req: Partial<ProtoExamplepbABitOfEverything.Body>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v2/example/postwithemptybody/${req.name}`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }



  CheckGetQueryParams(
    req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
    options?: CallOptions
  ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
    return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/params/get/${req.singleNested.name}?${fm.renderURLSearchParams(req, ["singleNested.name"])}`, {...initReq, method: "GET"});
  }



  CheckNestedEnumGetQueryParams(
    req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
    options?: CallOptions
  ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
    return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/params/get/nested_enum/${req.singleNested.ok}?${fm.renderURLSearchParams(req, ["singleNested.ok"])}`, {...initReq, method: "GET"});
  }



  CheckPostQueryParams(
    req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
    options?: CallOptions
  ): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
    return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/params/post/${req.stringValue}`, {...initReq, method: "POST", body: JSON.stringify(req["single_nested"], fm.replacer)});
  }



  OverwriteRequestContentType(
    req: Partial<ProtoExamplepbABitOfEverything.Body>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v2/example/overwriterequestcontenttype`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }



  OverwriteResponseContentType(
    req: Partial<{}>, 
    options?: CallOptions
  ): Promise<string | null> {
    return fm.fetchRequest<string | null>(`/v2/example/overwriteresponsecontenttype?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
  }



  CheckExternalPathEnum(
    req: Partial<PathenumPathEnum.MessageWithPathEnum>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v2/${req.value}:check?${fm.renderURLSearchParams(req, ["value"])}`, {...initReq, method: "GET"});
  }



  CheckExternalNestedPathEnum(
    req: Partial<PathenumPathEnum.MessageWithNestedPathEnum>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v3/${req.value}:check?${fm.renderURLSearchParams(req, ["value"])}`, {...initReq, method: "GET"});
  }



  CheckStatus(
    req: Partial<{}>, 
    options?: CallOptions
  ): Promise<ProtoExamplepbABitOfEverything.CheckStatusResponse> {
    return fm.fetchRequest<ProtoExamplepbABitOfEverything.CheckStatusResponse>(`/v1/example/checkStatus?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
  }



  PostOneofEnum(
    req: Partial<ProtoOneofenumOneofEnum.OneofEnumMessage>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v1/example/oneofenum`, {...initReq, method: "POST", body: JSON.stringify(req["example_enum"], fm.replacer)});
  }



  PostRequiredMessageType(
    req: Partial<ProtoExamplepbABitOfEverything.RequiredMessageTypeRequest>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/v1/example/requiredmessagetype`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }

};
}

export function newAnotherServiceWithNoBindings(): NiceGrpcWeb.Client<ProtoExamplepbABitOfEverything.AnotherServiceWithNoBindingsDefinition> {

return {


  NoBindings(
    req: Partial<{}>, 
    options?: CallOptions
  ): Promise<{}> {
    return fm.fetchRequest<{}>(`/proto.examplepb.AnotherServiceWithNoBindings/NoBindings`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
  }

};
}

