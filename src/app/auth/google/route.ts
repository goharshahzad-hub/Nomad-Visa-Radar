import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/routes";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const next = safeNextPath(requestUrl.searchParams.get("next") ?? undefined);
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return NextResponse.redirect(
      new URL(`/login?error=supabase_not_configured&next=${encodeURIComponent(next)}`, requestUrl),
    );
  }

  const redirectTo = new URL("/auth/callback", requestUrl);
  redirectTo.searchParams.set("next", next);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo.toString(),
    },
  });

  if (error || !data.url) {
    return NextResponse.redirect(
      new URL(`/login?error=auth_failed&next=${encodeURIComponent(next)}`, requestUrl),
    );
  }

  return NextResponse.redirect(data.url);
}
