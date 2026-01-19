import { useQuery } from '@tanstack/react-query';

// api
import ShippingService from '@/api/shipping/shipping.service';

export const useUserShippingAddresses = () => {
  return useQuery({
    queryKey: ['shipping'],
    queryFn: ShippingService.getAll,
    staleTime: 5 * 60 * 1000,
  });
};
