package cmd

import (
	"learnGo/client"
	"learnGo/common/config"
	"learnGo/pkg/logger"
	"learnGo/server"
)

func Run(withView bool) {
	config.Load()
	logger.Initialize(config.Logger.Path, "bolt.log", config.Logger.Size)
	//startView()
	startService()
	startServer()
}

func startService() {

	 client.InitializeService()
}

func startServer() {
	//db.StartMongo()
	server.Run()
}

func startView() {
	go StartView(withView)
}
