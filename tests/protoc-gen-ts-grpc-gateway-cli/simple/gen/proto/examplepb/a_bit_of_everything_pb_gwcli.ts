import * as ProtoSub2Message from '../sub2/message';
import * as GoogleProtobufEmpty from '../../google/protobuf/empty';
import * as GoogleProtobufDuration from '../../google/protobuf/duration';
import * as GoogleProtobufWrappers from '../../google/protobuf/wrappers';
import * as PathenumPathEnum from '../pathenum/path_enum';
import * as ProtoOneofenumOneofEnum from '../oneofenum/oneof_enum';
import * as NiceGrpcWeb from 'nice-grpc-web';
import * as ProtoExamplepbABitOfEverything from './a_bit_of_everything';
export function newABitOfEverythingService(): NiceGrpcWeb.Client<ProtoExamplepbABitOfEverything.ABitOfEverythingServiceDefinition> {
// ABitOfEverything service is used to validate that APIs with complicated
// proto messages and URL templates are still processed correctly.

return {


	createBody(
		req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
		// return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
		throw new Error("Not implemented");
	},




	lookup(
		req: Partial<ProtoSub2Message.IdMessage>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
		// return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	custom(
		req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
		// return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/${req.uuid}:custom`, {...initReq, method: "POST"});
		throw new Error("Not implemented");
	},




	doubleColon(
		req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
		// return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/${req.uuid}:custom:custom`, {...initReq, method: "POST"});
		throw new Error("Not implemented");
	},




	update(
		req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v1/example/a_bit_of_everything/${req.uuid}`, {...initReq, method: "PUT", body: JSON.stringify(req, fm.replacer)});
		throw new Error("Not implemented");
	},




	updateV2(
		req: Partial<ProtoExamplepbABitOfEverything.UpdateV2Request>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/a_bit_of_everything/${req.abe.uuid}`, {...initReq, method: "PUT", body: JSON.stringify(req["abe"], fm.replacer)});
		throw new Error("Not implemented");
	},




	delete(
		req: Partial<ProtoSub2Message.IdMessage>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v1/example/a_bit_of_everything/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`, {...initReq, method: "DELETE"});
		throw new Error("Not implemented");
	},




	getQuery(
		req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v1/example/a_bit_of_everything/query/${req.uuid}?${fm.renderURLSearchParams(req, ["uuid"])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	getRepeatedQuery(
		req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated> {
		// return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverythingRepeated>(`/v1/example/a_bit_of_everything_repeated/${req.pathRepeatedFloatValue}/${req.pathRepeatedDoubleValue}/${req.pathRepeatedInt64Value}/${req.pathRepeatedUint64Value}/${req.pathRepeatedInt32Value}/${req.pathRepeatedFixed64Value}/${req.pathRepeatedFixed32Value}/${req.pathRepeatedBoolValue}/${req.pathRepeatedStringValue}/${req.pathRepeatedBytesValue}/${req.pathRepeatedUint32Value}/${req.pathRepeatedEnumValue}/${req.pathRepeatedSfixed32Value}/${req.pathRepeatedSfixed64Value}/${req.pathRepeatedSint32Value}/${req.pathRepeatedSint64Value}?${fm.renderURLSearchParams(req, ["pathRepeatedFloatValue", "pathRepeatedDoubleValue", "pathRepeatedInt64Value", "pathRepeatedUint64Value", "pathRepeatedInt32Value", "pathRepeatedFixed64Value", "pathRepeatedFixed32Value", "pathRepeatedBoolValue", "pathRepeatedStringValue", "pathRepeatedBytesValue", "pathRepeatedUint32Value", "pathRepeatedEnumValue", "pathRepeatedSfixed32Value", "pathRepeatedSfixed64Value", "pathRepeatedSint32Value", "pathRepeatedSint64Value"])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	deepPathEcho(
		req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
		// return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/deep_path/${req.singleNested.name}`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
		throw new Error("Not implemented");
	},




	noBindings(
		req: Partial<GoogleProtobufDuration.Duration>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/proto.examplepb.ABitOfEverythingService/NoBindings`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
		throw new Error("Not implemented");
	},




	timeout(
		req: Partial<GoogleProtobufEmpty.Empty>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/timeout?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	errorWithDetails(
		req: Partial<GoogleProtobufEmpty.Empty>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/errorwithdetails?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	getMessageWithBody(
		req: Partial<ProtoExamplepbABitOfEverything.MessageWithBody>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/withbody/${req.id}`, {...initReq, method: "POST", body: JSON.stringify(req["data"], fm.replacer)});
		throw new Error("Not implemented");
	},




	postWithEmptyBody(
		req: Partial<ProtoExamplepbABitOfEverything.Body>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/postwithemptybody/${req.name}`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
		throw new Error("Not implemented");
	},




	checkGetQueryParams(
		req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
		// return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/params/get/${req.singleNested.name}?${fm.renderURLSearchParams(req, ["singleNested.name"])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	checkNestedEnumGetQueryParams(
		req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
		// return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/params/get/nested_enum/${req.singleNested.ok}?${fm.renderURLSearchParams(req, ["singleNested.ok"])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	checkPostQueryParams(
		req: Partial<ProtoExamplepbABitOfEverything.ABitOfEverything>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<ProtoExamplepbABitOfEverything.ABitOfEverything> {
		// return fm.fetchRequest<ProtoExamplepbABitOfEverything.ABitOfEverything>(`/v1/example/a_bit_of_everything/params/post/${req.stringValue}`, {...initReq, method: "POST", body: JSON.stringify(req["single_nested"], fm.replacer)});
		throw new Error("Not implemented");
	},




	overwriteRequestContentType(
		req: Partial<ProtoExamplepbABitOfEverything.Body>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/example/overwriterequestcontenttype`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
		throw new Error("Not implemented");
	},




	overwriteResponseContentType(
		req: Partial<GoogleProtobufEmpty.Empty>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufWrappers.StringValue> {
		// return fm.fetchRequest<GoogleProtobufWrappers.StringValue>(`/v2/example/overwriteresponsecontenttype?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	checkExternalPathEnum(
		req: Partial<PathenumPathEnum.MessageWithPathEnum>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v2/${req.value}:check?${fm.renderURLSearchParams(req, ["value"])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	checkExternalNestedPathEnum(
		req: Partial<PathenumPathEnum.MessageWithNestedPathEnum>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v3/${req.value}:check?${fm.renderURLSearchParams(req, ["value"])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	checkStatus(
		req: Partial<GoogleProtobufEmpty.Empty>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<ProtoExamplepbABitOfEverything.CheckStatusResponse> {
		// return fm.fetchRequest<ProtoExamplepbABitOfEverything.CheckStatusResponse>(`/v1/example/checkStatus?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"});
		throw new Error("Not implemented");
	},




	postOneofEnum(
		req: Partial<ProtoOneofenumOneofEnum.OneofEnumMessage>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v1/example/oneofenum`, {...initReq, method: "POST", body: JSON.stringify(req["example_enum"], fm.replacer)});
		throw new Error("Not implemented");
	},




	postRequiredMessageType(
		req: Partial<ProtoExamplepbABitOfEverything.RequiredMessageTypeRequest>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/v1/example/requiredmessagetype`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
		throw new Error("Not implemented");
	},


};
}

export function newAnotherServiceWithNoBindings(): NiceGrpcWeb.Client<ProtoExamplepbABitOfEverything.AnotherServiceWithNoBindingsDefinition> {

return {


	noBindings(
		req: Partial<GoogleProtobufEmpty.Empty>, 
		options?: NiceGrpcWeb.CallOptions
	): Promise<GoogleProtobufEmpty.Empty> {
		// return fm.fetchRequest<GoogleProtobufEmpty.Empty>(`/proto.examplepb.AnotherServiceWithNoBindings/NoBindings`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)});
		throw new Error("Not implemented");
	},


};
}

