import { Grid, Stack } from '@mui/material';

// components
import PickerItem from './Item';

export type PickerItemType<T = string | number> = T | { label: string; value: T };

type PickerProps<T = string | number> = {
  items: readonly PickerItemType<T>[];
  value: T | null;
  onChange: (v: T | null) => void;
  columns?: number;
  isFullLengthLast?: boolean;
  showRadio?: boolean;
  size?: 'small' | 'large';
};

const Picker = <T extends string | number>({
  items,
  value,
  onChange,
  columns = 3,
  isFullLengthLast = false,
  showRadio = false,
  size = 'small',
}: PickerProps<T>) => {
  const handlePick = (itemValue: T) => {
    onChange(itemValue === value ? null : itemValue);
  };

  return (
    <Stack role="radiogroup" gap={1}>
      <Grid container spacing={1}>
        {items?.map((item, index) => {
          const itemValue = typeof item === 'object' ? item.value : item;
          const itemLabel = typeof item === 'object' ? item.label : String(item);

          const isLast = index === items.length - 1;
          const isNotFullRow = items.length % columns !== 0;

          const isFullWidth = isFullLengthLast && isLast && isNotFullRow;

          return (
            <Grid
              key={String(itemValue)}
              size={{
                xs: isFullWidth ? 12 : 12 / columns,
              }}
            >
              <PickerItem
                showRadio={showRadio}
                value={itemValue}
                isSelected={value === itemValue}
                onSelect={handlePick}
                size={size}
              >
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
