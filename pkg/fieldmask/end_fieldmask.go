package fieldmask

type IEndPathBuilder interface {
	String() string
}

type endPathBuilder struct {
	fieldPath string
}

func NewEndPathBuilder(fieldPath string) IEndPathBuilder {
	return endPathBuilder{fieldPath: fieldPath}
}

func (x endPathBuilder) String() string { return x.fieldPath }
