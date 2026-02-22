import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import ingredientsFlatlay from "@/assets/ingredients-flatlay.jpg";
import ingredients1 from "@/assets/ingridents1.png";
import ingredients2 from "@/assets/ingridents2.png";

const ingredientsList = [
  { name: "Scientifically Proven", description: "Clinically tested for maximum efficacy" },
  { name: "Pure Sourcing", description: "Highest grade raw materials" },
  { name: "Skin Compatibility", description: "Balanced for all skin types" },
  { name: "Deep Hydration", description: "Molecular level moisture retention" },
  { name: "Advanced Protection", description: "Barriers against environmental stressors" },
  { name: "Refined Texture", description: "Ultra-smooth, lightweight application" },
];

export function IngredientsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  const carouselImages = [ingredientsFlatlay, ingredients1, ingredients2];

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Side - Content */}
          <div className="lg:col-span-6 animate-fade-in-up space-y-8 text-left">
            <div>
              <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-primary/10 text-primary rounded-full">
                The Science of Purity
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground tracking-tight">
                Superior Ingredients
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We meticulously select and refine every component of our formulas to ensure 
                unparalleled purity, safety, and transformative results for your skin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ingredientsList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-primary/5 hover:border-primary/20 transition-colors">
                  <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-6 py-2">
              Every drop is a result of obsessive attention to detail. We avoid 
              unnecessary fillers and harsh additives, focusing instead on 
              bio-available compounds that respect your skin's natural balance.
            </p>
          </div>

          {/* Right Side - Carousel Image Area */}
          <div className="lg:col-span-6 flex justify-center animate-slide-in-right">
            <div className="relative group w-full max-w-[500px]">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] rotate-1 group-hover:rotate-0 transition-transform duration-700"></div>
              
              {/* Carousel Container */}
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl bg-white" ref={emblaRef}>
                <div className="flex">
                  {carouselImages.map((img, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 aspect-[4/5] relative">
                      <img
                        src={img}
                        alt={`Premium Ingredient ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {carouselImages.map((_, idx) => (
                    <div key={idx} className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-sm"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
