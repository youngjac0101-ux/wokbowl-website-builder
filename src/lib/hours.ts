import { siteConfig } from "@/data/siteConfig";

// Everything here is computed in Australia/Sydney, independent of the visitor's
// device timezone — pickup times and the open/closed gate must follow the shop.

const TZ = "Australia/Sydney";

/** "Now" as a Date whose local fields (getHours/getDay/…) read as Sydney time. */
export function sydneyNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: TZ }));
}

function fmt(minsFromMidnight: number): string {
  const h = Math.floor(minsFromMidnight / 60);
  const m = minsFromMidnight % 60;
  const d = new Date(2000, 0, 1, h, m);
  return d.toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit", hour12: true });
}

export interface OrderingStatus {
  open: boolean;
  /** Pickup time options (Sydney), empty when closed. */
  slots: string[];
  /** Short reason shown when closed, e.g. "Opens Mon 11:00 AM". */
  message?: string;
}

/** Next day (incl. today) that has trading hours, starting `fromDay`. */
function nextOpenLabel(now: Date): string {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const nowMins = now.getHours() * 60 + now.getMinutes();
  for (let i = 0; i < 8; i++) {
    const day = (now.getDay() + i) % 7;
    const hrs = siteConfig.businessHours[day];
    if (!hrs) continue;
    // Today only counts if we haven't passed opening yet.
    if (i === 0 && nowMins >= hrs.open) continue;
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : dayNames[day];
    return `Opens ${when} ${fmt(hrs.open)}`;
  }
  return "Currently closed";
}

/** Whether online ordering is open right now, plus available pickup slots. */
export function getOrderingStatus(now: Date = sydneyNow()): OrderingStatus {
  const hrs = siteConfig.businessHours[now.getDay()];
  const nowMins = now.getHours() * 60 + now.getMinutes();
  const prep = siteConfig.pickupPrepMinutes;

  // Earliest pickup = now + prep, rounded up to the next 15 minutes.
  let earliest = Math.ceil((nowMins + prep) / 15) * 15;

  if (!hrs || nowMins >= hrs.close) {
    return { open: false, slots: [], message: nextOpenLabel(now) };
  }
  // Before opening — not taking orders yet today.
  if (nowMins < hrs.open) {
    return { open: false, slots: [], message: nextOpenLabel(now) };
  }
  // Open: pickup can't be earlier than opening, and must land before close.
  earliest = Math.max(earliest, hrs.open);
  if (earliest > hrs.close) {
    return { open: false, slots: [], message: nextOpenLabel(now) };
  }

  const slots: string[] = [];
  for (let t = earliest; t <= hrs.close && slots.length < 20; t += 15) {
    slots.push(fmt(t));
  }
  return { open: slots.length > 0, slots, message: slots.length ? undefined : nextOpenLabel(now) };
}
