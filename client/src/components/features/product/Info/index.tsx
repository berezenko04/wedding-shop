import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

// components
import ProductPrice from "../Price";
import ProductSizes from "../Sizes";

// types
import { Sizes } from "@/types/enums.types";

// icons
import { FavoriteBorderOutlined } from "@mui/icons-material";

type ProductInfoProps = {
  title: string;
  price: number;
  discount: number;
  description: string;
  sizes: Sizes[];
};

const ProductInfo: React.FC<ProductInfoProps> = ({ title, price, discount, description, sizes }) => {
  const [selectedSize, setSelectedSize] = useState<Sizes>(sizes[0]);

  return (
    <Stack gap={4} px={8}>
      <Stack gap={1}>
        <Typography variant="medium" fontSize={24}>
          {title}
        </Typography>
        <ProductPrice price={price} discount={discount} />
        {discount && (
          <Typography variant="medium" color="success.main">
            {discount * 100}% off
          </Typography>
        )}
      </Stack>
      <Typography>{description}</Typography>
      <ProductSizes sizes={sizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Button variant="outlined" color="primary" fullWidth>
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
