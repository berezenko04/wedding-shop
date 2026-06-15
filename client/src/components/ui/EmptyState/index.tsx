import { Stack, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type Props = {
  icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>>;
  title: string;
  description: string;
  additional?: React.ReactNode;
  withoutMarginTop?: boolean;
};

const EmptyState: React.FC<Props> = ({ icon: Icon, title, description, additional, withoutMarginTop }) => {
  return (
    <Stack alignItems="center" gap={3} mt={withoutMarginTop ? 0 : 8}>
      <Icon sx={{ width: 64, height: 64, color: 'primary.main' }} />
      <Stack alignItems="center" gap={1}>
        <Typography variant="medium">{title}</Typography>
        <Typography textAlign="center">{description}</Typography>
      </Stack>
      {additional}
    </Stack>
  );
};

export default EmptyState;
