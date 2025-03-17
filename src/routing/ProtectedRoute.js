import { Navigate, Outlet } from 'react-router-dom';
import cookieManager from "../modules/shared/utils/cookieManager";
import cookieKeys from "../constants/cookieKeys";

/**
 * ProtectedRoute component
 *
 * A higher-order component that protects routes based on user roles.
 * Redirects to the home page if the user is not authenticated or does not have the required role.
 *
 * @param {Object} props - The component props
 * @param {Array<string>} props.roles - The roles allowed to access the route
 * @returns {JSX.Element} The ProtectedRoute component
 */
const ProtectedRoute = ({ roles }) => {
  const user = cookieManager.get(cookieKeys.USER);

  if (!user) {
    console.log(user);
    return <Navigate to="/" replace />;
  }

  if (roles && !roles.includes(user)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;