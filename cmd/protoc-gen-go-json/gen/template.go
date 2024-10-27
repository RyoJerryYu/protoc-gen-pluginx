package gen

import (
	"fmt"

	"github.com/RyoJerryYu/protoc-gen-plugins/pkg/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
	"google.golang.org/protobuf/encoding/protojson"
)

const (
	protojsonpkg = protogen.GoImportPath("google.golang.org/protobuf/encoding/protojson")
	strconvpkg   = protogen.GoImportPath("strconv")
	jsonpkg      = protogen.GoImportPath("encoding/json")
	bytespkg     = protogen.GoImportPath("bytes")
	fmtpkg       = protogen.GoImportPath("fmt")
)

// Options are the options to set for rendering the template.
type Options struct {
	MarshalOptions   protojson.MarshalOptions
	UnmarshalOptions protojson.UnmarshalOptions
}

type Generator struct {
	Options
	pluginutils.PluginOptions
}

// This function is called with a param which contains the entire definition of a method.
func (g *Generator) ApplyTemplate() error {
	g.applyEnums(g.F.Enums)
	g.applyMessages(g.F.Messages)
	return nil
}

func (g *Generator) applyMessages(msgs []*protogen.Message) {
	for _, m := range msgs {
		if m.Desc.IsMapEntry() {
			glog.V(2).Infof("Skipping %s, mapentry message", m.GoIdent.GoName)
			continue
		}

		glog.V(2).Infof("Processing %s", m.GoIdent.GoName)
		g.applyMessageMarshaler(m)
		g.applyMessageUnmarshaler(m)

		g.applyEnums(m.Enums)
		g.applyMessages(m.Messages)
	}
}

func (g *Generator) applyMessageMarshaler(m *protogen.Message) {
	g.Pf(`
// MarshalJSON implements json.Marshaler
func (msg *%s) MarshalJSON() ([]byte,error) {
	return %s{`,
		m.GoIdent.GoName,
		g.W.QualifiedGoIdent(protojsonpkg.Ident("MarshalOptions")),
	)

	fieldPairs := []struct {
		name  string
		value bool
	}{
		{"AllowPartial", g.MarshalOptions.AllowPartial},
		{"UseProtoNames", g.MarshalOptions.UseProtoNames},
		{"UseEnumNumbers", g.MarshalOptions.UseEnumNumbers},
		{"EmitUnpopulated", g.MarshalOptions.EmitUnpopulated},
		{"EmitDefaultValues", g.MarshalOptions.EmitDefaultValues},
	}
	for _, pair := range fieldPairs {
		if pair.value {
			g.P(pair.name, ": true,")
		}
	}

	g.P("}.Marshal(msg)")
	g.P("}")
}

func (g *Generator) applyMessageUnmarshaler(m *protogen.Message) {
	g.Pf(`
// UnmarshalJSON implements json.Unmarshaler
func (msg *%s) UnmarshalJSON(b []byte) error {
	return %s {`,
		m.GoIdent.GoName,
		g.W.QualifiedGoIdent(protojsonpkg.Ident("UnmarshalOptions")),
	)

	fieldPairs := []struct {
		name  string
		value bool
	}{
		{"AllowPartial", g.UnmarshalOptions.AllowPartial},
		{"DiscardUnknown", g.UnmarshalOptions.DiscardUnknown},
	}
	for _, pair := range fieldPairs {
		if pair.value {
			g.P(pair.name, ": true,")
		}
	}

	g.P("}.Unmarshal(b, msg)")
	g.P("}")
}

func (g *Generator) applyEnums(enums []*protogen.Enum) {
	for _, e := range enums {
		glog.V(2).Infof("Processing %s", e.GoIdent.GoName)
		g.applyEnumMarshaler(e)
		g.applyEnumUnmarshaler(e)
	}
}

func (g *Generator) applyEnumMarshaler(e *protogen.Enum) {
	returnStr := ""
	if g.MarshalOptions.UseEnumNumbers {
		formatInt := g.W.QualifiedGoIdent(strconvpkg.Ident("FormatInt"))
		returnStr = fmt.Sprintf("%s(int64(enum.Number()), 10)", formatInt)
	} else {
		returnStr = "enum.String()"
	}

	g.Pf(`
// MarshalJSON implements json.Marshaler
func (enum %s) MarshalJSON() ([]byte, error) {
	return json.Marshal(%s)
}
`,
		e.GoIdent.GoName,
		returnStr,
	)
}

func (g *Generator) applyEnumUnmarshaler(e *protogen.Enum) {
	g.Pf(`
// UnmarshalJSON implements json.Unmarshaler
func (enum *%s) UnmarshalJSON(b []byte) error {
	dec := %s(%s(b))
	v, err := dec.Token()
	if err != nil {
		return err
	}
	switch v := v.(type) {
	case json.Number:
		n, err := v.Int64()
		if err != nil {
			return err
		}
		*enum = %s(n)
	case float64:
		*enum = %s(v)
	case string:
		*enum = %s(%s_value[v])
	default:
		return %s("invalid enum value %%v", v)
	}
	return nil
}`,
		e.GoIdent.GoName,
		g.W.QualifiedGoIdent(jsonpkg.Ident("NewDecoder")),
		g.W.QualifiedGoIdent(bytespkg.Ident("NewReader")),
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		g.W.QualifiedGoIdent(fmtpkg.Ident("Errorf")),
	)
}
