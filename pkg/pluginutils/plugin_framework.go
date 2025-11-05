package pluginutils

import (
	"flag"
	"strings"

	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

type forEachFileRunner struct {
	info        PluginInfo
	beforeAllFn func(p *protogen.Plugin) error
	filterFn    func(protoFile *protogen.File) bool
	genFns      []func(genOpt GenerateOptions) error
}

type ForEachFileRunner interface {
	BeforeAll(fn func(p *protogen.Plugin) error) ForEachFileRunner
	Filter(fn func(protoFile *protogen.File) bool) ForEachFileRunner
	Generate(fn func(genOpt GenerateOptions) error) ForEachFileRunner
	Run()
}

// ForEachFileRunner helps to generate one file for each file that is being generated
func NewForEachFileRunner(info PluginInfo) ForEachFileRunner {
	return forEachFileRunner{info: info}
}

func (pr forEachFileRunner) BeforeAll(fn func(p *protogen.Plugin) error) ForEachFileRunner {
	pr.beforeAllFn = fn
	return pr
}

// if fn returns false, the file will be skipped
func (pr forEachFileRunner) Filter(fn func(protoFile *protogen.File) bool) ForEachFileRunner {
	pr.filterFn = fn
	return pr
}

type RunArgs struct {
	GoImportPath            protogen.GoImportPath
	GeneratedFilenamePrefix string
}

type RunArgsOption func(protoFile *protogen.File) *RunArgs

func (pr forEachFileRunner) Generate(fn func(genOpt GenerateOptions) error) ForEachFileRunner {
	pr.genFns = append(pr.genFns, fn)
	return pr
}

func (pr forEachFileRunner) Run() {
	protogen.Options{
		ParamFunc: flag.CommandLine.Set,
	}.Run(func(p *protogen.Plugin) error {
		if pr.beforeAllFn != nil {
			err := pr.beforeAllFn(p)
			if err != nil {
				return err
			}
		}

		if pr.info.SupportedFeatures != 0 {
			p.SupportedFeatures = pr.info.SupportedFeatures
		}

		// only process the files that are being generated
		for _, name := range p.Request.FileToGenerate {
			f := p.FilesByPath[name]
			if pr.filterFn != nil && !pr.filterFn(f) {
				glog.V(1).Infof("Skipping %s", f.Desc.Path())
				continue
			}

			glog.V(1).Infof("Processing %s", f.Desc.Path())
			glog.V(2).Infof("Generating %s\n", f.GeneratedFilenamePrefix)

			for _, genFn := range pr.genFns {

				runArgs := RunArgs{
					GoImportPath:            f.GoImportPath,
					GeneratedFilenamePrefix: f.GeneratedFilenamePrefix,
				}

				goImportPath := runArgs.GoImportPath
				if goImportPath == "" {
					goImportPath = f.GoImportPath
				}
				generatedFilenamePrefix := runArgs.GeneratedFilenamePrefix
				if generatedFilenamePrefix == "" {
					generatedFilenamePrefix = f.GeneratedFilenamePrefix
				}

				gf := p.NewGeneratedFile(generatedFilenamePrefix+pr.info.GenFileSuffix, goImportPath)

				plgOpt := GenerateOptions{
					PluginInfo: pr.info,
					FileGenerator: FileGenerator{
						W: gf,
						F: f,
					},
				}
				if strings.HasSuffix(pr.info.GenFileSuffix, ".go") {
					plgOpt.PHeader(p)
					plgOpt.PPackage()
				}

				err := genFn(plgOpt)
				if err != nil {
					gf.Skip()
					p.Error(err)
					continue
				}
			}

		}

		return nil
	})

}
