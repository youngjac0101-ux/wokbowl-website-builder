import { siteConfig } from "@/data/siteConfig";
import { Instagram } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const FindUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="find-us" className="bg-background py-28 md:py-40" aria-label="Find us">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <p
          className={`text-center font-heading-light text-[11px] uppercase tracking-[0.3em] text-muted-foreground scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          Location
        </p>
        <h2
          className={`mt-4 text-center font-heading text-3xl uppercase tracking-wider text-foreground md:text-4xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          FIND US
        </h2>

        <div
          className={`mt-16 grid gap-12 md:grid-cols-2 md:gap-16 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Map */}
          <div className="overflow-hidden rounded-lg bg-secondary" style={{ minHeight: 400 }}>
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

            <div className="flex items-center gap-3">
              <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={siteConfig.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.67a8.21 8.21 0 0 0 4.76 1.52V6.74a4.85 4.85 0 0 1-1-.05Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FindUs;
