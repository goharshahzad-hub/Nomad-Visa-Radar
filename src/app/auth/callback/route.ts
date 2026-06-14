import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/routes";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = safeNextPath(requestUrl.searchParams.get("next") ?? undefined);

  if (!code) {
    return NextResponse.redirect(
      new URL(`/login?error=missing_code&next=${encodeURIComponent(next)}`, requestUrl),
    );
  }

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return NextResponse.redirect(
      new URL(`/login?error=supabase_not_configured&next=${encodeURIComponent(next)}`, requestUrl),
    );
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      new URL(`/login?error=auth_failed&next=${encodeURIComponent(next)}`, requestUrl),
    );
  }

  return NextResponse.redirect(new URL(next, requestUrl));
}
