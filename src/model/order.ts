import { CartModel } from "../context/CartProvider"

export interface Order {
  id: string
  cart?: {
    items: CartModel[]
    totalItems: number
    totalPrice: number
  }
  orderInfo?: {
    status: OrderStatus,
    payment?: "COD" | "PAYPAL"
    paymentInfo?: any
    name?: string
    address?: string
    email?: string
    city?: string
    phone?: string
    country?: string
  }
}

export enum OrderStatus {
  "PENDING" = 0,
  "PAID" = 1,
  "PROCESSING" = 2,
  "DELIVERING" = 3,
  "DELIVERED" = 4
}