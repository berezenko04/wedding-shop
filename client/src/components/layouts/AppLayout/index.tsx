import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

// api
import WishlistService from "@/api/wishlist/wishlist.service";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

export const AppLayout = () => {
  const { isAuth } = useSelector(authSelector);

  useQuery({
    queryKey: ["wishlistCheck"],
    queryFn: WishlistService.checkInWishlist,
    enabled: isAuth,
    staleTime: 1000 * 60 * 5,
  });

  return <Outlet />;
};

export default AppLayout;
