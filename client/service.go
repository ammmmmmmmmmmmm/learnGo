package client

import (
	"github.com/sirupsen/logrus"
	jae "learnGo/pkg/js_engine"
)



func InitializeService() {

	//filePath := "app/js_service/service.bundle.js"
	filePath := "app/js_service/test.js"

	_,err := jae.Run(filePath,"app/js_service/main.js")
	if err != nil {
		 logrus.Fatal("execute failed",err.Error())
	}

	logrus.Infoln("execute success")


}

