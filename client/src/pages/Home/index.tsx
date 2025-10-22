import { Grid, Stack } from "@mui/material";

// components
import HomepageSection from "@/components/sections/HomepageSection";
import HomepageBanner from "@/components/ui/layout/HomepageBanner";
import ImageWithButton from "@/components/ui/cards/ImageWithButton";

// hooks
import { useProducts } from "@/hooks/useProducts";

const Home: React.FC = () => {
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
    </Stack>
  );
};

export default Home;
