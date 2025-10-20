import { Link, Stack } from "@mui/material";

// data
import { socials } from "@/data/socials";

const Socials: React.FC = () => {
  return (
    <Stack sx={{ flexDirection: "row", gap: 2 }}>
      {socials.map(({ icon: Icon, href }, idx) => (
        <Link href={href} key={idx} sx={{ width: 24, height: 24 }}>
          <Icon
            sx={{
              color: "grey.400",
              transition: "all .25s ease-in-out",
              "&:hover": { color: "primary.main" },
            }}
          />
        </Link>
      ))}
    </Stack>
  );
};

export default Socials;
