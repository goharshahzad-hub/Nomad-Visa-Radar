"use client";

import Link from "next/link";
import { useState } from "react";
import { BarChart3, Bell, Globe2, LayoutDashboard, Menu, Newspaper, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { AuthNav } from "@/components/auth-nav";
import { siteConfig } from "@/lib/site";

const mobileLinks = [
  { href: "/countries", label: "Countries", icon: Globe2 },
  { href: "/compare", label: "Compare", icon: BarChart3 },
  { href: "/latest-updates", label: "Latest Updates", icon: Bell },
  { href: "/blog", label: "Blog", icon: Newspaper },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <div className="md:hidden">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <div className="fixed inset-x-0 top-16 z-50 border-b bg-background/96 px-4 pb-5 pt-3 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto max-w-sm rounded-lg border bg-card p-3">
            <div className="px-2 pb-3 text-sm font-semibold">{siteConfig.name}</div>
            <div className="space-y-1">
              {mobileLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="flex min-h-11 items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-[1fr_auto] gap-2 border-t pt-3">
              <AuthNav onNavigate={close} buttonClassName="w-full" />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
