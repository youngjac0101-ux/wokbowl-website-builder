import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="story" className="bg-background py-24 md:py-32" aria-label="About The WOKBOWL">
      <div className="container mx-auto max-w-3xl px-6 text-center lg:px-8" ref={ref}>
        <p
          className={`font-heading text-[11px] uppercase tracking-[0.3em] text-primary scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          Neutral Bay · Military Road
        </p>
        <h2
          className={`mt-5 font-display text-3xl leading-tight text-foreground md:text-4xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          Your neighbourhood wok kitchen.
        </h2>
        <p
          className={`mx-auto mt-6 max-w-2xl font-heading-light text-lg leading-relaxed text-muted-foreground scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "200ms" }}
        >
          Fresh, made-to-order Asian bowls fired with Australian produce — bold flavour,
          real ingredients, ready in minutes. Your Military Road local for a fast dinner
          that tastes like someone actually cooked it.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
