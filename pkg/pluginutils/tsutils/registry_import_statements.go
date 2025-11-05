package tsutils

import (
	"fmt"
	"path/filepath"
	"regexp"
	"slices"
	"strings"

	"github.com/RyoJerryYu/go-utilx/pkg/container/slicex"
	"github.com/golang/glog"
)

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
	Name    string
	Default bool
}

func tsRelativeImportPath(thisPath string, modulePath string) string {
	thisDir := filepath.Dir(thisPath)
	relativePath, err := filepath.Rel(thisDir, modulePath)
	if err != nil {
		glog.Errorf("failed to get relative path from %s to %s: %v", thisDir, modulePath, err)
		return ""
	}
	if !strings.Contains(relativePath, "/") && !strings.HasPrefix(relativePath, ".") {
		relativePath = "./" + relativePath
	}
	return relativePath
}

func (g *TSRegistry) thisModulePath() string {
	if g.ThisModulePath != "" {
		return g.ThisModulePath
	}
	// default to treat as in the generated proto definition directory
	protoPath := g.GenOpts.FileGenerator.F.Desc.Path()
	return strings.TrimSuffix(protoPath, ".proto") + ".ts"
}

func (g *TSRegistry) ImportSegments() string {
	thisModulePath := g.thisModulePath()
	var imports []string
	modulePaths := make([]string, 0, len(g.ImportIdents))
	for path := range g.ImportIdents {
		modulePaths = append(modulePaths, path)
	}
	// sort by module import path
	slices.SortFunc(modulePaths, strings.Compare)

	for _, modulePath := range modulePaths {
		if modulePath == thisModulePath {
			continue
		}
		idents := g.ImportIdents[modulePath]
		module := idents[0].TSModule
		importPath := module.Path
		if module.Relative {
			importPath = tsRelativeImportPath(thisModulePath, module.Path)
		}
		glog.V(3).Infof("ImportSegments: thisPath: %s, modulePath: %s, importPath: %s", thisModulePath, module.Path, importPath)
		imports = append(imports, g.importSegmentDirect(importPath, idents))
	}
	return strings.Join(imports, "\n")
}

var fileSuffixRegex = regexp.MustCompile(`\.(ts|tsx|js|jsx|mjs)$`)

func (g *TSRegistry) importSegmentDirect(importPath string, idents []TSIdent) string {
	defaultImport := ""
	for i, ident := range idents {
		if ident.Default {
			defaultImport = ident.Name
			idents = append(idents[:i], idents[i+1:]...)
			break
		}
	}
	identNames := make([]string, 0, len(idents))
	for _, ident := range idents {
		identNames = append(identNames, ident.Name)
	}
	identNames = slicex.Deduplicate(identNames)
	slices.SortFunc(identNames, strings.Compare)
	importPath = fileSuffixRegex.ReplaceAllString(importPath, "")
	defaultImportStmt := ""
	if defaultImport != "" {
		defaultImportStmt = fmt.Sprintf(`%s, `, defaultImport)
	}
	return fmt.Sprintf(`import %s { %s } from "%s";`,
		defaultImportStmt, strings.Join(identNames, ", "), importPath)
}
