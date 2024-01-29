package models

type Delivery struct {
  ID int `json:"id" gorm:"primary_key"`
  OrderItemId int `json:"order_item_id"`
  DeliveredQuantity string `json:"delivered_quantity"`
}