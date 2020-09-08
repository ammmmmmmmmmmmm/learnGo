package client

import (
	"fmt"
	"log"
	"os"

	"github.com/asticode/go-astikit"
	"github.com/asticode/go-astilectron"
	"github.com/sirupsen/logrus"
)

var App *astilectron.Astilectron

func InitializeView() {

	var a, err = astilectron.New(log.New(os.Stderr, "", 0), astilectron.Options{
		AppName:           "LearnGo",
		BaseDirectoryPath: "example",
	})
	if err != nil {
		logrus.Fatal(fmt.Errorf("main: creating astilectron failed: %w", err))
	}

	// Start astilectron
	if err = a.Start(); err != nil {
		logrus.Fatal(fmt.Errorf("main: starting astilectron failed: %w", err))
	}

	a.HandleSignals()
	StartView(a)
	App = a
}

func StartView(a *astilectron.Astilectron) {
	logrus.Infoln("start electron app")

	fullScreen := false

	var w, _ = a.NewWindow("app/index.html", &astilectron.WindowOptions{
		Center: astikit.BoolPtr(true),
		Height: astikit.IntPtr(600),
		Width:  astikit.IntPtr(600),
		Frame:  &fullScreen,
	})
	
	w.Create()
}
