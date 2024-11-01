package msg_generator

import (
	"fmt"
	"unicode"

	"google.golang.org/protobuf/compiler/protogen"
)

const (
	nameSuffix                             = "PathBuilder"
	fieldmaskPackage protogen.GoImportPath = "github.com/RyoJerryYu/protoc-gen-plugins/pkg/fieldmask"
)

func lowerFirst(s string) string {
	if len(s) == 0 {
		return s
	}
	runes := []rune(s)
	runes[0] = unicode.ToLower(runes[0])
	return string(runes)
}

// Interface name for the field path of the message
func getIfaceName(ident protogen.GoIdent) string {
	return fmt.Sprintf("I%s%s", ident.GoName, nameSuffix)
}

// Struct name for the field path of the message
func getStructName(ident protogen.GoIdent) string {
	return fmt.Sprintf("%s%s", lowerFirst(ident.GoName), nameSuffix)
}

// New function name for the field path of the message
func getNewFuncName(ident protogen.GoIdent) string {
	return fmt.Sprintf("New%s%s", ident.GoName, nameSuffix)
}
