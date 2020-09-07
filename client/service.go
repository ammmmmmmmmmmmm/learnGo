package client

import (
	"github.com/sirupsen/logrus"
	"io/ioutil"
	"rogchap.com/v8go"
)



func InitializeService() {

	filePath := "app/js_service/service.bundle.js"

	bytes,err := ioutil.ReadFile(filePath)

	if err != nil {
		 logrus.Fatal("read js service file failed")
	}
	ctx, _ := v8go.NewContext(nil)

	v ,err := ctx.RunScript(string(bytes),"main.js")

	if err != nil{
		 logrus.Fatal("goja run script error:",err)
	}
	logrus.Infoln("value is:",v)

}

