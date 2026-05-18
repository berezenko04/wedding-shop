import { Box, Grid, Link, Stack, Typography } from '@mui/material';

// components
import CustomContainer from '@/components/ui/layout/CustomContainer';
import Socials from './Socials';
import Logo from '../Logo';

// data
import { footerContacts, footerHelpMenu } from '@/data/menus';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ backgroundColor: 'common.black' }} py={4}>
      <CustomContainer>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <Stack gap={3}>
              <Logo color="light" />
              <Socials />
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Stack gap={2}>
              <Typography color="common.white" fontSize={20} fontWeight={500} textTransform="uppercase">
                Get Help
              </Typography>
              <Stack component="nav" gap={2}>
                {footerHelpMenu.map(({ title, href }) => (
                  <Link key={href} href={href} color="grey">
                    {title}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <Stack gap={2}>
              <Typography color="common.white" fontSize={20} fontWeight={500} textTransform="uppercase">
                Contacts
              </Typography>
              <Stack component="nav" gap={2}>
                {footerContacts.map(({ title, href }) => (
                  <Link key={href} href={href} color="grey">
                    {title}
                  </Link>
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
