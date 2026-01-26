import { Button, ButtonProps } from '@mui/material';

// icons
import { FileDownloadOutlined } from '@mui/icons-material';

const DownloadButton: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <Button variant="iconaryOutlined" color="grey" {...props}>
      <FileDownloadOutlined />
    </Button>
  );
};

export default DownloadButton;
