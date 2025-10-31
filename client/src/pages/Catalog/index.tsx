import { Divider, Grid, Pagination, Stack, Typography } from "@mui/material";

// components
import EmptyCatalog from "@/components/features/catalog/Empty";
import CatalogSort from "@/components/features/catalog/Sort";
import ProductCard from "@/components/features/product/Card";
import Filters from "@/components/features/catalog/Filters";

// hooks
import { useProducts } from "@/hooks/useProducts";

// constants
import { PAGE_LIMIT } from "@/constants";

const CatalogPage: React.FC = () => {
  const { products, total, page, filters, clearFilters, setPage, setFilter } = useProducts({});

  const pages = Math.ceil(total / PAGE_LIMIT);

  return (
    <Stack gap={4}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
        <Typography variant="h3">Products ({total})</Typography>
        <CatalogSort value={filters.sortBy} onChange={(sortBy) => setFilter("sortBy", sortBy)} />
      </Stack>
      <Grid container spacing={4}>
        <Grid size={{ xs: 2 }}>
          <Filters filters={filters} setFilter={setFilter} clearFilters={clearFilters} />
        </Grid>
        <Grid size={{ xs: 10 }}>
          <Stack gap={4}>
            {total > 0 ? (
              <Grid container spacing={4}>
                {products.map((i) => (
                  <Grid key={i.id} size={{ xs: 4 }}>
                    <ProductCard variant="catalog" {...i} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyCatalog onClearFilters={clearFilters} />
            )}

            {pages > 1 && (
              <>
                <Divider />
                <Pagination
                  count={pages}
                  page={page}
                  onChange={(_, p) => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CatalogPage;
