import { PaymentMethods } from "@/types/enums.types";

export type AddPaymentMethod = Omit<PaymentMethod, "id"> & {
  method: PaymentMethods;
  primary: boolean;
  email?: string;
  cardNumber?: string;
  cardExp?: string;
  cardCvv?: string;
  cardHolder?: string;
};

export type PaymentMethod = {
  id: string;
  method: PaymentMethods;
  primary: boolean;
  email?: string;
  last4?: string;
  cardHolder?: string;
  createdAt: Date;
};
