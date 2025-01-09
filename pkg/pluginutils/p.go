package pluginutils

import (
	"bytes"
	"fmt"
	"io"
	"strings"
	"text/template"

	sprig "github.com/go-task/slim-sprig/v3"

	"google.golang.org/protobuf/compiler/protogen"
)

// P is a shorthand for (*protogen.GeneratedFile).P()
func (opt FileGenerator) P(v ...any) {
	opt.W.P(v...)
}

// Pf is same as P, but with formatted string.
func (opt FileGenerator) Pf(format string, v ...any) {
	newV := make([]any, len(v))
	for i, x := range v {
		switch x := x.(type) {
		case protogen.GoIdent:
			newV[i] = opt.W.QualifiedGoIdent(x)
		default:
			newV[i] = x
		}
	}
	opt.P(fmt.Sprintf(format, newV...))
}

// PComment allows multiple lines string as comment.
func (opt FileGenerator) PComment(comments ...string) {
	comment := strings.Join(comments, " ")
	io.Copy(opt.W, bytes.NewBufferString(protogen.Comments(comment).String()))
}

// PCommentf allows formatted string as comment.
func (opt FileGenerator) PCommentf(format string, args ...interface{}) {
	io.Copy(opt.W, bytes.NewBufferString(protogen.Comments(fmt.Sprintf(format, args...)).String()))
}

func (opt FileGenerator) PTmpl(tmpl *template.Template, data interface{}, funcs ...template.FuncMap) {
	t := tmpl
	t.Funcs(sprig.TxtFuncMap())
	for _, fMap := range funcs {
		t.Funcs(fMap)
	}
	t.Execute(opt.W, data)
}

func (opt FileGenerator) PTmplStr(tmpl string, data interface{}, funcs ...template.FuncMap) {

	t := template.New("tmpl")
	for _, fMap := range funcs {
		t.Funcs(fMap)
	}

	t = template.Must(t.Parse(tmpl))
	opt.PTmpl(t, data, funcs...)
}
