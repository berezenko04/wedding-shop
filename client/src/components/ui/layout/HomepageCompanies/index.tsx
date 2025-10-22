import { Box, Stack } from "@mui/material";

// components
import CustomContainer from "../CustomContainer";

// data
import { companies } from "@/data/main";

const HomepageCompanies: React.FC = () => {
  return (
    <Stack py={8} sx={{ backgroundColor: "grey.50" }}>
      <CustomContainer sx={{ flexDirection: "row", alignItems: "center", gap: 4, justifyContent: "space-between" }}>
        {companies.map(({ src, alt }, idx) => (
          <Box key={idx} component="img" src={src} alt={alt} />
        ))}
      </CustomContainer>
    </Stack>
  );
};

export default HomepageCompanies;
