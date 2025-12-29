import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/useStore";

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      <div className="container">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => {
              const discountedPrice = product.discount
                ? product.price * (1 - product.discount.percentage / 100)
                : product.price;

              return (
                <div
                  key={product.id}
                  className="flex gap-4 bg-card rounded-xl p-4 shadow-soft"
                >
                  <Link to={`/products/${product.id}`} className="flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-serif font-semibold hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-2">{product.unit}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">₹{discountedPrice.toFixed(0)}</span>
                      {product.discount && (
                        <span className="text-sm text-muted-foreground line-through">
                          ₹{product.price}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            <Button variant="ghost" className="text-destructive" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-soft sticky top-24">
              <h2 className="font-serif text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{getTotalPrice().toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-natural">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toFixed(0)}</span>
                </div>
              </div>

              <Link to="/checkout">
                <Button className="w-full gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <Link to="/products" className="block mt-4 text-center text-sm text-muted-foreground hover:text-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
