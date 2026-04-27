import { Skeleton } from '@mui/material';

const OrdersSkeleton: React.FC = () => {
  return <Skeleton variant="rectangular" animation="wave" width="100%" height={300} />;
};

export default OrdersSkeleton;
