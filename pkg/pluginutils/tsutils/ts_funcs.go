package tsutils

import (
	"bytes"
	"fmt"
	"io"
	"path/filepath"
	"strings"
	"text/template"

	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	sprig "github.com/go-task/slim-sprig/v3"
	"github.com/iancoleman/strcase"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/reflect/protoreflect"
)

type TSRegistry struct {
	buf          bytes.Buffer
	GenOpts      pluginutils.GenerateOptions
	ImportIdents map[string][]TSIdent // map<module_path, TSIdent>
}

func NewTSRegistry(opts pluginutils.GenerateOptions) *TSRegistry {
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
	// // TSImportRootParamsKey contains the key for common_import_root in parameters
	// TSImportRoots string
	// // TSImportRootAliasParamsKey contains the key for common_import_root_alias in parameters
	// TSImportRootAliases string

	// use ts-proto or protobuf-es to generate typescript code
	TypeDefinition string
	// if TSProto `snakeToCamel` flags contains `key`
	TSProto_KeySnakeToCamel bool
	// if server marshal options has MarshalUseProtoNames set to true
	MarshalUseProtoNames bool
}
