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
  style?: React.CSSProperties;
  className?: string;
}

const MenuCard = ({ item, style, className }: MenuCardProps) => {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const showPlaceholder = imgError || !imgLoaded;

  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-transparent p-2 transition-all duration-200 hover:-translate-y-1 hover:border-primary",
        className
      )}
      style={style}
    >
      {/* Image */}
      <div className="relative mb-3 aspect-square w-full overflow-hidden rounded-lg bg-muted">
        {showPlaceholder && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
            <span className="text-3xl">🍳</span>
            <span className="text-xs">Photo coming soon</span>
          </div>
        )}
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            showPlaceholder ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
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
