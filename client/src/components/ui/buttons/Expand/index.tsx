import { Button, ButtonProps } from '@mui/material';

// icons
import { ExpandMore } from '@mui/icons-material';

const ExpandButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button variant="iconaryOutlined" color="grey" {...props}>
      <ExpandMore />
    </Button>
  );
};

export default ExpandButton;
