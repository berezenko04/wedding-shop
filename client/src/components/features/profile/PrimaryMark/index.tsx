import { Stack, Typography } from "@mui/material";

const PrimaryMark: React.FC = () => {
  return (
    <Stack
      py={0.5}
      px={1}
      sx={(theme) => ({
        backgroundColor: theme.palette.success[100],
        maxWidth: "max-content",
        userSelect: "none",
      })}
    >
      <Typography color="success.main">Primary</Typography>
    </Stack>
  );
};

export default PrimaryMark;
