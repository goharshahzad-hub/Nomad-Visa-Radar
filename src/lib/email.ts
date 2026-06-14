export const adminEmail = process.env.ADMIN_EMAIL ?? "goharshahzad@gmail.com";
export const contactInboxEmail = process.env.CONTACT_TO_EMAIL ?? adminEmail;
export const emailFrom = process.env.EMAIL_FROM ?? "";

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, text, replyTo }: SendEmailInput) {
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

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
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
