import { Backdrop, BackdropProps, Stack } from '@mui/material';

// components
import Searchbar from '../Searchbar';

const MobileSearchbar: React.FC<BackdropProps> = ({ ...props }) => {
  return (
    <Backdrop
      sx={(theme) => ({
        zIndex: theme.zIndex.modal + 1,
        display: 'flex',
        px: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      })}
      {...props}
    >
      <Stack
        onClick={(e) => e.stopPropagation()}
        sx={{
          width: '100%',
          maxWidth: 600,
          backgroundColor: 'common.white',
        }}
      >
        <Searchbar />
      </Stack>
    </Backdrop>
  );
};

export default MobileSearchbar;
