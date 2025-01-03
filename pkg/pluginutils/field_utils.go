package pluginutils

import (
	"sort"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/protobufx"
	"google.golang.org/protobuf/reflect/protoreflect"
)

// As an agreement, the field name is the proto field name, a.k.a text name.

type ListPathEndWith func(field protoreflect.FieldDescriptor) bool

func EndWithDefault(field protoreflect.FieldDescriptor) bool {
	return false
}

func EndWithJsonScalar(field protoreflect.FieldDescriptor) bool {
	if field.Kind() != protoreflect.MessageKind &&
		field.Kind() != protoreflect.GroupKind {
		// scalar field, including enum, list, map
		return true
	}

	if protobufx.IsWellKnownType(field.Message()) {
		// end with all well known types
		return true
	}

	return false
}

const ListPathDepthMax = 10

func listPaths(depth uint16, prefix string, msg protoreflect.MessageDescriptor, endWith ListPathEndWith) []string {
	if depth > ListPathDepthMax {
		return []string{}
	}
	var paths []string
	joinPath := func(fieldName string) string {
		if prefix == "" {
			return fieldName
		}
		return prefix + "." + fieldName
	}

	for i := 0; i < msg.Fields().Len(); i++ {
		field := msg.Fields().Get(i)
		if endWith(field) {
			// end with specific logic
			paths = append(paths, joinPath(field.TextName()))
			continue
		}
		if field.IsList() || field.IsMap() {
			// list all end with repeated field or map field
			paths = append(paths, joinPath(field.TextName()))
			continue
		}
		if field.Kind() != protoreflect.MessageKind {
			// all end with scalar field
			paths = append(paths, joinPath(field.TextName()))
			continue
		}

		subPaths := listPaths(depth+1, joinPath(field.TextName()), field.Message(), endWith)
		paths = append(paths, subPaths...)
	}
	return paths
}

func ListPaths(prefix string, msg protoreflect.MessageDescriptor, endWith ListPathEndWith) []string {
	return listPaths(0, prefix, msg, endWith)
}

func ListAllPaths(msg protoreflect.MessageDescriptor) []string {
	return listPaths(0, "", msg, EndWithDefault)
}

// Union returns the union of all the paths in the input field masks.
func Union(mx []string, my []string, ms ...[]string) []string {
	var out []string
	out = append(out, mx...)
	out = append(out, my...)
	for _, m := range ms {
		out = append(out, m...)
	}
	return normalizePaths(out)
}

// Intersect returns the intersection of all the paths in the input field masks.
func Intersect(mx []string, my []string, ms ...[]string) []string {
	var ss1, ss2 []string // reused buffers for performance
	intersect := func(out, in []string) []string {
		ss1 = normalizePaths(append(ss1[:0], in...))
		ss2 = normalizePaths(append(ss2[:0], out...))
		out = out[:0]
		for i1, i2 := 0, 0; i1 < len(ss1) && i2 < len(ss2); {
			switch s1, s2 := ss1[i1], ss2[i2]; {
			case hasPathPrefix(s1, s2):
				out = append(out, s1)
				i1++
			case hasPathPrefix(s2, s1):
				out = append(out, s2)
				i2++
			case lessPath(s1, s2):
				i1++
			case lessPath(s2, s1):
				i2++
			}
		}
		return out
	}

	out := Union(mx, my, ms...)
	out = intersect(out, mx)
	out = intersect(out, my)
	for _, m := range ms {
		out = intersect(out, m)
	}
	return normalizePaths(out)
}

func Substract(mx []string, my []string, ms ...[]string) []string {
	var ss1, ss2 []string // reused buffers for performance
	substract := func(out, in []string) []string {
		ss1 = normalizePaths(append(ss1[:0], out...))
		ss2 = normalizePaths(append(ss2[:0], in...))
		out = out[:0]
		i1, i2 := 0, 0
		for i1 < len(ss1) && i2 < len(ss2) {
			switch s1, s2 := ss1[i1], ss2[i2]; {
			case hasPathPrefix(s1, s2):
				i1++
			case hasPathPrefix(s2, s1):
				i1++
			case lessPath(s1, s2):
				out = append(out, s1)
				i1++
			case lessPath(s2, s1):
				i2++
			}
		}
		out = append(out, ss1[i1:]...)
		return out
	}

	out := append([]string{}, mx...)
	out = substract(out, my)
	for _, m := range ms {
		out = substract(out, m)
	}
	return normalizePaths(out)
}

func normalizePaths(paths []string) []string {
	sort.Slice(paths, func(i, j int) bool {
		return lessPath(paths[i], paths[j])
	})

	// Elide any path that is a prefix match on the previous.
	out := paths[:0]
	for _, path := range paths {
		if len(out) > 0 && hasPathPrefix(path, out[len(out)-1]) {
			continue
		}
		out = append(out, path)
	}
	return out
}

// hasPathPrefix is like strings.HasPrefix, but further checks for either
// an exact matche or that the prefix is delimited by a dot.
func hasPathPrefix(path, prefix string) bool {
	return strings.HasPrefix(path, prefix) && (len(path) == len(prefix) || path[len(prefix)] == '.')
}

// lessPath is a lexicographical comparison where dot is specially treated
// as the smallest symbol.
func lessPath(x, y string) bool {
	for i := 0; i < len(x) && i < len(y); i++ {
		if x[i] != y[i] {
			return (x[i] - '.') < (y[i] - '.')
		}
	}
	return len(x) < len(y)
}
