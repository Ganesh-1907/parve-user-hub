import { ingredients } from "@/data/mockData";

export function IngredientsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Pure Natural Ingredients
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We carefully select each ingredient for its proven benefits, ensuring your skin receives only the best from nature.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {ingredients.map((ingredient, index) => (
            <div
              key={ingredient.name}
              className={`bg-card rounded-xl p-6 text-center shadow-soft hover-lift animate-fade-in-up stagger-${(index % 5) + 1}`}
            >
              <div className="text-4xl mb-3">{ingredient.icon}</div>
              <h3 className="font-serif font-semibold mb-1">{ingredient.name}</h3>
              <p className="text-xs text-muted-foreground">{ingredient.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
