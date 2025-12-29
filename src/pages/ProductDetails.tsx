import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/mockData";
import { useCartStore, useWishlistStore } from "@/store/useStore";
import { toast } from "@/hooks/use-toast";
import { ProductCard } from "@/components/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  const product = products.find((p) => p.id === id);
  const relatedProducts = products.filter((p) => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="font-serif text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/products">
          <Button>Browse Products</Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discountedPrice = product.discount
    ? product.price * (1 - product.discount.percentage / 100)
    : null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from wishlist" });
    } else {
      addToWishlist(product.id);
      toast({ title: "Added to wishlist" });
    }
  };

  return (
    <div className="py-8 md:py-12">
      <div className="container">
        {/* Breadcrumb */}
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ChevronLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="capitalize">{product.category}</Badge>
                {product.discount && (
                  <Badge className="bg-destructive">-{product.discount.percentage}% OFF</Badge>
                )}
              </div>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.unit}</p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              {discountedPrice ? (
                <>
                  <span className="font-serif text-3xl font-bold">₹{discountedPrice.toFixed(0)}</span>
                  <span className="text-xl text-muted-foreground line-through">₹{product.price}</span>
                </>
              ) : (
                <span className="font-serif text-3xl font-bold">₹{product.price}</span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-destructive text-destructive" : ""}`} />
                {inWishlist ? "In Wishlist" : "Add to Wishlist"}
              </Button>
            </div>

            {/* Skin Concerns */}
            {product.concerns && product.concerns.length > 0 && (
              <div>
                <span className="font-medium mb-2 block">Recommended for:</span>
                <div className="flex flex-wrap gap-2">
                  {product.concerns.map((concern) => (
                    <Badge key={concern} variant="secondary" className="capitalize">
                      {concern} skin
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-serif text-2xl font-bold mb-6">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
