package cmd

import (
	"github.com/spf13/cobra"
)

var withView bool
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "start Learn go as server",
	Run: func(cmd *cobra.Command, args []string) {


		 Run(withView)

	},
}

func init() {
	serveCmd.PersistentFlags().BoolVarP(&withView,"view","v",false,"start electron window")

	rootCmd.AddCommand(serveCmd)
}
