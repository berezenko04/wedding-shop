import { Stack, Typography } from "@mui/material";
import { useState } from "react";

// components
import ProductPrice from "../Price";
import ProductSizes from "../Sizes";

// types
import { Sizes } from "@/types/enums.types";

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
    </Stack>
  );
};

export default ProductInfo;
