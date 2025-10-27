import { Grid, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

// components
import ProductInfo from "@/components/features/product/Info";
import ProductGallery from "@/components/features/product/Gallery";

// api
import ProductsService from "@/api/products/products.service";

const CatalogProduct: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is not provided");
      return ProductsService.get(slug);
    },
  });

  return (
    <Stack>
      {data && (
        <Grid container spacing={4}>
          <Grid size={{ xs: 6 }}>
            <ProductGallery images={[data?.posterUrl, ...(data?.images?.map((img) => img.url) || [])]} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <ProductInfo {...data} />
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};

export default CatalogProduct;
