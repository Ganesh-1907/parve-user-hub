import { Link, useNavigate } from "react-router-dom";
import { CreditCard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore, useAuthStore } from "@/store/useStore";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isLoggedIn, user } = useAuthStore();

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Please Login to Continue</h1>
        <p className="text-muted-foreground mb-6">Sign in to complete your purchase.</p>
        <Link to="/login">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }

  const handlePayment = () => {
    // Mock payment - in production this would integrate with a payment gateway
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. You will receive a confirmation email shortly.",
    });
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="py-8 md:py-12">
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
                  <Label>Address</Label>
                  <Input defaultValue={user?.address} disabled />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card rounded-xl p-6 shadow-soft sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                {items.map(({ product, quantity }) => {
                  const price = product.discount
                    ? product.price * (1 - product.discount.percentage / 100)
                    : product.price;
                  return (
                    <div key={product.id} className="flex justify-between text-sm">
                      <span>
                        {product.name} × {quantity}
                      </span>
                      <span>₹{(price * quantity).toFixed(0)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4 space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{getTotalPrice().toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-natural">Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toFixed(0)}</span>
                </div>
              </div>

              <Button className="w-full gap-2" size="lg" onClick={handlePayment}>
                <CreditCard className="h-5 w-5" />
                Pay ₹{getTotalPrice().toFixed(0)}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
