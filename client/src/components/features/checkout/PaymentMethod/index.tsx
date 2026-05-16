import { Stack, Typography } from '@mui/material';

// components
import OutlinedBlock from '@/components/ui/layout/OutlinedBlock';
import EditButton from '@/components/ui/buttons/Edit';
import Picker from '@/components/ui/Picker';

// hooks
import { useUserPaymentMethods } from '@/hooks/useUserPaymentMethods';

type PaymentMethodProps = {
  paymentMethod: string;
  onChange: (i: string | null) => void;
};

const PaymentMethod: React.FC<PaymentMethodProps> = ({ paymentMethod, onChange }) => {
  const { data: paymentMethods } = useUserPaymentMethods();

  return (
    <OutlinedBlock sx={{ gap: 2 }}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
        <Typography variant="medium" textTransform="uppercase">
          Payment Method
        </Typography>
        <EditButton href="/profile/payment" />
      </Stack>
      {paymentMethods ? (
        <Stack gap={1}>
          <Picker
            showRadio
            size="large"
            items={paymentMethods?.map((i) => ({ value: i.id, label: i.method }))}
            value={paymentMethod}
            onChange={onChange}
            gridItemSize={{ xs: 12, lg: 4 }}
          />
        </Stack>
      ) : (
        <></>
      )}
    </OutlinedBlock>
  );
};

export default PaymentMethod;
