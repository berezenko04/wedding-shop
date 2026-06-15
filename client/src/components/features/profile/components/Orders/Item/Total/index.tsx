import { Stack, Typography } from '@mui/material';

type Props = {
  subtotal: number;
  shipmentCost: number;
  grandTotal: number;
};

const OrderTotal: React.FC<Props> = ({ subtotal, shipmentCost, grandTotal }) => {
  const rows = [
    { title: 'Subtotal', value: subtotal },
    { title: 'Shipment cost', value: shipmentCost },
    { title: 'Grand total', value: grandTotal },
  ];

  return (
    <Stack sx={(theme) => ({ border: `1px solid ${theme.palette.grey[50]}`, p: 2, gap: 1 })}>
      {rows.map(({ title, value }) => (
        <Stack key={title} flexDirection="row" alignItems="center" gap={2}>
          <Typography width={140}>{title}:</Typography>
          <Typography>{value?.toFixed(2)} USD</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default OrderTotal;
