import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/mockData";

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Discover our most loved skincare essentials
            </p>
          </div>
          <Link to="/products" className="hidden md:block">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className={`animate-fade-in-up stagger-${index + 1}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/products">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
