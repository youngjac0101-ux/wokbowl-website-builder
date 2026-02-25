import { useState } from "react";
import { siteConfig } from "@/data/siteConfig";
import { platformLinks } from "@/data/platformLinks";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const HeroSection = () => {
  const [heroBgError, setHeroBgError] = useState(true);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.05 });

  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-secondary" aria-label="Hero">
      {/* Background image with fallback */}
      <div className="absolute inset-0" aria-hidden="true">
        {heroBgError ? (
          <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground/20 text-sm">
            <span className="text-4xl">🍜</span>
          </div>
        ) : (
          <img
            src="/images/hero/hero-bg.jpg"
            alt=""
            className="h-full w-full object-cover"
            onError={() => setHeroBgError(true)}
          />
        )}
      </div>

      <div
        ref={ref}
        className={`relative z-10 px-4 text-center scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
      >
        <h1
          className="font-impact leading-[0.9] text-foreground"
          style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}
        >
          <span className="block">{siteConfig.brandNameLine1}</span>
          <span className="block">{siteConfig.brandNameLine2}</span>
        </h1>

        <p className="mt-6 font-heading text-lg uppercase tracking-[0.1em] text-primary md:text-2xl">
          {siteConfig.tagline}
        </p>

        <p className="mt-3 text-base text-foreground/70 md:text-lg">
          {siteConfig.subtitle}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="outline"
            className="min-h-[44px] rounded-md border-foreground/20 px-8 py-3 font-heading uppercase tracking-wider transition-all hover:brightness-95"
            onClick={scrollToMenu}
            aria-label="View the menu"
          >
            View Menu
          </Button>
          <Button
            asChild
            className="min-h-[44px] rounded-md px-8 py-3 font-heading uppercase tracking-wider transition-all hover:brightness-95"
          >
            <a href={platformLinks.ubereats.url} target="_blank" rel="noopener noreferrer" aria-label={platformLinks.ubereats.cta}>
              {platformLinks.ubereats.cta}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
