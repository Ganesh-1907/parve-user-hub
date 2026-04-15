import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CreditCard, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore, useAuthStore } from "@/store/useStore";
import { toast } from "@/hooks/use-toast";
import { createRazorpayOrderApi, reconcilePendingPaymentsApi, verifyPaymentApi } from "@/api/payment.api";
import api from "@/api/axios";
import { getErrorMessage } from "@/lib/error-message";

interface PaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
  const [confirmationState, setConfirmationState] = useState({
    title: "Confirming your payment",
    description: "Please wait while we verify your payment and prepare your order.",
  });
  const [address, setAddress] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);

  // Initialize address from user profile
  useEffect(() => {
    if (user?.address) {
      setAddress(user.address);
    }
  }, [user]);

  const showConfirmationOverlay = (title: string, description: string) => {
    setConfirmationState({ title, description });
    setIsConfirmingOrder(true);
  };

  const completeOrderFlow = async (title: string, description: string) => {
    showConfirmationOverlay(title, description);
    try {
      await clearCart();
    } catch (error) {
      console.error("Failed to clear cart after confirmed payment:", error);
    }
  };

  const tryRecoverConfirmedOrder = async () => {
    const recoveryStates = [
      {
        title: "Finalizing your order",
        description: "Your payment was received. We are confirming the order with Razorpay.",
      },
      {
        title: "Still confirming",
        description: "Please stay on this page for a moment while we complete your order safely.",
      },
      {
        title: "Almost done",
        description: "We are waiting for the final confirmation so your order and email can be created.",
      },
    ];

    for (let attempt = 0; attempt < recoveryStates.length; attempt += 1) {
      const currentState = recoveryStates[attempt];
      showConfirmationOverlay(currentState.title, currentState.description);

      try {
        const recovered = await reconcilePendingPaymentsApi();

        if (recovered?.recoveredCount) {
          await completeOrderFlow(
            "Order confirmed",
            "Your order is confirmed now. We are taking you to your orders page.",
          );
          toast({
            title: "Payment confirmed",
            description: "Your order has been confirmed and confirmation email is being sent.",
          });
          window.setTimeout(() => navigate("/orders"), 900);
          return true;
        }
      } catch (recoveryError) {
        console.error("Delayed payment recovery check failed:", recoveryError);
      }

      if (attempt < recoveryStates.length - 1) {
        await wait(2500);
      }
    }

    setIsConfirmingOrder(false);
    return false;
  };

  const handlePayment = async () => {
    try {
      if (!address.trim()) {
         toast({
          title: "Address required",
          description: "Please enter a valid delivery address.",
          variant: "destructive",
        });
        return;
      }

      setLoading(true);

      // Save address if checked
      if (saveAddress) {
        try {
          await api.put("/users/profile", { address });
        } catch (err) {
          console.error("Failed to save address", err);
        }
      }

      const amount = getTotalPrice();
      // Prepare order data
      const orderData = {
        items: items.map(item => ({
          productId: item.product._id || item.product.id,
          quantity: item.quantity,
          price: item.product.finalPrice || item.product.price // Pass price too
        })),
        address: address // Use the edited address
      };

      // 1. Create Order on Backend
      const data = await createRazorpayOrderApi(orderData);
      
      if (!data.success) {
        throw new Error(data.message || "Failed to create order");
      }

      const options = {
        key: data.key,
        amount: data.order.amount,
        currency: "INR",
        name: "Parve Skincare",
        description: "Payment for order",
        image: "/logo.parve.png",
        order_id: data.order.id, 
        handler: async function (response: PaymentResponse) {
          showConfirmationOverlay(
            "Confirming your payment",
            "Please wait while we verify your payment and create your order.",
          );

          try {
            // 2. Verify Payment on Backend
            const verifyData = {
              ...response,
              orderItems: data.orderItems, // Use items from backend response to be safe
              address: address, // consistent with created order
              totalAmount: data.amount,
            };

            const verification = await verifyPaymentApi(verifyData);

            if (verification.success) {
              await completeOrderFlow(
                "Order confirmed",
                "Your payment is verified. We are preparing your order summary now.",
              );
              toast({
                title: "Order Placed Successfully!",
                description: "Thank you for your purchase. Confirmation email will reach you shortly.",
              });
              // Await a bit to let the user see the success
              window.setTimeout(() => navigate("/orders"), 1000);
            } else {
              throw new Error(verification.message || "Payment verification failed");
            }
          } catch (error: any) {
            console.error("Verification Error:", error);
            const recovered = await tryRecoverConfirmedOrder();

            if (!recovered) {
              toast({
                title: "Payment received. Final confirmation pending.",
                description:
                  "If the amount was debited, your order will be confirmed automatically and email will be sent shortly.",
                variant: "destructive",
              });
            }
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone
        },
        notes: {
          address: address
        },
        theme: {
          color: "#0ea5e9"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setIsConfirmingOrder(false);
        toast({
          title: "Payment failed",
          description:
            response?.error?.description || "Your payment could not be completed. Please try again.",
          variant: "destructive",
        });
      });
      rzp.open();

    } catch (error: any) {
      console.error("Payment Error:", error);
      toast({
        title: "Unable to start payment",
        description: getErrorMessage(
          error,
          "We're having trouble starting payment right now. Please try again.",
        ),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = getTotalPrice();
  const shippingFree = totalPrice >= 500;
  const shippingCost = shippingFree ? 0 : 50;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="py-8 md:py-12">
      {isConfirmingOrder ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[28px] border border-sky-100 bg-white/95 p-8 shadow-[0_32px_90px_-40px_rgba(14,165,233,0.55)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
            <h2 className="mt-6 text-center font-serif text-2xl font-semibold text-slate-900">
              {confirmationState.title}
            </h2>
            <p className="mt-3 text-center text-sm leading-6 text-slate-600">
              {confirmationState.description}
            </p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-sky-50">
              <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-sky-300 via-sky-500 to-sky-300" />
            </div>
            <p className="mt-4 text-center text-xs uppercase tracking-[0.24em] text-slate-400">
              Please don&apos;t refresh or close this page
            </p>
          </div>
        </div>
      ) : null}

      <div className="container max-w-4xl">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 shadow-soft">
              <h2 className="font-serif text-xl font-semibold mb-4">Shipping Details</h2>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input defaultValue={user?.name} disabled />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input defaultValue={user?.email} disabled />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input defaultValue={user?.phone} disabled />
                </div>
                <div>
                  <Label>Address (Delivery Location)</Label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your delivery address"
                  />
                  <div className="flex items-center space-x-2 mt-2">
                    <input 
                      type="checkbox" 
                      id="saveAddress" 
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                    />
                    <label 
                      htmlFor="saveAddress" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save as default address
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              <p><strong>Note:</strong> We will deliver to this address. Please ensure it is correct.</p>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card rounded-xl p-6 shadow-soft sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map(({ product, quantity }) => {
                  const productId = product._id || product.id;
                  const price = product.finalPrice || (product.discount?.percentage
                    ? product.price * (1 - product.discount.percentage / 100)
                    : product.price);
                    
                  return (
                    <div key={productId} className="flex justify-between text-sm py-2 border-b last:border-0">
                      <div>
                        <span className="font-medium">{product.productName || product.name}</span>
                        <div className="text-muted-foreground text-xs">x {quantity}</div>
                      </div>
                      <span>₹{Math.round(price * quantity)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{Math.round(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  {shippingFree ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span>₹{shippingCost}</span>
                  )}
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t mt-2">
                  <span>Total Payable</span>
                  <span className="text-primary">₹{Math.round(finalTotal)}</span>
                </div>
              </div>

              <Button 
                className="w-full gap-2 h-12" 
                size="lg" 
                onClick={handlePayment} 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    Pay Now
                  </>
                )}
              </Button>
              
              <div className="mt-4 flex justify-between items-center text-xs text-muted-foreground px-2">
                <span>Secure Payment by Razorpay</span>
                <div className="flex gap-2">
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>UPI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
