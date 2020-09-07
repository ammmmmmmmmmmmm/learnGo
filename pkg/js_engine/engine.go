package jae

import (
	"encoding/json"
	"fmt"
	"sync"
	"time"

	"github.com/dop251/goja"
	"github.com/dop251/goja_nodejs/console"
	"github.com/dop251/goja_nodejs/require"
	"github.com/sirupsen/logrus"
)

type JsFunction struct {
	runtime  *goja.Runtime
	callable goja.Callable
	name     string
	debug    bool
	sync.Mutex
}

var registry = new(require.Registry) // this can be shared by multiple runtimes
type global struct {

}

func Run(filePath, funcName string)(goja.Value,error)  {
	runtime := goja.New()
	runtime.Set("window",runtime.GlobalObject())
	runtime.Set("global",runtime.GlobalObject())
	runtime.Set("globalThis", runtime.GlobalObject())
	runtime.SetFieldNameMapper(goja.TagFieldNameMapper("json", true))
	registry.Enable(runtime)
	console.Enable(runtime)
	console.RequireWithPrinter(Console{})
	v, err := runtime.RunString(fmt.Sprintf(`require("%s");`, filePath))

	return v,err
}

func GetFunction(filePath, funcName string) (*JsFunction, error) {
	runtime := goja.New()
	runtime.Set("window",runtime.GlobalObject())
	runtime.Set("global",runtime.GlobalObject())
	runtime.Set("globalThis", runtime.GlobalObject())
	runtime.SetFieldNameMapper(goja.TagFieldNameMapper("json", true))
	registry.Enable(runtime)
	console.Enable(runtime)
	console.RequireWithPrinter(Console{})
	_, err := runtime.RunString(fmt.Sprintf(`require("%s");`, filePath))
	if err != nil {
		logrus.Error("11111,",err.Error())
		return nil, err
	}
	cb := runtime.Get(funcName)
	parser, ok := goja.AssertFunction(cb)
	if !ok {
		return nil, fmt.Errorf("找不到函数")
	}
	jsFunc := &JsFunction{
		runtime:  runtime,
		callable: parser,
		name:     funcName,
	}
	return jsFunc, nil
}

func (r *JsFunction) SetDebug(debug bool) {
	r.Lock()
	defer r.Unlock()
	r.debug = debug
}

func (r *JsFunction) Call(args ...interface{}) (string, error) {
	// An instance of goja.Runtime can only be used by a single goroutine at a time.
	r.Lock()
	defer r.Unlock()

	vargs := make([]goja.Value, 0, len(args))
	if r.debug {
		logrus.Debug("js call arguments:")
	}
	for i, arg := range args {
		if r.debug {
			strArg, err := json.Marshal(arg)
			if err != nil {
				logrus.Errorf("  arg#%d: %v", i, err)
			} else {
				logrus.Debugf("  arg#%d: %s", i, strArg)
			}
		}
		vargs = append(vargs, r.runtime.ToValue(arg))
	}
	begin := time.Now()
	rt, err := r.callable(nil, vargs...)
	if err != nil {
		return "", fmt.Errorf("找不打 %s",err.Error())
	}
	logrus.Debugf("%s took %v", r.name, time.Since(begin))
	return rt.String(), nil
}

type Console struct {

}

func (c Console) Log(m string)  {
	logrus.Infoln(m)

}


func (c Console) Warn(m string)  {
	logrus.Warn("console warn：",m)
}

func (c Console) Error(m string)  {
	logrus.Error(m)

}