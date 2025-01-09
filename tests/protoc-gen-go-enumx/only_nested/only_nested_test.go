package only_nested

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestFileGenerated(t *testing.T) {
	k := EnumParent_D
	require.Equal(t, EnumParent_D, k)
	m := EnumParent{Enum: k}
	require.Equal(t, EnumParent_D, m.Enum)
}
