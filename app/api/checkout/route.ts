import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { pricingTiers, type BillingInterval, type PlanId } from "@/lib/pricing";

export const runtime = "nodejs";

function priceIdFor(plan: PlanId, interval: BillingInterval): string | undefined {
  const key =
    interval === "annual"
      ? `STRIPE_PRICE_${plan.toUpperCase()}_ANNUAL`
      : `STRIPE_PRICE_${plan.toUpperCase()}_MONTHLY`;
  return process.env[key];
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { error: "Sign in required." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { plan, interval } = (body ?? {}) as {
    plan?: PlanId;
    interval?: BillingInterval;
  };

  if (!plan || !interval) {
    return NextResponse.json(
      { error: "Missing plan or interval." },
      { status: 400 },
    );
  }

  const tier = pricingTiers.find((t) => t.id === plan);
  if (!tier || !tier.billable) {
    return NextResponse.json(
      { error: "Plan is not billable." },
      { status: 400 },
    );
  }

  const secret = process.env.STRIPE_SECRET_KEY;
  const priceId = priceIdFor(plan, interval);

  if (!secret || !priceId) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured yet. Set STRIPE_SECRET_KEY and the " +
          "matching STRIPE_PRICE_* env var, then retry.",
      },
      { status: 503 },
    );
  }

  const stripe = new Stripe(secret, { apiVersion: "2026-03-25.dahlia" });

  const origin =
    request.headers.get("origin") ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";

  try {
    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: session.user.email ?? undefined,
      success_url: `${origin}/dashboard?checkout=success`,
      cancel_url: `${origin}/#pricing`,
      metadata: {
        userId: session.user.id ?? "",
        plan,
        interval,
      },
      allow_promotion_codes: true,
    });

    if (!checkout.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: checkout.url }, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Stripe checkout failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
