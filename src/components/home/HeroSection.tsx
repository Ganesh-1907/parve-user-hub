import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Leaf, FlaskConical, Rabbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [hero1, hero2, hero3];

const features = [
  { icon: Leaf, title: "100% Natural", description: "Pure plant-based ingredients" },
  { icon: FlaskConical, title: "Dermatologically Tested", description: "Safe for all skin types" },
  { icon: Rabbit, title: "Cruelty-Free", description: "Never tested on animals" },
];

export function HeroSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);

    // Auto-scroll
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(autoplay);
    };
  }, [emblaApi]);

  return (
    <section className="relative">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,320px] gap-6">
          {/* Carousel */}
          <div className="relative rounded-2xl overflow-hidden">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {slides.map((slide, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0">
                    <div className="relative aspect-[16/9] md:aspect-[21/9]">
                      <img
                        src={slide}
                        alt={`PARVE Skincare ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 to-transparent" />
                      <div className="absolute inset-0 flex items-center p-8 md:p-12">
                        <div className="max-w-md animate-fade-in-up">
                          <h1 className="font-serif text-3xl md:text-5xl font-bold text-background mb-4">
                            Nature's Best for Your Skin
                          </h1>
                          <p className="text-background/90 mb-6 text-sm md:text-base">
                            Discover the power of natural ingredients crafted into premium skincare
                          </p>
                          <Link to="/products">
                            <Button size="lg" className="shadow-medium">
                              Shop Now
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={scrollNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedIndex === index ? "bg-background w-6" : "bg-background/50"
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div className="flex lg:flex-col gap-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`flex-1 bg-card rounded-xl p-4 md:p-5 shadow-soft hover-lift animate-fade-in-up stagger-${index + 1}`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-serif font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
