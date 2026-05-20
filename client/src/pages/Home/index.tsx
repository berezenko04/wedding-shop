import { Box, Grid, Stack } from '@mui/material';
import { useRef } from 'react';

// components
import HomepageSection from '@/components/features/home/components/HomepageSection';
import HomepageBanner from '@/components/ui/layout/HomepageBanner';
import ImageWithButton from '@/components/ui/cards/ImageWithButton';
import ProductsSwiper from '@/components/features/product/components/Swiper';
import HomepageCompanies from '@/components/ui/layout/HomepageCompanies';

// hooks
import { useProducts } from '@/hooks/useProducts';

// types
import type { Swiper } from 'swiper/types';

const Home: React.FC = () => {
  const dressesRef = useRef<Swiper | null>(null);
  const suitsRef = useRef<Swiper | null>(null);
  const accessoriesRef = useRef<Swiper | null>(null);

  const { products: dresses, isLoading: dressesLoading } = useProducts({ category: 'dresses' });
  const { products: suits, isLoading: suitsLoading } = useProducts({ category: 'suits' });
  const { products: accessories, isLoading: accessoriesLoading } = useProducts({ category: 'accessories' });

  const swiperSections = [
    {
      key: 'dresses',
      title: 'Dresses',
      data: dresses,
      isLoading: dressesLoading,
      ref: dressesRef,
    },
    {
      key: 'suits',
      title: 'Suits',
      data: suits,
      isLoading: suitsLoading,
      ref: suitsRef,
    },
    {
      key: 'accesories',
      title: 'Accessories',
      data: accessories,
      isLoading: accessoriesLoading,
      ref: accessoriesRef,
    },
  ] as const;

  return (
    <Stack>
      <HomepageBanner />
      <HomepageSection title="Our categories">
        <Box sx={{ height: { xs: 'auto', sm: 400, md: 560, lg: 750 } }}>
          <Grid container spacing={{ xs: 2, lg: 4 }} sx={{ height: '100%' }}>
            <Grid size={{ xs: 12, sm: 6 }} sx={{ height: { xs: 240, sm: '100%' } }}>
              <ImageWithButton
                imgSrc="/categories-dresses.webp"
                linkText="Dresses"
                linkHref="/catalog?category=dresses"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} sx={{ height: { xs: 'auto', sm: '100%' } }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateRows: { xs: 'repeat(2, 240px)', sm: '1fr 1fr' },
                  gap: { xs: 2, lg: 4 },
                  height: '100%',
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
        <Box
          sx={{
            height: { xs: 'auto', sm: 360, md: 450 },
            maxHeight: { xs: 'none', sm: 360, md: 450 },
          }}
        >
          <Grid container spacing={{ xs: 2, lg: 4 }} alignItems="stretch" sx={{ height: '100%' }}>
            <Grid size={{ xs: 12, sm: 6 }} display="flex">
              <Box sx={{ width: '100%', height: { xs: 240, sm: '100%' } }}>
                <ImageWithButton
                  imgSrc="/clothing-for-her.webp"
                  linkText="For her"
                  linkHref="/catalog?category=dresses"
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }} display="flex">
              <Box sx={{ width: '100%', height: { xs: 240, sm: '100%' } }}>
                <ImageWithButton
                  imgSrc="/clothing-for-him.webp"
                  linkText="For him"
                  linkHref="/catalog?category=suits"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </HomepageSection>
      {swiperSections.map(({ key, title, data, isLoading, ref }) => (
        <HomepageSection key={key} title={title} isSwiper swiperRef={ref}>
          <ProductsSwiper data={data} swiperRef={ref} isLoading={isLoading} />
        </HomepageSection>
      ))}
      <HomepageCompanies />
    </Stack>
  );
};

export default Home;
