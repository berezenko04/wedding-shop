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
              <Box component="img" src={`/payment/${selectedMethod?.images[0]}`} />
              <Typography>{selectedMethod?.label}</Typography>
            </Stack>
          );
        }}
      >
        {paymentMethodsList.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
              <Box component="img" src={`/payment/${option.images[0]}`} />
            </ListItemIcon>
            <ListItemText primary={option.label} sx={{ ml: 1 }} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PaymentMethodsList;
