import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// components
import ProductPrice from '../Price';
import ProductSizes from '../Sizes';
import ProductDiscount from '../Discount';
import AddToWishlistButton from '@/components/ui/buttons/AddToWishlist';

// api
import CartService from '@/api/cart/cart.service';

// types
import { ProductCategories, Sizes } from '@/types/enums.types';
import { ProductCategory } from '@/api/products/products.types';

type ProductInfoProps = {
  id: string;
  title: string;
  category: ProductCategory;
  price: number;
  discount: number;
  description: string;
  sizes: Sizes[];
};

const ProductInfo: React.FC<ProductInfoProps> = ({ id, title, price, discount, description, sizes, category }) => {
  const [selectedSize, setSelectedSize] = useState<Sizes>(sizes[0]);

  const notAccessory = category.name !== ProductCategories.ACCESSORIES;
  const queryClient = useQueryClient();

  const handleAddToBag = async () => {
    const result = await CartService.updateCart({ productId: id, size: selectedSize, change: 1 });
    queryClient.setQueryData(['cart'], result);
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
      {notAccessory && <ProductSizes sizes={sizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />}
      <Stack flexDirection="row" alignItems="center" gap={2}>
        <Button
          disabled={!selectedSize && notAccessory}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={handleAddToBag}
        >
          Add to Bag
        </Button>
        <AddToWishlistButton productId={id} variant="productPage" />
      </Stack>
    </Stack>
  );
};

export default ProductInfo;
