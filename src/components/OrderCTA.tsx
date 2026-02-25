import { platformLinks } from "@/data/platformLinks";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const OrderCTA = () => {
  const { ref, isVisible } = useScrollAnimation();
  const platforms = [platformLinks.ubereats, platformLinks.doordash, platformLinks.menulog];

  return (
    <section className="bg-primary py-16" aria-label="Order ahead">
      <div className="container mx-auto px-4 text-center" ref={ref}>
        <h2
          className={`font-heading text-2xl uppercase tracking-wider text-primary-foreground md:text-4xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          SKIP THE QUEUE. ORDER AHEAD.
        </h2>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {platforms.map((p, i) => (
            <Button
              key={p.label}
              asChild
              variant="outline"
              className={`min-h-[44px] rounded-md border-primary-foreground bg-primary-foreground px-8 py-3 font-heading text-sm uppercase tracking-wider text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-foreground/90 hover:text-primary hover:shadow-md scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: isVisible ? `${(i + 1) * 100}ms` : "0ms" }}
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
