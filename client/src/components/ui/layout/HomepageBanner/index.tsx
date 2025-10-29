import { Box, Button, Stack, Typography } from "@mui/material";

// components
import CustomContainer from "../CustomContainer";

// icons
import { CallMadeOutlined } from "@mui/icons-material";

const HomepageBanner: React.FC = () => {
  return (
    <Box sx={{ width: "100%", height: 650, position: "relative" }}>
      <Box
        component="img"
        src="/banner.webp"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 72,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
        }}
      >
        <CustomContainer>
          <Stack gap={8} alignItems="center">
            <Typography
              variant="h1"
              sx={(theme) => ({
                fontSize: 76,
                color: `${theme.palette.grey[50]} !important`,
                textAlign: "center",
                lineHeight: "130%",
              })}
            >
              Bridal shop with the possibility of individual tailoring
            </Typography>
            <Button href="/catalog" variant="outlined" color="white" endIcon={<CallMadeOutlined />}>
              View All
            </Button>
          </Stack>
        </CustomContainer>
      </Box>
    </Box>
  );
};

export default HomepageBanner;
