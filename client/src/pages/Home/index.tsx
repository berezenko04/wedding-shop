import Card from "@/components/features/product/Card";
import { useProducts } from "@/hooks/useProducts";
import { Grid } from "@mui/material";

const Home: React.FC = () => {
  const { products } = useProducts();

  return (
    <Grid container spacing={3}>
      {products?.map((i) => (
        <Grid key={i.id} size={{ xs: 4 }}>
          <Card {...i} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
