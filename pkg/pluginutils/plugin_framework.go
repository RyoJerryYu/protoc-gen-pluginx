package pluginutils

import (
	"flag"
	"strings"

	"github.com/golang/glog"
	"google.golang.org/protobuf/compiler/protogen"
)

type forEachFileRunner struct {
	info       PluginInfo
	fileFilter func(protoFile *protogen.File) bool
}

type PreForEachFileRunner interface {
	ForEachFileThat(fn func(protoFile *protogen.File) bool) ForEachFileRunner
}

type ForEachFileRunner interface {
	Run(fn func(genOpt GenerateOptions) error)
}

// ForEachFileRunner helps to generate one file for each file that is being generated
func NewForEachFileRunner(info PluginInfo) PreForEachFileRunner {
	return forEachFileRunner{info: info}
}

// if fn returns false, the file will be skipped
func (pr forEachFileRunner) ForEachFileThat(fn func(protoFile *protogen.File) bool) ForEachFileRunner {
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
			if pr.fileFilter != nil && !pr.fileFilter(f) {
				glog.V(1).Infof("Skipping %s", f.Desc.Path())
				continue
			}

			glog.V(1).Infof("Processing %s", f.Desc.Path())
			glog.V(2).Infof("Generating %s\n", f.GeneratedFilenamePrefix)

			gf := p.NewGeneratedFile(f.GeneratedFilenamePrefix+pr.info.GenFileSuffix, f.GoImportPath)

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
