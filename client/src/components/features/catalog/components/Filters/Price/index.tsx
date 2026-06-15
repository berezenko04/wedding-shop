import { Slider, Box, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';

// components
import FilterItem from '../FilterItem';

type Props = {
  priceRange: [number, number];
  setPriceRange: (v: [number, number]) => void;
};

const FilterPrice: React.FC<Props> = ({ priceRange, setPriceRange }) => {
  const [localRange, setLocalRange] = useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalRange(priceRange);
  }, [priceRange]);

  const handlePriceRangeChange = (_: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;
    setLocalRange(newValue as [number, number]);
  };

  const handleCommit = (_: Event | React.SyntheticEvent, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return;
    setPriceRange(newValue as [number, number]);
  };

  return (
    <FilterItem title="By Price">
      <Box>
        <Box mx={0.75}>
          <Slider
            value={localRange}
            onChange={handlePriceRangeChange}
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
