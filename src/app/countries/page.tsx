import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock3, DollarSign, ShieldCheck, Users } from "lucide-react";
import { CountryFlag } from "@/components/country-flag";
import { ShareActions } from "@/components/share-actions";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  countries,
  formatVisaFeeEstimate,
  type VisaCountry,
} from "@/lib/visa-data";
import { siteConfig } from "@/lib/site";
import { cn, formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Digital Nomad Visa Countries",
  description:
    "Browse countries offering digital nomad, remote worker, and freelancer visa programs.",
  alternates: {
    canonical: "/countries",
  },
};

function CountryDirectoryCard({
  country,
}: {
  country: VisaCountry;
}) {
  const href = `/digital-nomad-visa/${country.slug}`;

  return (
      <Card className="group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
        <Link
          href={href}
          className="block flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <CountryFlag country={country} className="mt-1 h-6 w-9" />
              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold">{country.countryName}</h2>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {country.visaProgramName}
                </p>
              </div>
            </div>
            <span className="rounded-md bg-muted px-2 py-1 font-mono text-sm">
              {country.nomadScore}
            </span>
          </div>

          <div className="mt-5 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4 text-primary" />
                Income
              </span>
              <span className="font-medium">{formatCurrency(country.minimumIncomeMonthlyUsd)}/mo</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Clock3 className="h-4 w-4 text-primary" />
                Processing
              </span>
              <span className="font-medium">{country.processingTime}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4 text-primary" />
                Family
              </span>
              <span className="font-medium">{country.dependentsAllowed ? "Dependents" : "Solo"}</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Checked
              </span>
              <span className="font-medium">{country.lastVerified}</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge variant={country.status === "active" ? "status" : "gold"}>
              {country.status}
            </Badge>
            <Badge variant="outline">{country.region}</Badge>
            <span className="rounded-md border px-2 py-1 text-xs text-muted-foreground">
              {formatVisaFeeEstimate(country)}
            </span>
          </div>

          <div className="mt-auto flex items-center gap-1 pt-5 text-sm font-medium text-primary">
            Read country guide <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </div>
        </Link>
        <div className="mt-4 border-t pt-3">
          <ShareActions
            title={`${country.countryName} digital nomad visa`}
            text={`Review ${country.countryName} digital nomad visa requirements on Nomad Visa Radar.`}
            url={href}
            compact
          />
        </div>
      </Card>
  );
}

export default async function CountriesPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    region?: string;
    income?: string;
    duration?: string;
    family?: string;
    tax?: string;
  }>;
}) {
  const params = await searchParams;
  const q = params.q?.toLowerCase() ?? "";
  const region = params.region;
  const income = params.income ?? "";
  const duration = params.duration ?? "";
  const family = params.family === "true";
  const tax = params.tax === "true";
  const hasActiveFilters = Boolean(q || region || income || duration || family || tax);

  const filtered = countries.filter((country) => {
    const matchesQuery =
      !q ||
      country.countryName.toLowerCase().includes(q) ||
      country.visaProgramName.toLowerCase().includes(q);
    const matchesRegion = !region || country.region === region;
    const matchesIncome =
      !income ||
      (income === "under-2000" && country.minimumIncomeMonthlyUsd <= 2000) ||
      (income === "2000-3500" &&
        country.minimumIncomeMonthlyUsd > 2000 &&
        country.minimumIncomeMonthlyUsd <= 3500) ||
      (income === "3500-plus" && country.minimumIncomeMonthlyUsd > 3500);
    const matchesDuration =
      !duration ||
      (duration === "short" && country.durationMonths <= 6) ||
      (duration === "one-year" && country.durationMonths > 6 && country.durationMonths <= 12) ||
      (duration === "long" && country.durationMonths > 12);
    const matchesFamily = !family || (country.familyFriendly && country.dependentsAllowed);
    const matchesTax = !tax || country.taxFriendly;

    return matchesQuery && matchesRegion && matchesIncome && matchesDuration && matchesFamily && matchesTax;
  });
  const visibleLimit = hasActiveFilters ? 36 : 24;
  const visibleCountries = filtered.slice(0, visibleLimit);
  const remainingCount = Math.max(filtered.length - visibleCountries.length, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <Badge variant="outline">Countries</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
          Digital nomad visa countries
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Explore active digital nomad, remote worker, and freelancer visa programs with income, tax, processing, family, and source confidence signals.
        </p>
        <ShareActions
          title="Digital nomad visa countries"
          text="Browse digital nomad visa countries on Nomad Visa Radar."
          url={`${siteConfig.url}/countries`}
          className="mt-5"
        />
      </div>
      <form className="mt-8 rounded-lg border bg-card p-4">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_180px_170px_170px]">
          <Input name="q" placeholder="Search by country or program" defaultValue={params.q} />
          <select
            name="region"
            defaultValue={region}
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All regions</option>
            {["Europe", "Americas", "Asia", "Africa", "Middle East", "Oceania"].map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            name="income"
            defaultValue={income}
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Any income</option>
            <option value="under-2000">Under $2k/mo</option>
            <option value="2000-3500">$2k-$3.5k/mo</option>
            <option value="3500-plus">$3.5k+/mo</option>
          </select>
          <select
            name="duration"
            defaultValue={duration}
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Any duration</option>
            <option value="short">Up to 6 months</option>
            <option value="one-year">Around 1 year</option>
            <option value="long">Long stay</option>
          </select>
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex h-10 items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground">
              <input name="family" type="checkbox" value="true" defaultChecked={family} className="h-4 w-4 accent-primary" />
              Family-friendly
            </label>
            <label className="flex h-10 items-center gap-2 rounded-md border bg-background px-3 text-sm text-muted-foreground">
              <input name="tax" type="checkbox" value="true" defaultChecked={tax} className="h-4 w-4 accent-primary" />
              Tax-friendly
            </label>
          </div>
          <div className="flex gap-2">
            <Link href="/countries" className={cn(buttonVariants({ variant: "outline" }), "flex-1 sm:flex-none")}>
              Clear
            </Link>
            <Button type="submit" variant="premium" className="flex-1 sm:flex-none">
              Search
            </Button>
          </div>
        </div>
      </form>
      <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing <span className="font-medium text-foreground">{visibleCountries.length}</span>
          {remainingCount > 0 ? (
            <>
              {" "}of <span className="font-medium text-foreground">{filtered.length}</span> matching programs
            </>
          ) : (
            <>
              {" "}matching programs
            </>
          )}
          {" "}from <span className="font-medium text-foreground">{countries.length}</span> tracked digital nomad, remote worker, and freelancer visa countries.
        </p>
        <p>
          {remainingCount > 0
            ? "Use search or filters to narrow the complete database."
            : "Filters update the same complete country database used across the homepage and compare tool."}
        </p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visibleCountries.map((country) => (
          <CountryDirectoryCard key={country.slug} country={country} />
        ))}
      </div>
      {remainingCount > 0 && (
        <Card className="mt-8 p-6 text-center">
          <h2 className="text-xl font-semibold">{remainingCount} more programs available</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Search a country name, choose a region, or adjust income and family filters to narrow the full directory without loading every card at once.
          </p>
        </Card>
      )}
      {filtered.length === 0 && (
        <Card className="mt-8 p-8 text-center">
          <h2 className="text-xl font-semibold">No matching visa programs</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Try a wider region, a higher income band, or remove the family and tax filters.
          </p>
        </Card>
      )}
    </div>
  );
}
