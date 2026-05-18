import { Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';

// components
import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import PrivacyRights from '@/components/navigation/Footer/PrivacyRights';

const HomeLayout: React.FC = () => {
  return (
    <Stack minHeight="100svh">
      <Header />
      <Stack flexGrow={1} flexDirection="column">
        <Outlet />
      </Stack>
      <Footer />
      <PrivacyRights />
    </Stack>
  );
};

export default HomeLayout;
