import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { useCartStore, useWishlistStore } from "@/store/useStore";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount.percentage / 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product.id);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="relative bg-card rounded-lg overflow-hidden shadow-soft hover-lift">
        {/* Image */}
        <div className="aspect-square relative overflow-hidden bg-secondary">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Discount Badge */}
          {product.discount && (
            <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
              -{product.discount.percentage}%
            </Badge>
          )}
          
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${inWishlist ? "fill-destructive text-destructive" : ""}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-serif font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{product.unit}</p>
          
          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            {discountedPrice ? (
              <>
                <span className="font-semibold text-lg">₹{discountedPrice.toFixed(0)}</span>
                <span className="text-sm text-muted-foreground line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="font-semibold text-lg">₹{product.price}</span>
            )}
          </div>

          {/* Add to Cart */}
          <Button
            className="w-full gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
}
