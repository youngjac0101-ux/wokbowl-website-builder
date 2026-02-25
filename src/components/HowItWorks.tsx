import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    number: "01",
    emoji: "🥢",
    title: "PICK YOUR BOWL",
    text: "Choose your favourite wok-fired bowl and base.",
  },
  {
    number: "02",
    emoji: "🔥",
    title: "WE WOK IT FRESH",
    text: "Our robotic woks stir-fry your meal in 45 seconds flat.",
  },
  {
    number: "03",
    emoji: "✅",
    title: "READY IN MINUTES",
    text: "Grab your freshly wok'd bowl. Dine in or take away.",
  },
] as const;

const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="how-it-works" className="bg-secondary py-28 md:py-40" aria-label="How it works">
      <div className="container mx-auto px-6 lg:px-8" ref={ref}>
        <p
          className={`text-center font-heading-light text-[11px] uppercase tracking-[0.3em] text-muted-foreground scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          The Process
        </p>
        <h2
          className={`mt-4 text-center font-heading text-3xl uppercase tracking-wider text-foreground md:text-4xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
          style={{ transitionDelay: "100ms" }}
        >
          HOW IT WORKS
        </h2>

        <div className="mt-20 grid grid-cols-1 gap-16 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex flex-col items-center text-center scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: isVisible ? `${(i + 2) * 150}ms` : "0ms" }}
            >
              {/* Number */}
              <span className="font-heading text-6xl text-foreground/10 md:text-7xl">
                {step.number}
              </span>

              <div className="mt-4 text-3xl" aria-hidden="true">{step.emoji}</div>

              <h3 className="mt-6 font-heading text-sm uppercase tracking-[0.2em] text-foreground">
                {step.title}
              </h3>

              <p className="mt-3 max-w-[240px] font-heading-light text-sm leading-relaxed text-muted-foreground">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
