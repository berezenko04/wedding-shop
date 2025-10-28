import { Grid, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

// components
import ProductInfo from "@/components/features/product/Info";
import ProductGallery from "@/components/features/product/Gallery";
import ProductRating from "@/components/features/product/Rating";
import ProductReviews from "@/components/features/product/Reviews";

// api
import ProductsService from "@/api/products/products.service";

const CatalogProduct: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: product } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is not provided");
      return ProductsService.get(slug);
    },
    enabled: !!slug,
  });

  return (
    <Stack gap={8}>
      {product && (
        <>
          <Grid container spacing={4}>
            <Grid size={{ xs: 6 }}>
              <ProductGallery images={[product?.posterUrl, ...(product?.images?.map((img) => img.url) || [])]} />
            </Grid>
            <Grid size={{ xs: 6 }}>
              <ProductInfo {...product} />
            </Grid>
          </Grid>
          <ProductRating productId={product?.id} />
          <ProductReviews productId={product?.id} />
        </>
      )}
    </Stack>
  );
};

export default CatalogProduct;
