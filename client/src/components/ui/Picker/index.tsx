import { Grid, Stack } from "@mui/material";

// components
import PickerItem from "./Item";

type PickerProps<T = string | number> = {
  items: readonly T[];
  value: T | null;
  onChange: (v: T | null) => void;
  columns?: number;
};

const Picker = <T extends string | number>({ items, value, onChange, columns = 3 }: PickerProps<T>) => {
  const handlePick = (item: T) => {
    onChange(value === item ? null : item);
  };

  return (
    <Stack role="radiogroup" gap={1}>
      <Grid container spacing={1}>
        {items.map((item) => (
          <Grid key={String(item)} size={{ xs: 12 / columns }}>
            <PickerItem value={item} isSelected={value === item} onSelect={handlePick} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default Picker;
