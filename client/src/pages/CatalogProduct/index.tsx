import { Grid, Stack } from "@mui/material";

// components
import ProductInfo from "@/components/features/product/Info";

const CatalogProduct: React.FC = () => {
  return (
    <Stack>
      <Grid container spacing={4}>
        <Grid size={{ xs: 6 }}></Grid>
        <Grid size={{ xs: 6 }}>
          <ProductInfo />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default CatalogProduct;
