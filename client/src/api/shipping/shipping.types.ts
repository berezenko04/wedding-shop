export type CreateAddressBody = {
  address: string;
  primary: boolean;
};

export type UpdateAddressBody = CreateAddressBody & {
  addressId: string;
};
