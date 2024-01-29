package controllers

import (
	"net/http"

	"github.com/gorilla/mux"
)

func New() http.Handler {
  router := mux.NewRouter()

  router.HandleFunc("/orders", GetAllOrders).Methods("GET")

  return router
}