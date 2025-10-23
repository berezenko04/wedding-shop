import { Stack } from "@mui/material";

// components
import FilterPrice, { FilterPriceProps } from "./Price";

type FiltersProps = FilterPriceProps & {};

const Filters: React.FC<FiltersProps> = ({ priceRange, setPriceRange }) => {
  return (
    <Stack gap={3}>
      <FilterPrice priceRange={priceRange} setPriceRange={setPriceRange} />
    </Stack>
  );
};

export default Filters;
