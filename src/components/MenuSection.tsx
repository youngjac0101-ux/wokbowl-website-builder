import { useState } from "react";
import { menuItems, menuCategories } from "@/data/menu";
import MenuCard from "@/components/MenuCard";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("signature");
  const { ref, isVisible } = useScrollAnimation();

  const filtered = menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="bg-background py-20" aria-label="Menu">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <h2
          className={`text-center font-heading text-3xl uppercase tracking-wider text-foreground md:text-4xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          THE MENU
        </h2>
        <p
          className={`mt-3 text-center text-muted-foreground scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Pick your bowl. We'll wok it fresh.
        </p>

        {/* Category Tabs */}
        <div className="relative mt-10">
          <div className="scroll-fade-edges flex gap-6 overflow-x-auto border-b border-border pb-0 scrollbar-none">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "shrink-0 border-b-2 pb-3 font-heading text-sm uppercase tracking-wider transition-colors min-h-[44px]",
                  activeCategory === cat.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, i) => (
            <MenuCard
              key={item.id}
              item={item}
              className={`scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: isVisible ? `${(i + 2) * 80}ms` : "0ms" }}
            />
          ))}
        </div>

        {/* Base note */}
        <p className="mt-10 text-center text-sm text-muted-foreground">
          All bowls include your choice of base: Special Fried Rice, Soy Sauce Chow Mein, or Steamed White Rice.
        </p>

        {/* Allergen notice */}
        <div className="mx-auto mt-6 max-w-2xl rounded-lg bg-secondary p-4 text-center text-xs text-muted-foreground">
          ⚠️ ALLERGEN NOTICE: All dishes may contain traces of nuts, gluten, shellfish, soy, sesame, eggs, and dairy.
          Please inform staff of any allergies before ordering.
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
