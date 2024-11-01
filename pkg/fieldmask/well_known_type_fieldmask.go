package fieldmask

type ITimestampFieldPath interface {
	String() string
	Seconds() IEndFieldPath
	Nanos() IEndFieldPath
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

func (x timestampFieldPath) String() string         { return x.fieldPath }
func (x timestampFieldPath) Seconds() IEndFieldPath { return NewEndFieldPath(x.prefix + "seconds") }
func (x timestampFieldPath) Nanos() IEndFieldPath   { return NewEndFieldPath(x.prefix + "nanos") }

type IDurationFieldPath interface {
	String() string
	Seconds() IEndFieldPath
	Nanos() IEndFieldPath
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

func (x durationFieldPath) String() string         { return x.fieldPath }
func (x durationFieldPath) Seconds() IEndFieldPath { return NewEndFieldPath(x.prefix + "seconds") }
func (x durationFieldPath) Nanos() IEndFieldPath   { return NewEndFieldPath(x.prefix + "nanos") }

type IFieldMaskFieldPath interface {
	String() string
	Paths() IEndFieldPath
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

func (x fieldMaskFieldPath) String() string       { return x.fieldPath }
func (x fieldMaskFieldPath) Paths() IEndFieldPath { return NewEndFieldPath(x.prefix + "paths") }

type IWrappersFieldPath interface {
	String() string
	Value() IEndFieldPath
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

func (x wrappersFieldPath) String() string       { return x.fieldPath }
func (x wrappersFieldPath) Value() IEndFieldPath { return NewEndFieldPath(x.prefix + "value") }
