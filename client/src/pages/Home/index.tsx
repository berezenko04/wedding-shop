import { Box, Grid, Stack } from "@mui/material";
import { useRef } from "react";

// components
import HomepageSection from "@/components/sections/HomepageSection";
import HomepageBanner from "@/components/ui/layout/HomepageBanner";
import ImageWithButton from "@/components/ui/cards/ImageWithButton";
import ProductsSwiper from "@/components/features/product/Swiper";
import HomepageCompanies from "@/components/ui/layout/HomepageCompanies";

// hooks
import { useProducts } from "@/hooks/useProducts";

// types
import type { Swiper } from "swiper/types";

const Home: React.FC = () => {
  const bestsellersRef = useRef<Swiper | null>(null);
  const dressesRef = useRef<Swiper | null>(null);
  const suitsRef = useRef<Swiper | null>(null);

  const { products, isLoading } = useProducts();

  return (
    <Stack>
      <HomepageBanner />
      <HomepageSection title="Our categories">
        <Box sx={{ height: 750 }}>
          <Grid container spacing={4} sx={{ height: "100%" }}>
            <Grid size={{ xs: 6 }} sx={{ height: "100%" }}>
              <ImageWithButton
                imgSrc="/categories-dresses.webp"
                linkText="Dresses"
                linkHref="/catalog?category=dresses"
              />
            </Grid>

            <Grid size={{ xs: 6 }} sx={{ height: "100%" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateRows: "1fr 1fr",
                  gap: 4,
                  height: "100%",
                }}
              >
                <ImageWithButton imgSrc="/categories-suits.webp" linkText="Suits" linkHref="/catalog?category=suits" />
                <ImageWithButton
                  imgSrc="/categories-accessories.webp"
                  linkText="Accessories"
                  linkHref="/catalog?category=accessories"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </HomepageSection>
      <HomepageSection title="Clothing">
        <Box sx={{ height: 450 }}>
          <Grid container spacing={4} sx={{ height: "100%" }}>
            <Grid size={{ xs: 6 }} sx={{ height: "100%" }}>
              <ImageWithButton
                imgSrc="/clothing-for-her.webp"
                linkText="For her"
                linkHref="/catalog?category=dresses"
              />
            </Grid>
            <Grid size={{ xs: 6 }} sx={{ height: "100%" }}>
              <ImageWithButton imgSrc="/clothing-for-him.webp" linkText="For him" linkHref="/catalog?category=suits" />
            </Grid>
          </Grid>
        </Box>
      </HomepageSection>
      <HomepageSection title="Bestsellers" isSwiper swiperRef={bestsellersRef}>
        <ProductsSwiper data={products} swiperRef={bestsellersRef} isLoading={isLoading} />
      </HomepageSection>
      <HomepageSection title="Dresses" isSwiper swiperRef={dressesRef}>
        <ProductsSwiper data={products} swiperRef={dressesRef} isLoading={isLoading} />
      </HomepageSection>
      <HomepageSection title="Suits" isSwiper swiperRef={suitsRef}>
        <ProductsSwiper data={products} swiperRef={suitsRef} isLoading={isLoading} />
      </HomepageSection>
      <HomepageCompanies />
    </Stack>
  );
};

export default Home;
