import { Button, Stack, Typography } from "@mui/material";

// components
import CustomContainer from "@/components/ui/layout/CustomContainer";

// icons
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

type HomepageSectionProps = {
  title: string;
  children: React.ReactNode;
  isSwiper?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
};

const HomepageSection: React.FC<HomepageSectionProps> = ({ title, isSwiper, onPrev, onNext, children }) => {
  return (
    <CustomContainer>
      <Stack component="section" py={9} gap={8}>
        <Stack flexDirection="row" alignItems="center" gap={4} justifyContent="space-between">
          <Typography variant="h2">{title}</Typography>
          {isSwiper && (
            <Stack direction="row" gap={1}>
              <Button onClick={onPrev} variant="iconary" color="grey" size="large">
                <ChevronLeft />
              </Button>
              <Button onClick={onNext} variant="iconary" color="grey" size="large">
                <ChevronRight />
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
