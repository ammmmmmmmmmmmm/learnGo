package server

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"learnGo/client"
	"learnGo/common/config"
	"learnGo/db"
	"learnGo/src/routes"
	"net/http"
)


func Run()  {
	r := gin.Default()
	r.Use(cros())
	r.Use(gin.Recovery())
	routes.Initialize(r)
	defer close()

	if err := r.Run(":"+config.Server.Port); err != nil {
		logrus.Infoln("start server error")
	}
}

// cros 处理跨域
func cros() gin.HandlerFunc {
	
	return func(c *gin.Context) {
		method := c.Request.Method

		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token")
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type")
		c.Header("Access-Control-Allow-Credentials", "true")

		//放行所有OPTIONS方法
		if method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
		}
		// 处理请求
		c.Next()
	}
}

func close()  {
	logrus.Infoln("app stoped")
	db.Client.Session.Close()
	client.App.Close()
}