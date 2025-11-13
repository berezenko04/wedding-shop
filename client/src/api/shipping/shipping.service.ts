import { httpDelete, httpGet, httpPatch, httpPost } from "@/middlewares/axios.middleware";

// types
import { CreateAddressBody, ShippingAddress, UpdateAddressBody } from "./shipping.types";
import { BaseResponseData } from "@/types/base.types";

const R = {
  address: "/address",
  byIdAddress: (id: string) => `${R.address}/${id}`,
} as const;

const ShippingService = {
  async create(body: CreateAddressBody) {
    return httpPost<ShippingAddress[]>(R.address, body);
  },

  async update(body: UpdateAddressBody) {
    return httpPatch<ShippingAddress[]>(R.address, body);
  },

  async delete(id: string) {
    return httpDelete<BaseResponseData>(R.byIdAddress(id));
  },

  async getAll() {
    return httpGet<ShippingAddress[]>(R.address);
  }
};

export default ShippingService;
