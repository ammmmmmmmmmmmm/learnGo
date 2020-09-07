package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "LearnGo",
	Short: "Hugo is a very fast static site generator",
}

// Execute 执行命令
func Execute() {
	fmt.Println("cmd execute")
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
