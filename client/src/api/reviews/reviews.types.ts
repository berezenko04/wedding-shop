import { Rating } from "@/types/enums.types";

export type Review = {
  id: string;
  userId: string;
  comment: string;
  rating: Rating;
};

export type GetAllReviews = {
  reviews: Review[];
  total: number;
};
