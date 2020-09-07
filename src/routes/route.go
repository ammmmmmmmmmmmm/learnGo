package routes

import "github.com/gin-gonic/gin"

type Route interface {
	initialize(r *gin.Engine)
}

var routes =  []Route{}

func Initialize(r *gin.Engine)  {
	for _,route := range routes {
		route.initialize(r)
	}
}

func Register(r Route)  {
	routes = append(routes,r)
}