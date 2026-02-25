

# The WOKBOWL — Restaurant Website

## Architecture & Data Layer
- Create `/src/data/` folder with three config files:
  - `menu.ts` — menu items with name, price, description, image path, category, tags
  - `siteConfig.ts` — brand name, taglines, address, phone, hours, map URL, social links, SEO metadata
  - `platformLinks.ts` — UberEats, DoorDash, Menulog URLs
- All components read from these data files — zero hardcoded text in components

## Brand System
- Primary orange `#FF6B00`, white `#FFFFFF`, dark gray `#333333`, light gray `#F5F5F5`
- Impact font for logo, Montserrat Bold (Google Fonts) for headings, Arial for body
- "White Lab" aesthetic — clean, minimal, no gradients, no shadows, max 8px border radius
- Color ratio: 60-70% white, 20-30% orange, 10% gray

## Image Setup
- `/public/images/` with subfolders: `hero/`, `menu/`, `brand/`, `about/`
- All images render as gray placeholder boxes with correct aspect ratios

## Sections to Build

### 1. Sticky Navbar
- Text logo "THE WOKBOWL" in Impact font (from siteConfig)
- Navigation links: Menu, Our Story, How It Works, Find Us — smooth scroll anchors
- Orange "Order Now" button linking to UberEats (from platformLinks)
- Mobile: hamburger → slide-in drawer
- Transparent on top, white background + subtle shadow on scroll

### 2. Hero Section (full viewport height)
- Light gray background with placeholder image container for hero image
- Large stacked text: "THE" / "WOKBOWL" in Impact font, very large with responsive clamping
- "FRESHLY WOK'D" tagline in orange, Montserrat Bold, letter-spaced
- Subtitle: "Wok-fired bowls in under 5 minutes. Neutral Bay."
- Two side-by-side CTAs: "View Menu" (outline) and "Order on UberEats" (solid orange)
- All text sourced from siteConfig

### 3. Four F Section — "Why The WOKBOWL?"
- Light gray background, centered section title
- 4-card responsive grid (1→2→4 columns)
- Cards: FAST ⚡, FUSION 🌏, FRESH 🥬, FUTURE 🤖
- Each with emoji icon, bold title, gray description
- White cards with thin 1px border, no shadow

### 4. Component Structure
- Individual files: `Navbar.tsx`, `HeroSection.tsx`, `FourFSection.tsx`, `MenuSection.tsx`, `MenuCard.tsx`, `HowItWorks.tsx`, `FindUs.tsx`, `OrderCTA.tsx`, `Footer.tsx`
- Index page composes all sections together

