import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';

// api
import WishlistService from '@/api/wishlist/wishlist.service';

// redux
import { authSelector } from '@/redux/auth/auth.selectors';

// data
import { PAGE_LIMIT } from '@/data/main';

const AppLayout = () => {
  const { isAuth } = useSelector(authSelector);

  useQuery({
    queryKey: ['wishlist', { page: 1, limit: PAGE_LIMIT }],
    queryFn: () => WishlistService.getAll({ page: 1, limit: PAGE_LIMIT }),
    enabled: isAuth,
    refetchOnWindowFocus: false,
  });

  return <Outlet />;
};

export default AppLayout;
