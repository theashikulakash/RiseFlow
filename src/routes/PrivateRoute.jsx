import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Spinner from "../components/Spinner.jsx";

// Guards any private route. Crucially, it waits for the auth/profile check
// to finish (loading) before deciding to redirect — this is what stops a
// logged-in user from being bounced to /login on a page reload, since the
// session cookie takes a moment to be verified.
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner full />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
};

export default PrivateRoute;
