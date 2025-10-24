import { httpGet } from "@/middlewares/axios.middleware";

// types
import { GetAllProductParams, GetAllProducts } from "./products.types";

const R = {
  all: "/products",
} as const;

const ProductsService = {
  async getAll(params: GetAllProductParams) {
    return httpGet<GetAllProducts>(R.all, { params });
  },
};

export default ProductsService;
