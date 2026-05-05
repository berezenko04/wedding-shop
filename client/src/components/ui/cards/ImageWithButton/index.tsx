import { Box, Button, SxProps } from '@mui/material';
import { CallMadeOutlined } from '@mui/icons-material';

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

      <Button
        endIcon={<CallMadeOutlined />}
        variant="outlined"
        color="white"
        href={linkHref}
        sx={{
          position: 'absolute',
          left: 24,
          bottom: 24,
          zIndex: 2,
        }}
      >
        {linkText}
      </Button>
    </Box>
  );
};

export default ImageWithButton;
