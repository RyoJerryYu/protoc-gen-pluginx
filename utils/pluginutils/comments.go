package pluginutils

import (
	"fmt"
	"strings"

	"google.golang.org/protobuf/compiler/protogen"
)

// PComment allows multiple lines string as comment.
func (opt PluginOptions) PComment(w *protogen.GeneratedFile, comments ...string) {
	comment := strings.Join(comments, " ")
	w.P(protogen.Comments(comment))
}
func (opt PluginOptions) PCommentf(w *protogen.GeneratedFile, format string, args ...interface{}) {
	w.P(protogen.Comments(fmt.Sprintf(format, args...)))
}
