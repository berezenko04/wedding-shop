import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

// api
import WishlistService from "@/api/wishlist/wishlist.service";
import UserService from "@/api/user/user.service";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// constants
import { PAGE_LIMIT } from "@/constants";

export const AppLayout = () => {
  const { isAuth } = useSelector(authSelector);

  useQuery({
    queryKey: ["user"],
    queryFn: UserService.getMe,
    enabled: isAuth,
  });

  useQuery({
    queryKey: ["wishlist", { page: 1, limit: PAGE_LIMIT }],
    queryFn: () => WishlistService.getAll({ page: 1, limit: PAGE_LIMIT }),
    enabled: isAuth,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  });

  useQuery({
    queryKey: ["wishlistCheck"],
    queryFn: WishlistService.checkInWishlist,
    enabled: isAuth,
    staleTime: 1000 * 60 * 5,
  });

  return <Outlet />;
};

export default AppLayout;
