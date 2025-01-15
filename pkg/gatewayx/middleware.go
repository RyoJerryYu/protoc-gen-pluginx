package gatewayx

import "net/http"

/**
Sometime Only use the gRPC-Gateway is not enough.
You may need to add some middleware to the gateway to handle some special cases.
*/

type pathMatcher func(string) bool

func PathEqual(path string) pathMatcher {
	return func(p string) bool {
		return p == path
	}
}

func PathPrefix(prefix string) pathMatcher {
	return func(p string) bool {
		return len(p) >= len(prefix) && p[:len(prefix)] == prefix
	}
}

// OverwriteAccept returns a middleware that overwrites the Accept header of the request
// It's useful when you cannot force the client to send the correct Accept header
func OverwriteAccept(accept string, matchers ...pathMatcher) func(handler http.Handler) http.Handler {
	return func(handler http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			for _, matcher := range matchers {
				if matcher(r.URL.Path) {
					r.Header.Set("Accept", accept)
					break
				}
			}
			handler.ServeHTTP(w, r)
		})
	}
}

// OverwriteContentType returns a middleware that overwrites the Content-Type header of the http request
// It's useful when you cannot force the client to send the correct Content-Type header
func OverwriteContentType(contentType string, matchers ...pathMatcher) func(handler http.Handler) http.Handler {
	return func(handler http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			for _, matcher := range matchers {
				if matcher(r.URL.Path) {
					r.Header.Set("Content-Type", contentType)
					break
				}
			}
			handler.ServeHTTP(w, r)
		})
	}
}
