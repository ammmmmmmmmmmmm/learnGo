package orm

import (
	"gopkg.in/mgo.v2/bson"
)

type User struct {
	ID bson.ObjectId    `bson:"_id" json:"id"`
	Name string  `bson:"name" json:"name"`
 	Age  int64    `bson:"age" json:"age"`
	Grade string  `bson:"grade" json:"grade"`
}