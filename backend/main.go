package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/alimathofani/packform-fullstack-test/backend/controllers"
	"github.com/alimathofani/packform-fullstack-test/backend/models"
)

const (
	defaultPort = "8080"
	idleTimeout       = 30 * time.Second
	writeTimeout      = 180 * time.Second
	readHeaderTimeout = 10 * time.Second
	readTimeout       = 10 * time.Second
)

func main() {
  err := godotenv.Load()
  check(err)

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	handler := controllers.New()

	server := &http.Server{
		Addr:    "0.0.0.0:" + port,
		Handler: handler,

		IdleTimeout:       idleTimeout,
		WriteTimeout:      writeTimeout,
		ReadHeaderTimeout: readHeaderTimeout,
		ReadTimeout:       readTimeout,
	}

  models.ConnectDatabase()

	err = server.ListenAndServe()
  check(err)
}

func check(e error){
  if e != nil {
    log.Fatal(e)
  }
}