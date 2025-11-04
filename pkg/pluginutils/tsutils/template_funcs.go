package tsutils

import (
	"path/filepath"

	"github.com/iancoleman/strcase"
	"google.golang.org/protobuf/reflect/protoreflect"
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

//////
// File
//////

// GetModuleName returns module name = package name + base file name to be the
// unique identifier for source file in a ts file. Package name and base file
// name are converted to camel case, special characters like dot, dash and
// underscore are removed.
// packageName: memos.api.v1
// fileName: memos.proto
func GetModuleName(file protoreflect.FileDescriptor) string {
	packageName, fileName := string(file.Package()), string(file.Path())
	baseName := filepath.Base(fileName)
	ext := filepath.Ext(fileName)
	name := baseName[0 : len(baseName)-len(ext)]

	return strcase.ToCamel(packageName) + strcase.ToCamel(name)
}
