import { Stack, Typography, Button } from '@mui/material';

// components
import CustomContainer from '@/components/ui/layout/CustomContainer';

// types
import type { Swiper as SwiperType } from 'swiper/types';

// icons
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

type HomepageSectionProps = {
  title: string;
  children: React.ReactNode;
  isSwiper?: boolean;
  swiperRef?: React.RefObject<SwiperType | null>;
};

const HomepageSection: React.FC<HomepageSectionProps> = ({ title, children, isSwiper, swiperRef }) => {
  const handlePrev = () => swiperRef?.current?.slidePrev();
  const handleNext = () => swiperRef?.current?.slideNext();

  return (
    <CustomContainer>
      <Stack component="section" py={{ xs: 4, md: 6, lg: 8 }} gap={{ xs: 4, lg: 6 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h2">{title}</Typography>

          {isSwiper && (
            <Stack direction="row" gap={1}>
              <Button variant="iconary" color="grey" onClick={handlePrev}>
                <KeyboardArrowLeft />
              </Button>
              <Button variant="iconary" color="grey" onClick={handleNext}>
                <KeyboardArrowRight />
              </Button>
            </Stack>
          )}
        </Stack>

        {children}
      </Stack>
    </CustomContainer>
  );
};

export default HomepageSection;
