package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"gopkg.in/mgo.v2/bson"
	"learnGo/db"
	"learnGo/src/orm"
)

func init()  {
	u := &User{}
	Register(u)
}


type User struct {}
func (uer *User)initialize(r *gin.Engine)  {
	u := r.Group("user")
	u.POST("/add",addUser)
	u.GET("/info", getInfo)
	u.GET("/info2", func(context *gin.Context) {

	})
}

func addUser(c *gin.Context)  {

	client := db.Client.C("user")

	body := &orm.User{}
	c.BindJSON(body)
	u := &orm.User{
		bson.NewObjectId(),
		body.Name,
		body.Age,
		body.Grade,
	}
	err := client.Insert(u)

	if err != nil {
		logrus.Error("add user faile :",err.Error())
	}
	c.JSON(200,Success("success"))

}

func getInfo(context *gin.Context)  {

	client := db.Client.C("user")
	var result []orm.User
	client.Find(nil).All(&result)
	context.JSON(200,Success(result))
}