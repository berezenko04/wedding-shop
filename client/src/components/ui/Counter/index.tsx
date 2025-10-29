import { ButtonBase, Stack, Typography } from "@mui/material";

// icons
import { Add, Remove } from "@mui/icons-material";

type CounterProps = {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
};

const Counter: React.FC<CounterProps> = ({ value, onChange, min = 1, max = 10 }) => {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
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
      <ButtonBase onClick={handleDecrease} disabled={value <= min}>
        <Remove />
      </ButtonBase>

      <Typography width={28} textAlign="center">
        {value}
      </Typography>

      <ButtonBase onClick={handleIncrease} disabled={value >= max}>
        <Add />
      </ButtonBase>
    </Stack>
  );
};

export default Counter;
