import { NextResponse } from "next/server";
import { listSubscribedEmailContacts, sendEmail } from "@/lib/email";
import { getSupabaseServiceClient } from "@/lib/supabase/server";
import { latestUpdates } from "@/lib/visa-data";

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

function digestHtml() {
  const items = latestUpdates
    .map(
      (update) => `
        <li>
          <strong>${update.countryName}: ${update.title}</strong><br />
          ${update.summary}<br />
          <a href="${update.officialUrl}">Official visa information page</a>
        </li>
      `,
    )
    .join("");

  return `
    <h1>Nomad Visa Radar weekly update</h1>
    <p>Daily source checks run automatically. Material visa-rule changes are verified before the country guidance is rewritten.</p>
    <ul>${items}</ul>
  `;
}

function digestText() {
  return latestUpdates
    .map(
      (update) =>
        `${update.countryName}: ${update.title}\n${update.summary}\nOfficial source: ${update.officialUrl}`,
    )
    .join("\n\n");
}

export async function GET(request: Request) {
  const authError = checkCronAuth(request);

  if (authError) {
    return authError;
  }

  const resendContacts = await listSubscribedEmailContacts();
  let subscriberEmails = resendContacts.ok ? resendContacts.emails : [];

  if (!resendContacts.ok) {
    const supabase = getSupabaseServiceClient();
    const { data, error } = supabase
      ? await supabase.from("newsletter_subscribers").select("email").eq("status", "subscribed")
      : { data: null, error: new Error("No subscriber storage is configured") };

    if (error) {
      return NextResponse.json({ error: "Could not load subscribers" }, { status: 500 });
    }

    subscriberEmails = (data ?? []).map((subscriber: { email: string }) => subscriber.email);
  }

  let sent = 0;
  let failed = 0;

  for (const email of subscriberEmails) {
    const result = await sendEmail({
      to: email,
      subject: "Nomad Visa Radar weekly official-source update",
      html: digestHtml(),
      text: digestText(),
      idempotencyKey: `newsletter-weekly-${new Date().toISOString().slice(0, 10)}-${email}`,
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
      subscribers: subscriberEmails.length,
      sent,
      failed,
      delivery: "automatic",
    },
    { status: failed === 0 ? 200 : 500 },
  );
}
