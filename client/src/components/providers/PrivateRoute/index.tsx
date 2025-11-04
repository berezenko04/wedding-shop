import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

// components
import Loader from "@/components/ui/loaders/Loader";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

// types
import { Statuses } from "@/types/enums.types";

const PrivateRoute: React.FC = () => {
  const { isAuth, status } = useSelector(authSelector);

  if (status === Statuses.LOADING) return <Loader />;
  if (status === Statuses.ERROR || !isAuth) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRoute;
