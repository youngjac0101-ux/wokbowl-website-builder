import { siteConfig } from "@/data/siteConfig";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const FindUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="find-us" className="bg-background py-28 md:py-40" aria-label="Find us">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <p
          className={`text-center font-heading text-[11px] uppercase tracking-[0.3em] text-muted-foreground scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          Location
        </p>
        <h2
          className={`mt-4 text-center font-display text-4xl text-foreground md:text-5xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Find Us
        </h2>

        <div
          className={`mt-16 grid gap-12 md:grid-cols-2 md:gap-16 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Map */}
          <div className="overflow-hidden bg-secondary" style={{ minHeight: 400 }}>
            <iframe
              src={siteConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The WOKBOWL location on Google Maps"
            />
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Address</p>
              <p className="mt-2 text-base text-foreground">{siteConfig.address}</p>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block font-heading text-[11px] uppercase tracking-[0.15em] text-primary transition-colors hover:text-primary/80"
                aria-label="Get directions to The WOKBOWL"
              >
                Get Directions →
              </a>
            </div>

            <div>
              <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Hours</p>
              {siteConfig.hours.map((h) => (
                <p key={h.days} className="mt-2 text-sm text-foreground">
                  <span className="text-muted-foreground">{h.days}</span> — {h.time}
                </p>
              ))}
            </div>

            <div>
              <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
              <a href={`tel:${siteConfig.phone}`} className="mt-2 block min-h-[44px] text-sm text-foreground transition-colors hover:text-primary flex items-center">
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="block min-h-[44px] text-sm text-foreground transition-colors hover:text-primary flex items-center">
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUs;
