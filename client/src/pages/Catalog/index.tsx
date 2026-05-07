import { Button, Drawer, Grid, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';

// components
import CatalogSort from '@/components/features/catalog/Sort';
import Filters from '@/components/features/catalog/Filters';
import ProductsGridLayout from '@/components/ui/layout/ProductsLayout';

// hooks
import { Filters as FiltersType, useProducts } from '@/hooks/useProducts';

// types
import { Sizes, SortBy } from '@/types/enums.types';

// icons
import { Close, FilterList, SearchOff } from '@mui/icons-material';

// constants
import { PAGE_LIMIT } from '@/constants';

const CatalogPage: React.FC = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);

  const pageParam = Number(searchParams.get('page')) || 1;
  const sortByParam = (searchParams.get('sortBy') as SortBy) || 'none';
  const minPrice = Number(searchParams.get('minPrice')) || 0;
  const maxPrice = Number(searchParams.get('maxPrice')) || 2000;
  const size = (searchParams.get('size') as Sizes) || null;
  const category = searchParams.get('category') || undefined;

  const { products, total, page, filters, clearFilters, setPage, setFilter, isLoading } = useProducts({
    page: pageParam,
    sortBy: sortByParam,
    minPrice,
    maxPrice,
    size,
    category,
  });

  const updateSearchParam = (key: string, value?: string | number | null) => {
    const updated = new URLSearchParams(searchParams);

    if (value === null || value === undefined || value === 'none') {
      updated.delete(key);
    } else {
      updated.set(key, String(value));
    }

    setSearchParams(updated);
  };

  const handleFilterChange = (key: keyof FiltersType, value: any) => {
    setFilter(key, value);
    updateSearchParam(key, value);
    updateSearchParam('page', 1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    updateSearchParam('page', newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchParams({});
  };

  useEffect(() => {
    const params = new URLSearchParams();

    params.set('page', String(page));
    if (filters.sortBy && filters.sortBy !== 'none') params.set('sortBy', filters.sortBy);
    if (filters.priceRange) {
      params.set('minPrice', String(filters.priceRange[0]));
      params.set('maxPrice', String(filters.priceRange[1]));
    }
    if (filters.size) params.set('size', filters.size);
    if (filters.category) params.set('category', filters.category);

    setSearchParams(params);
  }, [filters, setSearchParams, page]);

  return (
    <Stack gap={4}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
        <Typography variant="h3">Products ({total})</Typography>
        <Stack flexDirection="row" alignItems="center" gap={1}>
          {!isLgUp && (
            <Button startIcon={<FilterList />} color="grey" size="small" onClick={() => setFiltersOpen(true)}>
              Filters
            </Button>
          )}
          <CatalogSort value={filters.sortBy} onChange={(sortBy) => handleFilterChange('sortBy', sortBy)} />
        </Stack>
      </Stack>
      <Grid container spacing={4}>
        {isLgUp && (
          <Grid size={{ xs: 2 }}>
            <Filters filters={filters} setFilter={handleFilterChange} clearFilters={handleClearFilters} />
          </Grid>
        )}
        <Grid size={{ xs: 12, lg: 10 }}>
          <ProductsGridLayout
            isLoading={isLoading}
            items={products}
            total={total}
            pagesTotal={Math.ceil(total / PAGE_LIMIT)}
            page={page}
            onPageChange={handlePageChange}
            emptyStateTitle="Nothing found for your request"
            emptyStateDescription="Your search did not match any results. Try clearing the filters"
            emptyStateIcon={SearchOff}
            emptyStateAdditional={
              <Button variant="outlined" color="grey" size="small" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            }
          />
        </Grid>
      </Grid>
      {!isLgUp && (
        <Drawer
          anchor="left"
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          slotProps={{
            paper: {
              sx: { width: { xs: '100%', sm: 360 }, p: 3 },
            },
          }}
        >
          <Stack flexDirection="row" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h3">Filters</Typography>
            <IconButton onClick={() => setFiltersOpen(false)}>
              <Close />
            </IconButton>
          </Stack>
          <Filters filters={filters} setFilter={handleFilterChange} clearFilters={handleClearFilters} />
        </Drawer>
      )}
    </Stack>
  );
};

export default CatalogPage;
