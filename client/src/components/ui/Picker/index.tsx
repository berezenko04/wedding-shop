import { Grid, GridBaseProps, Stack } from '@mui/material';

// components
import PickerItem from './Item';

type PickerItemType<T = string | number> = T | { label: string; value: T };

type PickerProps<T = string | number> = {
  items: readonly PickerItemType<T>[];
  value: T | null;
  onChange: (v: T | null) => void;
  columns?: number;
  isFullLengthLast?: boolean;
  showRadio?: boolean;
  size?: 'small' | 'large';
  gridItemSize?: GridBaseProps['size'];
};

const Picker = <T extends string | number>({
  items,
  value,
  onChange,
  columns = 3,
  isFullLengthLast = false,
  showRadio = false,
  size = 'small',
  gridItemSize,
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

          const currentGridItemSize = gridItemSize || {
            xs: isFullWidth ? 12 : Math.floor(12 / columns),
          };

          return (
            <Grid key={String(itemValue)} size={currentGridItemSize}>
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
