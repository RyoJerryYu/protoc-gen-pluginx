package pluginutils

import "fmt"

func (opt PluginOptions) P(v ...any) {
	opt.W.P(v...)
}

func (opt PluginOptions) Pf(format string, v ...any) {
	opt.W.P(fmt.Sprintf(format, v...))
}
