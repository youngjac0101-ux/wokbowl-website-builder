import { useState } from "react";
import { menuItems, menuCategories } from "@/data/menu";
import MenuCard from "@/components/MenuCard";
import { cn } from "@/lib/utils";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("signature");

  const filtered = menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="bg-background py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h2 className="text-center font-heading text-3xl uppercase tracking-wider text-foreground md:text-4xl">
          THE MENU
        </h2>
        <p className="mt-3 text-center text-muted-foreground">
          Pick your bowl. We'll wok it fresh.
        </p>

        {/* Category Tabs */}
        <div className="mt-10 flex gap-6 overflow-x-auto border-b border-border pb-0 scrollbar-none">
          {menuCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "shrink-0 border-b-2 pb-3 font-heading text-sm uppercase tracking-wider transition-colors",
                activeCategory === cat.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
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
