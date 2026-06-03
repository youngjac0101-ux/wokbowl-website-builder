import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { items, customer, amount } = req.body;

    if (!items || !customer || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Build order description
    const orderLines = items
      .map((i: { name: string; quantity: number }) => `${i.name} x${i.quantity}`)
      .join(", ");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // already in cents
      currency: "aud",
      automatic_payment_methods: { enabled: true },
      metadata: {
        customer_name: customer.name,
        customer_phone: customer.phone,
        pickup_time: customer.pickupTime,
        order_summary: orderLines.substring(0, 500),
        source: "wokbowl-website",
      },
      description: `THE WOKBOWL Pickup — ${customer.name} @ ${customer.pickupTime}`,
    });

    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err: unknown) {
    console.error("Stripe error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
}
