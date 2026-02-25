import { platformLinks } from "@/data/platformLinks";
import { Button } from "@/components/ui/button";

const OrderCTA = () => {
  const platforms = [platformLinks.ubereats, platformLinks.doordash, platformLinks.menulog];

  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading text-2xl uppercase tracking-wider text-primary-foreground md:text-4xl">
          SKIP THE QUEUE. ORDER AHEAD.
        </h2>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {platforms.map((p) => (
            <Button
              key={p.label}
              asChild
              variant="outline"
              className="rounded-md border-primary-foreground bg-primary-foreground px-8 py-3 font-heading text-sm uppercase tracking-wider text-primary hover:bg-primary-foreground/90 hover:text-primary"
            >
              <a href={p.url} target="_blank" rel="noopener noreferrer">
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
