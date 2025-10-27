import { httpGet } from "@/middlewares/axios.middleware";

// types
import { GetAllProductParams, GetAllProducts, ProductExtended } from "./products.types";

const R = {
  all: "/products",
  getBySlug: (slug: string) => `/products/by-slug/${slug}`,
} as const;

const ProductsService = {
  async getAll(params: GetAllProductParams) {
    return httpGet<GetAllProducts>(R.all, { params });
  },

  async get(slug: string) {
    return httpGet<ProductExtended>(R.getBySlug(slug));
  },
};

export default ProductsService;
