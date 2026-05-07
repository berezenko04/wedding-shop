import { Divider, Grid, Pagination, Stack, SvgIconTypeMap } from '@mui/material';

// components
import ProductCard from '@/components/features/product/Card';
import ProductCardSkeleton from '@/components/ui/loaders/skeletons/ProductCard';
import EmptyState from '@/components/ui/EmptyState';

// types
import { Product } from '@/api/products/products.types';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type ProductsGridLayoutProps = {
  isLoading: boolean;
  items: Product[];
  total: number;
  pagesTotal: number;
  page: number;
  onPageChange: (_: React.ChangeEvent<unknown>, newPage: number) => void;
  emptyStateTitle: string;
  emptyStateDescription: string;
  emptyStateIcon: OverridableComponent<SvgIconTypeMap<object, 'svg'>>;
  emptyStateAdditional?: React.ReactNode;
};

const ProductsGridLayout: React.FC<ProductsGridLayoutProps> = ({
  isLoading,
  items,
  total,
  pagesTotal,
  page,
  onPageChange,
  emptyStateTitle,
  emptyStateDescription,
  emptyStateIcon,
  emptyStateAdditional,
}) => {
  return (
    <Stack gap={4}>
      {isLoading ? (
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {Array.from({ length: 9 }).map((_, idx) => (
            <Grid key={idx} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : total > 0 ? (
        <Grid container spacing={{ xs: 2, md: 4 }}>
          {items.map((i) => (
            <Grid key={i.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProductCard variant="catalog" {...i} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState
          title={emptyStateTitle}
          description={emptyStateDescription}
          icon={emptyStateIcon}
          additional={emptyStateAdditional}
        />
      )}
      {pagesTotal > 1 && (
        <>
          <Divider />
          <Pagination count={pagesTotal} page={page} onChange={onPageChange} />
        </>
      )}
    </Stack>
  );
};

export default ProductsGridLayout;
