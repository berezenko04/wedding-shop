import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// api
import WishlistService from "@/api/wishlist/wishlist.service";

// types
import { GetAllWishlist } from "@/api/wishlist/wishlist.types";

// icons
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";

type AddToWishlistButtonProps = {
  productId: string;
  isWishlisted: boolean;
};

const AddToWishlistButton: React.FC<AddToWishlistButtonProps> = ({ productId, isWishlisted }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (wishlisted: boolean) => {
      if (wishlisted) {
        return await WishlistService.removeFromWishlist(productId);
      } else {
        return await WishlistService.addToWishlist({ productId });
      }
    },

    onSuccess: (data: GetAllWishlist) => {
      queryClient.setQueryData(["wishlist"], data);
      queryClient.setQueryData<string[]>(["checkWishlist"], (prev) => {
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

  return (
    <Button
      onClick={handleClick}
      variant="iconary"
      color="white"
      sx={{ position: "absolute", zIndex: 1, top: 16, right: 16 }}
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
