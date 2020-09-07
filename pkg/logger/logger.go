package logger

import (
	"errors"
	"github.com/sirupsen/logrus"
	"io"
	"log"
	"os"
	"path"
)

type logToFileWriter struct {
	File *os.File
	Size int64
}

func (p *logToFileWriter) Write(data []byte) (n int, err error) {
	if p == nil {
		return 0, errors.New("logFileWriter is nil")
	}
	if p.File == nil {
		return 0, errors.New("file not opened")
	}
	n, e := p.File.Write(data)
	p.Size += int64(n)
	return n, e

}

func Initialize(logFilePath string,logFileName string,size int64)  {
	file, err := openFile(logFilePath,logFileName,size)
	if err != nil {
		log.Fatal("log  init failed")
	}

	info, err := file.Stat()
	logFileWriter := logToFileWriter{
		file,
		info.Size(),
	}

	writers := io.MultiWriter(&logFileWriter, os.Stdout)
	logrus.SetOutput(writers)
	logrus.SetFormatter(LogFormatter{})
	logrus.SetLevel(logrus.DebugLevel)
}

func openFile(logFilePath string,logFileName string,size int64) (*os.File,error)  {
	//日志文件
	fileName := path.Join(logFilePath, logFileName)

	//写入文件
	if err := os.MkdirAll(logFilePath, 0777); err != nil {
		logrus.Errorln("日志文件夹创建失败")
	}

	file, err := os.OpenFile(fileName, os.O_WRONLY|os.O_APPEND|os.O_CREATE|os.O_SYNC, 0600)

	return  file,err
}