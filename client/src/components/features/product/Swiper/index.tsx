import { Swiper as SwiperInitial, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// components
import ProductCard from "@/components/features/product/Card";

import type { Product } from "@/api/products/products.types";
import type { Swiper as SwiperType } from "swiper/types";

type ProductsSwiperProps = {
  data: Product[];
  swiperRef: React.RefObject<SwiperType | null>;
  loop?: boolean;
};

const ProductsSwiper: React.FC<ProductsSwiperProps> = ({ data, loop = true, swiperRef }) => {
  return (
    <SwiperInitial
      spaceBetween={24}
      slidesPerView={3}
      loop={loop}
      modules={[Navigation]}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      style={{ width: "100%" }}
      breakpoints={{
        0: { slidesPerView: 1 },
        480: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
      }}
    >
      {data.map((product) => (
        <SwiperSlide key={product.id}>
          <ProductCard {...product} />
        </SwiperSlide>
      ))}
    </SwiperInitial>
  );
};

export default ProductsSwiper;
