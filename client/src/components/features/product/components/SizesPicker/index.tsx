import { Grid, Stack } from '@mui/material';

// components
import PickerItem from '@/components/ui/Picker/Item';

// types
import { Sizes } from '@/types/enums.types';

type SizesPickerProps = {
  initialItems: Sizes[];
  items: Sizes[];
  selectedSize?: Sizes;
  onSelectSize: (v: Sizes) => void;
};

const SizesPicker: React.FC<SizesPickerProps> = ({ initialItems, items, selectedSize, onSelectSize }) => {
  const handlePick = (value: Sizes) => {
    if (selectedSize !== value) onSelectSize(value);
  };

  return (
    <Stack role="radiogroup" gap={1}>
      <Grid container spacing={1}>
        {initialItems?.map((size) => (
          <Grid key={size} size={{ xs: 12 / 3, md: 12 / 4, lg: 12 / 5 }}>
            <PickerItem
              size="small"
              value={size}
              isSelected={selectedSize === size}
              disabled={!items.includes(size)}
              onSelect={handlePick}
            >
              {size}
            </PickerItem>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default SizesPicker;
