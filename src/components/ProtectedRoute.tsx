import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useStore";
import { clearPersistedSession, hasValidToken } from "@/lib/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn || !hasValidToken()) {
    clearPersistedSession();
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: `${location.pathname}${location.search}${location.hash}` }}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
