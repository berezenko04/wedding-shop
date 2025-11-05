import { useQuery } from "@tanstack/react-query";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

// components
import ProductCard from "@/components/features/product/Card";
import ProductCardSkeleton from "@/components/ui/loaders/skeletons/ProductCard";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// api
import WishlistService from "@/api/wishlist/wishlist.service";

// constants
import { PAGE_LIMIT } from "@/constants";

const WishlistPage: React.FC = () => {
  const { isAuth } = useSelector(authSelector);
  const [page, setPage] = useState<number>(1);

  const { data: wishlist = { wishlist: [], total: 0 }, isLoading } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => await WishlistService.getAll({ page, limit: PAGE_LIMIT }),
    enabled: isAuth,
  });

  console.log(wishlist);

  return (
    <Grid container>
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
              <ProductCard variant="catalog" {...i} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <></>
        // <EmptyCatalog onClearFilters={handleClearFilters} />
      )}
    </Grid>
  );
};

export default WishlistPage;
