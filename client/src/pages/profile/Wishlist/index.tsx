import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

// components
import ProductsGridLayout from "@/components/ui/layout/ProductsLayout";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// api
import WishlistService from "@/api/wishlist/wishlist.service";

// types
import { GetAllWishlist } from "@/api/wishlist/wishlist.types";

// icons
import { BookmarkRemoveOutlined } from "@mui/icons-material";

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
      <ProductsGridLayout
        isLoading={isLoading}
        items={wishlist.wishlist.map((i) => ({ ...i.product }))}
        total={wishlist.total}
        pagesTotal={Math.ceil(wishlist.total / PAGE_LIMIT)}
        page={page}
        onPageChange={(_, val) => setPage(val)}
        emptyStateTitle="Nothing found for your request"
        emptyStateDescription="Your search did not match any results. Try clearing the filters"
        emptyStateIcon={BookmarkRemoveOutlined}
      />
    </Stack>
  );
};

export default WishlistPage;
