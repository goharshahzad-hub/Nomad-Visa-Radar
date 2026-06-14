import { NextResponse } from "next/server";
import { z } from "zod";
import { contactInboxEmail, sendEmail } from "@/lib/email";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(180),
  message: z.string().trim().min(10).max(5000),
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please enter a valid name, email, and message." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseServiceClient();
  const safeName = escapeHtml(parsed.data.name);
  const safeEmail = escapeHtml(parsed.data.email.toLowerCase());
  const safeMessage = escapeHtml(parsed.data.message);
  let stored = false;

  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email.toLowerCase(),
      message: parsed.data.message,
      routed_to_email: contactInboxEmail,
      status: "new",
    });

    if (error) {
      console.error("Contact message storage failed", error);
    } else {
      stored = true;
    }
  }

  const emailResult = await sendEmail({
    to: contactInboxEmail,
    subject: `Nomad Visa Radar contact: ${parsed.data.name}`,
    replyTo: parsed.data.email.toLowerCase(),
    text: `Name: ${parsed.data.name}\nEmail: ${parsed.data.email.toLowerCase()}\n\n${parsed.data.message}`,
    html: `
      <h2>New Nomad Visa Radar contact query</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Message:</strong></p>
      <p>${safeMessage.replace(/\n/g, "<br />")}</p>
    `,
  });

  if (!emailResult.ok) {
    console.error("Contact email delivery failed", emailResult.error);

    return NextResponse.json(
      {
        error: `Email delivery is not configured yet. Please email ${contactInboxEmail} directly.`,
        contactEmail: contactInboxEmail,
        stored,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, mode: emailResult.mode, stored });
}
