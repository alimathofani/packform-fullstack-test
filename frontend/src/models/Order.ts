interface OrderResponse {
  data: Order[]
  limit: number
  page: number
  total_rows: number
  total_pages: number
}

interface Order {
  id: number
  order_name: string
  customer_id: string
  customer: Customer
  order_items: OrderItem[]
  created_at: string
}

interface Customer {
  user_id: string
  login: string
  password: string
  name: string
  company_id: number
  company: Company
  credit_card: string
}
interface Company {
  company_id: number
  company_name: string
}

interface OrderItem {
  id: number
  order_id: number
  price_per_unit: number
  quantity: string
  product: string
  deliveries: Delivery[]
}

interface Delivery {
  id: number
  order_item_id: number
  delivered_quantity: string
}
