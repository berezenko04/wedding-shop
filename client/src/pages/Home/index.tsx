import Card from "@/components/features/product/Card";
import { useProducts } from "@/hooks/useProducts";

const Home: React.FC = () => {
  const { products } = useProducts();

  return (
    <div>
      <Card />
    </div>
  );
};

export default Home;
