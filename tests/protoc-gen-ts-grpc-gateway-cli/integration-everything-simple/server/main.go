package main

import (
	"context"
	_ "embed"
	"flag"
	"fmt"
	"net"
	"net/http"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/tests/protoc-gen-ts-grpc-gateway-cli/integration-everything-simple/server/proto/examplepb"
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

const endpoint = "localhost:9000"

func main() {
	useProtoNames := flag.Bool("use_proto_names", false, "tell server to use the original proto name in jsonpb")
	emitUnpopulated := flag.Bool("emit_unpopulated", false, "tell server to emit zero values")

	flag.Parse()
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	grpcListener, err := net.Listen("tcp4", endpoint)
	if err != nil {
		panic(err)
	}

	fmt.Printf("Starting server with use_proto_names=%v and emit_unpopulated=%v\n", *useProtoNames, *emitUnpopulated)

	grpcServer := grpc.NewServer()
	examplepb.RegisterABitOfEverythingServiceServer(grpcServer, &ABitOfEverythingService{})

	gateway := runtime.NewServeMux(runtime.WithMarshalerOption(runtime.MIMEWildcard, &runtime.HTTPBodyMarshaler{
		Marshaler: &runtime.JSONPb{
			MarshalOptions: protojson.MarshalOptions{
				UseProtoNames:   *useProtoNames,
				EmitUnpopulated: *emitUnpopulated,
			},
		},
	}))

	err = examplepb.RegisterABitOfEverythingServiceHandlerFromEndpoint(ctx, gateway, endpoint, []grpc.DialOption{
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
	mux.Handle("/*", gateway)

	if err = http.ListenAndServe("localhost:8081", mux); err != nil {
		panic(err)
	}
}

//go:embed proto/apidocs.swagger.json
var swaggerDef string
