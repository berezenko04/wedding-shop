import { Badge, Box, Button, IconButton, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

// components
import Logo from "../Logo";
import Searchbar from "./Searchbar";
import CustomContainer from "@/components/ui/layout/CustomContainer";
import Cart from "@/components/features/cart/Cart";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// api
import CartService from "@/api/cart/cart.service";
import WishlistService from "@/api/wishlist/wishlist.service";

// icons
import { FavoriteBorderOutlined, LocalMallOutlined, PersonOutline, StorefrontOutlined } from "@mui/icons-material";

// types
import { GetAllWishlist } from "@/api/wishlist/wishlist.types";

// constants
import { PAGE_LIMIT } from "@/constants";

const Header: React.FC = () => {
  const { isAuth } = useSelector(authSelector);

  const [isCartOpened, setIsCartOpened] = useState<boolean>(false);

  const { data: cart = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => await CartService.getAll(),
    staleTime: Infinity,
    enabled: isAuth,
  });

  const { data: wishlist } = useQuery<GetAllWishlist>({
    queryKey: ["wishlist"],
    queryFn: async () => await WishlistService.getAll({ page: 1, limit: PAGE_LIMIT }),
    staleTime: Infinity,
    enabled: isAuth,
  });

  return (
    <Box component="header">
      <CustomContainer>
        <Stack component="header" flexDirection="row" gap={3} py={2} justifyContent="space-between" alignItems="center">
          <Logo />
          <Button
            startIcon={<StorefrontOutlined />}
            size="small"
            color="grey"
            variant="outlined"
            href="/catalog"
            sx={{ textTransform: "none" }}
          >
            Catalog
          </Button>
          <Searchbar />
          {isAuth ? (
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <IconButton href="/profile/wishlist">
                <Badge color="primary" badgeContent={wishlist?.total}>
                  <FavoriteBorderOutlined />
                </Badge>
              </IconButton>
              <IconButton onClick={() => setIsCartOpened(true)}>
                <Badge color="primary" badgeContent={cart.reduce((acc, i) => acc + i.quantity, 0)}>
                  <LocalMallOutlined />
                </Badge>
              </IconButton>
              <Button href="/profile" variant="iconary" color="grey">
                <PersonOutline />
              </Button>
            </Stack>
          ) : (
            <Stack flexDirection="row" gap={2} alignItems="center">
              <Button href="/register" color="primary" variant="outlined" size="small">
                Sign Up
              </Button>
              <Button href="/login" color="primary" variant="contained" size="small">
                Sign In
              </Button>
            </Stack>
          )}
        </Stack>
      </CustomContainer>
      {isAuth && <Cart isOpened={isCartOpened} handleClose={() => setIsCartOpened(false)} />}
    </Box>
  );
};

export default Header;
