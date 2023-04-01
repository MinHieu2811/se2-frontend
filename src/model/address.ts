export interface CustomerAddress {
  email?: string;
  phone?: string;
  last_name?: string;
  first_name?: string;
  address?: string;
  city?: string;
  country?: string;
}

export type AddressErrors = CustomerAddress