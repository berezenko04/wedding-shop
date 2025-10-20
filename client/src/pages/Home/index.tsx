import { ArrowOutward } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

const Home: React.FC = () => {
  return (
    <div>
      <Typography variant="h1">Hello world!</Typography>
      <Typography variant="h2">Hello world!</Typography>
      <Typography variant="h3">Hello world!</Typography>
      <Typography variant="h4">Hello world!</Typography>
      <Typography variant="h5">Hello world!</Typography>
      <Typography>Hello world!</Typography>
      <Button variant="outlined" color="primary">
        Hello world
      </Button>
      <Button variant="outlined" size="small" color="primary">
        Hello world
      </Button>
      <Button
        startIcon={
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        }
        variant="contained"
        color="primary"
      >
        Hello world
      </Button>
      <Button variant="contained" size="small" color="primary">
        Hello world
      </Button>
      <Button>Hello world</Button>
      <Button variant="iconary" color="grey">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </Button>
      <Box sx={{ backgroundColor: "black" }} p={5}>
        <Button variant="outlined" size="small" color="white" endIcon={<ArrowOutward />}>
          Hello world
        </Button>
      </Box>
    </div>
  );
};

export default Home;
