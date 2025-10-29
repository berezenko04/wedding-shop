import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

// components
import ProductPrice from "../Price";
import ProductSizes from "../Sizes";
import ProductDiscount from "../Discount";

// api
import CartService from "@/api/cart/cart.service";

// types
import { Sizes } from "@/types/enums.types";

// icons
import { FavoriteBorderOutlined } from "@mui/icons-material";

type ProductInfoProps = {
  id: string;
  title: string;
  price: number;
  discount: number;
  description: string;
  sizes: Sizes[];
};

const ProductInfo: React.FC<ProductInfoProps> = ({ id, title, price, discount, description, sizes }) => {
  const [selectedSize, setSelectedSize] = useState<Sizes>(sizes[0]);

  const queryClient = useQueryClient();

  const handleAddToBag = async () => {
    const result = await CartService.addToCart({ productId: id, size: selectedSize, quantity: 1 });
    queryClient.setQueryData(["cart"], result);
  };

  return (
    <Stack gap={4} px={8}>
      <Stack gap={1}>
        <Typography variant="medium" fontSize={24}>
          {title}
        </Typography>
        <ProductPrice price={price} discount={discount} />
        <ProductDiscount discount={discount} />
      </Stack>
      <Typography>{description}</Typography>
      <ProductSizes sizes={sizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Button variant="outlined" color="primary" fullWidth onClick={handleAddToBag}>
          Add to Bag
        </Button>
        <Button variant="iconaryOutlined" color="grey" size="large">
          <FavoriteBorderOutlined />
        </Button>
      </Stack>
    </Stack>
  );
};

export default ProductInfo;
