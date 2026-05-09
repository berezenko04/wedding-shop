import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

// components
import Header from '@/components/navigation/Header';
import WarAlert from '@/components/navigation/WarAlert';
import Footer from '@/components/navigation/Footer';
import PrivacyRights from '@/components/navigation/Footer/PrivacyRights';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import CustomContainer from '@/components/ui/layout/CustomContainer';

const PrimaryLayout: React.FC = () => {
  return (
    <Stack minHeight="100svh">
      <WarAlert />
      <Header />
      <Breadcrumbs />
      <Stack flexGrow={1} flexDirection="column" py={{ xs: 4, md: 6 }}>
        <CustomContainer>
          <Outlet />
        </CustomContainer>
      </Stack>
      <Footer />
      <PrivacyRights />
    </Stack>
  );
};

export default PrimaryLayout;
