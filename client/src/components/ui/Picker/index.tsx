import { Grid, Stack } from "@mui/material";

// components
import PickerItem from "./Item";

export type PickerItemType<T = string | number> = T | { label: string; value: T };

type PickerProps<T = string | number> = {
  items: readonly PickerItemType<T>[];
  value: T | null;
  onChange: (v: T | null) => void;
  columns?: number;
};

const Picker = <T extends string | number>({ items, value, onChange, columns = 3 }: PickerProps<T>) => {
  const handlePick = (itemValue: T) => {
    onChange(itemValue);
  };

  return (
    <Stack role="radiogroup" gap={1}>
      <Grid container spacing={1}>
        {items?.map((item) => {
          const itemValue = typeof item === "object" ? item.value : item;
          const itemLabel = typeof item === "object" ? item.label : String(item);

          return (
            <Grid key={String(itemValue)} size={{ xs: 12 / columns }}>
              <PickerItem value={itemValue} isSelected={value === itemValue} onSelect={handlePick}>
                {itemLabel}
              </PickerItem>
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default Picker;
