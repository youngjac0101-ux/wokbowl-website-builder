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

  socialLinks: {
    instagram: "https://instagram.com/thewokbowl",
    facebook: "https://facebook.com/thewokbowl",
    tiktok: "https://tiktok.com/@thewokbowl",
  },

  seo: {
    title: "The WOKBOWL — Sydney Asian Kitchen | Neutral Bay",
    description:
      "Fast. Fresh. Fusion. Wok. — Wok-fired bowls, crispy wings and dim sum bites at Neutral Bay, Sydney. Order UberEats or DoorDash. Open 7 days.",
    ogImage: "/images/brand/og-image.jpg",
  },

  navLinks: [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#story" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Find Us", href: "#find-us" },
  ],
} as const;
