import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTokenExpiryTime } from "@/lib/auth";
import { useAuthStore, useCartStore, useWishlistStore } from "@/store/useStore";

const SessionWatcher = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!token || !isLoggedIn) return;

    void useCartStore.getState().syncWithBackend();
    void useWishlistStore.getState().syncWithBackend();
  }, [isLoggedIn, token]);

  useEffect(() => {
    if (!token) return;

    const expiryTime = getTokenExpiryTime(token);
    if (!expiryTime) {
      logout();
      navigate("/login", { replace: true });
      return;
    }

    const remainingTime = expiryTime - Date.now();

    if (remainingTime <= 0) {
      logout();
      navigate("/login", { replace: true });
      return;
    }

    const timeoutId = window.setTimeout(() => {
      logout();
      navigate("/login", { replace: true });
    }, remainingTime);

    return () => window.clearTimeout(timeoutId);
  }, [token, logout, navigate]);

  return null;
};

export default SessionWatcher;
