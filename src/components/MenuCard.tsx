import { useState } from "react";
import type { MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

const tagConfig: Record<string, { label: string; className: string }> = {
  popular: {
    label: "POPULAR",
    className: "text-primary border-primary/30",
  },
  vegan: {
    label: "VEGAN",
    className: "text-[hsl(142,71%,45%)] border-[hsl(142,71%,45%,0.3)]",
  },
  spicy: {
    label: "🌶️ SPICY",
    className: "text-destructive border-destructive/30",
  },
  new: {
    label: "NEW",
    className: "text-primary border-primary/30",
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
        "group cursor-default transition-all duration-300",
        className
      )}
      style={style}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary">
        {showPlaceholder && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/30">
            <span className="text-4xl">🍳</span>
          </div>
        )}
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className={cn(
            "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
            showPlaceholder ? "opacity-0" : "opacity-100"
          )}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />
      </div>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => {
            const config = tagConfig[tag];
            if (!config) return null;
            return (
              <span
                key={tag}
                className={cn(
                  "inline-block border px-2 py-0.5 text-[9px] font-heading uppercase tracking-[0.15em]",
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
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <h3 className="font-heading text-sm uppercase tracking-wider text-foreground">{item.name}</h3>
        <span className="shrink-0 font-heading text-sm text-primary">
          ${item.price.toFixed(2)}
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 line-clamp-2 font-heading-light text-[13px] leading-relaxed text-muted-foreground">
        {item.description}
      </p>
    </div>
  );
};

export default MenuCard;
