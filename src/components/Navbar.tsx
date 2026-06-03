import { useState, useEffect } from "react";
import { Menu, ShoppingBag } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { platformLinks } from "@/data/platformLinks";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleDesktopNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      setTimeout(() => scrollToSection(href), 150);
    });
  };

  return (
    <>
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-none focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-5 lg:px-8">
          <a href="#" className="font-impact text-xl tracking-tight text-foreground" aria-label={`${siteConfig.brandName} home`}>
            {siteConfig.brandName}
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-10 md:flex">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleDesktopNavClick(e, link.href)}
                className="nav-link-underline pb-1 font-heading-light text-[11px] uppercase tracking-[0.2em] text-foreground/50 transition-colors duration-300 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            {/* Cart button */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 min-h-[40px] rounded-none px-5 py-2 font-heading text-[10px] uppercase tracking-[0.2em] bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label="View cart"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Now
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-primary text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border border-primary">
                  {count}
                </span>
              )}
            </button>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={openCart}
              className="relative p-2 text-foreground"
              aria-label="View cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px] text-foreground" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-full max-w-full flex-col bg-background sm:w-80 sm:max-w-sm border-none">
                <SheetTitle className="font-impact text-xl tracking-tight">{siteConfig.brandName}</SheetTitle>
                <nav className="mt-12 flex flex-1 flex-col gap-8" aria-label="Mobile navigation">
                  {siteConfig.navLinks.map((link) => (
                    <button
                      key={link.href}
                      type="button"
                      onClick={() => handleMobileNavClick(link.href)}
                      className="min-h-[44px] text-left font-display text-2xl text-foreground/80 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </button>
                  ))}
                  <button
                    onClick={() => { setMobileMenuOpen(false); openCart(); }}
                    className="mt-8 min-h-[48px] w-full bg-primary text-white font-heading text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Order Now {count > 0 && `(${count})`}
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
