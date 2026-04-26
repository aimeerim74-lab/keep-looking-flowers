import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { name, email, eventDate, product, description, budget } = await req.json();

  if (!name || !email || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env.OWNER_EMAIL!,
    replyTo: email,
    subject: `Custom Quote Request from ${name}`,
    text: `New custom quote request\n\nName: ${name}\nEmail: ${email}\nEvent Date: ${eventDate || "Not specified"}\nProduct / Inspiration: ${product || "Not specified"}\nBudget: ${budget || "Not specified"}\n\nDescription:\n${description}`,
  });

  return NextResponse.json({ ok: true });
}
