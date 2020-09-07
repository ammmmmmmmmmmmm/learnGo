package jae

import (
	"github.com/stretchr/testify/require"
	"testing"
)

func TestGetFunction(t *testing.T) {
	filePath := "./main.js"
	_,err := GetFunction(filePath,"startJSService")
	require.NoError(t,err)

}
