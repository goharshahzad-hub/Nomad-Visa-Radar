import { NextResponse } from "next/server";
import { type EmailContact, listSubscribedEmailContacts, sendEmail } from "@/lib/email";
import { buildWeeklyNewsletterEmail } from "@/lib/newsletter-email";
import { createUnsubscribeUrl } from "@/lib/newsletter-token";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function checkCronAuth(request: Request) {
  const expected = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!expected && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Cron secret is not configured" }, { status: 500 });
  }

  if (expected && authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}

export async function GET(request: Request) {
  const authError = checkCronAuth(request);

  if (authError) {
    return authError;
  }

  const resendContacts = await listSubscribedEmailContacts();
  let subscribers: EmailContact[] = resendContacts.ok ? resendContacts.contacts : [];

  if (!resendContacts.ok) {
    const supabase = getSupabaseServiceClient();
    const { data, error } = supabase
      ? await supabase.from("newsletter_subscribers").select("email").eq("status", "subscribed")
      : { data: null, error: new Error("No subscriber storage is configured") };

    if (error) {
      return NextResponse.json({ error: "Could not load subscribers" }, { status: 500 });
    }

    subscribers = (data ?? []).map((subscriber: { email: string }) => ({
      email: subscriber.email,
      firstName: null,
    }));
  }

  let sent = 0;
  let failed = 0;

  for (const subscriber of subscribers) {
    const newsletter = buildWeeklyNewsletterEmail({
      firstName: subscriber.firstName,
      unsubscribeUrl: createUnsubscribeUrl(subscriber.email),
    });
    const result = await sendEmail({
      to: subscriber.email,
      subject: newsletter.subject,
      html: newsletter.html,
      text: newsletter.text,
      idempotencyKey: `newsletter-weekly-${new Date().toISOString().slice(0, 10)}-${subscriber.email}`,
    });

    if (result.ok) {
      sent += 1;
    } else {
      failed += 1;
    }
  }

  return NextResponse.json(
    {
      ok: failed === 0,
      subscribers: subscribers.length,
      sent,
      failed,
      delivery: "automatic",
    },
    { status: failed === 0 ? 200 : 500 },
  );
}
