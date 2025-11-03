import { Link, Stack } from "@mui/material";
import { useLocation } from "react-router";

// data
import { profileMenu } from "@/data/menus";

const ProfileMenu: React.FC = () => {
  const location = useLocation();

  return (
    <Stack gap={0.5}>
      {profileMenu.map(({ title, href, icon: Icon }, idx) => {
        const isActive = location.pathname.includes(href);

        return (
          <Link
            key={idx}
            href={`/profile/${href}`}
            variant="plain"
            textTransform="uppercase"
            color={isActive ? "primary.main" : "grey.500"}
            fontWeight={500}
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              p: 1,
              transition: "all .15s ease-in-out",
              "&:hover": { color: !isActive ? "common.black" : null },
            }}
          >
            <Icon />
            {title}
          </Link>
        );
      })}
    </Stack>
  );
};

export default ProfileMenu;
