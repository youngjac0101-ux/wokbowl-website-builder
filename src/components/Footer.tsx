import { siteConfig } from "@/data/siteConfig";

const Footer = () => {
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-surface-dark py-16" role="contentinfo">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-impact text-2xl tracking-tight text-[hsl(var(--surface-dark-foreground))]">{siteConfig.brandName}</p>
            <p className="mt-2 font-heading text-[10px] uppercase tracking-[0.3em] text-primary">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <p className="mb-6 font-heading text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--surface-dark-foreground)/0.3)]">Quick Links</p>
            <div className="flex flex-col gap-3">
              {siteConfig.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="min-h-[44px] flex items-center font-heading-light text-sm text-[hsl(var(--surface-dark-foreground)/0.5)] transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          {/* Email */}
          <div>
            <p className="mb-6 font-heading text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--surface-dark-foreground)/0.3)]">Connect</p>
            <a href={`mailto:${siteConfig.email}`} className="block font-heading-light text-sm text-[hsl(var(--surface-dark-foreground)/0.5)] transition-colors hover:text-primary">
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="mt-16 border-t border-[hsl(var(--surface-dark-foreground)/0.1)] pt-8 text-center">
          <p className="font-heading-light text-[11px] tracking-wider text-[hsl(var(--surface-dark-foreground)/0.3)]">
            © 2026 The WOKBOWL Pty Ltd. All rights reserved. — Neutral Bay, Sydney
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
