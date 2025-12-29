import { Leaf, Globe, Heart } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Natural & Safe",
    description: "We use only plant-based ingredients that are gentle on your skin and proven to work.",
  },
  {
    icon: Globe,
    title: "Sustainable & Eco-Friendly",
    description: "Our packaging is recyclable and we're committed to reducing our environmental footprint.",
  },
  {
    icon: Heart,
    title: "Inclusive Beauty",
    description: "We believe everyone deserves access to premium skincare, regardless of skin type or background.",
  },
];

const About = () => {
  return (
    <div className="py-8 md:py-12">
      <div className="container">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Our Story
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in-up stagger-1">
            PARVE was born from a simple belief: beauty should be natural, effective, and accessible to everyone.
            We create products using the finest plant-based ingredients, free from harmful chemicals.
          </p>
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl p-8 md:p-12 animate-fade-in-up stagger-2">
            <p className="text-lg leading-relaxed mb-6">
              Our journey began with a passion for harnessing nature's power to create skincare that truly works. 
              Every formula is carefully crafted, tested, and perfected to deliver visible results while being 
              gentle on your skin and the planet.
            </p>
            <p className="text-lg leading-relaxed">
              From sourcing the purest ingredients to developing innovative formulations, we pour our heart 
              into every product. We believe that taking care of your skin shouldn't mean compromising on 
              your values or the environment.
            </p>
          </div>
        </div>

        {/* Promise */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Our Promise</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every product is crafted with care, dermatologically tested, and never tested on animals.
            We believe in transparency, sustainability, and inclusive beauty. Your skin deserves the 
            best that nature has to offer — and we're here to deliver exactly that.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className={`bg-card rounded-2xl p-8 shadow-soft text-center hover-lift animate-fade-in-up stagger-${index + 1}`}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
