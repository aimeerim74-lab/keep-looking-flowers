import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import type { CartItem } from "@/lib/types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});

export async function POST(req: NextRequest) {
  const { items }: { items: CartItem[] } = await req.json();

  if (!items?.length) {
    return NextResponse.json({ error: "No items" }, { status: 400 });
  }

  const lineItems = items.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
        metadata: {
          productId: item.product._id,
          fulfillment: item.fulfillment,
        },
      },
      unit_amount: Math.round((item.product.price ?? 0) * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "AU", "GB"],
    },
    metadata: {
      items: JSON.stringify(
        items.map((i) => ({
          name: i.product.name,
          qty: i.quantity,
          fulfillment: i.fulfillment,
          price: i.product.price,
        }))
      ),
    },
  });

  return NextResponse.json({ url: session.url });
}
