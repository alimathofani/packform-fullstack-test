package models

type Customer struct {
  UserID string `json:"user_id" gorm:"primary_key"`
  Login string `json:"login"`
  Password string `json:"password"`
  Name string `json:"name"`
  CompanyID uint `json:"company_id"`
  Company Company `json:"company" gorm:"references:CompanyID"`
  CreditCard string `json:"credit_card"`
}