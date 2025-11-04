import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

// redux
import { authSelector } from "@/redux/auth/auth.selectors";

const PublicRoute = () => {
  const { isAuth } = useSelector(authSelector);

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
