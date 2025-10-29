import { httpGet } from "@/middlewares/axios.middleware";

// types
import { GetAllProductParams, GetAllProducts, ProductExtended } from "./products.types";

const R = {
  products: "/products",
  getBySlug: (slug: string) => `${R.products}/by-slug/${slug}`,
} as const;

const ProductsService = {
  async getAll(params: GetAllProductParams) {
    return httpGet<GetAllProducts>(R.products, { params });
  },

  async get(slug: string) {
    return httpGet<ProductExtended>(R.getBySlug(slug));
  },
};

export default ProductsService;
