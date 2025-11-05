import { Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// api
import WishlistService from "@/api/wishlist/wishlist.service";

// types
import { GetAllWishlist } from "@/api/wishlist/wishlist.types";

// icons
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";

// constants
import { PAGE_LIMIT } from "@/constants";

type AddToWishlistButtonProps = {
  productId: string;
  variant?: "card" | "productPage";
};

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({ productId, variant = "card" }) => {
  const queryClient = useQueryClient();

  const { data: wishlistIds = [] } = useQuery<string[]>({
    queryKey: ["wishlistCheck"],
  });
  const isWishlisted = wishlistIds.includes(productId);

  const mutation = useMutation({
    mutationFn: async (wishlisted: boolean) => {
      if (wishlisted) {
        return await WishlistService.removeFromWishlist(productId);
      } else {
        return await WishlistService.addToWishlist({ productId });
      }
    },

    onSuccess: (data: GetAllWishlist) => {
      queryClient.setQueryData(["wishlist", { page: 1, limit: PAGE_LIMIT }], data);
      queryClient.setQueryData<string[]>(["wishlistCheck"], (prev) => {
        if (!prev) return [];
        return isWishlisted ? prev.filter((id) => id !== productId) : [...prev, productId];
      });
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    mutation.mutate(isWishlisted);
  };

  const buttonConfig = {
    card: {
      variant: "iconary" as const,
      color: "white" as const,
      size: "small" as const,
      sx: { position: "absolute", zIndex: 1, top: 16, right: 16 },
    },
    productPage: {
      variant: "iconaryOutlined" as const,
      color: "grey" as const,
      size: "large" as const,
      sx: {},
    },
  } as const;

  const config = buttonConfig[variant];

  return (
    <Button
      onClick={handleClick}
      variant={config.variant}
      color={config.color}
      sx={config.sx}
      size={config.size}
      disabled={mutation.isPending}
    >
      {isWishlisted ? (
        <Favorite sx={(theme) => ({ color: `${theme.palette.primary.main} !important` })} />
      ) : (
        <FavoriteBorderOutlined />
      )}
    </Button>
  );
};

export default AddToWishlistButton;
