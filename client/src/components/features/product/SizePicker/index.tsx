import { Grid, Stack } from "@mui/material";

// components
import SizePickerItem from "./Item";

// types
import { Sizes } from "@/types/enums.types";

type SizePickerProps = {
  value: Sizes | null;
  onChange: (v: Sizes | null) => void;
};

const SizePicker: React.FC<SizePickerProps> = ({ value, onChange }) => {
  const handlePickSize = (size: Sizes) => {
    if (value === size) {
      onChange(null);
    } else {
      onChange(size);
    }
  };

  return (
    <Stack role="radiogroup" gap={1}>
      <Grid container spacing={1}>
        {Object.values(Sizes).map((size) => (
          <Grid key={size} size={{ xs: 4 }}>
            <SizePickerItem
              size={size as Sizes}
              isSelected={value === size}
              setIsSelected={() => handlePickSize(size)}
            />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
export default SizePicker;
