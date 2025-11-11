package pluginutils

import (
	"flag"
	"path"
	"strings"

	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

type RunArgs struct {
	GoImportPath            protogen.GoImportPath
	GeneratedFilenamePrefix string
	GoPackageName           protogen.GoPackageName
	GenFileSuffix           string // this GenFileSuffix will override the PluginInfo.GenFileSuffix
}

type RunArgsOption func(protoFile *protogen.File, out *RunArgs)

type genFnWithArgs struct {
	genFn      func(genOpt GenerateOptions) error
	argsOption RunArgsOption
}

type ReduceArgsOption func() *RunArgs

type reduceFnWithArgs struct {
	reduceFn   func(reduceOpt ReduceOptions, genFiles []*protogen.File) error
	argsOption ReduceArgsOption
}

type forEachFileRunner struct {
	info        PluginInfo
	beforeAllFn func(p *protogen.Plugin) error
	filterFn    func(protoFile *protogen.File) bool
	genFns      []genFnWithArgs
	reduceFns   []reduceFnWithArgs
}

type ForEachFileRunner interface {
	BeforeAll(fn func(p *protogen.Plugin) error) ForEachFileRunner
	Filter(fn func(protoFile *protogen.File) bool) ForEachFileRunner
	Generate(fn func(genOpt GenerateOptions) error) ForEachFileRunner
	GenerateWithArgs(argsOption RunArgsOption, genFn func(genOpt GenerateOptions) error) ForEachFileRunner
	Reduce(argsOption ReduceArgsOption, reduceFn func(reduceOpt ReduceOptions, genFiles []*protogen.File) error) ForEachFileRunner
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

func (pr forEachFileRunner) Generate(fn func(genOpt GenerateOptions) error) ForEachFileRunner {
	defaultArgsOption := func(protoFile *protogen.File, out *RunArgs) {}
	pr.genFns = append(pr.genFns, genFnWithArgs{
		genFn:      fn,
		argsOption: defaultArgsOption,
	})
	return pr
}

func (pr forEachFileRunner) GenerateWithArgs(argsOption RunArgsOption, genFn func(genOpt GenerateOptions) error) ForEachFileRunner {
	pr.genFns = append(pr.genFns, genFnWithArgs{
		genFn:      genFn,
		argsOption: argsOption,
	})
	return pr
}

func (pr forEachFileRunner) Reduce(argsOption ReduceArgsOption, reduceFn func(reduceOpt ReduceOptions, genFiles []*protogen.File) error) ForEachFileRunner {
	pr.reduceFns = append(pr.reduceFns, reduceFnWithArgs{
		reduceFn:   reduceFn,
		argsOption: argsOption,
	})
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

		genFiles := make([]*protogen.File, 0)
		// only process the files that are being generated
		for _, name := range p.Request.FileToGenerate {
			f := p.FilesByPath[name]
			if pr.filterFn != nil && !pr.filterFn(f) {
				glog.V(1).Infof("Skipping %s", f.Desc.Path())
				continue
			}

			genFiles = append(genFiles, f)

			glog.V(1).Infof("Processing %s", f.Desc.Path())
			glog.V(2).Infof("Generating %s\n", f.GeneratedFilenamePrefix)

			for _, genFnWithArgs := range pr.genFns {
				runArgs := RunArgs{
					GoImportPath:            f.GoImportPath,
					GeneratedFilenamePrefix: f.GeneratedFilenamePrefix,
					GoPackageName:           f.GoPackageName,
					GenFileSuffix:           pr.info.GenFileSuffix,
				}
				genFnWithArgs.argsOption(f, &runArgs)

				gf := p.NewGeneratedFile(runArgs.GeneratedFilenamePrefix+runArgs.GenFileSuffix, runArgs.GoImportPath)

				plgInfo := pr.info
				plgInfo.GenFileSuffix = runArgs.GenFileSuffix
				plgOpt := GenerateOptions{
					PluginInfo: plgInfo,
					FileGenerator: FileGenerator{
						W: gf,
						F: f,
					},
				}
				if strings.HasSuffix(runArgs.GenFileSuffix, ".go") {
					plgOpt.PHeader(p)
					plgOpt.PPackage(runArgs.GoPackageName)
				}

				err := genFnWithArgs.genFn(plgOpt)
				if err != nil {
					gf.Skip()
					p.Error(err)
					continue
				}
			}
		}

		for _, reduceFnWithArgs := range pr.reduceFns {
			runArgs := reduceFnWithArgs.argsOption()
			if runArgs.GoPackageName == "" {
				runArgs.GoPackageName = protogen.GoPackageName(path.Base(string(runArgs.GoImportPath)))
			}
			if runArgs.GenFileSuffix == "" {
				runArgs.GenFileSuffix = pr.info.GenFileSuffix
			}
			plgInfo := pr.info
			plgInfo.GenFileSuffix = runArgs.GenFileSuffix

			gf := p.NewGeneratedFile(runArgs.GeneratedFilenamePrefix+runArgs.GenFileSuffix, runArgs.GoImportPath)

			if strings.HasSuffix(runArgs.GenFileSuffix, ".go") {
				// temporary GenerateOptions for header and package comments
				genOpt := GenerateOptions{
					PluginInfo: plgInfo,
					FileGenerator: FileGenerator{
						W: gf,
					},
				}
				genOpt.PHeader(p)
				genOpt.PPackage(runArgs.GoPackageName)
			}

			err := reduceFnWithArgs.reduceFn(ReduceOptions{
				GeneratedFile: gf,
				PluginInfo:    plgInfo,
			}, genFiles)
			if err != nil {
				gf.Skip()
				p.Error(err)
				continue
			}
		}
		return nil
	})

}
