import { httpDelete, httpGet, httpPost } from "@/middlewares/axios.middleware";

// types
import { AddPaymentMethod, PaymentMethod } from "./payment.types";
import { BaseResponseData } from "@/types/base.types";

const R = {
  payment: "/payment",
  byIdPayment: (id: string) => `${R.payment}/${id}`,
} as const;

const PaymentService = {
  async create(body: AddPaymentMethod) {
    return httpPost<PaymentMethod[]>(R.payment, body);
  },

  async getAll() {
    return httpGet<PaymentMethod[]>(R.payment);
  },

  async delete(id: string) {
    return httpDelete<BaseResponseData>(R.byIdPayment(id));
  },
};

export default PaymentService;
