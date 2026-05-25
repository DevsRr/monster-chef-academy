import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AppLoader from "../shared/AppLoader";

export default function ProtectedRoute({ children }) {
  const { loading, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  if (loading) {
    return <AppLoader label="Verifying access..." />;
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin/login" replace state={{ redirectTo: location.pathname }} />;
  }

  return children;
}
