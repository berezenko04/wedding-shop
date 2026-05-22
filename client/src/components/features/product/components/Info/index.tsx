import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// components
import ProductPrice from '../Price';
import ProductSizes from '../Sizes';
import ProductDiscount from '../Discount';
import AddToWishlistButton from '@/components/ui/Buttons/AddToWishlist';

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
  discount: number | null;
  description: string;
  sizes?: Sizes[];
};

const ProductInfo: React.FC<ProductInfoProps> = ({ id, title, price, discount, description, sizes, category }) => {
  const [selectedSize, setSelectedSize] = useState<Sizes | undefined>(sizes?.[0]);

  const notAccessory = category.name !== ProductCategories.ACCESSORIES;
  const queryClient = useQueryClient();

  const handleAddToBag = async () => {
    if (!selectedSize) return;
    const result = await CartService.updateCart({ productId: id, size: selectedSize, change: 1 });
    queryClient.setQueryData(['cart'], result);
  };

  return (
    <Stack gap={{ xs: 2, sm: 4 }} px={{ xs: 0, sm: 2, md: 4, lg: 8 }}>
      <Stack gap={1}>
        <Typography variant="medium" fontSize={24}>
          {title}
        </Typography>
        <ProductPrice
          price={price}
          discount={discount}
          sx={{
            flexDirection: { xs: 'row', sm: 'column', md: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start', md: 'center' },
            gap: { xs: 2, sm: 1, md: 4 },
          }}
        />
        <ProductDiscount discount={discount} />
      </Stack>
      <Typography>{description}</Typography>
      {notAccessory && sizes && (
        <ProductSizes sizes={sizes} selectedSize={selectedSize} onSelectSize={setSelectedSize} />
      )}
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
