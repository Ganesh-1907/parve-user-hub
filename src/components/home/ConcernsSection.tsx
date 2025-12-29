import { Link } from "react-router-dom";
import { skinConcerns } from "@/data/mockData";

export function ConcernsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Shop by Skin Concerns
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect products tailored to your unique skin needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {skinConcerns.map((concern, index) => (
            <Link
              key={concern.id}
              to={`/products?concern=${concern.id}`}
              className={`group animate-fade-in-up stagger-${(index % 5) + 1}`}
            >
              <div className="bg-card rounded-xl p-6 text-center shadow-soft hover-lift transition-all group-hover:shadow-glow group-hover:border-primary border border-transparent">
                <div className="text-4xl mb-3">{concern.image}</div>
                <h3 className="font-serif font-semibold group-hover:text-primary transition-colors">
                  {concern.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
