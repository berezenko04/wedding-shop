import { httpGet } from "@/middlewares/axios.middleware";

// types
import { GetAllProducts } from "./products.types";

const R = {
  all: "/products",
} as const;

const ProductsService = {
  async getAll() {
    return httpGet<GetAllProducts>(R.all);
  },
};

export default ProductsService;
