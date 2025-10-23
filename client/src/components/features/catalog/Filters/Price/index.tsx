import { Slider, Box, Typography, Stack } from "@mui/material";

// components
import FilterItem from "../FilterItem";

export type FilterPriceProps = {
  priceRange: number[];
  setPriceRange: (v: number[]) => void;
};

const FilterPrice: React.FC<FilterPriceProps> = ({ priceRange, setPriceRange }) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  const handleCommit = (event: React.SyntheticEvent | Event, value: number | number[]) => {};

  return (
    <FilterItem title="At a Price">
      <Box>
        <Box mx={0.75}>
          <Slider
            value={priceRange}
            onChange={handleChange}
            onChangeCommitted={handleCommit}
            valueLabelDisplay="off"
            size="small"
            min={0}
            max={2000}
            sx={{ pb: 0.5 }}
          />
        </Box>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Typography fontSize={14}>{priceRange[0]} USD</Typography>
          <Typography fontSize={14}>{priceRange[1]} USD</Typography>
        </Stack>
      </Box>
    </FilterItem>
  );
};

export default FilterPrice;
