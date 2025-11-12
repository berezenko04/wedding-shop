import { httpGet } from "@/middlewares/axios.middleware";

// types
import { CreateAddressBody, UpdateAddressBody } from "./shipping.types";
import { BaseResponseData } from "@/types/base.types";

const R = {
  address: "/address",
} as const;

const ShippingService = {
  async create(body: CreateAddressBody) {
    return httpGet<BaseResponseData>(R.address, body);
  },

  async update(body: UpdateAddressBody) {
    return httpGet<BaseResponseData>(R.address, body);
  },
};

export default ShippingService;
