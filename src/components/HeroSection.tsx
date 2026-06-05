import { useState, useEffect, useMemo } from "react";
import { siteConfig } from "@/data/siteConfig";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth" });
  };

  // Generate random sparks
  const sparks = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${10 + Math.random() * 80}%`,
        size: 2 + Math.random() * 4,
        duration: `${2 + Math.random() * 3}s`,
        delay: `${Math.random() * 4}s`,
        opacity: 0.4 + Math.random() * 0.6,
      })),
    []
  );

  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
      aria-label="Hero"
    >
      {/* Fire glow — warm radial pulsing */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Central warm glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[70%] bg-[radial-gradient(ellipse_at_center_bottom,_hsl(25_100%_50%/0.12)_0%,_hsl(30_80%_55%/0.04)_40%,_transparent_70%)] animate-fire-glow" />
        {/* Secondary amber glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-[radial-gradient(ellipse_at_center_bottom,_hsl(35_100%_60%/0.08)_0%,_transparent_60%)] animate-fire-glow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Sparks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {sparks.map((s) => (
          <div
            key={s.id}
            className="absolute bottom-[10%] rounded-full bg-primary animate-spark"
            style={{
              left: s.left,
              width: s.size,
              height: s.size,
              opacity: 0,
              "--spark-duration": s.duration,
              "--spark-delay": s.delay,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content */}
      <div
        className={`relative z-10 px-4 text-center transition-all duration-1000 ease-out ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p
          className={`font-heading text-[11px] uppercase tracking-[0.4em] text-primary transition-all duration-1000 delay-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {siteConfig.tagline}
        </p>

        <h1
          className="mt-8 font-display leading-[0.9] text-foreground"
          style={{ fontSize: "clamp(3.5rem, 14vw, 11rem)" }}
        >
          <span className="block font-impact leading-[0.85]" style={{ fontSize: "clamp(4.5rem, 18vw, 14rem)" }}>
            {siteConfig.brandNameLine1}
          </span>
          <span className="block font-impact leading-[0.85]" style={{ fontSize: "clamp(4.5rem, 18vw, 14rem)" }}>
            {siteConfig.brandNameLine2}
          </span>
        </h1>

        <p
          className={`mx-auto mt-8 max-w-md font-display-light text-lg italic text-muted-foreground md:text-xl transition-all duration-1000 delay-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          {siteConfig.subtitle}
        </p>

        <div
          className={`mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row transition-all duration-1000 delay-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            variant="outline"
            className="min-h-[48px] rounded-none border-foreground/20 bg-transparent px-10 py-3 font-heading text-xs uppercase tracking-[0.2em] text-foreground transition-all duration-200 hover:border-primary hover:text-primary"
            onClick={scrollToMenu}
            aria-label="View the menu"
          >
            View Menu
          </Button>
          <Button
            className="min-h-[48px] rounded-none px-10 py-3 font-heading text-xs uppercase tracking-[0.2em]"
            onClick={() => document.querySelector("#order")?.scrollIntoView({ behavior: "smooth" })}
            aria-label="Order now"
          >
            Order Now
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          loaded ? "opacity-20" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="h-10 w-[1px] bg-foreground animate-pulse" />
      </div>
    </section>
  );
};

export default HeroSection;
