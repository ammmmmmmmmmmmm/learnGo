package routes

import "github.com/gin-gonic/gin"

func Failure(status int64,errMsg string) (gin.H) {
	return gin.H{
		"status": status,
		"data":nil,
		"errMsg":errMsg,
	}
}

func Success(result interface{}) (gin.H) {
	return gin.H{
		"status": 200,
		"data":result,
		"errMsg":"",
	}
}
