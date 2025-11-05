import { Grid } from "@mui/material";

// components
import ProductCard from "@/components/features/product/Card";
import ProductCardSkeleton from "@/components/ui/loaders/skeletons/ProductCard";

// types
import { Product } from "@/api/products/products.types";

type ProductsGridLayoutProps = {
  isLoading: boolean;
  items: Product[];
  total: number;
};

const ProductsGridLayout: React.FC<ProductsGridLayoutProps> = ({ isLoading, items, total }) => {
  return (
    <>
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
          {items.map((i) => (
            <Grid key={i.id} size={{ xs: 4 }}>
              <ProductCard variant="catalog" {...i} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <></>
        // <EmptyCatalog onClearFilters={handleClearFilters} />
      )}
    </>
  );
};

export default ProductsGridLayout;
