export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "signature" | "spicy-veggie" | "bases" | "snacks";
  tags: string[];
}

export const menuItems: MenuItem[] = [
  // SIGNATURE BOWLS
  {
    id: "honey-chicken",
    name: "Honey Chicken",
    price: 16.9,
    description: "Golden crispy chicken glazed with honey soy, served with broccoli",
    image: "/images/menu/honey-chicken.jpg",
    category: "signature",
    tags: ["popular"],
  },
  {
    id: "mongolian-beef",
    name: "Mongolian Beef",
    price: 16.9,
    description: "Tender beef stir-fried with spring onion, chilli and oyster sauce",
    image: "/images/menu/mongolian-beef.jpg",
    category: "signature",
    tags: [],
  },
  {
    id: "sweet-sour-pork",
    name: "Sweet and Sour Pork",
    price: 16.9,
    description: "Classic sweet and sour with capsicum and pineapple",
    image: "/images/menu/sweet-sour-pork.jpg",
    category: "signature",
    tags: [],
  },
  {
    id: "lemon-chicken",
    name: "Lemon Chicken",
    price: 16.9,
    description: "Crispy chicken in a tangy lemon garlic sauce",
    image: "/images/menu/lemon-chicken.jpg",
    category: "signature",
    tags: [],
  },

  // SPICY & VEGGIE
  {
    id: "sichuan-chicken",
    name: "Sichuan Spicy Chicken",
    price: 16.9,
    description: "Numbing Sichuan pepper, dried chilli, roasted peanuts",
    image: "/images/menu/sichuan-chicken.jpg",
    category: "spicy-veggie",
    tags: ["spicy"],
  },
  {
    id: "salt-pepper-tofu",
    name: "Salt and Pepper Tofu",
    price: 15.9,
    description: "Crispy golden tofu with chilli, garlic and spring onion",
    image: "/images/menu/salt-pepper-tofu.jpg",
    category: "spicy-veggie",
    tags: ["vegan"],
  },
  {
    id: "garlic-broccoli",
    name: "Stir-fried Garlic Broccoli",
    price: 14.9,
    description: "Fresh broccoli wok-tossed with garlic",
    image: "/images/menu/garlic-broccoli.jpg",
    category: "spicy-veggie",
    tags: ["vegan"],
  },

  // BASES
  {
    id: "fried-rice",
    name: "Special Fried Rice",
    price: 6.9,
    description: "Wok-fried rice with egg, peas, corn and spring onion",
    image: "/images/menu/fried-rice.jpg",
    category: "bases",
    tags: [],
  },
  {
    id: "chow-mein",
    name: "Soy Sauce Chow Mein",
    price: 6.9,
    description: "Stir-fried egg noodles in soy sauce",
    image: "/images/menu/chow-mein.jpg",
    category: "bases",
    tags: [],
  },
  {
    id: "white-rice",
    name: "Steamed White Rice",
    price: 3.9,
    description: "Fluffy jasmine rice",
    image: "/images/menu/white-rice.jpg",
    category: "bases",
    tags: [],
  },

  // SNACKS
  {
    id: "spring-rolls",
    name: "Spring Rolls (3pc)",
    price: 6.9,
    description: "Crispy vegetable spring rolls",
    image: "/images/menu/spring-rolls.jpg",
    category: "snacks",
    tags: [],
  },
  {
    id: "dim-sims",
    name: "Fried Dim Sims (4pc)",
    price: 7.9,
    description: "Golden fried dim sims",
    image: "/images/menu/dim-sims.jpg",
    category: "snacks",
    tags: [],
  },
  {
    id: "prawn-crackers",
    name: "White Prawn Crackers",
    price: 4.9,
    description: "Light and crispy prawn crackers",
    image: "/images/menu/prawn-crackers.jpg",
    category: "snacks",
    tags: [],
  },
];

export const menuCategories = [
  { id: "signature", label: "Signature Bowls" },
  { id: "spicy-veggie", label: "Spicy & Veggie" },
  { id: "bases", label: "Bases" },
  { id: "snacks", label: "Snacks" },
] as const;
