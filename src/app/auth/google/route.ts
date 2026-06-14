import { NextResponse } from "next/server";
import { safeNextPath } from "@/lib/routes";

export function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const next = safeNextPath(requestUrl.searchParams.get("next") ?? undefined);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, "");

  if (!supabaseUrl) {
    return NextResponse.redirect(
      new URL(`/login?error=supabase_not_configured&next=${encodeURIComponent(next)}`, requestUrl),
    );
  }

  const redirectTo = new URL(`/auth/callback?next=${encodeURIComponent(next)}`, requestUrl);
  const authorizeUrl = new URL(`${supabaseUrl}/auth/v1/authorize`);
  authorizeUrl.searchParams.set("provider", "google");
  authorizeUrl.searchParams.set("redirect_to", redirectTo.toString());

  return NextResponse.redirect(authorizeUrl);
}
