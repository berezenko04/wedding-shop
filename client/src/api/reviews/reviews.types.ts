import { Rating } from "@/types/enums.types";

export type Review = {
  id: string;
  user: {
    firstName: string;
    lastName: string;
  };
  product: {
    title: string;
    slug: string;
  };
  comment: string;
  rating: Rating;
  createdAt: Date;
};

export type GetAllReviews = {
  reviews: Review[];
  total: number;
};

export type ProductRatings = {
  averageRating: number;
  totalVotes: number;
  distribution: Record<Rating, number>;
};

export type CreateReviewBody = {
  productId: string;
  comment: string;
  rating: Rating;
};
