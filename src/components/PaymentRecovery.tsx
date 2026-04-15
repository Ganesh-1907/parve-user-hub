import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { reconcilePendingPaymentsApi } from "@/api/payment.api";
import { toast } from "@/hooks/use-toast";
import { hasValidToken } from "@/lib/auth";
import { useAuthStore, useCartStore } from "@/store/useStore";

const PaymentRecovery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, token } = useAuthStore();
  const lastCheckedTokenRef = useRef<string | null>(null);
  const recoveryKey = token ? `${token}:${location.pathname}` : null;

  useEffect(() => {
    if (!isLoggedIn || !token || !hasValidToken()) {
      lastCheckedTokenRef.current = null;
      return;
    }

    if (lastCheckedTokenRef.current === recoveryKey) {
      return;
    }

    lastCheckedTokenRef.current = recoveryKey;
    let cancelled = false;

    const recoverPendingPayments = async () => {
      try {
        const result = await reconcilePendingPaymentsApi();

        if (cancelled || !result?.recoveredCount) {
          return;
        }

        try {
          await useCartStore.getState().clearCart();
        } catch (clearCartError) {
          console.error("Failed to clear cart after recovering payment:", clearCartError);
        }

        toast({
          title: "Payment confirmed",
          description: "Your order has been confirmed and confirmation email is being sent.",
        });

        if (location.pathname === "/checkout") {
          navigate("/orders", { replace: true });
        }
      } catch (error) {
        console.error("Failed to recover pending payments:", error);
      }
    };

    recoverPendingPayments();

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn, token, location.pathname, navigate, recoveryKey]);

  return null;
};

export default PaymentRecovery;
