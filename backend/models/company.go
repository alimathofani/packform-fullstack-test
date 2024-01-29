package models

type Company struct {
  CompanyID int `json:"company_id" gorm:"primary_key"`
  CompanyName string `json:"company_name"`
}