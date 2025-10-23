import { Box } from "@mui/material";

// types
import { Sizes } from "@/types/enums.types";

type SizePickerItemProps = {
  size: Sizes;
  isSelected: boolean;
  setIsSelected: () => void;
};

const SizePickerItem: React.FC<SizePickerItemProps> = ({ isSelected, setIsSelected, size }) => {
  return (
    <Box
      role="radio"
      aria-checked={isSelected}
      onClick={setIsSelected}
      sx={(theme) => ({
        width: "100%",
        cursor: "pointer",
        fontWeight: 500,
        height: 32,
        border: "1px solid",
        borderColor: isSelected ? theme.palette.primary.main : theme.palette.grey[200],
        color: isSelected ? theme.palette.primary.main : theme.palette.grey[700],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .15s ease",
        "&:hover": { borderColor: isSelected ? theme.palette.primary.main : theme.palette.grey[400] },
      })}
    >
      {size}
    </Box>
  );
};

export default SizePickerItem;
