import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Grid, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

// components
import ProductCard from "@/components/features/product/Card";
import ProductCardSkeleton from "@/components/ui/loaders/skeletons/ProductCard";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// api
import WishlistService from "@/api/wishlist/wishlist.service";

// types
import { GetAllWishlist } from "@/api/wishlist/wishlist.types";

// constants
import { PAGE_LIMIT } from "@/constants";

const WishlistPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { isAuth } = useSelector(authSelector);
  const [page, setPage] = useState<number>(1);

  const { data: wishlist = { wishlist: [], total: 0 }, isLoading } = useQuery({
    queryKey: ["wishlist", { page, limit: PAGE_LIMIT }],
    queryFn: () => WishlistService.getAll({ page, limit: PAGE_LIMIT }),
    placeholderData: () =>
      page === 1 ? queryClient.getQueryData<GetAllWishlist>(["wishlist", { page: 1, limit: PAGE_LIMIT }]) : undefined,
    enabled: isAuth,
    staleTime: 60_000,
  });

  return (
    <Stack gap={4} sx={{ width: "100%" }}>
      <Typography variant="h3">Wish list ({wishlist.total})</Typography>
      {isLoading ? (
        <Grid container spacing={4}>
          {Array.from({ length: 9 }).map((_, idx) => (
            <Grid key={idx} size={{ xs: 4 }}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      ) : wishlist.total > 0 ? (
        <Grid container spacing={4}>
          {wishlist.wishlist.map((i) => (
            <Grid key={i.id} size={{ xs: 4 }}>
              <ProductCard variant="catalog" {...i.product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <></>
        // <EmptyCatalog onClearFilters={handleClearFilters} />
      )}
    </Stack>
  );
};

export default WishlistPage;
