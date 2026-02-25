import { siteConfig } from "@/data/siteConfig";
import { fourFs } from "@/data/fourFs";

const FourFSection = () => {
  return (
    <section id="story" className="bg-secondary py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-heading text-2xl uppercase tracking-wider text-foreground md:text-3xl">
          {siteConfig.sectionTitle}
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {fourFs.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-background p-8 text-center"
            >
              <div className="mb-4 text-4xl">{item.emoji}</div>
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
