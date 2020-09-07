package db

import (
	"github.com/sirupsen/logrus"
	"gopkg.in/mgo.v2"
)
var Client *mgo.Database
func StartMongo()  {
	logrus.Infoln("start mongo db")
	session,e := mgo.Dial("localhost:27017")
	if e != nil {
		logrus.Error("dial mongo failed")
	}
	Client = session.DB("learnGo")

	logrus.Infoln("connected mongo ")

}