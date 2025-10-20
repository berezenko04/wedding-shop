import { Typography, Link } from "@mui/material";

const Logo: React.FC = () => {
  return (
    <Link href="/" sx={{ textDecoration: "none", color: "grey.500" }}>
      <Typography textTransform="uppercase" fontSize={24} fontFamily='"Cinzel", serif'>
        Sandrela
      </Typography>
    </Link>
  );
};

export default Logo;
