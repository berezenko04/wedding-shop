import { httpGet } from "@/middlewares/axios.middleware";

// types
import { GetAllReviews } from "./reviews.types";
import { Pagination } from "@/types/base.types";

const R = {
  getByProduct: (id: string) => `/reviews/product/${id}`,
} as const;

const ReviewsService = {
  async getByProduct(id: string, params: Pagination) {
    return httpGet<GetAllReviews>(R.getByProduct(id), { params });
  },
};

export default ReviewsService;
