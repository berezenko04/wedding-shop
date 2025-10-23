import { Stack, Typography } from "@mui/material";

// components
import CustomContainer from "@/components/ui/layout/CustomContainer";

// hooks
import { useProducts } from "@/hooks/useProducts";

const CatalogPage: React.FC = () => {
  const { total } = useProducts();

  return (
    <CustomContainer sx={{ py: 8 }}>
      <Stack flexDirection="row" alignItems="center" justifyContent="space-between" gap={4}>
        <Typography variant="h3">Dresses ({total})</Typography>
      </Stack>
    </CustomContainer>
  );
};

export default CatalogPage;
