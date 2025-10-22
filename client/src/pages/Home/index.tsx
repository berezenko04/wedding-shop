import { Grid, Stack } from "@mui/material";
import { useRef } from "react";

// components
import HomepageSection from "@/components/sections/HomepageSection";
import HomepageBanner from "@/components/ui/layout/HomepageBanner";
import ImageWithButton from "@/components/ui/cards/ImageWithButton";
import ProductsSwiper from "@/components/features/product/Swiper";

// hooks
import { useProducts } from "@/hooks/useProducts";

// types
import type { Swiper } from "swiper/types";

const Home: React.FC = () => {
  const bestsellersRef = useRef<Swiper | null>(null);
  const dressesRef = useRef<Swiper | null>(null);
  const suitsRef = useRef<Swiper | null>(null);

  const { products } = useProducts();

  return (
    <Stack>
      <HomepageBanner />
      <HomepageSection title="Our categories">
        <Grid container spacing={4}>
          <Grid size={{ xs: 6 }}>
            <ImageWithButton
              height={730}
              imgSrc="/categories-dresses.png"
              linkText="Dresses"
              linkHref="/catalog?sex=female"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <ImageWithButton
              height={730}
              imgSrc="/categories-suits.png"
              linkText="Suits"
              linkHref="/catalog?sex=male"
            />
          </Grid>
        </Grid>
      </HomepageSection>
      <HomepageSection title="Clothing">
        <Grid container spacing={4}>
          <Grid size={{ xs: 6 }}>
            <ImageWithButton
              height={480}
              imgSrc="/clothing-for-her.png"
              linkText="For her"
              linkHref="/catalog?sex=female"
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <ImageWithButton
              height={480}
              imgSrc="/clothing-for-him.png"
              linkText="For him"
              linkHref="/catalog?sex=male"
            />
          </Grid>
        </Grid>
      </HomepageSection>
      <HomepageSection title="Bestsellers" isSwiper swiperRef={bestsellersRef}>
        <ProductsSwiper data={products} swiperRef={bestsellersRef} />
      </HomepageSection>
      <HomepageSection title="Dresses" isSwiper swiperRef={dressesRef}>
        <ProductsSwiper data={products} swiperRef={dressesRef} />
      </HomepageSection>
      <HomepageSection title="Suits" isSwiper swiperRef={suitsRef}>
        <ProductsSwiper data={products} swiperRef={suitsRef} />
      </HomepageSection>
    </Stack>
  );
};

export default Home;
