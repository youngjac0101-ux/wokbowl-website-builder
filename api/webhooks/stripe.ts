/**
 * Stripe webhook → 写入 WokBrain CRM。
 *
 * 监听 payment_intent.succeeded：验签后读取订单元数据，转发给 wokbrain
 * website-order-ingest（共享密钥），写入 customers + customer_visits。
 *
 * Vercel env 需配置：
 *   STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET,
 *   WOKBRAIN_INGEST_URL (https://<ref>.supabase.co/functions/v1/website-order-ingest),
 *   WOKBRAIN_INGEST_SECRET (= wokbrain cron_config.website_ingest_secret)
 *
 * Stripe Dashboard → Webhooks → 添加端点指向 /api/webhooks/stripe，事件 payment_intent.succeeded。
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-05-27.dahlia" });

// Stripe 验签需要原始 body
export const config = { api: { bodyParser: false } };

function readRawBody(req: VercelRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(Buffer.from(c)));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  let event: Stripe.Event;
  try {
    const raw = await readRawBody(req);
    const sig = req.headers["stripe-signature"] as string;
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    const m = err instanceof Error ? err.message : "bad signature";
    console.error("Webhook signature verification failed:", m);
    return res.status(400).json({ error: `Webhook Error: ${m}` });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const md = pi.metadata ?? {};
    try {
      const resp = await fetch(process.env.WOKBRAIN_INGEST_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Website-Ingest-Secret": process.env.WOKBRAIN_INGEST_SECRET!,
        },
        body: JSON.stringify({
          name: md.customer_name ?? "",
          phone: md.customer_phone ?? "",
          email: md.customer_email ?? null,
          order_total: (pi.amount ?? 0) / 100,
          consent_sms: md.consent_sms === "true",
          order_summary: md.order_summary ?? "",
          pickup_time: md.pickup_time ?? "",
          stripe_payment_id: pi.id,
        }),
      });
      if (!resp.ok) console.error("WokBrain ingest failed:", resp.status, await resp.text());
    } catch (err) {
      // ingest 失败不阻断 Stripe（已收款），仅记录
      console.error("WokBrain ingest error:", err instanceof Error ? err.message : err);
    }
  }

  return res.status(200).json({ received: true });
}
