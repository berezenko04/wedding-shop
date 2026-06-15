import { ButtonBase, Stack, Typography } from "@mui/material";

// icons
import { Add, Remove } from "@mui/icons-material";

type Props = {
  value: number;
  onChange: (v: -1 | 1) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
};

const Counter: React.FC<Props> = ({ value, onChange, disabled, min = 1, max = 10 }) => {
  const handleDecrease = () => {
    if (value > min) onChange(-1);
  };

  const handleIncrease = () => {
    if (value < max) onChange(1);
  };

  return (
    <Stack
      flexDirection="row"
      gap={0.5}
      alignItems="center"
      p={0.5}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.grey[200]}`,
        width: 94,
        height: 32,
        userSelect: "none",
      })}
    >
      <ButtonBase onClick={handleDecrease} disabled={disabled || value <= min}>
        <Remove />
      </ButtonBase>

      <Typography width={28} textAlign="center">
        {value}
      </Typography>

      <ButtonBase onClick={handleIncrease} disabled={disabled || value >= max}>
        <Add />
      </ButtonBase>
    </Stack>
  );
};

export default Counter;
