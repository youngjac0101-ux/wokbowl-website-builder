import { platformLinks } from "@/data/platformLinks";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const platforms = [
  { ...platformLinks.ubereats, emoji: "🛵" },
  { ...platformLinks.doordash, emoji: "🚗" },
  { ...platformLinks.menulog, emoji: "🍜" },
];

const OrderCTA = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="order" className="bg-primary py-28 md:py-40" aria-label="Order now">
      <div className="container mx-auto px-6 lg:px-8 text-center" ref={ref}>
        <p
          className={`font-heading text-[11px] uppercase tracking-[0.3em] text-white/60 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          Skip the queue
        </p>
        <h2
          className={`mt-4 font-display text-4xl text-white md:text-6xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Order Online
        </h2>
        <p
          className={`mt-6 font-heading-light text-white/70 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          Freshly wok'd and delivered to your door.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {platforms.map((p, i) => (
            <a
              key={p.label}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex min-h-[52px] items-center gap-2 rounded-none border border-white/30 bg-white/10 px-8 py-3 font-heading text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-primary scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: isVisible ? `${(i + 2) * 100}ms` : "0ms" }}
              aria-label={"Order on " + p.label}
            >
              <span aria-hidden="true">{p.emoji}</span>
              {p.label}
            </a>
          ))}
        </div>

        <p
          className={`mt-10 font-heading-light text-xs text-white/40 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "600ms" }}
        >
          Also available for dine-in and takeaway at Neutral Bay
        </p>
      </div>
    </section>
  );
};

export default OrderCTA;
