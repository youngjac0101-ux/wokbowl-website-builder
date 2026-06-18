import { platformLinks } from "@/data/platformLinks";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useCart } from "@/context/CartContext";

// Delivery apps are kept as a secondary option — they charge ~30% commission
// and don't capture the customer, so the page leads with direct pickup ordering.
const deliveryPlatforms = [
  { ...platformLinks.ubereats },
  { ...platformLinks.doordash },
];

const OrderCTA = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { count, openCart } = useCart();

  // Start a direct order: if the cart already has items, open it to checkout;
  // otherwise send the customer to the menu to start picking.
  const startOrder = () => {
    if (count > 0) {
      openCart();
    } else {
      document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="order" className="bg-primary py-28 md:py-40" aria-label="Order now">
      <div className="container mx-auto px-6 lg:px-8 text-center" ref={ref}>
        <p
          className={`font-heading text-[11px] uppercase tracking-[0.3em] text-white/60 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          Order Direct
        </p>
        <h2
          className={`mt-4 font-display text-4xl text-white md:text-6xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Skip the Apps.
        </h2>
        <p
          className={`mx-auto mt-6 max-w-md font-heading-light text-white/70 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          Order straight from us — ready for pickup in under 5 minutes. No app, no service fees, freshest off the wok.
        </p>

        {/* Primary — direct pickup order */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={startOrder}
            className={`inline-flex min-h-[56px] items-center justify-center rounded-none bg-white px-12 py-4 font-heading text-[11px] uppercase tracking-[0.2em] text-primary transition-all duration-200 hover:bg-white/90 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
            style={{ transitionDelay: "300ms" }}
            aria-label="Start your pickup order"
          >
            {count > 0 ? `View Order — ${count} item${count > 1 ? "s" : ""}` : "Start Your Order"}
          </button>
        </div>

        {/* Secondary — delivery apps, intentionally demoted */}
        <div
          className={`mt-12 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "450ms" }}
        >
          <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-white/40">
            Prefer delivery?
          </p>
          <div className="mt-4 flex items-center justify-center gap-6">
            {deliveryPlatforms.map((p) => (
              <a
                key={p.label}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-[11px] uppercase tracking-[0.15em] text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
                aria-label={p.cta}
              >
                {p.label}
              </a>
            ))}
          </div>
        </div>

        <p
          className={`mt-12 font-heading-light text-xs text-white/40 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "600ms" }}
        >
          Also available for dine-in and takeaway at Neutral Bay
        </p>
      </div>
    </section>
  );
};

export default OrderCTA;
