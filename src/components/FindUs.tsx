import { siteConfig } from "@/data/siteConfig";
import { Instagram } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const FindUs = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="find-us" className="bg-secondary py-20" aria-label="Find us">
      <div className="container mx-auto px-4" ref={ref}>
        <h2
          className={`mb-12 text-center font-heading text-3xl uppercase tracking-wider text-foreground md:text-4xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          FIND US
        </h2>

        <div
          className={`grid gap-8 md:grid-cols-2 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "150ms" }}
        >
          {/* Map */}
          <div className="overflow-hidden rounded-lg bg-muted" style={{ minHeight: 350 }}>
            <iframe
              src={siteConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 350 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="The WOKBOWL location on Google Maps"
            />
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-center gap-6">
            <div className="flex items-start gap-3">
              <span className="text-xl" aria-hidden="true">📍</span>
              <div>
                <p className="font-heading text-sm uppercase tracking-wider text-foreground">Address</p>
                <p className="mt-1 text-sm text-muted-foreground">{siteConfig.address}</p>
                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-primary transition-colors hover:underline"
                  aria-label="Get directions to The WOKBOWL"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl" aria-hidden="true">🕐</span>
              <div>
                <p className="font-heading text-sm uppercase tracking-wider text-foreground">Opening Hours</p>
                {siteConfig.hours.map((h) => (
                  <p key={h.days} className="mt-1 text-sm text-muted-foreground">
                    {h.days}: {h.time}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl" aria-hidden="true">📞</span>
              <div>
                <p className="font-heading text-sm uppercase tracking-wider text-foreground">Phone</p>
                <a href={`tel:${siteConfig.phone}`} className="mt-1 block min-h-[44px] text-sm text-muted-foreground transition-colors hover:text-primary flex items-center">
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-xl" aria-hidden="true">📧</span>
              <div>
                <p className="font-heading text-sm uppercase tracking-wider text-foreground">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="mt-1 block min-h-[44px] text-sm text-muted-foreground transition-colors hover:text-primary flex items-center">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-primary" aria-label="Follow us on Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={siteConfig.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-primary" aria-label="Follow us on TikTok">
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
