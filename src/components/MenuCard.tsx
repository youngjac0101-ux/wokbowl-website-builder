import { useState } from "react";
import type { MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

const tagConfig: Record<string, { label: string; className: string }> = {
  popular: {
    label: "POPULAR",
    className: "border border-primary text-primary bg-transparent",
  },
  vegan: {
    label: "VEGAN",
    className: "bg-[hsl(142,71%,45%)] text-white border-transparent",
  },
  spicy: {
    label: "🌶️ SPICY",
    className: "bg-destructive text-destructive-foreground border-transparent",
  },
  new: {
    label: "NEW",
    className: "bg-primary text-primary-foreground border-transparent",
  },
};

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
  const [imgError, setImgError] = useState(true);

  return (
    <div className="flex flex-col">
      {/* Image */}
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-muted">
        {imgError ? (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 12c-2-2.67-6-2.67-6 0 0 4 6 8 6 8s6-4 6-8c0-2.67-4-2.67-6 0Z" />
              <path d="M17 4c-2 0-3.5 1.5-5 3-1.5-1.5-3-3-5-3" />
              <circle cx="12" cy="6" r="1" />
            </svg>
          </div>
        ) : (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => {
            const config = tagConfig[tag];
            if (!config) return null;
            return (
              <span
                key={tag}
                className={cn(
                  "inline-block rounded-sm border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  config.className
                )}
              >
                {config.label}
              </span>
            );
          })}
        </div>
      )}

      {/* Name + Price */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-heading text-sm text-foreground">{item.name}</h3>
        <span className="shrink-0 font-heading text-sm text-primary">
          ${item.price.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
        {item.description}
      </p>
    </div>
  );
};

export default MenuCard;
