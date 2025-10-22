import { Stack, Typography } from "@mui/material";

// components
import CustomContainer from "@/components/ui/layout/CustomContainer";

type HomepageSectionProps = {
  title: string;
  children: React.ReactNode;
};

const HomepageSection: React.FC<HomepageSectionProps> = ({ title, children }) => {
  return (
    <CustomContainer>
      <Stack component="section" py={9} gap={8}>
        <Typography variant="h2">{title}</Typography>
        {children}
      </Stack>
    </CustomContainer>
  );
};

export default HomepageSection;
