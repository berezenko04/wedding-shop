import { Breadcrumbs as MUIBreadcrumbs, Link, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';

// components
import CustomContainer from '@/components/ui/Layout/CustomContainer';

// icons
import { NavigateNext } from '@mui/icons-material';

// utils
import { formatBreadcrumb } from '@/utils/formatBreadcrumbs';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box py={2} sx={{ backgroundColor: 'grey.50' }}>
      <CustomContainer>
        <MUIBreadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
          <Link href="/" variant="underlined" color="grey.900">
            Home
          </Link>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const slug = formatBreadcrumb(value);

            return isLast ? (
              <Typography key={to} color="grey.900">
                {slug}
              </Typography>
            ) : (
              <Link key={to} href={to} variant="underlined" color="grey.900">
                {slug}
              </Link>
            );
          })}
        </MUIBreadcrumbs>
      </CustomContainer>
    </Box>
  );
};

export default Breadcrumbs;
