import { Box, IconButton, Link, Typography } from '@mui/material';
import { useState } from 'react';

// components
import CustomContainer from '@/components/ui/Layout/CustomContainer';

// icons
import { Close } from '@mui/icons-material';

const WarAlert: React.FC = () => {
  const [isClosed, setIsClosed] = useState<boolean>(localStorage.getItem('alertWar') === 'true' || false);

  const handleClose = () => {
    localStorage.setItem('alertWar', 'true');
    setIsClosed(true);
  };

  if (isClosed) return null;

  return (
    <Box sx={{ backgroundColor: 'blue.800' }} py={2} px={3}>
      <CustomContainer>
        <Box display="flex" alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
          <Box component="img" src="/ua.webp" width={32} height={24} mr={2} />

          <Typography color="common.white" textAlign="center">
            Stop the war. Support Ukraine.&nbsp;
            <Link href="https://u24.gov.ua/" color="blue.200" target="_blank">
              Make a donation
            </Link>
            &nbsp;to United24 program.
          </Typography>

          <IconButton
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
            }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        </Box>
      </CustomContainer>
    </Box>
  );
};

export default WarAlert;
