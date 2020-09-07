package cmd

import "learnGo/client"

func StartView(withView bool)  {

	if withView {
		go client.Initialize()
	}
}