import { Box, SxProps } from '@mui/material';

// components
import OutlinedWhiteArrowButton from '@/components/ui/buttons/OutlinedWhiteArrow';

type ImageWithButtonProps = {
  imgSrc: string;
  sx?: SxProps;
  linkText: string;
  linkHref: string;
};

const ImageWithButton: React.FC<ImageWithButtonProps> = ({ imgSrc, linkText, linkHref, sx }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...sx,
      }}
    >
      <Box
        component="img"
        src={imgSrc}
        alt={linkText}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          display: 'block',
        }}
      />

      <OutlinedWhiteArrowButton
        href={linkHref}
        sx={{
          position: 'absolute',
          left: 24,
          bottom: 24,
          zIndex: 2,
        }}
      >
        {linkText}
      </OutlinedWhiteArrowButton>
    </Box>
  );
};

export default ImageWithButton;
