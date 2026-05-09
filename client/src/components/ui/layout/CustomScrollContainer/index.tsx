import { Stack, SxProps, Theme } from '@mui/material';

type CustomScrollContainerProps = {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

const CustomScrollContainer: React.FC<CustomScrollContainerProps> = ({ children, sx }) => {
  return (
    <Stack
      sx={[
        (theme: Theme) => ({
          overflowY: 'auto',
          overflowX: 'hidden',
          minWidth: 0,

          '&::-webkit-scrollbar': {
            width: 32,
            height: 32,
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.main,
            border: '12px solid transparent',
            backgroundClip: 'content-box',
          },

          '&::-webkit-scrollbar-button': {
            display: 'none',
            height: 0,
            width: 0,
          },
        }),
        ...(sx ? (Array.isArray(sx) ? sx : [sx]) : []),
      ]}
    >
      {children}
    </Stack>
  );
};

export default CustomScrollContainer;
