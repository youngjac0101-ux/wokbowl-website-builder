// Menu photo overrides — itemId → image path.
// Only items listed here show a real photo; everything else renders the elegant
// "photo coming soon" placeholder. This lives separately from the auto-generated
// menu.ts so re-syncing the menu never clobbers the photo mapping.
//
// Tags:  [exact] = dish-specific shot   [category] = representative shot shared
// across a category (swap for per-dish shots once they're taken).
export const MENU_PHOTOS: Record<string, string> = {
  // ── Signature Bowls ───────────────────────────────────────────
  "og-honey-chicken-bowl": "/images/menu/og-honey-chicken.jpg",            // exact
  "traditional-honey-chicken-bowl": "/images/menu/honey-chicken.png",       // exact
  "yuzu-honey-chicken-bowl": "/images/menu/honey-chicken.png",              // exact-ish
  "mongolian-smoke-beef-bowl": "/images/menu/mongolian-smoke-beef.jpg",     // exact
  "sichuan-fire-beef-bowl": "/images/menu/sichuan-fire-beef.jpg",           // exact
  "sweet-sour-pork-bowl": "/images/menu/sweet-sour-pork-new.jpg",           // exact
  "salt-pepper-tofu-bowl": "/images/menu/salt-pepper-tofu.png",             // exact
  "garlic-broccoli-bowl": "/images/menu/garlic-broccoli.png",               // exact
  "traditional-honey-king-prawn-bowl": "/images/menu/gmb-honey-prawn.jpg",  // exact (GMB)
  "salt-pepper-prawns-bowl": "/images/menu/gmb-salt-pepper-prawn.jpg",      // exact (GMB)
  "hainanese-chicken-rice-bowl": "/images/menu/gmb-hainanese-chicken.jpg",  // exact (GMB)

  // ── Fried Rice ────────────────────────────────────────────────
  "chicken-fried-rice": "/images/menu/chicken-fried-rice.png",              // exact
  "angus-beef-fried-rice": "/images/menu/beef-fried-rice.png",              // exact
  "king-prawn-fried-rice": "/images/menu/prawn-fried-rice.png",             // exact
  "combo-fried-rice": "/images/menu/combo-rice.png",                        // exact
  "duck-fried-rice": "/images/menu/gmb-fried-rice.jpg",                     // category (GMB)
  "black-truffle-beef-fried-rice": "/images/menu/gmb-fried-rice.jpg",       // category (GMB)

  // ── Noodles (Chow Mein) ───────────────────────────────────────
  "chicken-chow-mein": "/images/menu/gmb-chow-mein.jpg",                    // category (GMB)
  "beef-chow-mein": "/images/menu/gmb-chow-mein.jpg",                       // category (GMB)
  "prawn-chow-mein": "/images/menu/gmb-chow-mein.jpg",                      // category (GMB)
  "combo-chow-mein": "/images/menu/gmb-chow-mein.jpg",                      // category (GMB)
  "black-truffle-beef-chow-mein": "/images/menu/gmb-chow-mein.jpg",         // category (GMB)

  // ── Wraps ─────────────────────────────────────────────────────
  "crispy-chicken-wrap": "/images/menu/gmb-crunch-wraps.jpg",               // category (GMB)
  "crispy-prawn-crunch-wrap": "/images/menu/gmb-crunch-wraps.jpg",          // category (GMB)
  "peking-duck-scallion-wrap": "/images/menu/gmb-crunch-wraps.jpg",         // category (GMB)

  // ── Wings ─────────────────────────────────────────────────────
  "solo-wings-6pc": "/images/menu/gmb-wings.jpg",                           // category (GMB)
  "share-wings-12pc": "/images/menu/gmb-wings.jpg",                         // category (GMB)
  "party-wings-24pc": "/images/menu/gmb-wings.jpg",                         // category (GMB)

  // ── Bites ─────────────────────────────────────────────────────
  "har-gow-3pc": "/images/menu/har-gow.jpg",                               // exact
  "chicken-spring-rolls-2pc": "/images/menu/chicken-spring-rolls.png",      // exact
  "vegetable-spring-rolls-2pc": "/images/menu/spring-rolls.png",            // exact
  "fried-wontons-3pc": "/images/menu/fried-wontons.png",                    // exact
  "prawn-crackers": "/images/menu/prawn-crackers.png",                      // exact
  "xiao-long-bao-3pc": "/images/menu/gmb-dumplings-buns.jpg",               // category (GMB)
  "steamed-dumplings-3pc": "/images/menu/gmb-dumplings-buns.jpg",           // category (GMB)
  "char-siu-bao-2pc": "/images/menu/gmb-dumplings-buns.jpg",               // category (GMB)
  "siu-mai-3pc": "/images/menu/gmb-dumplings-buns.jpg",                     // category (GMB)
  "fried-dumplings-3pc": "/images/menu/gmb-dumplings-buns.jpg",             // category (GMB)
  "steamed-box": "/images/menu/gmb-dumplings-buns.jpg",                     // category (GMB)
  "fried-box": "/images/menu/gmb-other-sides.jpg",                          // category (GMB)
};
