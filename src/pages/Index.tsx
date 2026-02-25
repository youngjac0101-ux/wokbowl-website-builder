import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FourFSection from "@/components/FourFSection";
import MenuSection from "@/components/MenuSection";
import { siteConfig } from "@/data/siteConfig";

const Index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FourFSection />

      <MenuSection />

      <section id="how-it-works" className="bg-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl uppercase tracking-wider text-foreground">How It Works</h2>
          <p className="mt-4 text-muted-foreground">Coming soon</p>
        </div>
      </section>

      <section id="find-us" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl uppercase tracking-wider text-foreground">Find Us</h2>
          <p className="mt-4 text-muted-foreground">{siteConfig.address}</p>
        </div>
      </section>
    </>
  );
};

export default Index;
