import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

// api
import CartService from '@/api/cart/cart.service';

// redux
import { authSelector } from '@/redux/auth/auth.selectors';

export const useCart = () => {
  const { isAuth } = useSelector(authSelector);

  return useQuery({
    queryKey: ['cart'],
    queryFn: CartService.getAll,
    enabled: isAuth,
    staleTime: Infinity,
  });
};
