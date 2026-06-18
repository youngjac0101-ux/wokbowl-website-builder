import { useState, useRef, useCallback, useEffect } from "react";
import { menuItems, type MenuItem } from "@/data/menu";
import MenuCard from "@/components/MenuCard";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Display sections — derived from the auto-generated menu data so the full
// catalogue (Signature, Build Your Own, Wraps, …) is visible at a glance.
type Section = { id: string; label: string; baseNote?: boolean };

const sections: Section[] = [
  { id: "signature", label: "Signature Bowls", baseNote: true },
  { id: "byo", label: "Build Your Own", baseNote: true },
  { id: "wraps", label: "Wraps" },
  { id: "fried-rice", label: "Fried Rice" },
  { id: "noodles", label: "Noodles" },
  { id: "wings", label: "Wings" },
  { id: "bites", label: "Bites" },
];

const itemsFor = (sectionId: string): MenuItem[] => {
  if (sectionId === "signature")
    return menuItems.filter(
      (i) => i.category === "wok-bowls" && !i.id.startsWith("byo-") && !i.id.includes("wrap")
    );
  if (sectionId === "byo") return menuItems.filter((i) => i.id.startsWith("byo-"));
  if (sectionId === "wraps") return menuItems.filter((i) => i.id.includes("wrap"));
  return menuItems.filter((i) => i.category === sectionId);
};

const MenuSection = () => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const tabsRef = useRef<HTMLDivElement>(null);
  const { ref, isVisible } = useScrollAnimation();

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

  // Scrollspy — highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id.replace("menu-", ""));
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => {
      const el = document.getElementById(`menu-${s.id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTabs = (direction: "left" | "right") => {
    const el = tabsRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.6;
    el.scrollBy({ left: direction === "left" ? -step : step, behavior: "smooth" });
  };

  const handleSectionClick = (sectionId: string) => {
    document.getElementById(`menu-${sectionId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    const el = tabsRef.current;
    const tab = el?.querySelector(`[data-section-id="${sectionId}"]`) as HTMLElement | null;
    if (tab) tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section id="menu" className="bg-background pt-28 pb-28 md:pt-40 md:pb-40" aria-label="Menu">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={ref}>
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
        </div>
      </div>

      {/* Sticky category index — the whole catalogue, always in view */}
      <div className="sticky top-[60px] z-30 mt-12 border-y border-border bg-background/95 backdrop-blur-sm">
        <div className="container relative mx-auto px-6 lg:px-8">
          {canScrollLeft && (
            <button
              type="button"
              onClick={() => scrollTabs("left")}
              className="absolute left-6 top-0 z-10 flex h-full min-h-[52px] w-8 items-center justify-center bg-gradient-to-r from-background to-transparent text-foreground md:w-10 lg:left-8"
              aria-label="Scroll menu categories left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {canScrollRight && (
            <button
              type="button"
              onClick={() => scrollTabs("right")}
              className="absolute right-6 top-0 z-10 flex h-full min-h-[52px] w-8 items-center justify-center bg-gradient-to-l from-background to-transparent text-foreground md:w-10 lg:right-8"
              aria-label="Scroll menu categories right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
          <div
            ref={tabsRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none md:gap-9"
            role="tablist"
            aria-label="Menu sections"
          >
            {sections.map((s) => (
              <button
                key={s.id}
                data-section-id={s.id}
                role="tab"
                aria-selected={activeSection === s.id}
                onClick={() => handleSectionClick(s.id)}
                className={cn(
                  "shrink-0 border-b-2 py-4 font-heading text-[11px] uppercase tracking-[0.2em] transition-all duration-300 min-h-[44px] whitespace-nowrap",
                  activeSection === s.id
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* All sections, stacked — nothing hidden behind a tab */}
      <div className="container mx-auto px-6 lg:px-8">
        {sections.map((s) => {
          const items = itemsFor(s.id);
          if (items.length === 0) return null;
          return (
            <div key={s.id} id={`menu-${s.id}`} className="scroll-mt-32 pt-16">
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-2xl text-foreground md:text-3xl">{s.label}</h3>
                <span className="font-heading text-[11px] uppercase tracking-[0.2em] text-muted-foreground/50">
                  {items.length} items
                </span>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
              {s.baseNote && (
                <p className="mt-10 font-heading-light text-xs text-muted-foreground">
                  All bowls include your choice of base — Special Fried Rice, Soy Sauce Chow Mein, or Steamed White Rice
                </p>
              )}
            </div>
          );
        })}

        {/* Allergen notice — legally required, do not remove */}
        <div className="mx-auto mt-16 max-w-2xl border border-border p-6 text-center leading-relaxed text-muted-foreground">
          <p className="font-heading text-[10px] uppercase tracking-[0.2em] mb-2">Allergen Notice</p>
          <p className="font-heading-light text-xs">
            All dishes may contain traces of nuts, gluten, shellfish, soy, sesame, eggs, and dairy.
            Please inform staff of any allergies before ordering.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
