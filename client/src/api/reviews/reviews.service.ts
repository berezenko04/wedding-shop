import { httpGet, httpPost } from "@/middlewares/axios.middleware";

// types
import { CreateReviewBody, GetAllReviews, ProductRatings } from "./reviews.types";
import { BaseResponseData, Pagination } from "@/types/base.types";

const R = {
  reviews: "/reviews",
  myReviews: "/reviews/my",
  byProduct: (id: string) => `${R.reviews}/product/${id}`,
  ratingsByProduct: (id: string) => `${R.reviews}/product/${id}/ratings`,
} as const;

const ReviewsService = {
  async getByProduct(id: string, params: Pagination) {
    return httpGet<GetAllReviews>(R.byProduct(id), { params });
  },
  async getMyReviews(params: Pagination) {
    return httpGet<GetAllReviews>(R.myReviews, { params });
  },
  async getProductRatings(id: string) {
    return httpGet<ProductRatings>(R.ratingsByProduct(id));
  },
  async createReview(body: CreateReviewBody) {
    return httpPost<BaseResponseData>(R.reviews, body);
  },
};

export default ReviewsService;
