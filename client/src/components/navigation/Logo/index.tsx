import { Typography, Link } from "@mui/material";

type LogoProps = {
  color?: "light" | "dark";
};

const Logo: React.FC<LogoProps> = ({ color = "dark" }) => {
  return (
    <Link href="/" sx={{ color: color === "dark" ? "grey.500" : "common.white" }}>
      <Typography color="inherit" textTransform="uppercase" fontSize={24} fontFamily='"Cinzel", serif'>
        Sandrela
      </Typography>
    </Link>
  );
};

export default Logo;
