import { useState } from "react";
import { Plus, Check } from "lucide-react";
import type { MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { VERIFIED_PHOTO_IDS } from "@/data/menuPhotos";

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
    label: "SPICY",
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
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  // Only items with a verified, name-matched photo show a real image. Everything
  // else gets the elegant placeholder — no wrong/duplicated dishes on the menu.
  const hasVerifiedPhoto = VERIFIED_PHOTO_IDS.has(item.id);
  const showPlaceholder = !hasVerifiedPhoto || imgError || !imgLoaded;

  return (
    <div
      className={cn(
        "group cursor-default transition-all duration-300 hover:-translate-y-1",
        className
      )}
      style={style}
    >
      {/* Image — large 4:3 hero area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
        {showPlaceholder && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary text-muted-foreground/45">
            <span className="h-1.5 w-1.5 rounded-full bg-primary/40" aria-hidden="true" />
            <span className="font-heading text-[9px] uppercase tracking-[0.25em]">Photo coming soon</span>
          </div>
        )}
        {hasVerifiedPhoto && (
          <img
            src={`${item.image}?v=${import.meta.env.VITE_MENU_IMAGE_VERSION ?? "1"}`}
            alt={item.name}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105",
              imgError || !imgLoaded ? "opacity-0" : "opacity-100"
            )}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Content — generous spacing */}
      <div className="pt-5">
        {/* Tags */}
        {item.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
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
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg text-foreground leading-tight">{item.name}</h3>
          <span className="shrink-0 font-heading text-sm text-primary">
            ${item.price.toFixed(2)}
          </span>
        </div>

        {/* Description */}
        <p className="mt-2 line-clamp-2 font-heading-light text-[13px] leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          className={cn(
            "mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300",
            added
              ? "bg-green-500 text-white"
              : "bg-[var(--orange-light)] text-[var(--orange)] hover:bg-[var(--orange)] hover:text-white"
          )}
        >
          {added ? (
            <><Check className="w-4 h-4" /> Added!</>
          ) : (
            <><Plus className="w-4 h-4" /> Add to Order</>
          )}
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
