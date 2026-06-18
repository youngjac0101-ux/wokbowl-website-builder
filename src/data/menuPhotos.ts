// Menu photo overrides — itemId → image path.
// Only items listed here show a real photo; everything else renders the elegant
// "photo coming soon" placeholder. Lives separately from the auto-generated
// menu.ts so re-syncing the menu never clobbers the photo mapping.
//
// NOTE: All photos intentionally removed for now — the dish↔photo matching was
// off. Add entries back here (itemId: "/images/menu/xxx.jpg") as correct,
// dish-specific shots are confirmed. Prior mapping is in git history.
export const MENU_PHOTOS: Record<string, string> = {};
