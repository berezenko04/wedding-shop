import { Swiper as SwiperInitial, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useTheme } from '@mui/material';

// components
import ProductCard from '@/components/features/product/components/Card';
import ProductCardSkeleton from '@/components/ui/Loaders/Skeletons/ProductCard';

// types
import type { Product } from '@/api/products/products.types';
import type { Swiper as SwiperType } from 'swiper/types';

type ProductsSwiperProps = {
  data: Product[];
  swiperRef: React.RefObject<SwiperType | null>;
  isLoading?: boolean;
  loop?: boolean;
};

const ProductsSwiper: React.FC<ProductsSwiperProps> = ({ data, isLoading, loop = true, swiperRef }) => {
  const theme = useTheme();

  return (
    <SwiperInitial
      spaceBetween={24}
      slidesPerView={3}
      loop={loop}
      modules={[Navigation]}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      style={{ width: '100%' }}
      breakpoints={{
        [theme.breakpoints.values.xs]: { slidesPerView: 1 },
        [theme.breakpoints.values.sm]: { slidesPerView: 2 },
        [theme.breakpoints.values.md]: { slidesPerView: 3 },
      }}
    >
      {isLoading
        ? Array.from({ length: 3 }).map((_, idx) => (
            <SwiperSlide key={idx}>
              <ProductCardSkeleton />
            </SwiperSlide>
          ))
        : data.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))}
    </SwiperInitial>
  );
};

export default ProductsSwiper;
