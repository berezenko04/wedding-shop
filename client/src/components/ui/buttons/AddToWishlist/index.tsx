import { Button } from "@mui/material";

// icons
import { FavoriteBorderOutlined } from "@mui/icons-material";

const AddToWishlistButton: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <Button
      onClick={handleClick}
      variant="iconary"
      color="white"
      sx={{ position: "absolute", zIndex: 1, top: 16, right: 16 }}
    >
      <FavoriteBorderOutlined />
    </Button>
  );
};

export default AddToWishlistButton;
