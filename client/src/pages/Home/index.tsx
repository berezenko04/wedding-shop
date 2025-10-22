import Card from "@/components/features/product/Card";
import HomepageBanner from "@/components/ui/layout/HomepageBanner";
import { useProducts } from "@/hooks/useProducts";
import { Stack } from "@mui/material";

const Home: React.FC = () => {
  const { products } = useProducts();

  return (
    <Stack>
      <HomepageBanner />
    </Stack>
  );
};

export default Home;
