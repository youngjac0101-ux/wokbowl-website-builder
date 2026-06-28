// Stripe publishable key — PUBLIC by design, safe to commit and ship to the
// browser. Hardcoded here (not read from env) so the live key always ships,
// regardless of the Vercel project's env var which still holds an old test key.
//
// Account: The Wokbowl (acct_1Te7ZI311zrMVuMD) — LIVE.
export const STRIPE_PUBLISHABLE_KEY =
  "pk_live_51Te7ZI311zrMVuMDjW4d6de2Y3QcvoRQ9BXkQUxPXBJkyyarp4qwWEGpTMoJIvOi3NqaP0RwOrMH3ypiuaizcsLt00mUUygPn3";
