import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

type ProductGallery = {
  images: string[];
};

const ProductGallery: React.FC<ProductGallery> = ({ images }) => {
  const [currentImage, setCurentImage] = useState<string>(images[0]);

  return (
    <Stack flexDirection="row" alignItems="flex-start" gap={4}>
      <Stack gap={1}>
        {images.map((image, idx) => (
          <Box
            key={idx}
            sx={(theme) => ({
              width: 128,
              height: 128,
              overflow: "hidden",
              cursor: "pointer",
              border: currentImage === image ? `2px solid ${theme.palette.grey[500]}` : "none",
            })}
            onClick={() => setCurentImage(image)}
          >
            <LazyLoadImage
              src={image}
              effect="blur"
              width="100%"
              height="100%"
              style={{ objectPosition: "center", objectFit: "cover" }}
            />
          </Box>
        ))}
      </Stack>
      <Box sx={{ width: 600, height: 800 }}>
        <LazyLoadImage
          src={currentImage}
          effect="blur"
          width="100%"
          height="100%"
          style={{ objectPosition: "center", objectFit: "cover" }}
        />
      </Box>
    </Stack>
  );
};

export default ProductGallery;
