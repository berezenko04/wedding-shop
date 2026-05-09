import { Pagination, PaginationProps, useMediaQuery, useTheme } from '@mui/material';

const CustomPagination: React.FC<PaginationProps> = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return <Pagination siblingCount={isMobile ? 0 : 1} boundaryCount={isMobile ? 1 : 2} {...props} />;
};

export default CustomPagination;
