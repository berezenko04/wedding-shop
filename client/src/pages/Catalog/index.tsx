import { Button, Grid, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

// components
import CatalogSort from "@/components/features/catalog/Sort";
import Filters from "@/components/features/catalog/Filters";
import ProductsGridLayout from "@/components/ui/layout/ProductsLayout";

// hooks
import { Filters as FiltersType, useProducts } from "@/hooks/useProducts";

// types
import { Sex, Sizes, SortBy } from "@/types/enums.types";

// icons
import { SearchOff } from "@mui/icons-material";

// constants
import { PAGE_LIMIT } from "@/constants";

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page")) || 1;
  const sortByParam = (searchParams.get("sortBy") as SortBy) || "none";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 2000;
  const size = (searchParams.get("size") as Sizes) || null;
  const sex = (searchParams.get("sex") as Sex) || null;

  const { products, total, page, filters, clearFilters, setPage, setFilter, isLoading } = useProducts({
    page: pageParam,
    sortBy: sortByParam,
    minPrice,
    maxPrice,
    size,
    sex,
  });

  const updateSearchParam = (key: string, value?: string | number | null) => {
    const updated = new URLSearchParams(searchParams);

    if (value === null || value === undefined || value === "none") {
      updated.delete(key);
    } else {
      updated.set(key, String(value));
    }

    setSearchParams(updated);
  };

  const handleFilterChange = (key: keyof FiltersType, value: any) => {
    setFilter(key, value);
    updateSearchParam(key, value);
    updateSearchParam("page", 1);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    updateSearchParam("page", newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchParams({});
  };

  useEffect(() => {
    const params = new URLSearchParams();

    params.set("page", String(page));
    if (filters.sortBy && filters.sortBy !== "none") params.set("sortBy", filters.sortBy);
    if (filters.priceRange) {
      params.set("minPrice", String(filters.priceRange[0]));
      params.set("maxPrice", String(filters.priceRange[1]));
    }
    if (filters.size) params.set("size", filters.size);
    if (filters.sex) params.set("sex", filters.sex);

    setSearchParams(params);
  }, [filters, setSearchParams, page]);

  return (
    <Stack gap={4}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
        <Typography variant="h3">Products ({total})</Typography>
        <CatalogSort value={filters.sortBy} onChange={(sortBy) => handleFilterChange("sortBy", sortBy)} />
      </Stack>
      <Grid container spacing={4}>
        <Grid size={{ xs: 2 }}>
          <Filters filters={filters} setFilter={handleFilterChange} clearFilters={handleClearFilters} />
        </Grid>
        <Grid size={{ xs: 10 }}>
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
    </Stack>
  );
};

export default CatalogPage;
