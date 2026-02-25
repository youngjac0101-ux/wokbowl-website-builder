import { useState, useEffect } from "react";
import { siteConfig } from "@/data/siteConfig";
import { platformLinks } from "@/data/platformLinks";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [heroBgError, setHeroBgError] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-surface-dark overflow-hidden" aria-label="Hero">
      {/* Background */}
      <div className="absolute inset-0" aria-hidden="true">
        {heroBgError ? (
          <div className="h-full w-full bg-surface-dark">
            {/* Ambient glow effect for fire feel */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_bottom,_hsl(25_100%_50%/0.15)_0%,_transparent_60%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-[radial-gradient(ellipse_at_center_bottom,_hsl(25_100%_20%/0.3)_0%,_transparent_70%)]" />
          </div>
        ) : (
          <>
            <img
              src="/images/hero/hero-bg.jpg"
              alt=""
              className="h-full w-full object-cover"
              onError={() => setHeroBgError(true)}
            />
            <div className="absolute inset-0 bg-foreground/60" />
          </>
        )}
      </div>

      <div
        className={`relative z-10 px-4 text-center transition-all duration-1000 ease-out ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Tagline above */}
        <p
          className={`font-heading-light text-sm uppercase tracking-[0.3em] text-primary transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {siteConfig.tagline}
        </p>

        <h1
          className="mt-6 font-impact leading-[0.85] text-[hsl(var(--surface-dark-foreground))]"
          style={{ fontSize: "clamp(4.5rem, 18vw, 14rem)" }}
        >
          <span className="block">{siteConfig.brandNameLine1}</span>
          <span className="block">{siteConfig.brandNameLine2}</span>
        </h1>

        <p
          className={`mt-8 text-base text-[hsl(var(--surface-dark-foreground)/0.6)] md:text-lg font-heading-light transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {siteConfig.subtitle}
        </p>

        <div
          className={`mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            variant="outline"
            className="min-h-[48px] rounded-none border-[hsl(var(--surface-dark-foreground)/0.3)] bg-transparent px-10 py-3 font-heading text-xs uppercase tracking-[0.2em] text-[hsl(var(--surface-dark-foreground))] transition-all duration-200 hover:border-[hsl(var(--surface-dark-foreground))] hover:bg-[hsl(var(--surface-dark-foreground)/0.05)]"
            onClick={scrollToMenu}
            aria-label="View the menu"
          >
            View Menu
          </Button>
          <Button
            asChild
            className="min-h-[48px] rounded-none px-10 py-3 font-heading text-xs uppercase tracking-[0.2em] transition-all duration-200 hover:brightness-95"
          >
            <a href={platformLinks.ubereats.url} target="_blank" rel="noopener noreferrer" aria-label={platformLinks.ubereats.cta}>
              Order Now
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          loaded ? "opacity-40" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="h-10 w-[1px] bg-[hsl(var(--surface-dark-foreground))] animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
