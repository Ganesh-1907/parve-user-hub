import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWishlistStore, useCartStore } from "@/store/useStore";
import { products } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const Wishlist = () => {
  const { items, removeItem } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const wishlistProducts = items
    .map((item) => products.find((p) => p.id === item.productId))
    .filter(Boolean);

  if (wishlistProducts.length === 0) {
    return (
      <div className="container py-16 text-center">
        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-serif text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Save items you love for later.</p>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const handleMoveToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      addToCart(product, 1);
      removeItem(productId);
      toast({
        title: "Moved to cart",
        description: `${product.name} has been moved to your cart.`,
      });
    }
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">My Wishlist</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map((product) => {
            if (!product) return null;
            const discountedPrice = product.discount
              ? product.price * (1 - product.discount.percentage / 100)
              : null;

            return (
              <div key={product.id} className="bg-card rounded-xl overflow-hidden shadow-soft">
                <Link to={`/products/${product.id}`}>
                  <div className="aspect-square bg-secondary">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-serif font-semibold hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 my-2">
                    {discountedPrice ? (
                      <>
                        <span className="font-semibold">₹{discountedPrice.toFixed(0)}</span>
                        <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
                      </>
                    ) : (
                      <span className="font-semibold">₹{product.price}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleMoveToCart(product.id)}
                    >
                      Move to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
