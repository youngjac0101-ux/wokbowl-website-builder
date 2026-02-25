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
    <section id="menu" className="bg-background py-28 md:py-40" aria-label="Menu">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <p
          className={`text-center font-heading-light text-[11px] uppercase tracking-[0.3em] text-muted-foreground scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          Our Menu
        </p>
        <h2
          className={`mt-4 text-center font-heading text-3xl uppercase tracking-wider text-foreground md:text-4xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          THE MENU
        </h2>
        <p
          className={`mt-4 text-center font-heading-light text-sm text-muted-foreground scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          Pick your bowl. We'll wok it fresh.
        </p>

        {/* Category Tabs */}
        <div className="mt-16">
          <div className="scroll-fade-edges flex justify-center gap-8 overflow-x-auto border-b border-border pb-0 scrollbar-none md:gap-12">
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "shrink-0 border-b pb-4 font-heading text-[11px] uppercase tracking-[0.2em] transition-all duration-300 min-h-[44px]",
                  activeCategory === cat.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid — generous spacing */}
        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {filtered.map((item, i) => (
            <MenuCard
              key={item.id}
              item={item}
              className={`scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: isVisible ? `${(i + 3) * 100}ms` : "0ms" }}
            />
          ))}
        </div>

        {/* Base note */}
        <p className="mt-16 text-center font-heading-light text-xs uppercase tracking-[0.15em] text-muted-foreground">
          All bowls include your choice of base — Special Fried Rice, Soy Sauce Chow Mein, or Steamed White Rice
        </p>

        {/* Allergen notice */}
        <div className="mx-auto mt-8 max-w-2xl border border-border p-6 text-center text-xs leading-relaxed text-muted-foreground">
          ⚠️ ALLERGEN NOTICE — All dishes may contain traces of nuts, gluten, shellfish, soy, sesame, eggs, and dairy.
          Please inform staff of any allergies before ordering.
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
