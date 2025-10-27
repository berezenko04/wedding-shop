import { Grid, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

// components
import ProductInfo from "@/components/features/product/Info";
import ProductGallery from "@/components/features/product/Gallery";
import ProductRating from "@/components/features/product/Rating";

// api
import ProductsService from "@/api/products/products.service";
import ReviewsService from "@/api/reviews/reviews.service";

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

  const { data: reviews } = useQuery({
    queryKey: ["productReviews"],
    queryFn: async () => {
      if (!product?.id) throw new Error("Product id is not provided");
      await ReviewsService.getByProduct(product.id, { page: 1, limit: 10 });
    },
    enabled: !!product?.id,
  });

  return (
    <Stack gap={8}>
      {product && (
        <Grid container spacing={4}>
          <Grid size={{ xs: 6 }}>
            <ProductGallery images={[product?.posterUrl, ...(product?.images?.map((img) => img.url) || [])]} />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <ProductInfo {...product} />
          </Grid>
        </Grid>
      )}
      <ProductRating />
    </Stack>
  );
};

export default CatalogProduct;
