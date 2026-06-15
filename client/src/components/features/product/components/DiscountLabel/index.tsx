import { Box, Typography } from '@mui/material';

type Props = {
  discount: number;
};

const DiscountLabel: React.FC<Props> = ({ discount }) => {
  return (
    <Box
      sx={{
        userSelect: 'none',
        position: 'absolute',
        bottom: 40,
        right: -40,
        width: 200,
        display: 'flex',
        justifyContent: 'center',
        transform: 'rotate(-45deg)',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'success.main',
          px: 12,
          py: 1.5,
          boxShadow: 2,
        }}
      >
        <Typography variant="medium" color="common.white" fontWeight={600} whiteSpace="nowrap">
          {Math.round(discount * 100)}% OFF
        </Typography>
      </Box>
    </Box>
  );
};

export default DiscountLabel;
