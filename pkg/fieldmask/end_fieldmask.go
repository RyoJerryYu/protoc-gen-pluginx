package fieldmask

type IEndFieldPath interface {
	String() string
}

type endFieldPath struct {
	fieldPath string
}

func NewEndFieldPath(fieldPath string) IEndFieldPath {
	return endFieldPath{fieldPath: fieldPath}
}

func (x endFieldPath) String() string { return x.fieldPath }
