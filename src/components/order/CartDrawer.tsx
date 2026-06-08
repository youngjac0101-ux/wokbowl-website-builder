import React, { useState } from "react";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CheckoutModal from "./CheckoutModal";

const CartDrawer: React.FC = () => {
  const { items, isOpen, closeCart, removeItem, updateQty, total, count } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-[#FFFCF9] z-50 shadow-2xl flex flex-col"
        role="dialog"
        aria-label="Your order"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F5F0EB]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-foreground">Your Order</h2>
            {count > 0 && (
              <span className="bg-primary text-white text-[10px] font-heading rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/20" />
              <div>
                <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Your cart is empty
                </p>
                <p className="mt-1 font-heading-light text-sm text-muted-foreground/60">
                  Add something delicious to get started.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border border-[#F5F0EB] bg-white p-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover bg-secondary flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-heading text-[11px] uppercase tracking-[0.1em] text-foreground truncate">
                      {item.name}
                    </p>
                    <p className="mt-0.5 font-heading text-sm text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center font-heading text-sm text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center bg-primary text-white transition-colors hover:bg-primary/90"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-1 flex h-7 w-7 items-center justify-center text-muted-foreground/40 transition-colors hover:text-destructive"
                    aria-label={`Remove ${item.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[#F5F0EB] bg-[#FFFCF9]">
            <div className="flex justify-between items-baseline mb-5">
              <span className="font-heading text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Subtotal
              </span>
              <span className="font-display text-2xl text-foreground">${total.toFixed(2)}</span>
            </div>
            <p className="font-heading-light text-[11px] text-muted-foreground/60 mb-4 text-center">
              Pick up in store — ready in under 5 minutes
            </p>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-primary text-white font-heading text-[11px] uppercase tracking-[0.2em] py-4 transition-colors hover:bg-primary/90"
            >
              Checkout — ${total.toFixed(2)}
            </button>
          </div>
        )}
      </div>

      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
};

export default CartDrawer;
