package pluginutils

import (
	"bytes"
	"fmt"
	"io"
	"strings"

	"google.golang.org/protobuf/compiler/protogen"
)

// PComment allows multiple lines string as comment.
func (opt PluginOptions) PComment(comments ...string) {
	comment := strings.Join(comments, " ")
	io.Copy(opt.W, bytes.NewBufferString(protogen.Comments(comment).String()))
}
func (opt PluginOptions) PCommentf(format string, args ...interface{}) {
	io.Copy(opt.W, bytes.NewBufferString(protogen.Comments(fmt.Sprintf(format, args...)).String()))
}
