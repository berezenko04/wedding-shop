import { Button, Stack } from '@mui/material';

// components
import FilterPrice from './Price';
import FilterSize from './Size';
import FilterByCategory from './Category';

// types
import { Sizes, SortBy } from '@/types/enums.types';

interface FiltersProps {
  filters: {
    priceRange: [number, number];
    size: Sizes | null;
    category: string | null;
    sortBy: SortBy | 'none';
  };
  setFilter: <K extends keyof FiltersProps['filters']>(key: K, value: FiltersProps['filters'][K]) => void;
  clearFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilter, clearFilters }) => {
  return (
    <Stack gap={3}>
      <FilterPrice
        priceRange={filters.priceRange}
        setPriceRange={(priceRange) => setFilter('priceRange', priceRange)}
      />
      <FilterSize size={filters.size} setSize={(size) => setFilter('size', size)} />
      <FilterByCategory category={filters.category} setCategory={(category) => setFilter('category', category)} />
      <Button variant="outlined" color="primary" size="small" onClick={clearFilters}>
        Clear Filters
      </Button>
    </Stack>
  );
};

export default Filters;
