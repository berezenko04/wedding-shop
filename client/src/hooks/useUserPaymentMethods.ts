import { useQuery } from '@tanstack/react-query';

// api
import PaymentService from '@/api/payment/payment.service';

export const useUserPaymentMethods = () => {
  return useQuery({
    queryKey: ['payment'],
    queryFn: PaymentService.getAll,
    staleTime: 5 * 60 * 1000,
  });
};
