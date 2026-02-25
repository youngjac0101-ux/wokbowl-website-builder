export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "wok-bowls" | "fried-rice" | "wok-boxes" | "sides" | "drinks";
  tags: string[];
}

export const menuItems: MenuItem[] = [
  // ─── PART 1: WOK BOWLS ───
  {
    id: "mongolian-beef-bowl",
    name: "Mongolian Beef Bowl",
    price: 16.9,
    description:
      "Tender beef slices flash-fried with ginger and scallions for signature charred edges. Served over fried rice, chow mein, or steamed rice.",
    image: "/images/menu/mongolian-beef.png",
    category: "wok-bowls",
    tags: [],
  },
  {
    id: "black-pepper-beef-bowl",
    name: "Black Pepper Beef Bowl",
    price: 16.9,
    description:
      "Angus beef strips seared with cracked black pepper and onions. Glossy, aromatic sauce; choose from three bases.",
    image: "/images/menu/black-pepper-beef.png",
    category: "wok-bowls",
    tags: [],
  },
  {
    id: "cashew-nut-chicken-bowl",
    name: "Cashew Nut Chicken Bowl",
    price: 16.9,
    description:
      "Succulent chicken wok-tossed with roasted cashews and seasonal vegetables. Light soy seasoning, tender texture.",
    image: "/images/menu/cashew-chicken.png",
    category: "wok-bowls",
    tags: [],
  },
  {
    id: "satay-chicken-bowl",
    name: "Satay Chicken Bowl",
    price: 16.9,
    description:
      "Sliced chicken thigh in rich peanut satay sauce with fresh green beans. Served over your choice of base.",
    image: "/images/menu/satay-chicken.png",
    category: "wok-bowls",
    tags: [],
  },
  {
    id: "tofu-eggplant-salt-pepper-bowl",
    name: "Tofu & Eggplant (Salt & Pepper) Bowl",
    price: 15.9,
    description:
      "Crispy silken tofu and tender eggplant flash-fried with garlic and spicy salt. Plant-based, golden-brown, aromatic.",
    image: "/images/menu/salt-pepper-tofu.png",
    category: "wok-bowls",
    tags: ["vegan"],
  },
  {
    id: "honey-chicken-bowl",
    name: "Honey Chicken Bowl",
    price: 16.9,
    description:
      "Double-fried battered chicken in glossy honey glaze with sesame seeds. Served over fried rice, chow mein, or steamed rice.",
    image: "/images/menu/honey-chicken.png",
    category: "wok-bowls",
    tags: ["popular"],
  },
  {
    id: "sweet-sour-pork-bowl",
    name: "Sweet & Sour Pork Bowl",
    price: 16.9,
    description:
      "Tender pork nuggets flash-fried with pineapple and capsicum in tangy sauce. Choose your base.",
    image: "/images/menu/sweet-sour-pork.png",
    category: "wok-bowls",
    tags: [],
  },

  // ─── PART 2: SPECIALISED FRIED RICE ───
  {
    id: "wok-station-combo-rice",
    name: "Wok Station Combo Rice",
    price: 18.9,
    description:
      "King prawns, chicken, and beef flash-fried into jasmine rice with egg and scallions. Protein-heavy, land-and-sea.",
    image: "/images/menu/combo-rice.png",
    category: "fried-rice",
    tags: ["popular"],
  },
  {
    id: "angus-beef-fried-rice",
    name: "Angus Beef Fried Rice",
    price: 16.9,
    description:
      "Mongolian beef slices wok-fried into seasoned rice with egg and peas. Charred, savory grains.",
    image: "/images/menu/beef-fried-rice.png",
    category: "fried-rice",
    tags: [],
  },
  {
    id: "classic-chicken-fried-rice",
    name: "Classic Chicken Fried Rice",
    price: 14.9,
    description:
      "Satay-style chicken high-heat wok-fried into fluffy jasmine rice with egg. Distinct, aromatic grains.",
    image: "/images/menu/chicken-fried-rice.png",
    category: "fried-rice",
    tags: [],
  },
  {
    id: "king-prawn-fried-rice",
    name: "King Prawn Fried Rice",
    price: 17.9,
    description:
      "Premium king prawns flash-seared and tossed into jasmine rice with egg and spring onions. Umami-rich.",
    image: "/images/menu/prawn-fried-rice.png",
    category: "fried-rice",
    tags: [],
  },

  // ─── PART 3: SHARED WOK BOXES ───
  {
    id: "duo-box-set",
    name: "The Duo Box Set",
    price: 32.0,
    description:
      "Two custom wok bowls with two snacks and two drinks. Value-driven set for two, fired to order.",
    image: "/images/menu/large-bowl.jpg",
    category: "wok-boxes",
    tags: [],
  },
  {
    id: "family-squad-box",
    name: "The Family Squad Box",
    price: 58.0,
    description:
      "Four signature wok bowls with large sharing sides and drinks. High-efficiency catering for the whole group.",
    image: "/images/menu/large-bowl.jpg",
    category: "wok-boxes",
    tags: [],
  },
  {
    id: "junior-wok-box",
    name: "Junior Wok Box",
    price: 10.9,
    description:
      "Smaller-portion wok bowl with a side snack and juice. Kid-friendly, same precision and quality.",
    image: "/images/menu/large-bowl.jpg",
    category: "wok-boxes",
    tags: [],
  },

  // ─── PART 4: SIDES & SNACKS ───
  {
    id: "shake-shake-crispy-pork",
    name: "Shake Shake Crispy Pork",
    price: 8.9,
    description:
      "Hand-cut pork strips flash-fried and shaken with spicy, seaweed, or cumin seasoning. Served hot.",
    image: "/images/menu/shake-pork.png",
    category: "sides",
    tags: [],
  },
  {
    id: "vegetable-spring-rolls",
    name: "Vegetable Spring Rolls",
    price: 6.9,
    description:
      "Golden-brown pastry rolls with shredded vegetables, fried until shatter-crisp. Steaming tender interior.",
    image: "/images/menu/spring-rolls.png",
    category: "sides",
    tags: ["vegan"],
  },
  {
    id: "chicken-spring-rolls",
    name: "Chicken Spring Rolls",
    price: 7.9,
    description:
      "Chicken and vegetable filling in delicate pastry, fried to crisp golden-brown. Satisfying snap.",
    image: "/images/menu/chicken-spring-rolls.png",
    category: "sides",
    tags: [],
  },
  {
    id: "crispy-fried-wontons",
    name: "Crispy Fried Wontons",
    price: 7.9,
    description:
      "Hand-folded wontons with seasoned filling, deep-fried to brittle golden shells. With dipping sauce.",
    image: "/images/menu/fried-wontons.png",
    category: "sides",
    tags: [],
  },
  {
    id: "prawn-crackers",
    name: "Prawn Crackers",
    price: 4.9,
    description:
      "Airy crackers flash-fried for a traditional crunch. Ideal palate cleanser between wok-fired mains.",
    image: "/images/menu/prawn-crackers.png",
    category: "sides",
    tags: [],
  },
  {
    id: "garlic-wok-greens",
    name: "Garlic Wok Greens",
    price: 6.9,
    description:
      "Fresh broccoli or green beans wok-charred with minced garlic. Crisp, aromatic, vibrant.",
    image: "/images/menu/garlic-broccoli.png",
    category: "sides",
    tags: ["vegan"],
  },

  // ─── PART 5: DRINKS STATION ───
  {
    id: "soft-drinks",
    name: "Soft Drinks",
    price: 3.5,
    description:
      "Chilled cans of Coke or Sprite. Ice-cold, refreshing contrast to our hot wok-fired bowls.",
    image: "/images/menu/soft-drinks.jpg",
    category: "drinks",
    tags: [],
  },
  {
    id: "ito-en-green-tea",
    name: "Ito En Green Tea",
    price: 5.5,
    description:
      "Premium Japanese green tea, chilled and sugar-free. Clean, earthy finish; complements Asian fusion.",
    image: "/images/menu/ito-en-green-tea.jpg",
    category: "drinks",
    tags: [],
  },
  {
    id: "coconut-water",
    name: "Coconut Water",
    price: 4.9,
    description:
      "Pure coconut water served chilled. Naturally sweet, hydrating companion to any wok bowl.",
    image: "/images/menu/coconut-water.jpg",
    category: "drinks",
    tags: [],
  },
];

export const menuCategories = [
  { id: "wok-bowls", label: "Wok Bowls" },
  { id: "fried-rice", label: "Specialised Fried Rice" },
  { id: "wok-boxes", label: "Shared Wok Boxes" },
  { id: "sides", label: "Sides & Snacks" },
  { id: "drinks", label: "Drinks Station" },
] as const;
