package main

import (
	"context"
	_ "embed"
	"flag"
	"fmt"
	"net"
	"net/http"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/gatewayx"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/servergojson/proto/bodyjson"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/servergojson/proto/examplepb"
	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/servergojson/proto/querystring"
	"github.com/go-chi/chi/v5"
	"github.com/grpc-ecosystem/grpc-gateway/v2/runtime"
	httpSwagger "github.com/swaggo/http-swagger"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"google.golang.org/protobuf/encoding/protojson"
)

// allowCORS allows Cross Origin Resoruce Sharing from any origin.
// Don't do this without consideration in production systems.
func allowCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			if r.Method == "OPTIONS" && r.Header.Get("Access-Control-Request-Method") != "" {
				headers := []string{"Content-Type", "Accept", "Authorization"}
				w.Header().Set("Access-Control-Allow-Headers", strings.Join(headers, ","))
				methods := []string{"GET", "HEAD", "POST", "PUT", "PATCH", "DELETE"}
				w.Header().Set("Access-Control-Allow-Methods", strings.Join(methods, ","))
				return
			}
		}
		h.ServeHTTP(w, r)
	})
}

const grpcEndpoint = "localhost:9000"

var marshalOptions protojson.MarshalOptions
var unmarshalOptions protojson.UnmarshalOptions

func init() {
	flag.BoolVar(&marshalOptions.AllowPartial, "marshal_allow_partial", false, "tell server to allow partial json")
	flag.BoolVar(&marshalOptions.UseProtoNames, "marshal_use_proto_names", false, "tell server to use the original proto name in jsonpb")
	flag.BoolVar(&marshalOptions.UseEnumNumbers, "marshal_use_enum_numbers", false, "tell server to use enum numbers in jsonpb")
	flag.BoolVar(&marshalOptions.EmitUnpopulated, "marshal_emit_unpopulated", false, "tell server to emit zero values")
	flag.BoolVar(&marshalOptions.EmitDefaultValues, "marshal_emit_default_values", false, "tell server to emit default values")

	flag.BoolVar(&unmarshalOptions.AllowPartial, "unmarshal_allow_partial", false, "tell server to allow partial json")
	flag.BoolVar(&unmarshalOptions.DiscardUnknown, "unmarshal_discard_unknown", false, "tell server to discard unknown fields")
}

func main() {
	flag.Parse()
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	grpcListener, err := net.Listen("tcp4", grpcEndpoint)
	if err != nil {
		panic(err)
	}

	flags := []string{}
	flag.Visit(func(f *flag.Flag) {
		flags = append(flags, fmt.Sprintf("%s=%s", f.Name, f.Value))
	})
	fmt.Printf("Starting server with flags: %s\n", strings.Join(flags, ", "))

	grpcServer := grpc.NewServer()
	examplepb.RegisterABitOfEverythingServiceServer(grpcServer, &ABitOfEverythingService{})
	bodyjson.RegisterBodyJSONServiceServer(grpcServer, &BodyJSONService{})
	querystring.RegisterQueryStringServiceServer(grpcServer, &QueryStringService{})

	gateway := runtime.NewServeMux(runtime.WithMarshalerOption(runtime.MIMEWildcard, &runtime.HTTPBodyMarshaler{
		Marshaler: &gatewayx.GenGoJsonMarshaler{
			JSONPb: runtime.JSONPb{
				MarshalOptions:   marshalOptions,
				UnmarshalOptions: unmarshalOptions,
			},
		},
	}))

	err = examplepb.RegisterABitOfEverythingServiceHandlerFromEndpoint(ctx, gateway, grpcEndpoint, []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	})
	if err != nil {
		panic(err)
	}
	err = bodyjson.RegisterBodyJSONServiceHandlerFromEndpoint(ctx, gateway, grpcEndpoint, []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	})
	if err != nil {
		panic(err)
	}
	err = querystring.RegisterQueryStringServiceHandlerFromEndpoint(ctx, gateway, grpcEndpoint, []grpc.DialOption{
		grpc.WithTransportCredentials(insecure.NewCredentials()),
	})
	if err != nil {
		panic(err)
	}

	go func() {
		defer grpcServer.GracefulStop()
		<-ctx.Done()
	}()

	go func() {
		if err := grpcServer.Serve(grpcListener); err != nil {
			panic(err)
		}
	}()

	mux := chi.NewMux()
	mux.Use(allowCORS)
	mux.Get("/swagger.json", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(swaggerDef))
	})
	mux.Mount("/swagger", httpSwagger.Handler(httpSwagger.URL("/swagger.json")))
	mux.Handle("/api/*", http.StripPrefix("/api", gateway))

	fmt.Printf("Starting HTTP server on localhost:8081\n")
	if err = http.ListenAndServe("localhost:8081", mux); err != nil {
		panic(err)
	}
}

//go:embed proto/apidocs.swagger.json
var swaggerDef string
