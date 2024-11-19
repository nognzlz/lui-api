import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
import { useEffect } from "react";

const ProtectedRoutes = () => {
  const { user, loading, reloadUser } = useAuth();

  useEffect(() => {
    reloadUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default ProtectedRoutes;