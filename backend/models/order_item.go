package models

type OrderItem struct {
  ID int `json:"id" gorm:"primary_key"`
  OrderID int `json:"order_id"`
  PricePerUnit int `json:"price_per_unit"`
  Quantity string `json:"quantity"`
  Product string `json:"product"`
  Deliveries []Delivery `json:"deliveries"`
}