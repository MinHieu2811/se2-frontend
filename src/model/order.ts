import { CartModel } from "../context/CartProvider";

export interface Order {
  id: string;
  cart?: {
    items: CartModel[];
    totalItems: number;
    totalPrice: number;
    voucher: VoucherOrder | null;
  };
  orderInfo?: {
    status: OrderStatus;
    payment?: "COD" | "PAYPAL";
    paymentInfo?: any;
    name?: string;
    address?: string;
    email?: string;
    city?: string;
    phone?: string;
    country?: string;
  };
}

export interface VoucherOrder {
  code: string;
  expiredAt: string;
  discountAmount: number;
}

export enum OrderStatus {
  "UNDELIVERED" = 0,
  "PENDING" = 0,
  "PAID" = 1,
  "PROCESSING" = 2,
  "DELIVERING" = 3,
  "DELIVERED" = 4,
}

export type STATUS = "UNDELIVERED" | "PENDING" | "PAID" | "PROCESSING" | "DELIVERING" | "DELIVERED"

export interface Discount {
  id: string;
  productId: string;
  expiryDate: string;
  discountAmount: number;
}

export interface Voucher {
  code: string;
  quantity: number;
  expiredAt: string;
  value: number;
  minimumApplicablePrice: number;
  visibility?: "public" | "protected";
}

export interface DiscountAmount {
  value: number;
  minimumApplicable: number;
}

export interface ResponeOrder {
  id: string;
  products: {
    id: string;
    amount: number;
  }[];
  voucherCode: string;
  customerId: string;
  payment: "PAYPAL" | "COD";
  address: string;
  name: string;
  phone: string;
  email: string;
  status: string
}
