import { Box, Radio, Stack, Typography, useRadioGroup } from "@mui/material";

// types
import { PaymentMethods } from "@/types/enums.types";

type PaymentMethodItemProps = {
  label: string;
  value: PaymentMethods;
  images: string[];
};

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ label, value, images }) => {
  const radioGroup = useRadioGroup();
  const selected = radioGroup?.value === value;

  return (
    <Stack
      onClick={() =>
        radioGroup?.onChange?.(
          {
            target: { value },
          } as React.ChangeEvent<HTMLInputElement>,
          value
        )
      }
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      p={2}
      sx={(theme) => ({
        width: "100%",
        height: 56,
        borderRadius: 2,
        border: `1px solid ${selected ? theme.palette.primary.main : theme.palette.grey[200]}`,
        cursor: "pointer",
        userSelect: "none",
        transition: "0.2s",
      })}
    >
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Radio checked={selected} value={value} />
        <Typography fontWeight={500} textTransform="uppercase" fontSize={16}>
          {label}
        </Typography>
      </Stack>

      <Stack flexDirection="row" alignItems="center" gap={1}>
        {images.map((img, idx) => (
          <Stack
            key={idx}
            alignItems="center"
            justifyContent="center"
            sx={(theme) => ({
              width: 34,
              height: 24,
              borderRadius: 1,
              border: `1px solid ${theme.palette.grey[200]}`,
            })}
          >
            <Box component="img" src={`/payment/${img}`} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default PaymentMethodItem;
