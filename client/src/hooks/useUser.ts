import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

// api
import UserService from '@/api/user/user.service';

// redux
import { authSelector } from '@/redux/auth/auth.selectors';

export const useUser = () => {
  const { isAuth } = useSelector(authSelector);
  return useQuery({
    queryKey: ['user'],
    queryFn: UserService.getMe,
    enabled: isAuth,
  });
};
