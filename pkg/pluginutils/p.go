package pluginutils

import "fmt"

func (opt FileGenerator) P(v ...any) {
	opt.W.P(v...)
}

func (opt FileGenerator) Pf(format string, v ...any) {
	opt.W.P(fmt.Sprintf(format, v...))
}
