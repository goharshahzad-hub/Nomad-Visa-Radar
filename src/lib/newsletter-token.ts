import { createHmac, timingSafeEqual } from "node:crypto";
import { siteConfig } from "@/lib/site";

function getSigningSecret() {
  return process.env.NEWSLETTER_SIGNING_SECRET ?? process.env.CRON_SECRET ?? "";
}

export function createNewsletterToken(email: string) {
  const secret = getSigningSecret();
  if (!secret) return null;

  return createHmac("sha256", secret).update(email.trim().toLowerCase()).digest("hex");
}

export function createUnsubscribeUrl(email: string) {
  const token = createNewsletterToken(email);
  if (!token) return `${siteConfig.url}/contact`;

  const params = new URLSearchParams({ email: email.trim().toLowerCase(), token });
  return `${siteConfig.url}/api/newsletter/unsubscribe?${params.toString()}`;
}

export function verifyNewsletterToken(email: string, token: string) {
  const expected = createNewsletterToken(email);
  if (!expected || !/^[a-f0-9]{64}$/i.test(token)) return false;

  const expectedBuffer = Buffer.from(expected, "hex");
  const tokenBuffer = Buffer.from(token, "hex");
  return expectedBuffer.length === tokenBuffer.length && timingSafeEqual(expectedBuffer, tokenBuffer);
}
