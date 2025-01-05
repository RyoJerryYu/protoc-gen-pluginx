package pluginutils

import (
	"sort"
	"strings"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/descriptorx"
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/protobufx"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

// As an agreement, the field name is the proto field name, a.k.a text name.

type ListPathEndWith func(field protoreflect.FieldDescriptor) bool

func EndWithDefault(field protoreflect.FieldDescriptor) bool {
	return false
}

func EndWithJsonScalar(field protoreflect.FieldDescriptor) bool {
	if field.IsMap() ||
		field.IsList() ||
		(field.Kind() != protoreflect.MessageKind &&
			field.Kind() != protoreflect.GroupKind) {
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

func GetField(msg *protogen.Message, path string) *protogen.Field {
	res := getField(descriptorx.WrapProtogenMessage(msg), path)
	if res == nil {
		return nil
	}
	return res.(descriptorx.FieldDescriptorProtogenAdaptor).In
}

func GetFieldProtoreflect(md protoreflect.MessageDescriptor, path string) protoreflect.FieldDescriptor {
	res := getField(descriptorx.WrapReflectMessage(md), path)
	if res == nil {
		return nil
	}
	return res.(descriptorx.FieldDescriptorProtoreflectAdaptor).In
}

func getField(md descriptorx.MessageDescriptor, path string) descriptorx.FieldDescriptor {
	if path == "" {
		return nil
	}
	var field descriptorx.FieldDescriptor
	valid := RangeFieldPath(path, func(f, _ string) bool {
		if md == nil {
			return false
		}

		field = md.Fields().ByName(protoreflect.Name(f))
		if field == nil {
			return false
		}

		// Identify the next message to search within.
		md = field.Message() // may be nil

		// Repeated fields are only allowed at the last position.
		if field.IsList() || field.IsMap() {
			md = nil
		}
		return true
	})
	if !valid {
		return nil
	}
	return field
}

// RangeFieldPath is like strings.Split(path, "."), but avoids allocations by
// iterating over each field in place and calling a iterator function.
func RangeFieldPath(path string, f func(field string, restPath string) bool) bool {
	for {
		var field string
		if i := strings.IndexByte(path, '.'); i >= 0 {
			field, path = path[:i], path[i:]
		} else {
			field, path = path, ""
		}

		if !f(field, path) {
			return false
		}

		if len(path) == 0 {
			return true
		}
		path = strings.TrimPrefix(path, ".")
	}
}

func RangeField(msg descriptorx.MessageDescriptor, path string, fn func(field descriptorx.FieldDescriptor, restPath string) bool) bool {
	if path == "" {
		return false
	}
	var fd descriptorx.FieldDescriptor
	md := msg
	valid := RangeFieldPath(path, func(f, rest string) bool {
		if md == nil {
			return false
		}

		fd = md.Fields().ByName(protoreflect.Name(f))
		if fd == nil {
			return false
		}

		// Identify the next message to search within.
		md = fd.Message() // may be nil

		// Repeated fields are only allowed at the last position.
		if fd.IsList() || fd.IsMap() {
			md = nil
		}

		return fn(fd, rest)
	})
	return valid
}

func JsonFieldPath(rootMsg *protogen.Message) func(path string) string {
	return func(path string) string {
		syntax := strings.Builder{}
		rootMsgDesc := descriptorx.WrapReflectMessage(rootMsg.Desc)
		valid := RangeField(rootMsgDesc, path, func(fd descriptorx.FieldDescriptor, _ string) bool {
			if syntax.Len() > 0 {
				syntax.WriteByte('.')
			}
			syntax.WriteString(fd.JSONName())
			return true
		})
		if !valid {
			glog.V(1).Infof("field invalid: %s", path)
		}
		return syntax.String()
	}
}
