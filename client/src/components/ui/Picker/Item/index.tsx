import { Box, Radio } from '@mui/material';

type PickerItemProps<T = string | number> = {
  value: T;
  isSelected: boolean;
  onSelect: (value: T) => void;
  children?: React.ReactNode;
  disabled?: boolean;
  showRadio?: boolean;
  size?: 'small' | 'large';
};

const PickerItem = <T extends string | number>({
  value,
  isSelected,
  onSelect,
  disabled,
  children,
  showRadio,
  size,
}: PickerItemProps<T>) => {
  return (
    <Box
      role="radio"
      aria-checked={isSelected}
      onClick={() => !disabled && onSelect(value)}
      sx={(theme) => ({
        width: '100%',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontWeight: 500,
        height: size === 'small' ? 32 : 48,
        border: '1px solid',
        borderColor: disabled
          ? theme.palette.grey[200]
          : isSelected
            ? theme.palette.primary.main
            : theme.palette.grey[200],
        color: disabled ? theme.palette.grey[200] : isSelected ? theme.palette.primary.main : theme.palette.grey[700],
        display: 'flex',
        alignItems: 'center',
        justifyContent: showRadio ? 'flex-start' : 'center',
        transition: 'all .15s ease',
        userSelect: 'none',
        '&:hover': { borderColor: isSelected ? theme.palette.primary.main : theme.palette.grey[400] },
      })}
    >
      {showRadio && <Radio size="small" checked={isSelected} />}
      {children ?? value}
    </Box>
  );
};

export default PickerItem;
