import { useState, useRef, useCallback, useEffect } from "react";
import { menuItems, menuCategories } from "@/data/menu";
import MenuCard from "@/components/MenuCard";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>("wok-bowls");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tabsRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation();

  const filtered = menuItems.filter((item) => item.category === activeCategory);

  const updateScrollState = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollTabs = (direction: "left" | "right") => {
    const el = tabsRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  };

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    const el = tabsRef.current;
    if (!el) return;
    const tab = el.querySelector(`[data-category-id="${catId}"]`) as HTMLElement | null;
    if (tab) tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section id="menu" className="bg-background py-28 md:py-40" aria-label="Menu">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <p
          className={`text-center font-heading text-[11px] uppercase tracking-[0.3em] text-muted-foreground scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          Our Menu
        </p>
        <h2
          className={`mt-4 text-center font-display text-4xl text-foreground md:text-5xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          The Menu
        </h2>
        <p
          className={`mt-4 text-center font-display-light text-lg italic text-muted-foreground scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          Pick your bowl. We'll wok it fresh.
        </p>

        {/* Category Tabs — 与 menu.ts 的 menuCategories 同步，支持左右滑动 */}
        <div className="mt-16 relative">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollTabs("left")}
              className="absolute left-0 top-0 z-10 flex h-full min-h-[52px] w-10 items-center justify-center bg-background/90 text-foreground shadow-[4px_0_12px_rgba(0,0,0,0.06)] transition-opacity hover:opacity-80 md:w-12"
              aria-label="Scroll menu categories left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollTabs("right")}
              className="absolute right-0 top-0 z-10 flex h-full min-h-[52px] w-10 items-center justify-center bg-background/90 text-foreground shadow-[-4px_0_12px_rgba(0,0,0,0.06)] transition-opacity hover:opacity-80 md:w-12"
              aria-label="Scroll menu categories right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
          <div
            ref={tabsRef}
            className="scroll-fade-edges flex gap-6 overflow-x-auto border-b border-border px-10 pb-0 scroll-smooth scrollbar-none md:gap-10 md:px-12"
            style={{ scrollBehavior: "smooth" }}
            role="tablist"
            aria-label="Menu categories"
          >
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                data-category-id={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={cn(
                  "shrink-0 border-b-2 pb-4 font-heading text-[11px] uppercase tracking-[0.2em] transition-all duration-300 min-h-[44px] whitespace-nowrap",
                  activeCategory === cat.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-14 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, i) => (
            <MenuCard
              key={item.id}
              item={item}
              className={`scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: isVisible ? `${(i + 3) * 100}ms` : "0ms" }}
            />
          ))}
        </div>

        {/* Base note — only for Wok Bowls */}
        {activeCategory === "wok-bowls" && (
          <p className="mt-16 text-center font-heading-light text-xs text-muted-foreground">
            All bowls include your choice of base — Special Fried Rice, Soy Sauce Chow Mein, or Steamed White Rice
          </p>
        )}

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
