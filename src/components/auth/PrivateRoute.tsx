import { Navigate, Outlet } from "react-router-dom";
import { getAccessToken } from "../../apis/auth";

function PrivateRoute() {
  if (!getAccessToken()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default PrivateRoute;
