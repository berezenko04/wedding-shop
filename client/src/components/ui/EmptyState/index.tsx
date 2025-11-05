import { Stack, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

type EmptyStateProps = {
  icon: OverridableComponent<SvgIconTypeMap<object, "svg">>;
  title: string;
  description: string;
  additional?: React.ReactNode;
};

const EmptyState: React.FC<EmptyStateProps> = ({ icon: Icon, title, description, additional }) => {
  return (
    <Stack alignItems="center" gap={3} mt={8}>
      <Icon sx={{ width: 64, height: 64, color: "primary.main" }} />
      <Stack alignItems="center" gap={1}>
        <Typography variant="medium">{title}</Typography>
        <Typography>{description}</Typography>
      </Stack>
      {additional}
    </Stack>
  );
};

export default EmptyState;
