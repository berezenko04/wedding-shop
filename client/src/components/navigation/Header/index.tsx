import { Badge, Box, Button, IconButton, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// components
import Logo from '../Logo';
import Searchbar from './Searchbar';
import CustomContainer from '@/components/ui/layout/CustomContainer';
import Cart from '@/components/features/cart/Cart';

// hooks
import { useCart } from '@/hooks/useCart';

// api
import WishlistService from '@/api/wishlist/wishlist.service';

// redux
import { authSelector } from '@/redux/auth/auth.selectors';

// types
import { GetAllWishlist } from '@/api/wishlist/wishlist.types';

// icons
import { FavoriteBorderOutlined, LocalMallOutlined, PersonOutline, StorefrontOutlined } from '@mui/icons-material';

// constants
import { PAGE_LIMIT } from '@/constants';

const Header: React.FC = () => {
  const queryClient = useQueryClient();
  const { isAuth } = useSelector(authSelector);

  const [isCartOpened, setIsCartOpened] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: cart = [] } = useCart();

  const { data: wishlistTotal = 0 } = useQuery<GetAllWishlist, Error, number>({
    queryKey: ['wishlist', { page: 1, limit: PAGE_LIMIT }],
    queryFn: () => WishlistService.getAll({ page: 1, limit: PAGE_LIMIT }),
    select: (res) => res.total ?? 0,
    placeholderData: () =>
      queryClient.getQueryData<GetAllWishlist>(['wishlist', { page: 1, limit: PAGE_LIMIT }]) ?? {
        wishlist: [],
        total: 0,
      },
    staleTime: 60000,
    enabled: isAuth,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      component="header"
      position="sticky"
      py={2}
      sx={{
        top: 0,
        left: 0,
        backgroundColor: 'common.white',
        zIndex: 100,
        transition: 'box-shadow 0.3s',
        boxShadow: scrolled ? 2 : 0,
      }}
    >
      <CustomContainer>
        <Stack flexDirection="row" gap={3} justifyContent="space-between" alignItems="center">
          <Logo />
          <Button
            startIcon={<StorefrontOutlined />}
            size="small"
            color="grey"
            variant="outlined"
            href="/catalog"
            sx={{ textTransform: 'none' }}
          >
            Catalog
          </Button>
          <Searchbar />
          {isAuth ? (
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <IconButton href="/profile/wishlist">
                <Badge color="primary" badgeContent={wishlistTotal}>
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
