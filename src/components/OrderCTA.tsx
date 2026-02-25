import { platformLinks } from "@/data/platformLinks";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const OrderCTA = () => {
  const { ref, isVisible } = useScrollAnimation();
  const platforms = [platformLinks.ubereats, platformLinks.doordash, platformLinks.menulog];

  return (
    <section className="bg-surface-dark py-28 md:py-40" aria-label="Order ahead">
      <div className="container mx-auto px-6 lg:px-8 text-center" ref={ref}>
        <p
          className={`font-heading-light text-[11px] uppercase tracking-[0.3em] text-primary scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          Skip the queue
        </p>
        <h2
          className={`mt-4 font-heading text-3xl uppercase tracking-wider text-[hsl(var(--surface-dark-foreground))] md:text-5xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          ORDER AHEAD
        </h2>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {platforms.map((p, i) => (
            <Button
              key={p.label}
              asChild
              variant="outline"
              className={`min-h-[48px] rounded-none border-[hsl(var(--surface-dark-foreground)/0.2)] bg-transparent px-8 py-3 font-heading text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--surface-dark-foreground))] transition-all duration-300 hover:border-primary hover:text-primary scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: isVisible ? `${(i + 2) * 100}ms` : "0ms" }}
            >
              <a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${p.cta} (opens in new tab)`}>
                {p.cta}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderCTA;
