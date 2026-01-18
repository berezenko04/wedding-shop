import { Stack, StackProps } from '@mui/material';

interface OutlinedBlockProps extends StackProps {
  children: React.ReactNode;
}

const OutlinedBlock: React.FC<OutlinedBlockProps> = ({ children, sx, ...rest }) => {
  return (
    <Stack
      p={3}
      sx={[{ border: (theme) => `1px solid ${theme.palette.grey[100]}` }, ...(Array.isArray(sx) ? sx : [sx])]}
      {...rest}
    >
      {children}
    </Stack>
  );
};

export default OutlinedBlock;
