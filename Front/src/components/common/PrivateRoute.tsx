import { Navigate, Outlet } from "react-router-dom";
import { checkLogin } from "../../utils/userAPI";

const PrivateRoute: React.FC = () => {
  const isAuthenticated = checkLogin();
  return isAuthenticated? <Outlet /> : <Navigate to="/landing" />;
}

export default PrivateRoute