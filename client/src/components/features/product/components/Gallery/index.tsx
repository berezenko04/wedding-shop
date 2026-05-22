import { Box, Stack } from '@mui/material';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type ProductGallery = {
  images: string[];
};

const ProductGallery: React.FC<ProductGallery> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState<string | undefined>(images[0]);

  return (
    <Stack flexDirection={{ xs: 'column-reverse', md: 'row' }} alignItems="flex-start" gap={{ xs: 1, md: 4 }}>
      <Stack
        gap={1}
        flexDirection={{ xs: 'row', md: 'column' }}
        sx={{
          width: { xs: '100%', md: 'auto' },
          overflowX: { xs: 'auto', md: 'visible' },
          overflowY: { xs: 'hidden', md: 'visible' },
          flexWrap: 'nowrap',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {images.map((image) => (
          <Box
            key={image}
            sx={(theme) => ({
              flexShrink: 0,
              width: { xs: 96, lg: 128 },
              height: { xs: 96, lg: 128 },
              overflow: 'hidden',
              cursor: 'pointer',
              border: currentImage === image ? `2px solid ${theme.palette.grey[500]}` : 'none',
            })}
            onClick={() => setCurrentImage(image)}
          >
            <LazyLoadImage
              src={image}
              effect="blur"
              width="100%"
              height="100%"
              style={{ objectPosition: 'center', objectFit: 'cover' }}
            />
          </Box>
        ))}
      </Stack>
      <Box sx={{ aspectRatio: '3/4', maxWidth: 600, width: '100%', maxHeight: 800 }}>
        <LazyLoadImage
          src={currentImage}
          effect="blur"
          width="100%"
          height="100%"
          style={{ objectPosition: 'center', objectFit: 'cover' }}
        />
      </Box>
    </Stack>
  );
};

export default ProductGallery;
