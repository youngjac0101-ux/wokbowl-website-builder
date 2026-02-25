export const siteConfig = {
  brandName: "THE WOKBOWL",
  brandNameLine1: "THE",
  brandNameLine2: "WOKBOWL",
  tagline: "FRESHLY WOK'D",
  subtitle: "Wok-fired bowls in under 5 minutes. Neutral Bay.",
  sectionTitle: "WHY THE WOKBOWL?",

  address: "123 Military Road, Neutral Bay NSW 2089",
  phone: "(02) 9953 0000",
  email: "hello@thewokbowl.com.au",
  mapUrl: "https://maps.google.com/?q=Neutral+Bay+NSW+2089",

  hours: [
    { days: "Monday – Friday", time: "11:00 AM – 9:00 PM" },
    { days: "Saturday – Sunday", time: "11:30 AM – 9:30 PM" },
  ],

  socialLinks: {
    instagram: "https://instagram.com/thewokbowl",
    facebook: "https://facebook.com/thewokbowl",
    tiktok: "https://tiktok.com/@thewokbowl",
  },

  seo: {
    title: "The WOKBOWL — Fresh Wok-Fired Bowls | Neutral Bay Sydney",
    description:
      "Fast-casual Asian fusion bowls wok-fired in under 5 minutes. Fresh ingredients, bold flavours. Order online or visit us in Neutral Bay, Sydney.",
    ogImage: "/images/brand/og-image.jpg",
  },

  navLinks: [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#story" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Find Us", href: "#find-us" },
  ],
} as const;
