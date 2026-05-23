import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const RootLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return <Outlet />;
};

export default RootLayout;
