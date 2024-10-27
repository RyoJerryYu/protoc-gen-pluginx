package fieldmask

type ITimestampFieldPath interface {
	String() string
	Seconds() string
	Nanos() string
}
type timestampFieldPath struct {
	fieldPath string
	prefix    string
}

func NewTimestampFieldPath(fieldPath string) ITimestampFieldPath {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return timestampFieldPath{fieldPath: fieldPath, prefix: prefix}
}

func (x timestampFieldPath) String() string  { return x.fieldPath }
func (x timestampFieldPath) Seconds() string { return x.prefix + "seconds" }
func (x timestampFieldPath) Nanos() string   { return x.prefix + "nanos" }

type IDurationFieldPath interface {
	String() string
	Seconds() string
	Nanos() string
}

type durationFieldPath struct {
	fieldPath string
	prefix    string
}

func NewDurationFieldPath(fieldPath string) IDurationFieldPath {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return durationFieldPath{fieldPath: fieldPath, prefix: prefix}
}

func (x durationFieldPath) String() string  { return x.fieldPath }
func (x durationFieldPath) Seconds() string { return x.prefix + "seconds" }
func (x durationFieldPath) Nanos() string   { return x.prefix + "nanos" }

type IFieldMaskFieldPath interface {
	String() string
	Paths() string
}

type fieldMaskFieldPath struct {
	fieldPath string
	prefix    string
}

func NewFieldMaskFieldPath(fieldPath string) IFieldMaskFieldPath {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return fieldMaskFieldPath{fieldPath: fieldPath, prefix: prefix}
}

func (x fieldMaskFieldPath) String() string { return x.fieldPath }
func (x fieldMaskFieldPath) Paths() string  { return x.prefix + "paths" }

type IWrappersFieldPath interface {
	String() string
	Value() string
}

type wrappersFieldPath struct {
	fieldPath string
	prefix    string
}

func NewWrappersFieldPath(fieldPath string) IWrappersFieldPath {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return wrappersFieldPath{fieldPath: fieldPath, prefix: prefix}
}

func (x wrappersFieldPath) String() string { return x.fieldPath }
func (x wrappersFieldPath) Value() string  { return x.prefix + "value" }
