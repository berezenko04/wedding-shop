import { Box } from "@mui/material";

type PickerItemProps<T = string | number> = {
  value: T;
  isSelected: boolean;
  onSelect: (value: T) => void;
};

const PickerItem = <T extends string | number>({ value, isSelected, onSelect }: PickerItemProps<T>) => {
  return (
    <Box
      role="radio"
      aria-checked={isSelected}
      onClick={() => onSelect(value)}
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
      {value}
    </Box>
  );
};

export default PickerItem;
