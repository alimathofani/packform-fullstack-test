package models

import "time"

type Order struct {
  ID uint `json:"id" gorm:"primary_key"`
  Title string `json:"title"`
  Description string `json:"description"`
  Reward int `json:"reward"`
  CategoryID uint `json:"category_id"`
  CreatedAt time.Time `json:"created_at"`
  UpdatedAt time.Time `json:"updated_at"`
}

func NewOrder(title string, description string, reward int) (order *Order, err error){
  order = &Order{
    Title: title,
    Description: description,
    Reward: reward,
  }

  DB.Create(&order)

  return order, nil
}