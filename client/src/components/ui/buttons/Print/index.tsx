import { Button, ButtonProps } from '@mui/material';

// icons
import { PrintOutlined } from '@mui/icons-material';

const PrintButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button variant="iconaryOutlined" color="grey" {...props}>
      <PrintOutlined />
    </Button>
  );
};

export default PrintButton;
