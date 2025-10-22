import { httpGet } from "@/middlewares/axios.middleware";

// types
import { BaseResponseData } from "@/types/base.types";

const R = {
  all: "/products",
} as const;

const ProductsService = {
  async getAll() {
    return httpGet<BaseResponseData>(R.all);
  },
};

export default ProductsService;
