package pluginutils

import (
	"flag"
	"strings"

	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

type forEachFileRunner struct {
	info       PluginInfo
	fileFilter func(protoFile *protogen.File) ForEachFileCheckResult
}

type ForEachFileCheckResult struct {
	Skip         bool
	GoImportPath protogen.GoImportPath
}

type ForEachFileRunner interface {
	ForEachFileThat(fn func(protoFile *protogen.File) ForEachFileCheckResult) ForEachFileRunner
	Run(fn func(genOpt GenerateOptions) error)
}

// ForEachFileRunner helps to generate one file for each file that is being generated
func NewForEachFileRunner(info PluginInfo) ForEachFileRunner {
	return forEachFileRunner{info: info}
}

// if fn returns false, the file will be skipped
func (pr forEachFileRunner) ForEachFileThat(fn func(protoFile *protogen.File) ForEachFileCheckResult) ForEachFileRunner {
	pr.fileFilter = fn
	return pr
}

func (pr forEachFileRunner) Run(fn func(genOpt GenerateOptions) error) {
	protogen.Options{
		ParamFunc: flag.CommandLine.Set,
	}.Run(func(p *protogen.Plugin) error {
		if pr.info.SupportedFeatures != 0 {
			p.SupportedFeatures = pr.info.SupportedFeatures
		}

		// only process the files that are being generated
		for _, name := range p.Request.FileToGenerate {
			f := p.FilesByPath[name]
			preCheckResult := ForEachFileCheckResult{
				Skip: false,
			}
			if pr.fileFilter != nil {
				preCheckResult = pr.fileFilter(f)
			}
			if preCheckResult.Skip {
				glog.V(1).Infof("Skipping %s", f.Desc.Path())
				continue
			}

			glog.V(1).Infof("Processing %s", f.Desc.Path())
			glog.V(2).Infof("Generating %s\n", f.GeneratedFilenamePrefix)

			goImportPath := preCheckResult.GoImportPath
			if goImportPath == "" {
				goImportPath = f.GoImportPath
			}

			gf := p.NewGeneratedFile(f.GeneratedFilenamePrefix+pr.info.GenFileSuffix, goImportPath)

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

			err := fn(plgOpt)
			if err != nil {
				gf.Skip()
				p.Error(err)
				continue
			}

		}

		return nil
	})

}
