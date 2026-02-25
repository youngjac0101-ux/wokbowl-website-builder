import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const steps = [
  {
    number: "1",
    emoji: "🥢",
    title: "PICK YOUR BOWL",
    text: "Choose your favourite wok-fired bowl and base.",
  },
  {
    number: "2",
    emoji: "🔥",
    title: "WE WOK IT FRESH",
    text: "Our robotic woks stir-fry your meal in 45 seconds flat.",
  },
  {
    number: "3",
    emoji: "✅",
    title: "READY IN MINUTES",
    text: "Grab your freshly wok'd bowl. Dine in or take away.",
  },
] as const;

const HowItWorks = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="how-it-works" className="bg-background py-20" aria-label="How it works">
      <div className="container mx-auto px-4" ref={ref}>
        <h2
          className={`mb-14 text-center font-heading text-3xl uppercase tracking-wider text-foreground md:text-4xl scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
        >
          HOW IT WORKS
        </h2>

        <div className="relative flex flex-col items-center gap-12 md:flex-row md:justify-center md:gap-0">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative flex flex-col items-center md:flex-1 scroll-hidden ${isVisible ? "scroll-visible" : ""}`}
              style={{ transitionDelay: isVisible ? `${(i + 1) * 150}ms` : "0ms" }}
            >
              {/* Dashed connectors */}
              {i < steps.length - 1 && (
                <>
                  <div className="absolute right-0 top-8 hidden h-0 w-1/2 translate-x-1/2 border-t-2 border-dashed border-primary md:block" aria-hidden="true" />
                  <div className="absolute -bottom-6 left-1/2 block h-6 w-0 -translate-x-1/2 border-l-2 border-dashed border-primary md:hidden" aria-hidden="true" />
                </>
              )}

              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                {step.number}
              </div>

              <div className="mt-4 text-4xl" aria-hidden="true">{step.emoji}</div>

              <h3 className="mt-3 font-heading text-base uppercase tracking-wider text-foreground">
                {step.title}
              </h3>

              <p className="mt-2 max-w-[200px] text-center text-sm text-muted-foreground">
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
