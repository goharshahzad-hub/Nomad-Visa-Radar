import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail, subscribeEmailContact } from "@/lib/email";
import { buildWelcomeNewsletterEmail } from "@/lib/newsletter-email";
import { createUnsubscribeUrl } from "@/lib/newsletter-token";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().trim().max(60).optional().default(""),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const supabase = getSupabaseServiceClient();
  const email = parsed.data.email.trim().toLowerCase();
  const firstName = parsed.data.firstName.trim();
  let databaseStored = false;
  let databaseAlreadySubscribed = false;

  if (supabase) {
    const { error } = await supabase.from("newsletter_subscribers").insert({
      email,
      status: "subscribed",
      subscribed_at: new Date().toISOString(),
    });

    if (!error) {
      databaseStored = true;
    } else if (error.code === "23505") {
      databaseStored = true;
      databaseAlreadySubscribed = true;
    } else {
      console.warn("Newsletter Supabase copy unavailable", {
        code: error.code,
        message: error.message,
      });
    }
  }

  const contact = await subscribeEmailContact(email, firstName);

  if (!contact.ok && !databaseStored) {
    console.error("Newsletter subscription storage failed", {
      mode: contact.mode,
      error: contact.error,
    });
    return NextResponse.json(
      { error: "Could not save newsletter subscription" },
      { status: 503 },
    );
  }

  const welcome = buildWelcomeNewsletterEmail({
    firstName,
    unsubscribeUrl: createUnsubscribeUrl(email),
  });
  const confirmation = await sendEmail({
    to: email,
    subject: welcome.subject,
    html: welcome.html,
    text: welcome.text,
    idempotencyKey: `newsletter-welcome-${email}`,
  });

  if (!confirmation.ok) {
    console.error("Newsletter confirmation email failed", {
      mode: confirmation.mode,
      error: confirmation.error,
    });
  }

  return NextResponse.json({
    ok: true,
    alreadySubscribed: databaseAlreadySubscribed || (contact.ok && contact.alreadySubscribed),
    confirmationSent: confirmation.ok,
    storage: contact.ok ? "resend" : "supabase",
  });
}
