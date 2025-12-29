import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { IngredientsSection } from "@/components/home/IngredientsSection";
import { HowToUseSection } from "@/components/home/HowToUseSection";
import { ConcernsSection } from "@/components/home/ConcernsSection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <IngredientsSection />
      <HowToUseSection />
      <ConcernsSection />
    </>
  );
};

export default Index;
