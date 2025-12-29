import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { ProductCard } from "@/components/ProductCard";
import { products, skinConcerns } from "@/data/mockData";

const categories = [
  { id: "all", name: "All Products" },
  { id: "facewash", name: "Facewash" },
  { id: "serums", name: "Serums" },
  { id: "creams", name: "Creams" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [concern, setConcern] = useState(searchParams.get("concern") || "");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "all" || product.category === category;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesConcern = !concern || product.concerns?.includes(concern);
      return matchesSearch && matchesCategory && matchesPrice && matchesConcern;
    });
  }, [search, category, priceRange, concern]);

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    const newParams = new URLSearchParams(searchParams);
    if (value === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", value);
    }
    setSearchParams(newParams);
  };

  const handleConcernChange = (value: string) => {
    setConcern(value === concern ? "" : value);
    const newParams = new URLSearchParams(searchParams);
    if (value === concern) {
      newParams.delete("concern");
    } else {
      newParams.set("concern", value);
    }
    setSearchParams(newParams);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Badge
              key={cat.id}
              variant={category === cat.id ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleCategoryChange(cat.id)}
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={5000}
          step={100}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>

      {/* Skin Concerns */}
      <div>
        <h4 className="font-semibold mb-3">Skin Concerns</h4>
        <div className="flex flex-wrap gap-2">
          {skinConcerns.map((c) => (
            <Badge
              key={c.id}
              variant={concern === c.id ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleConcernChange(c.id)}
            >
              {c.image} {c.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-8 md:py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Our Products</h1>
          <p className="text-muted-foreground">
            Discover skincare crafted with nature's finest ingredients
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-card rounded-xl p-6 shadow-soft">
              <h3 className="font-serif text-lg font-semibold mb-4">Filters</h3>
              <FilterContent />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Mobile Filter */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="outline" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort */}
              <Select defaultValue="featured">
                <SelectTrigger className="w-40 hidden md:flex">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-4">
              Showing {filteredProducts.length} products
            </p>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className={`animate-fade-in-up stagger-${(index % 5) + 1}`}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setPriceRange([0, 5000]);
                  setConcern("");
                  setSearchParams({});
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
