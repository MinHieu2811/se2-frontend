import { CustomerAddress } from "../model/address";

export function initAddress(address?: CustomerAddress): CustomerAddress {
  return {
    country: 'United States',
    email: address?.email ?? '',
    name: address?.name ?? '',
    address: address?.address ?? '',
    city: address?.city ?? '',
    phone: address?.phone ?? ''
  }
}