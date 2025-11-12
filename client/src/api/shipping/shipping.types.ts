export type CreateAddressBody = {
  address: string;
  primary: boolean;
};

export type UpdateAddressBody = CreateAddressBody & {
  addressId: string;
};

export type ShippingAddress = {
  id: string;
  address: string;
  primary: boolean;
};
