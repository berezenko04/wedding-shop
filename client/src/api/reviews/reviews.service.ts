import { httpGet, httpPost } from "@/middlewares/axios.middleware";

// types
import { CreateReviewBody, GetAllReviews, ProductRatings } from "./reviews.types";
import { BaseResponseData, Pagination } from "@/types/base.types";

const R = {
  getByProduct: (id: string) => `/reviews/product/${id}`,
  getRatingsByProduct: (id: string) => `/reviews/product/${id}/ratings`,
  createReview: `/reviews`,
} as const;

const ReviewsService = {
  async getByProduct(id: string, params: Pagination) {
    return httpGet<GetAllReviews>(R.getByProduct(id), { params });
  },
  async getProductRatings(id: string) {
    return httpGet<ProductRatings>(R.getRatingsByProduct(id));
  },
  async createReview(body: CreateReviewBody) {
    return httpPost<BaseResponseData>(R.createReview, body);
  },
};

export default ReviewsService;
