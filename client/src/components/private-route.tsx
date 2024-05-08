import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth";

const PrivateRoute = () => {
  const user = useAuth();
  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
