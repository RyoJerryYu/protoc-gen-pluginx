package comments

import (
	"strings"

	"google.golang.org/protobuf/compiler/protogen"
)

// HeadlineComment returns the heading of the leading comments
// it will return only when the leading comments is a single line or the first line is a single paragraph
func HeadlineComment(comments protogen.CommentSet) string {
	commentLeading := strings.TrimSpace(string(comments.Leading))
	lines := strings.Split(commentLeading, "\n")
	if (len(lines) == 1 && strings.TrimSpace(lines[0]) != "") ||
		(len(lines) > 2 && strings.TrimSpace(lines[0]) != "" && strings.TrimSpace(lines[1]) == "") {
		return lines[0]
	}
	return ""
}
