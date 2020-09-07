package cmd

import (
	"learnGo/common/config"
	"learnGo/db"
	"learnGo/pkg/logger"
	"learnGo/server"
)

func Run(withView bool) {
	config.Load()
	logger.Initialize(config.Logger.Path,"bolt.log",config.Logger.Size)
	startView()
	startServer()
}

func startServer()  {
	db.StartMongo()
	server.Run()
}

func startView()  {
	go StartView(withView)
}
