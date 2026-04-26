import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia",
});
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const items = session.metadata?.items
      ? JSON.parse(session.metadata.items)
      : [];

    const itemLines = items
      .map(
        (i: { name: string; qty: number; fulfillment: string; price: number }) =>
          `• ${i.qty}x ${i.name} (${i.fulfillment}) — $${(i.price * i.qty).toFixed(2)}`
      )
      .join("\n");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const shipping = (session as any).shipping_details as { address?: { line1?: string; city?: string; state?: string; postal_code?: string } } | null;
    const address = shipping?.address
      ? `${shipping.address.line1}, ${shipping.address.city}, ${shipping.address.state} ${shipping.address.postal_code}`
      : "Pickup";

    await resend.emails.send({
      from: "orders@keepflooking.flowers",
      to: process.env.OWNER_EMAIL!,
      subject: `New Order — $${((session.amount_total ?? 0) / 100).toFixed(2)}`,
      text: `New order received!\n\nCustomer: ${session.customer_details?.name}\nEmail: ${session.customer_details?.email}\nAddress: ${address}\n\nItems:\n${itemLines}\n\nTotal: $${((session.amount_total ?? 0) / 100).toFixed(2)}\n\nStripe session: ${session.id}`,
    });
  }

  return NextResponse.json({ received: true });
}
