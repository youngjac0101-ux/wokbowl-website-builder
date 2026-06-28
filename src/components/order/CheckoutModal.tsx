import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { X, Clock, User, Phone, CheckCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { STRIPE_PUBLISHABLE_KEY } from "@/data/stripe";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

// ─── Pickup time slots ─────────────────────────────────────────────────────
function getPickupSlots(): string[] {
  const slots: string[] = [];
  const now = new Date();
  const start = new Date(now.getTime() + 15 * 60 * 1000);
  start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15, 0, 0);

  const close = new Date();
  close.setHours(21, 0, 0, 0);

  for (let t = new Date(start); t <= close; t = new Date(t.getTime() + 15 * 60 * 1000)) {
    slots.push(t.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", hour12: true }));
  }
  return slots.slice(0, 20);
}

// ─── Payment Form ──────────────────────────────────────────────────────────
interface PaymentFormProps {
  name: string;
  phone: string;
  pickupTime: string;
  onSuccess: (orderId: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ name, phone, pickupTime, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message || "Payment failed");
      setLoading(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-success`,
        payment_method_data: {
          billing_details: { name, phone },
        },
      },
      redirect: "if_required",
    });

    if (confirmError) {
      setError(confirmError.message || "Payment failed");
      setLoading(false);
    } else if (paymentIntent?.status === "succeeded") {
      clearCart();
      onSuccess(paymentIntent.id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement options={{ layout: "tabs" }} />
      {error && (
        <div className="border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted text-white font-heading text-[11px] uppercase tracking-[0.2em] py-4 transition-colors"
      >
        {loading ? "Processing..." : `Pay Now — Place Order`}
      </button>
      <p className="font-heading-light text-[11px] text-center text-muted-foreground">
        Secured by Stripe · Pickup ready at {pickupTime}
      </p>
    </form>
  );
};

// ─── Main Modal ────────────────────────────────────────────────────────────
interface CheckoutModalProps {
  onClose: () => void;
}

type Step = "details" | "payment" | "success";

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose }) => {
  const { items, total } = useCart();
  const [step, setStep] = useState<Step>("details");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consentSms, setConsentSms] = useState(true);
  const [pickupTime, setPickupTime] = useState("");
  const slots = getPickupSlots();

  useEffect(() => {
    if (slots.length > 0) setPickupTime(slots[0]);
  }, []);

  const handleDetailsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Dine-in via table QR: thewokbowl.com.au/?table=5 → carries table_no into the order.
      const tableNo = new URLSearchParams(window.location.search).get("table")?.trim() || undefined;
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_FUNCTIONS_URL}/website-create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          customer: { name, phone, email, pickupTime, consentSms },
          amount: Math.round(total * 100),
          table_no: tableNo,
          order_type: tableNo ? "dine_in" : "pickup",
        }),
      });

      if (!res.ok) throw new Error("Failed to initialise payment");
      const data = await res.json();
      setClientSecret(data.clientSecret);
      setStep("payment");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border border-border bg-white px-4 py-3 font-heading-light text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors";

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Checkout"
    >
      <div className="bg-[#FFFCF9] w-full sm:max-w-lg max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#F5F0EB] sticky top-0 bg-[#FFFCF9] z-10">
          <div>
            <h2 className="font-heading text-sm uppercase tracking-[0.2em] text-foreground">
              {step === "details" && "Pickup Details"}
              {step === "payment" && "Payment"}
              {step === "success" && "Order Confirmed"}
            </h2>
            {step !== "success" && (
              <p className="mt-0.5 font-heading-light text-[11px] text-muted-foreground">
                THE WOKBOWL · Neutral Bay
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-6">
          {/* ── Success ── */}
          {step === "success" && (
            <div className="py-8 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-5" />
              <h3 className="font-display text-2xl text-foreground mb-2">You've been Wok'd.</h3>
              <p className="font-heading-light text-sm text-muted-foreground mb-1">Your order is being prepared.</p>
              <p className="font-heading text-sm text-foreground mt-3 mb-6">
                Ready for pickup at {pickupTime}
              </p>
              <div className="border border-[#F5F0EB] bg-secondary px-4 py-3 text-left mb-6">
                <p className="font-heading text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1">
                  Order Reference
                </p>
                <p className="font-mono text-[11px] text-muted-foreground break-all">{orderId}</p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-primary text-white font-heading text-[11px] uppercase tracking-[0.2em] py-4 transition-colors hover:bg-primary/90"
              >
                Done
              </button>
            </div>
          )}

          {/* ── Details Form ── */}
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="space-y-5">
              {/* Order summary */}
              <div className="border border-[#F5F0EB] bg-secondary p-4 space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="font-heading-light text-sm text-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-heading text-sm text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#F5F0EB] pt-2 flex justify-between">
                  <span className="font-heading text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    Total
                  </span>
                  <span className="font-heading text-sm text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block font-heading text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  <User className="w-3.5 h-3.5 inline mr-1.5" />Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex"
                  className={inputClass}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-heading text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  <Phone className="w-3.5 h-3.5 inline mr-1.5" />Mobile
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="04XX XXX XXX"
                  className={inputClass}
                />
              </div>

              {/* Pickup time */}
              <div>
                <label className="block font-heading text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  <Clock className="w-3.5 h-3.5 inline mr-1.5" />Pickup Time
                </label>
                <select
                  required
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className={inputClass}
                >
                  {slots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
                <p className="mt-1.5 font-heading-light text-[11px] text-muted-foreground">
                  Shop 21, 116 Military Road, Neutral Bay
                </p>
              </div>

              {/* Email (optional) */}
              <div>
                <label className="block font-heading text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-2">
                  Email <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {/* SMS consent */}
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={consentSms}
                  onChange={(e) => setConsentSms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-primary"
                />
                <span className="font-heading-light text-[12px] text-muted-foreground leading-snug">
                  Send me a welcome offer & occasional deals by SMS. Unsubscribe anytime.
                </span>
              </label>

              {error && (
                <div className="border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted text-white font-heading text-[11px] uppercase tracking-[0.2em] py-4 transition-colors"
              >
                {loading ? "Preparing..." : `Continue to Payment — $${total.toFixed(2)}`}
              </button>
            </form>
          )}

          {/* ── Payment ── */}
          {step === "payment" && clientSecret && (
            <div className="space-y-4">
              <div className="border border-green-200 bg-green-50 px-4 py-3 font-heading-light text-sm text-green-700">
                Order for <strong>{name}</strong> · Pickup at <strong>{pickupTime}</strong>
              </div>
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: { colorPrimary: "#FF6B00" },
                  },
                }}
              >
                <PaymentForm
                  name={name}
                  phone={phone}
                  pickupTime={pickupTime}
                  onSuccess={(id) => { setOrderId(id); setStep("success"); }}
                />
              </Elements>
              <button
                onClick={() => setStep("details")}
                className="w-full font-heading-light text-[11px] text-muted-foreground py-2 transition-colors hover:text-foreground"
              >
                Back to details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
