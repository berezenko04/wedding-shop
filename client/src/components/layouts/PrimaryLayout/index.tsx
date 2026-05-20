import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

// components
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import PrivacyRights from '@/components/navigation/Footer/PrivacyRights';
import Breadcrumbs from '@/components/navigation/Breadcrumbs';
import CustomContainer from '@/components/ui/Layout/CustomContainer';

const PrimaryLayout: React.FC = () => {
  return (
    <Stack minHeight="100svh">
      <Header />
      <Breadcrumbs />
      <Stack flexGrow={1} flexDirection="column" py={{ xs: 2, sm: 4, md: 6 }}>
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
