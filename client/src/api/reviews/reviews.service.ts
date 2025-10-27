import { httpGet } from "@/middlewares/axios.middleware";

// types
import { GetAllReviews, ProductRatings } from "./reviews.types";
import { Pagination } from "@/types/base.types";

const R = {
  getByProduct: (id: string) => `/reviews/product/${id}`,
  getRatingsByProduct: (id: string) => `/reviews/product/${id}/ratings`,
} as const;

const ReviewsService = {
  async getByProduct(id: string, params: Pagination) {
    return httpGet<GetAllReviews>(R.getByProduct(id), { params });
  },
  async getProductRatings(id: string) {
    return httpGet<ProductRatings>(R.getRatingsByProduct(id));
  },
};

export default ReviewsService;
