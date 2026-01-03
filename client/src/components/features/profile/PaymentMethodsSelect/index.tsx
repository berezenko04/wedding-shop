import { Box, FormControl, ListItemIcon, ListItemText, MenuItem, Select, Stack, Typography } from "@mui/material";

// types
import { PaymentMethods } from "@/types/enums.types";

// data
import { paymentMethodsList } from "@/data/main";

type PaymentMethodsListProps = {
  value: PaymentMethods;
  onChange: (i: PaymentMethods) => void;
};

const PaymentMethodsList: React.FC<PaymentMethodsListProps> = ({ value, onChange }) => {
  return (
    <FormControl fullWidth>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        renderValue={(selected) => {
          const selectedMethod = paymentMethodsList.find((m) => m.value === selected);
          return (
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1.5 }}>
              <Box component="img" src={`/payment/${selectedMethod?.images[0]}`} sx={{ maxWidth: 28 }} />
              <Typography textTransform="none">{selectedMethod?.label}</Typography>
            </Stack>
          );
        }}
      >
        {paymentMethodsList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
              <Box component="img" src={`/payment/${option.images[0]}`} sx={{ maxWidth: 28 }} />
            </ListItemIcon>
            <ListItemText sx={{ textTransform: "none", ml: 1 }} primary={option.label} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PaymentMethodsList;
