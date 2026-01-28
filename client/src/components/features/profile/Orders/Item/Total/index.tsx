import { Stack, Typography } from '@mui/material';

type OrderTotalProps = {
  subtotal: number;
  shipmentCost: number;
  grandTotal: number;
};

const OrderTotal: React.FC<OrderTotalProps> = ({ subtotal, shipmentCost, grandTotal }) => {
  const rows = [
    { title: 'Subtotal', value: subtotal },
    { title: 'Shipment cost', value: shipmentCost },
    { title: 'Grand total', value: grandTotal },
  ];

  return (
    <Stack sx={(theme) => ({ border: `1px solid ${theme.palette.grey[50]}`, p: 2, gap: 1 })}>
      {rows.map((row, idx) => (
        <Stack key={idx} flexDirection="row" alignItems="center" gap={2}>
          <Typography width={140}>{row.title}:</Typography>
          <Typography>{row.value?.toFixed(2)} USD</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default OrderTotal;
