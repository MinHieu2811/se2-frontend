import { CustomerAddress } from "../model/address";

export function initAddress(address?: CustomerAddress): CustomerAddress {
  return {
    country: 'United States',
    email: address?.email ?? '',
    first_name: address?.first_name ?? '',
    last_name: address?.last_name ?? '',
    address: address?.address ?? '',
    city: address?.city ?? '',
    phone: address?.phone ?? ''
  }
}