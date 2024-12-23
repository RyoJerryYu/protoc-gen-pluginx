package pluginutils

import (
	"bytes"
	"fmt"
	"io"
	"path/filepath"
	"sort"
	"strings"
	"text/template"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/protobufx"
	sprig "github.com/go-task/slim-sprig/v3"
	"github.com/golang/glog"
	"github.com/iancoleman/strcase"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

type TSRegistry struct {
	buf          bytes.Buffer
	GenOpts      GenerateOptions
	ImportIdents map[string][]TSIdent // map<module_path, TSIdent>
}

func NewTSRegistry(opts GenerateOptions) *TSRegistry {
	return &TSRegistry{
		GenOpts:      opts,
		ImportIdents: make(map[string][]TSIdent),
	}
}

func (g *TSRegistry) Apply(w io.Writer) error {
	if !strings.HasSuffix(g.GenOpts.GenFileSuffix, ".ts") {
		_, err := io.Copy(w, &g.buf)
		return err
	}
	content := g.buf.Bytes()
	imports := g.ImportSegments()
	res := fmt.Sprintf("%s\n\n%s", imports, content)
	_, err := w.Write([]byte(res))
	return err
}

type TSModule struct {
	ModuleName string
	Path       string // path relative to the generate root, or the absolute path
	Relative   bool   // whether the path is relative to the current file
}

func (m TSModule) Ident(name string) TSIdent {
	return TSIdent{
		TSModule: m,
		Name:     name,
	}
}

type TSIdent struct {
	TSModule
	Name string
}

func TSModule_TSProto(file protoreflect.FileDescriptor) TSModule {
	protoPath := file.Path()
	return TSModule{
		ModuleName: GetModuleName(file),
		Path:       strings.TrimSuffix(protoPath, ".proto") + ".ts",
		Relative:   true,
	}
}

func TSIdent_TSProto_Message(msg *protogen.Message) TSIdent {
	return TSModule_TSProto(msg.Desc.ParentFile()).Ident(msg.GoIdent.GoName)
}

func TSImportPath(thisPath string, modulePath string) string {
	thisDir := filepath.Dir(thisPath)
	relativePath, err := filepath.Rel(thisDir, modulePath)
	if err != nil {
		glog.Errorf("failed to get relative path from %s to %s: %v", thisDir, modulePath, err)
		return ""
	}
	if !strings.Contains(relativePath, "/") && !strings.HasPrefix(relativePath, ".") {
		relativePath = "./" + relativePath
	}
	return strings.TrimSuffix(relativePath, ".ts")
}

func (g *TSRegistry) ImportSegments() string {
	thisModule := TSModule_TSProto(g.GenOpts.FileGenerator.F.Desc)
	var imports []string
	modulePaths := make([]string, 0, len(g.ImportIdents))
	for path := range g.ImportIdents {
		modulePaths = append(modulePaths, path)
	}
	// sort by module import path
	sort.Slice(modulePaths, func(i, j int) bool {
		return modulePaths[i] < modulePaths[j]
	})

	for _, modulePath := range modulePaths {
		idents := g.ImportIdents[modulePath]
		module := idents[0].TSModule
		importPath := module.Path
		if module.Relative {
			importPath = TSImportPath(thisModule.Path, module.Path)
		}
		glog.V(3).Infof("ImportSegments: thisPath: %s, modulePath: %s, importPath: %s", thisModule.Path, module.Path, importPath)
		imports = append(imports, g.importSegmentDirect(importPath, idents))
	}
	return strings.Join(imports, "\n")
}

func (g *TSRegistry) importSegmentDirect(importPath string, idents []TSIdent) string {
	identNames := make([]string, 0, len(idents))
	for _, ident := range idents {
		identNames = append(identNames, ident.Name)
	}
	nameSet := make(map[string]struct{})
	for _, name := range identNames {
		nameSet[name] = struct{}{}
	}
	identNames = make([]string, 0, len(nameSet))
	for name := range nameSet {
		identNames = append(identNames, name)
	}
	sort.Slice(identNames, func(i, j int) bool {
		return identNames[i] < identNames[j]
	})
	return fmt.Sprintf(`import { %s } from "%s";`,
		strings.Join(identNames, ", "), importPath)
}

func (g *TSRegistry) Write(p []byte) (n int, err error) {
	return g.buf.Write(p)
}

func (g *TSRegistry) P(v ...any) {
	for _, x := range v {
		switch x := x.(type) {
		case TSIdent:
			fmt.Fprint(&g.buf, g.QualifiedTSIdent(x))
		case protogen.Comments:
			comments := x.String()
			comments = strings.TrimSuffix(comments, "\n")
			fmt.Fprint(&g.buf, comments)
		default:
			fmt.Fprint(&g.buf, x)
		}
	}
	fmt.Fprintln(&g.buf)
}

// Pf is same as P, but with formatted string.
func (opt *TSRegistry) Pf(format string, v ...any) {
	newV := make([]any, len(v))
	for i, x := range v {
		switch x := x.(type) {
		case TSIdent:
			newV[i] = opt.QualifiedTSIdent(x)
		default:
			newV[i] = x
		}
	}
	opt.P(fmt.Sprintf(format, newV...))
}

// PComment allows multiple lines string as comment.
func (opt *TSRegistry) PComment(comments ...string) {
	comment := strings.Join(comments, " ")
	io.Copy(opt, bytes.NewBufferString(protogen.Comments(comment).String()))
}

// PCommentf allows formatted string as comment.
func (opt *TSRegistry) PCommentf(format string, args ...interface{}) {
	io.Copy(opt, bytes.NewBufferString(protogen.Comments(fmt.Sprintf(format, args...)).String()))
}

func (opt *TSRegistry) PTmpl(tmpl *template.Template, data interface{}, funcs ...template.FuncMap) {
	t := tmpl
	t.Funcs(sprig.TxtFuncMap())
	for _, fMap := range funcs {
		t.Funcs(fMap)
	}
	t.Execute(opt, data)
}

func (opt *TSRegistry) PTmplStr(tmpl string, data interface{}, funcs ...template.FuncMap) {

	t := template.New("tmpl")
	for _, fMap := range funcs {
		t.Funcs(fMap)
	}

	t = template.Must(t.Parse(tmpl))
	opt.PTmpl(t, data, funcs...)
}

func (r *TSRegistry) QualifiedTSIdent(ident TSIdent) string {
	// glog.V(3).Infof("QualifiedTSIdent: %s", m.GoIdent.GoName)
	if _, ok := r.ImportIdents[ident.Path]; !ok {
		r.ImportIdents[ident.Path] = []TSIdent{}
	}
	r.ImportIdents[ident.Path] = append(r.ImportIdents[ident.Path], ident)
	return ident.Name
}

// ServiceTemplate gets the template for the primary typescript file.
func (r *TSRegistry) ServiceFmap() template.FuncMap {
	fMap := template.FuncMap{
		"tsType":       r.TsType,
		"functionCase": FunctionCase_TSProto,
		// "tsTypeKey":    tsTypeKey(r),
		// "tsTypeDef":    tsTypeDef(r),
		// "fieldName":    fieldName(r),
	}
	return fMap
}

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

// TSProto Function Case
func FunctionCase_TSProto(s string) string {
	if len(s) == 0 {
		return s
	}

	// Find the position of the first non-uppercase letter after the initial uppercase sequence
	firstLowerPos := -1
	for i := range len(s) {
		if isASCIILower(s[i]) {
			firstLowerPos = i
			break
		}
	}

	switch firstLowerPos {
	case -1:
		// If no lowercase letter is found, return the string in lowercase
		return strings.ToLower(s)

	case 0:
		// If the first letter is lowercase, return the string as is.
		return s

	default:
		// default, we want to lowercase the first letter.
		return strings.ToLower(s[:1]) + s[1:]
	}
}

// Takes a service name or method name in the form SomeMethod or HTTPMethod and
// return someMethod or httpMethod.
func functionCase(s string) string {
	if len(s) == 0 {
		return s
	}

	// Find the position of the first non-uppercase letter after the initial uppercase sequence
	firstLowerPos := -1
	for i := range len(s) {
		if isASCIILower(s[i]) {
			firstLowerPos = i
			break
		}
	}

	switch firstLowerPos {
	case -1:
		// If no lowercase letter is found, return the string in lowercase
		return strings.ToLower(s)

	case 0:
		// If the first letter is lowercase, return the string as is.
		return s

	case 1:
		// If only the first letter is upper, we want to lowercase it.
		return strings.ToLower(s[:1]) + s[1:]

	default:
		// If multiple letters are upper case, we want all but the last one.
		return strings.ToLower(s[:firstLowerPos-1]) + s[firstLowerPos-1:]
	}
}

////////////////
// Template
////////////////

func FieldName(opt *TSOption) func(name string) string {
	return func(name string) string {
		if opt.UseProtoNames {
			return name
		}

		fields := strings.Split(name, ".")
		for i, field := range fields {
			fields[i] = JSONCamelCase(field)
		}
		return strings.Join(fields, ".")
	}
}

// location: the location of the field or method that references the type
func (r *TSRegistry) TsType(def *protogen.Message, location protogen.Location) string {
	glog.V(3).Infof("tsType: %s", def.GoIdent.GoName)
	// Map entry type
	if def.Desc.IsMapEntry() {
		glog.V(3).Infof("tsType is map entry %s", def.GoIdent.GoName)
		keyType := r.TsType(def.Fields[0].Message, location)   //TODO: enums?
		valueType := r.TsType(def.Fields[1].Message, location) //TODO: enums?

		return fmt.Sprintf("Record<%s, %s>", keyType, valueType)
	}
	var typeStr string
	switch {
	case protobufx.IsWellKnownType(def.Desc): // Well known type
		typeStr = mapWellKnownType(def.Desc)
	case !strings.Contains(string(def.Desc.FullName()), "."): // Scalar type
		typeStr = mapScalaType(string(def.Desc.FullName()))
	// case def.Location.SourceFile == location.SourceFile: // Local type
	// 	typeStr = typeInfo.PackageIdentifier
	default: // External type
		glog.V(3).Infof("parent file: package: %s, name: %s, fullname: %s, path: %s",
			def.Desc.ParentFile().Package(),
			def.Desc.ParentFile().Name(),
			def.Desc.ParentFile().FullName(),
			def.Desc.ParentFile().Path(),
		)
		module := TSModule_TSProto(def.Desc.ParentFile())
		typeStr = r.QualifiedTSIdent(module.Ident(def.GoIdent.GoName))
	}

	// if .IsRepeated {
	// 	typeStr += "[]"
	// }
	return typeStr
}

func mapWellKnownType(desc protoreflect.MessageDescriptor) string {
	switch desc.FullName() {
	case protobufx.BoolValue_message_fullname:
		return "boolean | null"
	case protobufx.StringValue_message_fullname:
		return "string | null"
	case protobufx.DoubleValue_message_fullname,
		protobufx.FloatValue_message_fullname,
		protobufx.Int32Value_message_fullname,
		protobufx.Int64Value_message_fullname,
		protobufx.UInt32Value_message_fullname,
		protobufx.UInt64Value_message_fullname:
		return "number | null"
	case protobufx.ListValue_message_fullname:
		return "StructPBValue[]"
	case protobufx.Struct_message_fullname:
		return "{ [key: string]: StructPBValue }"
	case protobufx.Empty_message_fullname:
		return "{}"
	}
	return "unknown"
}

func mapScalaType(protoType string) string {
	switch protoType {
	case "uint64", "sint64", "int64", "fixed64", "sfixed64", "string":
		return "string"
	case "float", "double", "int32", "sint32", "uint32", "fixed32", "sfixed32":
		return "number"
	case "bool":
		return "boolean"
	case "bytes":
		return "Uint8Array"
	}
	return ""
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

type TSOption struct {
	// TSImportRootParamsKey contains the key for common_import_root in parameters
	TSImportRoots string
	// TSImportRootAliasParamsKey contains the key for common_import_root_alias in parameters
	TSImportRootAliases string
	// UseProtoNames will generate field names the same as defined in the proto
	UseProtoNames bool
	// EmitUnpopulated mirrors the grpc gateway protojson configuration of the same name and allows
	// clients to differentiate between zero values and optional values that aren't set.
	EmitUnpopulated bool
	// EnableStylingCheck enables both eslint and tsc check for the generated code
	EnableStylingCheck bool
}
