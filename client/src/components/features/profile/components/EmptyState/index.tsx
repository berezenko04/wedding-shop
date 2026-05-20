import { Button, Stack, Typography } from '@mui/material';

// components
import OutlinedBlock from '@/components/ui/Layout/OutlinedBlock';

// icons
import { Add } from '@mui/icons-material';

type EmptyStateProps = {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
};

const EmptyState: React.FC<EmptyStateProps> = ({ title, description, buttonText, onClick }) => {
  return (
    <OutlinedBlock>
      <Stack flexDirection={{ xs: 'column', md: 'row' }} justifyContent="space-between" gap={{ xs: 2, md: 4 }}>
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
    </OutlinedBlock>
  );
};

export default EmptyState;
