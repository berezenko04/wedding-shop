import { httpDelete, httpPost } from "@/middlewares/axios.middleware";

// types
import { AddToWishlistBody, CheckInWishlistBody, GetAllWishlist } from "./wishlist.types";

const R = {
  wishlist: "/wishlist",
  check: "/wishlist/check",
  removeFromWishlist: (id: string) => `${R.wishlist}/${id}`,
} as const;

const ReviewsService = {
  async addToWishlist(body: AddToWishlistBody) {
    return httpPost<GetAllWishlist>(R.wishlist, body);
  },
  async removeFromWishlist(id: string) {
    return httpDelete<GetAllWishlist>(R.removeFromWishlist(id));
  },
  async checkInWishlist(body: CheckInWishlistBody) {
    return httpPost<string[]>(R.check, body);
  },
};

export default ReviewsService;
