package tsutils

import (
	"fmt"
	"path/filepath"
	"sort"
	"strings"

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
	Name string
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
	return strings.TrimSuffix(relativePath, ".ts")
}

func (g *TSRegistry) thisModulePath() string {
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
	sort.Slice(modulePaths, func(i, j int) bool {
		return modulePaths[i] < modulePaths[j]
	})

	for _, modulePath := range modulePaths {
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
