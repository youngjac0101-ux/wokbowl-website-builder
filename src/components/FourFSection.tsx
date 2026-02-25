import { siteConfig } from "@/data/siteConfig";
import { fourFs } from "@/data/fourFs";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const FourFSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="story" className="bg-secondary py-20" aria-label="Why The WOKBOWL">
      <div className="container mx-auto px-4" ref={ref}>
        <h2
          className={`mb-12 text-center font-heading text-2xl uppercase tracking-wider text-foreground md:text-3xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          {siteConfig.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fourFs.map((item, i) => (
            <div
              key={item.title}
              className={`rounded-lg border border-border bg-background p-8 text-center scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
              }}
            >
              <div className="mb-4 text-4xl" aria-hidden="true">{item.emoji}</div>
              <h3 className="mb-2 font-heading text-lg uppercase tracking-wider text-foreground">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FourFSection;
