import type { Metadata } from "next";
import Link from "next/link";
import { CountryCard } from "@/components/country-card";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { applicantCountries, countries } from "@/lib/visa-data";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Digital Nomad Visa Countries",
  description:
    "Browse countries offering digital nomad, remote worker, and freelancer visa programs.",
  alternates: {
    canonical: "/countries",
  },
};

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
    applyingFrom?: string;
  }>;
}) {
  const params = await searchParams;
  const q = params.q?.toLowerCase() ?? "";
  const region = params.region;
  const income = params.income ?? "";
  const duration = params.duration ?? "";
  const family = params.family === "true";
  const tax = params.tax === "true";
  const applyingFrom = params.applyingFrom?.trim() || "United States";

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
      </div>
      <form className="mt-8 rounded-lg border bg-card p-4">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_180px_170px_170px_190px]">
          <Input name="q" placeholder="Search by country or program" defaultValue={params.q} />
          <select
            name="region"
            defaultValue={region}
            className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">All regions</option>
            {["Europe", "Americas", "Asia", "Africa", "Middle East"].map((item) => (
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
          <div>
            <Input
              name="applyingFrom"
              list="countries-applying-from"
              placeholder="Applying from"
              defaultValue={applyingFrom}
            />
            <datalist id="countries-applying-from">
              {applicantCountries.map((countryName) => (
                <option key={countryName} value={countryName} />
              ))}
            </datalist>
          </div>
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
          Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
          <span className="font-medium text-foreground">{countries.length}</span> tracked digital nomad, remote worker, and freelancer visa countries.
        </p>
        <p>Filters update the same complete country database used across the homepage and compare tool.</p>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((country) => (
          <CountryCard key={country.slug} country={country} applyingFrom={applyingFrom} />
        ))}
      </div>
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
