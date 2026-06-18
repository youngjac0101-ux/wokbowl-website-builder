import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FourFSection from "@/components/FourFSection";
import MenuSection from "@/components/MenuSection";
import HowItWorks from "@/components/HowItWorks";
import FindUs from "@/components/FindUs";
import OrderCTA from "@/components/OrderCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection />
      <FourFSection />
      <HowItWorks />
      <OrderCTA />
      <FindUs />
      <Footer />
    </>
  );
};

export default Index;
