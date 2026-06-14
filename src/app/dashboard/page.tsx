import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Bell, Bookmark, History, Mail, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CountryFlag } from "@/components/country-flag";
import { SystemNotice } from "@/components/system-notice";
import { getAuthContext } from "@/lib/auth";
import { countries } from "@/lib/visa-data";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Save countries, review alerts, manage newsletter subscriptions, and view comparison history.",
  alternates: {
    canonical: "/dashboard",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const auth = await getAuthContext();

  if (auth.configured && !auth.user) {
    redirect("/login?next=%2Fdashboard");
  }

  const saved = countries.slice(0, 4);
  const recentlyViewed = countries.slice(4, 8);
  const stats: { label: string; value: number; icon: LucideIcon }[] = [
    { label: "Saved countries", value: saved.length, icon: Bookmark },
    { label: "Active alerts", value: 6, icon: Bell },
    { label: "Comparisons", value: 11, icon: History },
    { label: "Newsletter lists", value: 3, icon: Mail },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <Badge variant="outline">Dashboard</Badge>
          <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
            {auth.user ? "Your visa radar" : "Preview dashboard"}
          </h1>
          <p className="mt-3 text-muted-foreground">
            Favorites, alerts, newsletter subscriptions, recently viewed countries, and comparison history.
          </p>
        </div>
        {!auth.user && (
          <Link href="/login" className="text-sm font-medium text-primary">
            Login with Google
          </Link>
        )}
      </div>

      {!auth.configured && (
        <div className="mt-6">
          <SystemNotice
            title="Supabase is not configured yet"
            message="This dashboard is running in local preview mode. In production, visitors are redirected to Google login until a Supabase session exists."
          />
        </div>
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-5">
            <Icon className="h-5 w-5 text-primary" />
            <p className="mt-4 font-mono text-3xl font-semibold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Saved favorite countries</h2>
          <div className="mt-4 space-y-3">
            {saved.map((country) => (
              <Link
                key={country.slug}
                href={`/digital-nomad-visa/${country.slug}`}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  <CountryFlag country={country} />
                  {country.countryName}
                </span>
                <Badge variant="success">{country.nomadScore}</Badge>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold">Recently viewed countries</h2>
          <div className="mt-4 space-y-3">
            {recentlyViewed.map((country) => (
              <Link
                key={country.slug}
                href={`/digital-nomad-visa/${country.slug}`}
                className="flex items-center justify-between rounded-md border p-3 hover:bg-muted"
              >
                <span className="flex items-center gap-2">
                  <CountryFlag country={country} />
                  {country.countryName}
                </span>
                <span className="text-sm text-muted-foreground">{country.processingTime}</span>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Dashboard statistics</h2>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["Lowest saved income", "$900/mo"],
              ["Fastest saved processing", "4 days"],
              ["Highest saved nomad score", "94"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md bg-muted p-4">
                <p className="font-mono text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
