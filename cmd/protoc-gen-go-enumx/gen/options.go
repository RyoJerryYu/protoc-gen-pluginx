package gen

import (
	"github.com/RyoJerryYu/protoc-gen-pluginx/pkg/pluginutils"
	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

const constraints = protogen.GoImportPath("golang.org/x/exp/constraints")

type Options struct {
}

type Generator struct {
	Options
	pluginutils.GenerateOptions
}

func (g *Generator) ApplyTemplate() error {
	enums := append(g.F.Enums, g.findEnumInMessage(g.F.Messages)...)
	if len(enums) == 0 {
		glog.V(1).Infof("Skipping %s, no enums", g.F.Desc.Path())
		g.W.Skip()
		return nil
	}

	for _, e := range enums {
		glog.V(2).Infof("Processing %s", e.GoIdent.GoName)

		g.applyEnum(e)
		g.P()
	}

	return nil
}

func (g *Generator) findEnumInMessage(ms []*protogen.Message) []*protogen.Enum {
	var enums []*protogen.Enum
	for _, m := range ms {
		enums = append(enums, m.Enums...)
		enums = append(enums, g.findEnumInMessage(m.Messages)...)
	}

	return enums
}

func (g *Generator) applyEnum(e *protogen.Enum) {
	g.applyToInt(e)
	g.applyFromInt(e)
	g.applyFromString(e)
	g.applyAlls(e)
}

func (g *Generator) applyToInt(e *protogen.Enum) {
	var interMethods = []struct {
		typ  string
		name string
	}{
		{"int", "Int"},
		{"int64", "Int64"},
		{"int32", "Int32"},
		{"uint", "UInt"},
		{"uint64", "UInt64"},
		{"uint32", "UInt32"},
	}
	for _, m := range interMethods {
		g.Pf(`func (x %s) %s() %s {return %s(x)}`,
			e.GoIdent.GoName, m.name, m.typ, m.typ)
	}
}
func (g *Generator) applyFromInt(e *protogen.Enum) {
	g.Pf(`// %sFrom returns the %s for the given integers, or the zero value if not found.
func %sFrom[T %s | %s](s T) %s {
	return %s(s)
}`,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		g.W.QualifiedGoIdent(constraints.Ident("Integer")),
		g.W.QualifiedGoIdent(constraints.Ident("Float")),
		e.GoIdent.GoName,
		e.GoIdent.GoName,
	)

	g.Pf(`// %sFromValid is like %sFrom, but returns an extra boolean value to check if the conversion is valid.
func %sFromValid[T %s | %s](s T) (%s, bool) {
	_, valid := %s_name[int32(s)]
	return %s(s), valid
}`,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		g.W.QualifiedGoIdent(constraints.Ident("Integer")),
		g.W.QualifiedGoIdent(constraints.Ident("Float")),
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
	)
}

func (g *Generator) applyFromString(e *protogen.Enum) {
	g.Pf(`// %sFromStr returns the %s for the given string, or the zero value if not found.
func %sFromStr(s string) %s {
	return %s(%s_value[s])
}`,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
	)

	g.Pf(`// %sFromValidStr is like %sFromStr, but returns an extra boolean value to check if the conversion is valid.
func %sFromValidStr(s string) (%s, bool) {
	v, valid := %s_value[s]
	return %s(v), valid
}`,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
	)
}

// applyAlls applies the `all` functions to the enum.
func (g *Generator) applyAlls(e *protogen.Enum) {
	g.Pf(`var _%s_all = []%s{`, e.GoIdent.GoName, e.GoIdent.GoName)
	for _, v := range e.Values {
		g.Pf("%s,", v.GoIdent.GoName)
	}
	g.Pf("}")

	g.Pf(`var _%s_allName = []string{`, e.GoIdent.GoName)
	for _, v := range e.Values {
		g.Pf("%q,", v.GoIdent.GoName)
	}
	g.Pf("}")

	g.Pf("var _%s_allValue = []int32{", e.GoIdent.GoName)
	for _, v := range e.Values {
		g.Pf("%d,", v.Desc.Number())
	}
	g.Pf("}")

	g.Pf(`// %sAll returns all the values of the %s enum.
func %sAll() []%s {
	return _%s_all[:]
}`,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
	)

	g.Pf(`// %sAllName returns all the names of the %s enum.
func %sAllName() []string {
	return _%s_allName[:]
}`,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
	)

	g.Pf(`// %sAllValue returns all the values of the %s enum.
func %sAllValue() []int32 {
	return _%s_allValue[:]
}`,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
		e.GoIdent.GoName,
	)
}
