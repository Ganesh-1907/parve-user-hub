import type { NavigateFunction } from "react-router-dom";
import { LogIn } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const showAuthRequiredToast = (
  type: "cart" | "wishlist",
  navigate: NavigateFunction,
) => {
  toast({
    variant: "auth",
    duration: 2200,
    title: (
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700 ring-1 ring-sky-200/80">
          <LogIn className="h-3.5 w-3.5" />
        </span>
        <span>{type === "cart" ? "Sign in to use your cart" : "Sign in to use your wishlist"}</span>
      </div>
    ),
  });

  navigate("/login", {
    state: {
      from: `${window.location.pathname}${window.location.search}${window.location.hash}`,
      authRequiredFor: type,
    },
  });
};
