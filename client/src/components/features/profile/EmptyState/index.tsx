import { Button, Stack, Typography } from "@mui/material";

// icons
import { Add } from "@mui/icons-material";

type EmptyStateProps = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, buttonText, onClick }) => {
  return (
    <Stack
      p={3}
      flexDirection="row"
      justifyContent="space-between"
      gap={4}
      sx={(theme) => ({ border: `1px solid ${theme.palette.grey[100]}` })}
    >
      <Stack>
        <Typography variant="medium" fontSize={20} textTransform="uppercase">
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Stack>
      <Button startIcon={<Add />} variant="contained" color="primary" size="small" onClick={onClick}>
        {buttonText}
      </Button>
    </Stack>
  );
};

export default EmptyState;
