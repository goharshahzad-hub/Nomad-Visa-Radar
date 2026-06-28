import { NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site";

const schema = z.object({
  email: z.string().email(),
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

  if (!supabase) {
    return NextResponse.json({ ok: true, mode: "preview" });
  }

  const email = parsed.data.email.trim().toLowerCase();
  const { error } = await supabase.from("newsletter_subscribers").insert({
    email,
    status: "subscribed",
    subscribed_at: new Date().toISOString(),
  });

  if (error?.code === "23505") {
    return NextResponse.json({ ok: true, alreadySubscribed: true });
  }

  if (error) {
    console.error("Newsletter subscription failed", {
      code: error.code,
      message: error.message,
    });
    return NextResponse.json(
      { error: "Could not save newsletter subscription" },
      { status: 500 },
    );
  }

  const confirmation = await sendEmail({
    to: email,
    subject: "You are subscribed to Nomad Visa Radar",
    html: `
      <h1>Welcome to Nomad Visa Radar</h1>
      <p>Your email is subscribed to the weekly official-source visa update.</p>
      <p>We monitor government and immigration pages daily. Material requirement changes are checked before the country guidance is rewritten.</p>
      <p><a href="${siteConfig.url}/latest-updates">View the latest visa updates</a></p>
      <p>You can reply to any newsletter if something looks outdated.</p>
    `,
    text: `Welcome to Nomad Visa Radar. Your email is subscribed to the weekly official-source visa update. View updates at ${siteConfig.url}/latest-updates`,
    idempotencyKey: `newsletter-welcome-${email}`,
  });

  if (!confirmation.ok) {
    console.error("Newsletter confirmation email failed", {
      mode: confirmation.mode,
      error: confirmation.error,
    });
  }

  return NextResponse.json({ ok: true, confirmationSent: confirmation.ok });
}
