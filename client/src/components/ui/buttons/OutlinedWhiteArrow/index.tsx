import { Button, ButtonProps, useMediaQuery, useTheme } from '@mui/material';

// icons
import { CallMadeOutlined } from '@mui/icons-material';

const OutlinedWhiteArrowButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Button
      endIcon={<CallMadeOutlined />}
      variant="outlined"
      color="white"
      size={!isLgUp ? 'small' : 'medium'}
      {...props}
    >
      {children}
    </Button>
  );
};

export default OutlinedWhiteArrowButton;
