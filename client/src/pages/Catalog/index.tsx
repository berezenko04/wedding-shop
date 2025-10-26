import { Divider, Grid, Pagination, Stack, Typography } from "@mui/material";

// components
import CustomContainer from "@/components/ui/layout/CustomContainer";
import CatalogSort from "@/components/features/catalog/Sort";
import ProductCard from "@/components/features/product/Card";
import Filters from "@/components/features/catalog/Filters";

// hooks
import { useProducts } from "@/hooks/useProducts";

// constants
import { PAGE_LIMIT } from "@/constants";

const CatalogPage: React.FC = () => {
  const { products, total, page, filters, setSortBy, setPriceRange, setPage, setSize, setSex } = useProducts({});

  const pages = Math.ceil(total / PAGE_LIMIT);

  return (
    <CustomContainer sx={{ py: 8 }}>
      <Stack gap={4}>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
          <Typography variant="h3">Products ({total})</Typography>
          <CatalogSort value={filters.sortBy} onChange={setSortBy} />
        </Stack>
        <Grid container spacing={4}>
          <Grid size={{ xs: 2 }}>
            <Filters
              priceRange={filters.priceRange}
              setPriceRange={setPriceRange}
              size={filters.size}
              setSize={setSize}
              sex={filters.sex}
              setSex={setSex}
            />
          </Grid>
          <Grid size={{ xs: 10 }}>
            <Stack gap={4}>
              <Grid container spacing={4}>
                {products.map((i) => (
                  <Grid key={i.id} size={{ xs: 4 }}>
                    <ProductCard variant="catalog" {...i} />
                  </Grid>
                ))}
              </Grid>
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
    </CustomContainer>
  );
};

export default CatalogPage;
