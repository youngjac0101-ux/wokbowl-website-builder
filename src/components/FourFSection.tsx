import { siteConfig } from "@/data/siteConfig";
import { fourFs } from "@/data/fourFs";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const FourFSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="story" className="bg-background py-28 md:py-40" aria-label="Why The WOKBOWL">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <p
          className={`text-center font-heading text-[11px] uppercase tracking-[0.3em] text-muted-foreground scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          Why Us
        </p>
        <h2
          className={`mt-4 text-center font-display text-4xl text-foreground md:text-5xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          {siteConfig.sectionTitle}
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
          {fourFs.map((item, i) => (
            <div
              key={item.title}
              className={`group p-10 text-center transition-colors duration-300 hover:bg-secondary scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: isVisible ? `${(i + 2) * 100}ms` : "0ms" }}
            >
              <div className="mb-6 text-5xl" aria-hidden="true">{item.emoji}</div>
              <h3 className="font-heading text-sm uppercase tracking-[0.2em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 font-heading-light text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourFSection;
