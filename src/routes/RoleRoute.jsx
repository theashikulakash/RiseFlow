import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "../components/Spinner.jsx";

// Guards a route to one or more roles, e.g. <RoleRoute roles={["admin"]}>
const RoleRoute = ({ roles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner full />;
  if (!user) return <Navigate to="/login" replace />;
  if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return children;
};

export default RoleRoute;
