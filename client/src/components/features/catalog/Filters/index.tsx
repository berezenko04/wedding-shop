import { Stack } from "@mui/material";

// components
import FilterPrice from "./Price";
import FilterSize from "./Size";
import FilterBySex from "./Sex";

// types
import { Sex, Sizes, SortBy } from "@/types/enums.types";

interface FiltersProps {
  filters: {
    priceRange: [number, number];
    size: Sizes | null;
    sex: Sex | null;
    sortBy: SortBy | "none";
  };
  setFilter: <K extends keyof FiltersProps["filters"]>(key: K, value: FiltersProps["filters"][K]) => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilter }) => {
  return (
    <Stack gap={3}>
      <FilterPrice
        priceRange={filters.priceRange}
        setPriceRange={(priceRange) => setFilter("priceRange", priceRange)}
      />
      <FilterSize size={filters.size} setSize={(size) => setFilter("size", size)} />
      <FilterBySex sex={filters.sex} setSex={(sex) => setFilter("sex", sex)} />
    </Stack>
  );
};

export default Filters;
