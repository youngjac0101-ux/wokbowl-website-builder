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
      {/* Skip to content */}
      <a
        href="#menu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background shadow-sm" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <a href="#" className="font-impact text-2xl tracking-tight text-foreground" aria-label={`${siteConfig.brandName} home`}>
            {siteConfig.brandName}
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {siteConfig.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="nav-link-underline pb-1 font-heading text-sm uppercase tracking-wider text-foreground/70 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="min-h-[44px] rounded-md text-sm font-heading uppercase tracking-wider transition-all hover:brightness-95">
              <a href={platformLinks.ubereats.url} target="_blank" rel="noopener noreferrer" aria-label="Order now on UberEats">
                Order Now
              </a>
            </Button>
          </div>

          {/* Mobile nav */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="min-h-[44px] min-w-[44px]" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-full max-w-full flex-col bg-background sm:w-72 sm:max-w-sm">
                <SheetTitle className="font-impact text-xl">{siteConfig.brandName}</SheetTitle>
                <div className="mt-8 flex flex-1 flex-col gap-6">
                  {siteConfig.navLinks.map((link) => (
                    <SheetClose key={link.href} asChild>
                      <a
                        href={link.href}
                        onClick={(e) => handleAnchorClick(e, link.href)}
                        className="min-h-[44px] font-heading text-lg uppercase tracking-wider text-foreground/70 transition-colors hover:text-primary flex items-center"
                      >
                        {link.label}
                      </a>
                    </SheetClose>
                  ))}
                  <Button asChild className="mt-4 min-h-[44px] w-full rounded-md font-heading uppercase tracking-wider">
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
