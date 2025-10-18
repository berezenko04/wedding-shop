import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo: React.FC = () => {
  return (
    <Link to="/">
      <Typography textTransform="uppercase" fontSize={24} fontFamily='"Cinzel", serif'>
        Sandrela
      </Typography>
    </Link>
  );
};

export default Logo;
