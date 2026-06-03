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

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ─── Pickup time slots ─────────────────────────────────────────────────────
function getPickupSlots(): string[] {
  const slots: string[] = [];
  const now = new Date();
  const start = new Date(now.getTime() + 15 * 60 * 1000); // earliest: 15 min from now
  start.setMinutes(Math.ceil(start.getMinutes() / 15) * 15, 0, 0);

  const close = new Date();
  close.setHours(21, 0, 0, 0); // 9pm close

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
        <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
          {error}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-[#C84B31] hover:bg-[#a83b25] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-colors text-base"
      >
        {loading ? "Processing..." : `Pay Now & Place Order`}
      </button>
      <p className="text-xs text-center text-gray-400">
        🔒 Secured by Stripe · Your pickup will be ready at {pickupTime}
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
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
          customer: { name, phone, pickupTime },
          amount: Math.round(total * 100), // cents
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

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[95vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {step === "details" && "Pickup Details"}
                {step === "payment" && "Payment"}
                {step === "success" && "Order Confirmed! 🎉"}
              </h2>
              {step !== "success" && (
                <p className="text-sm text-gray-400">THE WOKBOWL · Neutral Bay</p>
              )}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="px-6 py-5">
            {/* ── Success ── */}
            {step === "success" && (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You've been Wok'd! 🔥</h3>
                <p className="text-gray-500 mb-1">Your order is being prepared.</p>
                <p className="text-gray-700 font-semibold text-lg mb-6">Ready for pickup at {pickupTime}</p>
                <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
                  <p className="text-sm text-gray-500 mb-1">Order reference</p>
                  <p className="font-mono text-xs text-gray-400 break-all">{orderId}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-full bg-[#C84B31] text-white font-bold py-3 rounded-xl"
                >
                  Done
                </button>
              </div>
            )}

            {/* ── Details Form ── */}
            {step === "details" && (
              <form onSubmit={handleDetailsSubmit} className="space-y-5">
                {/* Order summary */}
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.name} × {item.quantity}</span>
                      <span className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span className="text-[#C84B31]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <User className="w-4 h-4 inline mr-1" />Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C84B31] transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <Phone className="w-4 h-4 inline mr-1" />Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="04XX XXX XXX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C84B31] transition-colors"
                  />
                </div>

                {/* Pickup time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <Clock className="w-4 h-4 inline mr-1" />Pickup Time *
                  </label>
                  <select
                    required
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:border-[#C84B31] transition-colors"
                  >
                    {slots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">📍 Shop 21, 116 Military Rd, Neutral Bay</p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#C84B31] hover:bg-[#a83b25] disabled:bg-gray-300 text-white font-bold py-4 rounded-xl transition-colors text-base"
                >
                  {loading ? "Preparing..." : `Continue to Payment → $${total.toFixed(2)}`}
                </button>
              </form>
            )}

            {/* ── Payment ── */}
            {step === "payment" && clientSecret && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 text-sm text-green-700">
                  ✅ Order for <strong>{name}</strong> · Pickup at <strong>{pickupTime}</strong>
                </div>
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                      variables: { colorPrimary: "#C84B31" },
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
                  className="w-full text-gray-400 text-sm py-2 hover:text-gray-600 transition-colors"
                >
                  ← Back to details
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutModal;
