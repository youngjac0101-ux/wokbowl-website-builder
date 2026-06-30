export const siteConfig = {
  brandName: "THE WOKBOWL",
  brandNameLine1: "THE",
  brandNameLine2: "WOKBOWL",
  tagline: "SYDNEY ASIAN KITCHEN",
  subtitle: "Fast. Fresh. Fusion. Wok. — Neutral Bay.",
  sectionTitle: "WHY THE WOKBOWL?",

  address: "Shop 21, 116 Military Road, Neutral Bay NSW 2089",
  phone: "(02) 9953 0000",
  email: "hello@thewokbowl.com.au",
  mapUrl: "https://maps.google.com/?q=Shop+21,+116+Military+Road,+Neutral+Bay+NSW+2089",
  mapEmbedUrl: "https://maps.google.com/maps?q=116+Military+Road,+Neutral+Bay+NSW+2089&output=embed&z=16",

  hours: [
    { days: "Monday – Friday", time: "11:00 AM – 9:00 PM" },
    { days: "Saturday – Sunday", time: "11:30 AM – 9:30 PM" },
  ],

  // Machine-readable trading hours (minutes from midnight, Australia/Sydney).
  // day index: 0 = Sunday … 6 = Saturday. Used to gate online ordering to
  // business hours and to build pickup slots — keep in sync with `hours` above.
  businessHours: {
    0: { open: 11 * 60 + 30, close: 21 * 60 + 30 }, // Sun 11:30–21:30
    1: { open: 11 * 60, close: 21 * 60 },            // Mon 11:00–21:00
    2: { open: 11 * 60, close: 21 * 60 },            // Tue
    3: { open: 11 * 60, close: 21 * 60 },            // Wed
    4: { open: 11 * 60, close: 21 * 60 },            // Thu
    5: { open: 11 * 60, close: 21 * 60 },            // Fri
    6: { open: 11 * 60 + 30, close: 21 * 60 + 30 }, // Sat 11:30–21:30
  } as Record<number, { open: number; close: number }>,

  // Minutes the kitchen needs before a pickup slot is available.
  pickupPrepMinutes: 15,

  socialLinks: {
    instagram: "https://instagram.com/thewokbowl",
    facebook: "https://facebook.com/thewokbowl",
    tiktok: "https://tiktok.com/@thewokbowl",
  },

  seo: {
    title: "The WOKBOWL — Sydney Asian Kitchen | Neutral Bay",
    description:
      "Neutral Bay's neighbourhood wok kitchen. Fresh, made-to-order Asian bowls, crispy wings and dim sum bites — wok-fired with Australian produce. Order direct for pickup, ready in minutes. Open 7 days.",
    ogImage: "/images/brand/og-image.jpg",
  },

  navLinks: [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#story" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Find Us", href: "#find-us" },
  ],
} as const;
