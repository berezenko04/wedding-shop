import { Box, Link, Tab } from '@mui/material';
import { TabContext, TabList } from '@mui/lab';
import { useLocation } from 'react-router';
import { useState } from 'react';

// data
import { profileMenu } from '@/data/menus';

const MobileProfileMenu: React.FC = () => {
  const location = useLocation();

  const [tabIdx, setTabIdx] = useState<string>(location.pathname);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabIdx(newValue);
  };

  return (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <TabContext value={tabIdx}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <TabList
            onChange={handleChange}
            sx={{
              width: 'max-content',
              minWidth: '100%',
            }}
          >
            {profileMenu.map(({ title, href, icon: Icon }, idx) => (
              <Tab
                key={idx}
                label={title}
                value={href}
                icon={<Icon />}
                iconPosition="start"
                component={Link as any}
                to={href}
              />
            ))}
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
};

export default MobileProfileMenu;
