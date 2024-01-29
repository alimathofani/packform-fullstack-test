package models

import "time"

type Order struct {
  ID int `json:"id" gorm:"primary_key"`
  OrderName string `json:"order_name"`
  CustomerID string `json:"customer_id"`
  Customer Customer `json:"customer" gorm:"references:UserID"`
  OrderItems []OrderItem `json:"order_items"`
  CreatedAt time.Time `json:"created_at"`
}
