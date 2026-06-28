import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle, AlertCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

// Landing page for redirect-based payment methods (3DS, wallets) that send the
// customer back here via Stripe's return_url. Card payments usually confirm
// inline in the checkout modal and never reach this page.
const OrderSuccess = () => {
  const [params] = useSearchParams();
  const status = params.get("redirect_status");
  const paymentId = params.get("payment_intent");

  // Treat a missing status as success — the user only lands here after Stripe
  // redirects, and redirect_status is only omitted on direct navigation.
  const failed = status === "failed" || status === "requires_payment_method";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <Link
        to="/"
        className="mb-12 font-impact text-xl tracking-tight text-foreground"
        aria-label={`${siteConfig.brandName} home`}
      >
        {siteConfig.brandName}
      </Link>

      {failed ? (
        <>
          <AlertCircle className="mx-auto mb-5 h-12 w-12 text-destructive" />
          <h1 className="font-display text-3xl text-foreground">Payment didn't go through</h1>
          <p className="mt-3 max-w-sm font-heading-light text-sm text-muted-foreground">
            No charge was made. Please head back and try again, or order at the counter.
          </p>
        </>
      ) : (
        <>
          <CheckCircle className="mx-auto mb-5 h-12 w-12 text-green-600" />
          <h1 className="font-display text-3xl text-foreground">You've been Wok'd.</h1>
          <p className="mt-3 font-heading-light text-sm text-muted-foreground">
            Your order is confirmed and being prepared.
          </p>
          <p className="mt-1 font-heading-light text-sm text-muted-foreground">
            Pickup at {siteConfig.address}
          </p>
          {paymentId && (
            <div className="mx-auto mt-8 max-w-xs border border-[#F5F0EB] bg-secondary px-4 py-3 text-left">
              <p className="mb-1 font-heading text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                Order Reference
              </p>
              <p className="break-all font-mono text-[11px] text-muted-foreground">{paymentId}</p>
            </div>
          )}
        </>
      )}

      <Link
        to="/"
        className="mt-10 inline-flex min-h-[48px] items-center rounded-none bg-primary px-10 py-3 font-heading text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90"
      >
        {failed ? "Back to Menu" : "Done"}
      </Link>
    </main>
  );
};

export default OrderSuccess;
