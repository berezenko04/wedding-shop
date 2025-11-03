import { Divider, Grid, Pagination, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router";
import { useEffect } from "react";

// components
import EmptyCatalog from "@/components/features/catalog/Empty";
import CatalogSort from "@/components/features/catalog/Sort";
import ProductCard from "@/components/features/product/Card";
import ProductCardSkeleton from "@/components/ui/loaders/skeletons/ProductCard";
import Filters from "@/components/features/catalog/Filters";

// hooks
import { Filters as FiltersType, useProducts } from "@/hooks/useProducts";

// types
import { SortBy } from "@/types/enums.types";

// constants
import { PAGE_LIMIT } from "@/constants";

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = Number(searchParams.get("page")) || 1;
  const sortByParam = (searchParams.get("sortBy") as SortBy) || "none";

  const { products, total, page, filters, clearFilters, setPage, setFilter, isLoading } = useProducts({
    page: pageParam,
    sortBy: sortByParam,
  });

  const pages = Math.ceil(total / PAGE_LIMIT);

  const handleFilterChange = (key: keyof FiltersType, value: string | number) => {
    setFilter(key, value);

    const updated = new URLSearchParams(searchParams);
    updated.set(key, String(value));
    updated.set("page", "1");
    setSearchParams(updated);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);

    const updated = new URLSearchParams(searchParams);
    updated.set("page", String(newPage));
    setSearchParams(updated);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClearFilters = () => {
    clearFilters();
    setSearchParams({});
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("sortBy", filters.sortBy);
    setSearchParams(params);
  }, [filters.sortBy, page]);

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
          <Stack gap={4}>
            {isLoading ? (
              <Grid container spacing={4}>
                {Array.from({ length: 9 }).map((_, idx) => (
                  <Grid key={idx} size={{ xs: 4 }}>
                    <ProductCardSkeleton />
                  </Grid>
                ))}
              </Grid>
            ) : total > 0 ? (
              <Grid container spacing={4}>
                {products.map((i) => (
                  <Grid key={i.id} size={{ xs: 4 }}>
                    <ProductCard variant="catalog" {...i} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyCatalog onClearFilters={handleClearFilters} />
            )}

            {pages > 1 && (
              <>
                <Divider />
                <Pagination count={pages} page={page} onChange={handlePageChange} />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CatalogPage;
