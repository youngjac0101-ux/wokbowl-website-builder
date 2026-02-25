import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { platformLinks } from "@/data/platformLinks";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetTitle } from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
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
          scrolled ? "bg-background/95 backdrop-blur-sm" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto flex items-center justify-between px-6 py-5 lg:px-8">
          <a
            href="#"
            className={`font-impact text-xl tracking-tight transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-[hsl(var(--surface-dark-foreground))]"
            }`}
            aria-label={`${siteConfig.brandName} home`}
          >
            {siteConfig.brandName}
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-10 md:flex">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className={`nav-link-underline pb-1 font-heading-light text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  scrolled ? "text-foreground/60 hover:text-foreground" : "text-[hsl(var(--surface-dark-foreground)/0.6)] hover:text-[hsl(var(--surface-dark-foreground))]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Button
              asChild
              className="min-h-[40px] rounded-none px-6 py-2 font-heading text-[10px] uppercase tracking-[0.2em] transition-all duration-200 hover:brightness-95"
            >
              <a href={platformLinks.ubereats.url} target="_blank" rel="noopener noreferrer" aria-label="Order now">
                Order
              </a>
            </Button>
          </div>

          {/* Mobile */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`min-h-[44px] min-w-[44px] ${
                    scrolled ? "text-foreground" : "text-[hsl(var(--surface-dark-foreground))]"
                  }`}
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-full max-w-full flex-col bg-background sm:w-80 sm:max-w-sm border-none">
                <SheetTitle className="font-impact text-xl tracking-tight">{siteConfig.brandName}</SheetTitle>
                <div className="mt-12 flex flex-1 flex-col gap-8">
                  {siteConfig.navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <a
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        className="min-h-[44px] font-heading text-2xl uppercase tracking-wider text-foreground/40 transition-colors hover:text-foreground flex items-center"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                  <Button asChild className="mt-8 min-h-[48px] w-full rounded-none font-heading text-xs uppercase tracking-[0.2em]">
                    <a href={platformLinks.ubereats.url} target="_blank" rel="noopener noreferrer">
                      Order Now
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
