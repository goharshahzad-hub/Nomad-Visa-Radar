import { NextResponse } from "next/server";
import { unsubscribeEmailContact } from "@/lib/email";
import { verifyNewsletterToken } from "@/lib/newsletter-token";
import { siteConfig } from "@/lib/site";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email")?.trim().toLowerCase() ?? "";
  const token = url.searchParams.get("token") ?? "";

  if (!email || !verifyNewsletterToken(email, token)) {
    return NextResponse.redirect(`${siteConfig.url}/newsletter/unsubscribed?status=invalid`);
  }

  const result = await unsubscribeEmailContact(email);
  if (!result.ok) {
    console.error("Newsletter unsubscribe failed", { error: result.error });
    return NextResponse.redirect(`${siteConfig.url}/newsletter/unsubscribed?status=error`);
  }

  const supabase = getSupabaseServiceClient();
  if (supabase) {
    await supabase.from("newsletter_subscribers").update({ status: "unsubscribed" }).eq("email", email);
  }

  return NextResponse.redirect(`${siteConfig.url}/newsletter/unsubscribed?status=done`);
}
