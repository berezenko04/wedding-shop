import { Box, Link, Stack, Typography } from "@mui/material";

// components
import CustomContainer from "@/components/ui/layout/CustomContainer";

// data
import { privacyMenu } from "@/data/menus";

const PrivacyRights: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: "common.black" }} py={2}>
      <CustomContainer>
        <Stack flexDirection="row" justifyContent="space-between" alignItems="center" gap={3}>
          <Typography color="grey.400">© {new Date().getFullYear()} Sandrela, All Rights Reserved</Typography>
          <Stack flexDirection="row" alignItems="center" gap={3}>
            {privacyMenu.map(({ title, href }) => (
              <Link href={href} color="grey">
                {title}
              </Link>
            ))}
          </Stack>
        </Stack>
      </CustomContainer>
    </Box>
  );
};

export default PrivacyRights;
