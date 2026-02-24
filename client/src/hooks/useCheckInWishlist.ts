import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

// api
import WishlistService from "@/api/wishlist/wishlist.service";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

export const useCheckInWishlist = () => {
  const { isAuth } = useSelector(authSelector);

  return useQuery({
    queryKey: ["checkInWishlist"],
    queryFn: WishlistService.checkInWishlist,
    enabled: isAuth,
  });
};
