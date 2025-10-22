import { Box, Button } from "@mui/material";

// icons
import { CallMadeOutlined } from "@mui/icons-material";

type ImageWithButtonProps = {
  imgSrc: string;
  height: number;
  linkText: string;
  linkHref: string;
};

const ImageWithButton: React.FC<ImageWithButtonProps> = ({ height, imgSrc, linkText, linkHref }) => {
  return (
    <Box sx={{ position: "relative", height }}>
      <Box
        component="img"
        src={imgSrc}
        sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
      />
      <Button
        endIcon={<CallMadeOutlined />}
        variant="outlined"
        color="white"
        href={linkHref}
        sx={{ position: "absolute", left: 32, bottom: 32 }}
      >
        {linkText}
      </Button>
    </Box>
  );
};

export default ImageWithButton;
