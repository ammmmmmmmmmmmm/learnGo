package config

import (
	"fmt"
	"github.com/spf13/viper"
)

type ServerConfig struct {
	 Port string
}

type LoggerConfig struct {
	 Path string
	 Level string
	 Size int64
}

var Server = &ServerConfig{}
var Logger = &LoggerConfig{}

func Load()  {

	viper.SetConfigName("config")
	viper.AddConfigPath("./config")
	err := viper.ReadInConfig() // Find and read the config file
	if err != nil { // Handle errors reading the config file
		panic(fmt.Errorf("Fatal error config file: %s \n", err))
	}

	Server.Port = viper.GetString("server.port")

	Logger.Path = viper.GetString("logger.path")
	Logger.Size = viper.GetInt64("logger.size")
	Logger.Level = viper.GetString("logger.level")
}