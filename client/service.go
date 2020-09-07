package client

import (
	"errors"
	"fmt"
	"github.com/robertkrimen/otto"
	"github.com/sirupsen/logrus"
	"io/ioutil"
	"time"
 	"rogchap.com/v8go"

)

type _timer struct {
	timer    *time.Timer
	duration time.Duration
	interval bool
	call     otto.FunctionCall
}
var halt = errors.New("Stahp")

func InitializeService() {
	fmt.Println("start js Service")
	vm := otto.New()
	addTimer(vm)

	filePath := "app/js_service/service.bundle.js"
	bytes,err := ioutil.ReadFile(filePath)
	if err != nil {
		 logrus.Fatal("read js service file failed")
	}

	_,err = vm.Run(string(bytes))

	if err != nil {
		logrus.Error("run js service failed:",err)
	}

	value, err := vm.Call("test", nil, nil)

	if err != nil {
		 logrus.Error("call test method failed")
	}

	logrus.Infoln("call test method result is:",value)



}

func addTimer(vm *otto.Otto) error{

	registry := map[*_timer]*_timer{}
	ready := make(chan *_timer)

	newTimer := func(call otto.FunctionCall, interval bool) (*_timer, otto.Value) {
		delay, _ := call.Argument(1).ToInteger()
		if 0 >= delay {
			delay = 1
		}

		timer := &_timer{
			duration: time.Duration(delay) * time.Millisecond,
			call:     call,
			interval: interval,
		}
		registry[timer] = timer

		timer.timer = time.AfterFunc(timer.duration, func() {
			ready <- timer
		})

		value, err := call.Otto.ToValue(timer)
		if err != nil {
			panic(err)
		}

		return timer, value
	}

	setTimeout := func(call otto.FunctionCall) otto.Value {
		_, value := newTimer(call, false)
		return value
	}
	vm.Set("setTimeout", setTimeout)

	setInterval := func(call otto.FunctionCall) otto.Value {
		_, value := newTimer(call, true)
		return value
	}
	vm.Set("setInterval", setInterval)

	clearTimeout := func(call otto.FunctionCall) otto.Value {
		timer, _ := call.Argument(0).Export()
		if timer, ok := timer.(*_timer); ok {
			timer.timer.Stop()
			delete(registry, timer)
		}
		return otto.UndefinedValue()
	}
	vm.Set("clearTimeout", clearTimeout)
	vm.Set("clearInterval", clearTimeout)

	for {
		select {
		case timer := <-ready:
			var arguments []interface{}
			if len(timer.call.ArgumentList) > 2 {
				tmp := timer.call.ArgumentList[2:]
				arguments = make([]interface{}, 2+len(tmp))
				for i, value := range tmp {
					arguments[i+2] = value
				}
			} else {
				arguments = make([]interface{}, 1)
			}
			arguments[0] = timer.call.ArgumentList[0]
			_, err := vm.Call(`Function.call.call`, nil, arguments...)
			if err != nil {
				for _, timer := range registry {
					timer.timer.Stop()
					delete(registry, timer)
					return err
				}
			}
			if timer.interval {
				timer.timer.Reset(timer.duration)
			} else {
				delete(registry, timer)
			}
		default:
			// Escape valve!
			// If this isn't here, we deadlock...
		}
		if len(registry) == 0 {
			break
		}
	}

	return  nil
}
