import { siteConfig } from "@/data/siteConfig";
import { Instagram } from "lucide-react";

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

          {/* Social + Email */}
          <div>
            <p className="mb-6 font-heading text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--surface-dark-foreground)/0.3)]">Connect</p>
            <div className="flex items-center gap-3">
              <a href={siteConfig.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center text-[hsl(var(--surface-dark-foreground)/0.5)] transition-colors hover:text-primary" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={siteConfig.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center text-[hsl(var(--surface-dark-foreground)/0.5)] transition-colors hover:text-primary" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.52a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.67a8.21 8.21 0 0 0 4.76 1.52V6.74a4.85 4.85 0 0 1-1-.05Z" />
                </svg>
              </a>
            </div>
            <a href={`mailto:${siteConfig.email}`} className="mt-4 block font-heading-light text-sm text-[hsl(var(--surface-dark-foreground)/0.5)] transition-colors hover:text-primary">
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
