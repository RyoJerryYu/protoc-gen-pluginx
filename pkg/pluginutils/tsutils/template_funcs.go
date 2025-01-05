package tsutils

import (
	"strings"
)

//////
// String
//////

// JSONCamelCase converts a snake_case identifier to a camelCase identifier,
// according to the protobuf JSON specification.
//
// Copied from: google.golang.org/protobuf/internal/strs.
func JSONCamelCase(s string) string {
	var b []byte
	var wasUnderscore bool
	for i := range len(s) { // proto identifiers are always ASCII
		c := s[i]
		if c != '_' {
			if wasUnderscore && isASCIILower(c) {
				c -= 'a' - 'A' // convert to uppercase
			}
			b = append(b, c)
		}
		wasUnderscore = c == '_'
	}
	return string(b)
}

func isASCIILower(c byte) bool {
	return 'a' <= c && c <= 'z'
}

////////////////
// Template
////////////////

func JsonFieldName(opt *TSOption) func(name string) string {
	return func(name string) string {
		if opt.MarshalUseProtoNames {
			return name
		}

		fields := strings.Split(name, ".")
		for i, field := range fields {
			fields[i] = JSONCamelCase(field)
		}
		return strings.Join(fields, ".")
	}
}
