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
  "PENDING" = 0,
  "PAID" = 1,
  "PROCESSING" = 2,
  "DELIVERING" = 3,
  "DELIVERED" = 4,
}

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
  discountAmount: DiscountAmount;
}

export interface DiscountAmount {
  value: number;
  minimumApplicable: number;
}
