package fieldmask

type ITimestampPathBuilder interface {
	String() string
	Seconds() IEndPathBuilder
	Nanos() IEndPathBuilder
}
type timestampPathBuilder struct {
	fieldPath string
	prefix    string
}

func NewTimestampPathBuilder(fieldPath string) ITimestampPathBuilder {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return timestampPathBuilder{fieldPath: fieldPath, prefix: prefix}
}

func (x timestampPathBuilder) String() string { return x.fieldPath }
func (x timestampPathBuilder) Seconds() IEndPathBuilder {
	return NewEndPathBuilder(x.prefix + "seconds")
}
func (x timestampPathBuilder) Nanos() IEndPathBuilder { return NewEndPathBuilder(x.prefix + "nanos") }

type IDurationPathBuilder interface {
	String() string
	Seconds() IEndPathBuilder
	Nanos() IEndPathBuilder
}

type durationPathBuilder struct {
	fieldPath string
	prefix    string
}

func NewDurationPathBuilder(fieldPath string) IDurationPathBuilder {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return durationPathBuilder{fieldPath: fieldPath, prefix: prefix}
}

func (x durationPathBuilder) String() string { return x.fieldPath }
func (x durationPathBuilder) Seconds() IEndPathBuilder {
	return NewEndPathBuilder(x.prefix + "seconds")
}
func (x durationPathBuilder) Nanos() IEndPathBuilder { return NewEndPathBuilder(x.prefix + "nanos") }

type IFieldMaskPathBuilder interface {
	String() string
	Paths() IEndPathBuilder
}

type fieldMaskPathBuilder struct {
	fieldPath string
	prefix    string
}

func NewFieldMaskPathBuilder(fieldPath string) IFieldMaskPathBuilder {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return fieldMaskPathBuilder{fieldPath: fieldPath, prefix: prefix}
}

func (x fieldMaskPathBuilder) String() string         { return x.fieldPath }
func (x fieldMaskPathBuilder) Paths() IEndPathBuilder { return NewEndPathBuilder(x.prefix + "paths") }

type IWrappersPathBuilder interface {
	String() string
	Value() IEndPathBuilder
}

type wrappersPathBuilder struct {
	fieldPath string
	prefix    string
}

func NewWrappersPathBuilder(fieldPath string) IWrappersPathBuilder {
	prefix := ""
	if fieldPath != "" {
		prefix = fieldPath + "."
	}
	return wrappersPathBuilder{fieldPath: fieldPath, prefix: prefix}
}

func (x wrappersPathBuilder) String() string         { return x.fieldPath }
func (x wrappersPathBuilder) Value() IEndPathBuilder { return NewEndPathBuilder(x.prefix + "value") }
