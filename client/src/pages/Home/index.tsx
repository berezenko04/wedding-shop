import { Stack } from "@mui/material";

// components
import HomepageSection from "@/components/sections/HomepageSection";
import HomepageBanner from "@/components/ui/layout/HomepageBanner";

// hooks
import { useProducts } from "@/hooks/useProducts";


const Home: React.FC = () => {
  const { products } = useProducts();

  return (
    <Stack>
      <HomepageBanner />
      <HomepageSection title="Our categories">

      </HomepageSection>
    </Stack>
  );
};

export default Home;
