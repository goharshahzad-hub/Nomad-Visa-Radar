"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { LogOut, ShieldCheck, UserRound } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { getBrowserSupabaseClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function AuthNav({
  className,
  buttonClassName,
  onNavigate,
}: {
  className?: string;
  buttonClassName?: string;
  onNavigate?: () => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const supabase = getBrowserSupabaseClient();

    if (!supabase) {
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }: { data: { session: Session | null } }) => {
      if (!active) {
        return;
      }

      setUser(data.session?.user ?? null);

      if (data.session && window.location.hash.includes("access_token")) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
      setUser(session?.user ?? null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const accountLabel = useMemo(() => {
    if (!user) {
      return "Login";
    }

    const fullName = user.user_metadata?.full_name;
    const name = typeof fullName === "string" ? fullName.trim() : "";

    return name || user.email || "Dashboard";
  }, [user]);
  const isOwner = user?.email?.trim().toLowerCase() === "goharshahzad@gmail.com";

  async function handleSignOut() {
    setIsSigningOut(true);
    const supabase = getBrowserSupabaseClient();

    if (supabase) {
      await supabase.auth.signOut();
    }

    setUser(null);
    onNavigate?.();
    window.location.assign("/auth/logout");
  }

  if (!user) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className={cn(buttonVariants({ variant: "outline", size: "sm" }), buttonClassName, className)}
      >
        Login
      </Link>
    );
  }

  return (
    <div className={cn("flex min-w-0 items-center gap-2", className)}>
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "min-w-0 flex-1 justify-start",
          buttonClassName,
        )}
      >
        <UserRound className="h-4 w-4 shrink-0" />
        <span className="truncate">{accountLabel}</span>
      </Link>
      {isOwner && (
        <Link
          href="/admin"
          onClick={onNavigate}
          className={buttonVariants({ variant: "ghost", size: "icon" })}
          aria-label="Open content studio"
          title="Content studio"
        >
          <ShieldCheck className="h-4 w-4" />
        </Link>
      )}
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isSigningOut}
        className={buttonVariants({ variant: "ghost", size: "icon" })}
        aria-label="Log out"
        title="Log out"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
