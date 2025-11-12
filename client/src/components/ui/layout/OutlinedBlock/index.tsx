import { Stack } from "@mui/material";

type OutlinedBlockProps = {
  children: React.ReactNode;
};

const OutlinedBlock: React.FC<OutlinedBlockProps> = ({ children }) => {
  return (
    <Stack p={3} sx={(theme) => ({ border: `1px solid ${theme.palette.grey[100]}` })}>
      {children}
    </Stack>
  );
};

export default OutlinedBlock;
