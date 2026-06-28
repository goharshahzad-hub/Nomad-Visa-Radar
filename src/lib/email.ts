export const adminEmail = process.env.ADMIN_EMAIL ?? "goharshahzad@gmail.com";
export const contactInboxEmail = process.env.CONTACT_TO_EMAIL ?? adminEmail;
export const emailFrom = process.env.EMAIL_FROM ?? "";
const resendApiUrl = "https://api.resend.com";

function resendHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    "User-Agent": "NomadVisaRadar/1.0",
  };
}

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  idempotencyKey?: string;
};

export async function sendEmail({ to, subject, html, text, replyTo, idempotencyKey }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return {
      ok: false,
      mode: "not-configured" as const,
      error: "RESEND_API_KEY is not configured",
    };
  }

  if (!emailFrom) {
    return {
      ok: false,
      mode: "not-configured" as const,
      error: "EMAIL_FROM is not configured",
    };
  }

  const response = await fetch(`${resendApiUrl}/emails`, {
    method: "POST",
    headers: {
      ...resendHeaders(apiKey),
      ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
    },
    body: JSON.stringify({
      from: emailFrom,
      to,
      subject,
      html,
      text,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    return { ok: false, mode: "email", error: body };
  }

  return { ok: true, mode: "email" as const };
}

export async function subscribeEmailContact(email: string) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false, mode: "not-configured" as const, error: "RESEND_API_KEY is not configured" };
  }

  const createResponse = await fetch(`${resendApiUrl}/contacts`, {
    method: "POST",
    headers: resendHeaders(apiKey),
    body: JSON.stringify({ email, unsubscribed: false }),
  });

  if (createResponse.ok) {
    return { ok: true, mode: "contact" as const, alreadySubscribed: false };
  }

  if (createResponse.status === 409) {
    const updateResponse = await fetch(`${resendApiUrl}/contacts/${encodeURIComponent(email)}`, {
      method: "PATCH",
      headers: resendHeaders(apiKey),
      body: JSON.stringify({ unsubscribed: false }),
    });

    if (updateResponse.ok) {
      return { ok: true, mode: "contact" as const, alreadySubscribed: true };
    }

    return { ok: false, mode: "contact" as const, error: await updateResponse.text() };
  }

  return { ok: false, mode: "contact" as const, error: await createResponse.text() };
}

export async function listSubscribedEmailContacts() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return { ok: false as const, emails: [] as string[], error: "RESEND_API_KEY is not configured" };
  }

  const response = await fetch(`${resendApiUrl}/contacts?limit=100`, {
    headers: resendHeaders(apiKey),
    cache: "no-store",
  });

  if (!response.ok) {
    return { ok: false as const, emails: [] as string[], error: await response.text() };
  }

  const body = (await response.json()) as {
    data?: { email?: string; unsubscribed?: boolean }[];
  };
  const emails = (body.data ?? [])
    .filter((contact) => contact.email && !contact.unsubscribed)
    .map((contact) => contact.email as string);

  return { ok: true as const, emails };
}
