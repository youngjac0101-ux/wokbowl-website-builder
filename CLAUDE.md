# THE WOKBOWL — Project Rules for Cursor Agent

> **CRITICAL**: Read this entire file before making ANY code change.
> This is the single source of truth for brand, design, architecture, and coding standards.
> Also read `FUNCTIONALITY-SUMMARY.md` for current implementation details.

---

## 1. PROJECT OVERVIEW

| Key | Value |
|-----|-------|
| **Brand** | THE WOKBOWL |
| **Type** | Fast-casual Asian fusion restaurant website |
| **Location** | Neutral Bay, Sydney, Australia |
| **Domain** | www.thewokbowl.com.au |
| **Stack** | React 18 + TypeScript + Vite + Tailwind CSS + Global CSS Variables |
| **Hosting** | Vercel (auto-deploy from GitHub on push) |
| **Language** | English only |
| **Scripts** | `dev` / `build` / `lint` / `test` |

### Target Users
| User | When | Need | Behaviour |
|------|------|------|-----------|
| **Office worker** | Weekday 12:00–13:30 | Fast decision, certainty | See menu → tap UberEats → done (<30 sec) |
| **Local resident** | Weekday 18:00–20:00 | Trust, quality, variety | Browse menu → check environment → order delivery |
| **Commuter** | Morning/evening rush | Curiosity, first impression | "What is this?" → instant trust signal → save for later |

### Phase 1 Scope
✅ Brand showcase, online menu, store info, delivery platform links
❌ Online ordering, payment, user accounts, blog, Chinese language, catering form

---

## 2. BRAND IDENTITY — ABSOLUTE RULES

### 2.1 Brand Name
- Display: **THE WOKBOWL** (all caps in headers/nav/footer)
- Stylized hero: **The *Wok*Bowl** (italic on "Wok")
- Tagline: **FRESHLY WOK'D**
- Hashtag: **#GetWokd**
- Extended: "You've been Wok'd." / "Wok'd to perfection"
- ❌ NEVER: "The Wok Station" (old name), "Wok Bowl" (two separate words), "wokbowl" (all lowercase)

### 2.2 Brand Voice
| Trait | Meaning | Example |
|-------|---------|---------|
| **Warm** | We are a neighbour, not a factory | "Come Say G'day" |
| **Confident** | We know our food is good | "Wok'd Fresh. Every Single Time." |
| **Techy but humble** | We use robots and AI, but don't lecture | "Ready in under 5 minutes" not "AI-optimised cooking pipeline" |
| **Food descriptions** | Visual first → taste → ingredients | "Golden crispy chicken, honey soy glaze, broccoli" NOT "Delicious special chicken" |

### 2.3 4F Positioning
| F | Promise |
|---|---------|
| **Fast** | Wok-fired in 45 seconds. Bowl ready in under 5 minutes. |
| **Fusion** | Chinese wok meets Australian palate. |
| **Fresh** | Made to order. No bain-marie. No pre-made meals. |
| **Future** | Robotic woks. AI-powered kitchen. |

---

## 3. DESIGN SYSTEM

### 3.1 Design Philosophy
> **Food is the hero. Fire is the soul. Design is the invisible frame.**

- Make people HUNGRY, not impressed by "cool design"
- Warmth over coldness — restaurant, not SaaS
- Generous whitespace — let elements breathe
- Food photography dominates when available; design supports, never competes
- Reference: fishbowl.com.au — editorial rhythm, food-forward, generous whitespace

### 3.2 Colors
```css
:root {
  /* ── Brand ── */
  --orange: #FF6B00;                     /* Accent ONLY: CTA, prices, kickers, logo highlight */
  --orange-light: #FFF3EB;              /* Hover states, subtle backgrounds */
  --orange-glow: rgba(255,107,0,0.08);  /* Decorative glow */

  /* ── Backgrounds ── */
  --warm-white: #FFFCF9;   /* Main page background — NOT pure white */
  --cream: #FDF8F4;          /* Alternating section backgrounds */
  --white: #FFFFFF;          /* Cards, overlays */

  /* ── Text ── */
  --dark: #1C1917;    /* Headlines, primary text */
  --text: #44403C;    /* Body text */
  --muted: #A8A29E;   /* Descriptions, secondary text */

  /* ── Utility ── */
  --border: #F5F0EB;   /* Dividers, card borders */
  --green: #16A34A;    /* Vegan tag ONLY */
}
```

**Color Rules:**
- Orange = accent (~10% of page). Large orange only on Order CTA banner.
- Page background = `--warm-white` (#FFFCF9), NEVER pure #FFFFFF
- Alternating sections use `--cream` for visual rhythm
- All grays are WARM stone palette. Never cool/blue grays.
- No gradients on cards. No box-shadows on cards. Max border-radius: 8px.

### 3.3 Typography
```css
/* Display & Headings — warm, premium */
font-family: 'Playfair Display', Georgia, serif;
/* Weights: 700 (section headings), 800 (hero display) */
/* Use for: Hero title, section headings, menu item names */

/* Body & UI — clean, modern */
font-family: 'DM Sans', -apple-system, sans-serif;
/* Weights: 300 (descriptions), 400 (body), 500 (tabs/labels), 700 (buttons/kickers) */
/* Use for: Nav, body, buttons, descriptions, footer, tabs */

/* Section Kicker pattern (orange label above every section heading) */
font-size: 11px; font-weight: 700; letter-spacing: 0.2em;
text-transform: uppercase; color: var(--orange);
```

**Typography Rules:**
- Playfair Display for headings → warmth and premium feel
- DM Sans for everything else → modern, readable
- Every section: kicker (orange 11px uppercase) → heading (Playfair large) → optional subtitle (DM Sans muted)
- Never use: Inter, Arial, Roboto, Impact, Montserrat, or generic system fonts

### 3.4 Spacing
- Max content width: 1000px (most sections), 1200px only if needed
- Section padding: 120px vertical desktop, 80px mobile
- Horizontal padding: 40px desktop, 20px mobile
- 8px grid: 8, 16, 24, 32, 48, 64, 80, 120
- When in doubt → add more space, not less

### 3.5 Animations
```css
/* Standard scroll reveal */
transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
/* Stagger children: 0.1s increments */
```
- IntersectionObserver, threshold 0.08
- Reveal: fade in + translateY(24px → 0)
- Hover: 0.3–0.4s
- Never: bounce, elastic, spring

### 3.6 Images
**Current**: Placeholder/AI-generated. Professional photos before opening.
```
public/images/
├── hero/       # hero-bg.jpg (1920x1080), → video post-opening
├── menu/       # {item-id}.jpg (800x600, 4:3) per item
├── brand/      # logo.svg, logo-white.svg, wok-hei-icon.svg, favicon.ico, og-image.jpg
└── about/      # store-front.jpg, robot-wok.jpg
```
- All `<img>`: alt text + `loading="lazy"` below fold
- Menu: 4:3 ratio, `object-fit: cover`
- Broken image: cream placeholder + icon + "Photo coming soon"
- Hero post-opening: `<video autoPlay muted loop playsInline>`

---

## 4. CURRENT SITE ARCHITECTURE

### 4.1 Page Sections (scroll order)
```
 1. Navbar          — Fixed. Logo + nav links + Order CTA. Mobile: hamburger → sidebar
 2. HeroSection     — 100vh. Fire animation + brand + tagline + CTAs
 3. ImageBand       — Full-width placeholder for food photography
 4. FourFSection    — Our Story narrative + 4F cards (Fast/Fusion/Fresh/Future)
 5. MenuSection     — 5 category tabs (scrollable + arrows) + 23 food cards
 6. HowItWorks     — 3 steps: Pick → Wok → Enjoy
 7. FindUs         — Google Maps embed + address/hours/phone/email
 8. OrderCTA       — Orange banner + UberEats/DoorDash/Menulog buttons
 9. Footer         — Brand + links + social + copyright
```

### 4.2 Navigation
**Desktop:** Sticky nav, smooth scroll to `#menu` / `#story` / `#how-it-works` / `#find-us`. Transparent on hero → white bg + blur on scroll.

**Mobile:** Hamburger → sidebar slides in from right. Each link: close sidebar → smooth scroll to section. "Order Now" always visible.

### 4.3 Menu Section
- **5 categories** (from `menu.ts`)
- **23 items** total
- Category tab bar: horizontal scroll + left/right arrow buttons
- Click category → switch display + scroll tab into view
- Card: image (4:3) + name (Playfair) + price (orange) + description (muted) + tags
- Tags: Popular (orange), Vegan (green), Spicy (red), New (orange solid)
- Wok Bowls only: "All bowls include your choice of base..." note
- Bottom: allergen notice (legally required, never remove)

---

## 5. DATA ARCHITECTURE

**All dynamic data in `/src/data/`. NEVER hardcode in components.**

### `/src/data/menu.ts`
23 items, 5 categories. Exports: `menuItems`, `menuCategories`.
```typescript
export interface MenuItem {
  id: string;           // = image filename: /images/menu/{id}.jpg
  name: string;
  price: number;
  description: string;  // One line, visual-first
  image: string;       // e.g. "/images/menu/mongolian-beef-bowl.jpg"
  category: "wok-bowls" | "fried-rice" | "wok-boxes" | "sides" | "drinks";
  tags: string[];       // 'popular' | 'vegan' | 'spicy' | 'new'
}
// menuCategories: { id, label }[] — drives tab bar and filtering
```

### `/src/data/siteConfig.ts`
Brand text, contact info, nav labels (`navLinks`: `{ label, href }[]`), SEO meta.

### `/src/data/platformLinks.ts`
```typescript
export const platformLinks = {
  ubereats: { url: '...' },   // Replace before opening
  doordash: { url: '...' },
  menulog: { url: '...' },
};
```

---

## 6. COMPONENT STRUCTURE
```
src/
├── data/
│   ├── menu.ts              ← 23 items, 5 categories
│   ├── siteConfig.ts        ← Brand, contact, nav, SEO
│   └── platformLinks.ts     ← Delivery URLs
├── components/
│   ├── Navbar.tsx            ← Sticky nav + mobile sidebar
│   ├── HeroSection.tsx       ← Fire animation + brand + CTAs
│   ├── ImageBand.tsx         ← Full-width photo placeholder
│   ├── FourFSection.tsx      ← Story + 4F cards
│   ├── MenuSection.tsx       ← Category tabs (arrows) + cards + allergen
│   ├── HowItWorks.tsx        ← 3-step process
│   ├── FindUs.tsx            ← Map + contact
│   ├── OrderCTA.tsx          ← Orange CTA banner
│   └── Footer.tsx
├── hooks/
│   └── useReveal.ts          ← Scroll animation hook
├── App.tsx                   ← Section assembly
├── index.css                 ← Globals + CSS vars
└── main.tsx
```

**Rules:** One section = one file. Data from config. Stateless where possible. `useReveal()` on every section.

---

## 7. STYLING

**Tailwind CSS + Global CSS Variables** (co-exist):
- CSS vars in `:root` for brand tokens
- Tailwind for layout, spacing, responsive
- Custom CSS for fire animation, gradients, complex effects
- ❌ No CSS-in-JS (styled-components, emotion, etc.)

**Responsive:**
| Breakpoint | Target |
|------------|--------|
| Default | Desktop 1024px+ |
| `max-width: 900px` | Tablet |
| `max-width: 600px` | Mobile (min 375px) |

---

## 8. SEO & PERFORMANCE

**Meta tags** (in index.html):
```html
<title>The WOKBOWL — Freshly Wok'd Bowls | Neutral Bay, Sydney</title>
<meta name="description" content="Fast-casual wok-fired bowls in Neutral Bay. Fresh ingredients, robotic woks, ready in 5 minutes.">
<meta property="og:title" content="The WOKBOWL — Freshly Wok'd">
<meta property="og:image" content="/images/brand/og-image.jpg">
<meta property="og:url" content="https://www.thewokbowl.com.au">
<meta name="theme-color" content="#FF6B00">
```

**Performance:** Lighthouse >90. Lazy load below fold. Preload fonts. Max: hero 500KB, menu 200KB each.

**Accessibility:** Alt text on all images. WCAG AA contrast. Focus states. Skip-to-content link.

---

## 9. DEPLOYMENT
```
Cursor → git push → GitHub → Vercel auto-deploy (~30s) → thewokbowl.com.au
```
GoDaddy DNS: CNAME `www` → `cname.vercel-dns.com`, A `@` → `76.76.21.21`. SSL auto by Vercel.

---

## 10. MAINTENANCE TASKS

| Task | Action |
|------|--------|
| Change price | `menu.ts` → edit `price` → push |
| Add item | `menu.ts` + image in `public/images/menu/{id}.jpg` → push |
| Remove item | Delete from `menu.ts` → push |
| Replace photo | Same filename in `public/images/menu/` → push |
| Update address/phone | `siteConfig.ts` → push |
| Update delivery links | `platformLinks.ts` → push |
| Hero → real video | `HeroSection.tsx`: replace fire divs with `<video>`. Add `public/video/hero.mp4`. Keep dark overlay. |
| Add new section | New component → import in `App.tsx` in correct order → update nav if needed |

---

## 11. RED LINES — DO NOT

- ❌ Cool/blue grays (always warm stone palette)
- ❌ Pure #FFFFFF as page background (use #FFFCF9)
- ❌ Gradients or box-shadows on cards
- ❌ Bounce/spring/elastic animations
- ❌ Hardcode content in components (use `/src/data/`)
- ❌ Emoji as permanent design (placeholder only)
- ❌ New npm deps without approval
- ❌ Change fonts (Playfair Display + DM Sans)
- ❌ "The Wok Station" anywhere
- ❌ Orange dominant except Order CTA banner
- ❌ Phase 2 features (ordering, payment, accounts, blog, i18n)
- ❌ CSS-in-JS libraries
- ❌ Remove allergen notice (legally required)
- ❌ Break data-driven architecture

---

## 12. REFERENCES

| Doc | Purpose |
|-----|---------|
| `FUNCTIONALITY-SUMMARY.md` | Current implementation details |
| `CLAUDE.md` | This file — all rules |
| Brand Book DOC-01 V1.1 | Full brand guidelines (internal) |
| fishbowl.com.au | Design reference |

### Allergen Notice (legally required)
> "All dishes may contain traces of nuts, gluten, shellfish, soy, sesame, eggs, and dairy. Please inform staff of any allergies before ordering."

---

*Last updated: February 25, 2026 — CTO Office, THE WOKBOWL*
