import { siteConfig } from "@/data/siteConfig";
import { platformLinks } from "@/data/platformLinks";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-secondary">
      {/* Background placeholder image */}
      <div className="absolute inset-0 bg-muted" aria-hidden="true">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground/30 text-sm">
          hero-bg.jpg
        </div>
      </div>

      <div className="relative z-10 px-4 text-center">
        {/* Large stacked brand name */}
        <h1 className="font-impact leading-[0.9] text-foreground" style={{ fontSize: "clamp(4rem, 15vw, 12rem)" }}>
          <span className="block">{siteConfig.brandNameLine1}</span>
          <span className="block">{siteConfig.brandNameLine2}</span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 font-heading text-lg uppercase tracking-[0.1em] text-primary md:text-2xl">
          {siteConfig.tagline}
        </p>

        {/* Subtitle */}
        <p className="mt-3 text-base text-foreground/70 md:text-lg">
          {siteConfig.subtitle}
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            variant="outline"
            className="rounded-md border-foreground/20 px-8 py-3 font-heading uppercase tracking-wider"
            onClick={scrollToMenu}
          >
            View Menu
          </Button>
          <Button asChild className="rounded-md px-8 py-3 font-heading uppercase tracking-wider">
            <a href={platformLinks.ubereats.url} target="_blank" rel="noopener noreferrer">
              {platformLinks.ubereats.cta}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
