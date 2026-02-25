import { siteConfig } from "@/data/siteConfig";
import { Instagram } from "lucide-react";

const FindUs = () => {
  return (
    <section id="find-us" className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-heading text-3xl uppercase tracking-wider text-foreground md:text-4xl">
          FIND US
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
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
              title="The WOKBOWL location"
            />
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-center gap-6">
            {/* Address */}
            <div className="flex items-start gap-3">
              <span className="text-xl">📍</span>
              <div>
                <p className="font-heading text-sm uppercase tracking-wider text-foreground">Address</p>
                <p className="mt-1 text-sm text-muted-foreground">{siteConfig.address}</p>
                <a
                  href={siteConfig.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm text-primary hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <span className="text-xl">🕐</span>
              <div>
                <p className="font-heading text-sm uppercase tracking-wider text-foreground">Opening Hours</p>
                {siteConfig.hours.map((h) => (
                  <p key={h.days} className="mt-1 text-sm text-muted-foreground">
                    {h.days}: {h.time}
                  </p>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <span className="text-xl">📞</span>
              <div>
                <p className="font-heading text-sm uppercase tracking-wider text-foreground">Phone</p>
                <a href={`tel:${siteConfig.phone}`} className="mt-1 block text-sm text-muted-foreground hover:text-primary">
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <span className="text-xl">📧</span>
              <div>
                <p className="font-heading text-sm uppercase tracking-wider text-foreground">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="mt-1 block text-sm text-muted-foreground hover:text-primary">
                  {siteConfig.email}
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 pt-2">
              <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={siteConfig.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
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
