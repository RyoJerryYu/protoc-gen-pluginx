package gen

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestPathParamRegexp(t *testing.T) {
	type caseMatch struct {
		exp   string
		m1    string
		hasM2 bool
		m2    string
	}
	cases := []struct {
		in      string
		matches []caseMatch
	}{
		{
			in: "/v1/{name}/tasks",
			matches: []caseMatch{
				{
					exp: "{name}",
					m1:  "name",
				},
			},
		},
		{
			in: "/v1/{name=projects/*}/tasks",
			matches: []caseMatch{
				{
					exp:   "{name=projects/*}",
					m1:    "name",
					hasM2: true,
					m2:    "projects/*",
				},
			},
		},
		{
			in: "/v1/{name=projects/*/locations/*}/tasks",
			matches: []caseMatch{
				{
					exp:   "{name=projects/*/locations/*}",
					m1:    "name",
					hasM2: true,
					m2:    "projects/*/locations/*",
				},
			},
		},
		{
			in: "/post/{a}/{c}",
			matches: []caseMatch{
				{
					exp: "{a}",
					m1:  "a",
				},
				{
					exp: "{c}",
					m1:  "c",
				},
			},
		},
		{
			in: "/post/{a=projects/*/locations/*}/{c=another/*/message/*}",
			matches: []caseMatch{
				{
					exp:   "{a=projects/*/locations/*}",
					m1:    "a",
					hasM2: true,
					m2:    "projects/*/locations/*",
				},
				{
					exp:   "{c=another/*/message/*}",
					m1:    "c",
					hasM2: true,
					m2:    "another/*/message/*",
				},
			},
		},
		{
			in: "/post/{a=projects/*/locations/*}/{c=**}",
			matches: []caseMatch{
				{
					exp:   "{a=projects/*/locations/*}",
					m1:    "a",
					hasM2: true,
					m2:    "projects/*/locations/*",
				},
				{
					exp:   "{c=**}",
					m1:    "c",
					hasM2: true,
					m2:    "**",
				},
			},
		},
	}

	for _, c := range cases {
		t.Run(c.in, func(t *testing.T) {
			ms := pathParamRegexp.FindAllStringSubmatch(c.in, -1)
			require.Len(t, ms, len(c.matches))
			for i := range ms {
				t.Run(c.matches[i].exp, func(t *testing.T) {
					assert.Equal(t, c.matches[i].exp, ms[i][0])
					assert.Equal(t, c.matches[i].m1, ms[i][1])
					if c.matches[i].hasM2 {
						assert.Equal(t, c.matches[i].m2, ms[i][2])
					}
				})
			}
		})
	}
}
