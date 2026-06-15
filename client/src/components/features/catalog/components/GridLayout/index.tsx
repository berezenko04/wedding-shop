import { Divider, Grid, Stack, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// components
import ProductCard from '@/components/features/product/components/Card';
import CustomPagination from '../../../../ui/Layout/CustomPagination';
import ProductCardSkeleton from '@/components/ui/Loaders/Skeletons/ProductCard';
import EmptyState from '@/components/ui/EmptyState';

// types
import { Product } from '@/api/products/products.types';

type Props = {
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

const ProductsGridLayout: React.FC<Props> = ({
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
          <CustomPagination count={pagesTotal} page={page} onChange={onPageChange} />
        </>
      )}
    </Stack>
  );
};

export default ProductsGridLayout;
