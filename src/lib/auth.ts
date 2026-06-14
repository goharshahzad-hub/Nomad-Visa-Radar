import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export type UserProfile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: "user" | "editor" | "admin";
};

export async function getAuthContext() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      configured: false as const,
      supabase: null,
      user: null,
      profile: null,
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      configured: true as const,
      supabase,
      user: null,
      profile: null,
    };
  }

  const { data: profile } = await supabase
    .from("users")
    .select("id,email,full_name,avatar_url,role")
    .eq("id", user.id)
    .maybeSingle<UserProfile>();

  return {
    configured: true as const,
    supabase,
    user,
    profile,
  };
}

export async function requireUser(nextPath: string) {
  const auth = await getAuthContext();

  if (auth.configured && !auth.user) {
    redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  }

  return auth;
}

export function canAccessAdmin(profile: UserProfile | null) {
  return profile?.role === "admin" || profile?.role === "editor";
}
