import { Grid, Stack, Typography } from "@mui/material";

// components
import CustomContainer from "@/components/ui/layout/CustomContainer";
import CatalogSort from "@/components/features/catalog/Sort";
import ProductCard from "@/components/features/product/Card";
import Filters from "@/components/features/catalog/Filters";

// hooks
import { useProducts } from "@/hooks/useProducts";

const CatalogPage: React.FC = () => {
  const { products, total, sortBy, setSortBy } = useProducts({});

  return (
    <CustomContainer sx={{ py: 8 }}>
      <Stack gap={4}>
        <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
          <Typography variant="h3">Dresses ({total})</Typography>
          <CatalogSort value={sortBy} onChange={setSortBy} />
        </Stack>
        <Grid container spacing={4}>
          <Grid size={{ xs: 2 }}>
            <Filters />
          </Grid>
          <Grid size={{ xs: 10 }}>
            <Grid container spacing={4}>
              {products.map((i) => (
                <Grid key={i.id} size={{ xs: 4 }}>
                  <ProductCard variant="catalog" {...i} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </CustomContainer>
  );
};

export default CatalogPage;
