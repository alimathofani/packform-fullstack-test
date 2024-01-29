package controllers

import (
	"math"
	"strings"
	"encoding/json"
	"net/http"
	"strconv"
	"time"
	"github.com/alimathofani/packform-fullstack-test/backend/models"
)

type Pagination struct {
	Data				[]models.Order `json:"data"`
	Limit        int         `json:"limit,omitempty;query:limit"`
	Page         int         `json:"page,omitempty;query:page"`
	TotalRows    int64       `json:"total_rows"`
	TotalPages   int         `json:"total_pages"`
}

func GetAllOrders(w http.ResponseWriter, r *http.Request){
	// Set CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var (
		orders        	[]models.Order
		totalPagination int
		count           int64
	)

	page := 0
	p, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil || p < 1 {
		page = 0
	} else if p > 1{
		page = p - 1
	}

	limit := 5
	l, err := strconv.Atoi(r.URL.Query().Get("limit"))
	if err != nil {
		limit = 5
	} else {
		limit = l
	}


	query := models.DB.Model(&orders).
		Preload("Customer.Company").
		Preload("OrderItems").
		Preload("OrderItems.Deliveries")

	q := r.URL.Query().Get("q")

	if q != "" {
		query = query.
			Joins("JOIN order_items ON orders.id = order_items.order_id").
			Joins("JOIN customers ON orders.customer_id = customers.user_id").
			Joins("JOIN companies ON customers.company_id = companies.company_id").
			Where("LOWER(orders.order_name) LIKE ?", strings.ToLower(q)+"%").
			Or("LOWER(customers.name) LIKE ?", strings.ToLower(q)+"%").
			Or("LOWER(orders.customer_id) LIKE ?", strings.ToLower(q)+"%").
			Or("LOWER(order_items.product) LIKE ?", strings.ToLower(q)+"%").
			Or("LOWER(companies.company_name) LIKE ?", strings.ToLower(q)+"%")
	}

	startDateParam := r.URL.Query().Get("start_date")
	endDateParam := r.URL.Query().Get("end_date")

	if startDateParam != "" || endDateParam != "" {
		location, err := time.LoadLocation("Australia/Melbourne")
		if err != nil {
			return
		}

		if startDateParam != "" {
			startDate, err := time.ParseInLocation("2006-01-02", startDateParam, location)
			if err != nil {
				return
			}
			query = query.Where("orders.created_at >= ?", startDate)
		}

		if endDateParam != "" {
			endDate, err := time.ParseInLocation("2006-01-02", endDateParam, location)
			if err != nil {
				return
			}
			query = query.Where("orders.created_at <= ?", endDate.Add(24*time.Hour))
		}
	}

	sort := r.URL.Query().Get("order_date")
	switch strings.ToLower(sort) {
		case "asc":
			query = query.Order("orders.created_at ASC")
		case "desc":
			query = query.Order("orders.created_at DESC")
		}

	query.Count(&count)

	query.
		Limit(limit).
		Offset(page * limit).
		Find(&orders)


	pageDivision := float64(count) / float64(limit)
	totalPagination = int(math.Ceil(pageDivision))
	resp := Pagination{Data: orders, Limit: limit, Page: page + 1, TotalRows: count, TotalPages: totalPagination }

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resp)
}