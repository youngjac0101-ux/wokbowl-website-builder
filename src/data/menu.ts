export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "signature" | "build-your-own" | "sides" | "drinks";
  tags: string[];
}

export const menuItems: MenuItem[] = [
  {
    id: "teriyaki-chicken",
    name: "Teriyaki Chicken Bowl",
    price: 16.9,
    description: "Wok-fired chicken thigh, teriyaki glaze, steamed rice, edamame, pickled ginger, sesame.",
    image: "/images/menu/teriyaki-chicken.jpg",
    category: "signature",
    tags: ["popular", "chicken"],
  },
  {
    id: "kung-pao-prawn",
    name: "Kung Pao Prawn Bowl",
    price: 18.9,
    description: "Tiger prawns, roasted peanuts, dried chilli, Sichuan pepper, jasmine rice.",
    image: "/images/menu/kung-pao-prawn.jpg",
    category: "signature",
    tags: ["spicy", "seafood"],
  },
  {
    id: "crispy-tofu",
    name: "Crispy Tofu & Greens Bowl",
    price: 15.9,
    description: "Golden tofu, broccolini, bok choy, sweet soy, brown rice, crispy shallots.",
    image: "/images/menu/crispy-tofu.jpg",
    category: "signature",
    tags: ["vegan", "healthy"],
  },
  {
    id: "black-bean-beef",
    name: "Black Bean Beef Bowl",
    price: 17.9,
    description: "Sliced beef, fermented black bean sauce, capsicum, onion, steamed rice.",
    image: "/images/menu/black-bean-beef.jpg",
    category: "signature",
    tags: ["beef"],
  },
  {
    id: "spring-rolls",
    name: "Spring Rolls (4pc)",
    price: 8.9,
    description: "Crispy vegetable spring rolls with sweet chilli dipping sauce.",
    image: "/images/menu/spring-rolls.jpg",
    category: "sides",
    tags: ["vegan"],
  },
  {
    id: "edamame",
    name: "Edamame",
    price: 6.9,
    description: "Steamed edamame with sea salt and chilli flakes.",
    image: "/images/menu/edamame.jpg",
    category: "sides",
    tags: ["vegan", "healthy"],
  },
];

export const menuCategories = [
  { id: "signature", label: "Signature Bowls" },
  { id: "build-your-own", label: "Build Your Own" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
] as const;
