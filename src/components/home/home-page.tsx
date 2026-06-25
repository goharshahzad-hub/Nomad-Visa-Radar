"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CountryCard } from "@/components/country-card";
import { CountryFlag } from "@/components/country-flag";
import { InteractiveWorldMap } from "@/components/interactive-world-map";
import { NewsletterForm } from "@/components/newsletter-form";
import { ShareActions } from "@/components/share-actions";
import {
  asiaCountries,
  blogPosts,
  cheapestVisas,
  countries,
  europeCountries,
  familyCountries,
  formatVisaFeeEstimate,
  featuredCountries,
  latestUpdates,
} from "@/lib/visa-data";
import { cn, formatCurrency } from "@/lib/utils";

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Badge variant="outline">{eyebrow}</Badge>
      <h2 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-base leading-7 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function CountryRail({
  title,
  countries,
}: {
  title: string;
  countries: typeof featuredCountries;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link href="/countries" className="text-sm font-medium text-primary">
          View all
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {countries.slice(0, 3).map((country) => (
          <CountryCard key={country.slug} country={country} />
        ))}
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="noise relative border-b">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:py-24 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <Badge variant="gold" className="w-fit">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Official-source visa intelligence
            </Badge>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
              Search Digital Nomad Visa Requirements Worldwide
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Compare income thresholds, taxes, dependents, processing speed, and lifestyle scores across active remote worker and freelancer visa programs.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/countries" className={cn(buttonVariants({ size: "lg", variant: "premium" }))}>
                Explore countries <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/compare" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
                Compare visas
              </Link>
            </div>
            <ShareActions
              title="Nomad Visa Radar"
              text="Search and compare digital nomad visa requirements worldwide."
              url="/"
              className="mt-5"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass rounded-lg p-4"
          >
            <div className="rounded-md border bg-background/70 p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Search className="h-4 w-4 text-primary" />
                Visa search radar
              </div>
              <form action="/countries" className="mt-4 grid gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    name="q"
                    className="h-12 w-full rounded-md border bg-background px-10 text-sm outline-none ring-ring focus:ring-2"
                    placeholder="Search Portugal, Thailand, Colombia..."
                  />
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <select
                    name="region"
                    aria-label="Region"
                    className="h-10 rounded-md border bg-background/80 px-3 text-xs font-medium text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">All regions</option>
                    {["Europe", "Americas", "Asia", "Africa", "Middle East", "Oceania"].map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                  <select
                    name="income"
                    aria-label="Income"
                    className="h-10 rounded-md border bg-background/80 px-3 text-xs font-medium text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Any income</option>
                    <option value="under-2000">Under $2k/mo</option>
                    <option value="2000-3500">$2k-$3.5k/mo</option>
                    <option value="3500-plus">$3.5k+/mo</option>
                  </select>
                  <select
                    name="duration"
                    aria-label="Duration"
                    className="h-10 rounded-md border bg-background/80 px-3 text-xs font-medium text-muted-foreground outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Any duration</option>
                    <option value="short">Up to 6 months</option>
                    <option value="one-year">Around 1 year</option>
                    <option value="long">Long stay</option>
                  </select>
                </div>
                <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                  <label className="flex h-10 items-center gap-2 rounded-md border bg-background/80 px-3 text-xs font-medium text-muted-foreground">
                    <input name="family" type="checkbox" value="true" className="h-4 w-4 accent-primary" />
                    Family-friendly
                  </label>
                  <label className="flex h-10 items-center gap-2 rounded-md border bg-background/80 px-3 text-xs font-medium text-muted-foreground">
                    <input name="tax" type="checkbox" value="true" className="h-4 w-4 accent-primary" />
                    Tax-friendly
                  </label>
                  <button
                    type="submit"
                    className={cn(buttonVariants({ variant: "premium" }), "h-10 px-4")}
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["Active programs", countries.length],
                ["Avg processing", "32d"],
                ["Official checks", "daily"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border bg-background/60 p-4">
                  <p className="font-mono text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <CountryRail title="Featured countries" countries={featuredCountries} />

      <section className="border-y bg-muted/35">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Cheapest visas"
            title="Low-fee routes that still look credible"
            description="Nomad Visa Radar ranks application cost against income proof, processing time, renewability, and official-source confidence."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {cheapestVisas.map((country) => (
              <Card key={country.slug} className="flex flex-col p-5 transition hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/digital-nomad-visa/${country.slug}`} className="block flex-1">
                  <div className="flex items-center justify-between">
                    <CountryFlag country={country} className="h-7 w-10 rounded-md" />
                    <Badge variant="success">{formatCurrency(country.visaFeeUsd)}</Badge>
                  </div>
                  <h3 className="mt-4 font-semibold">{country.countryName}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {country.visaProgramName}
                  </p>
                  <p className="mt-3 text-xs font-medium text-muted-foreground">
                    Visa fee: {formatVisaFeeEstimate(country)}
                  </p>
                </Link>
                <ShareActions
                  title={`${country.countryName} digital nomad visa`}
                  text={`Share ${country.countryName} low-fee digital nomad visa details.`}
                  url={`/digital-nomad-visa/${country.slug}`}
                  compact
                  className="mt-4 border-t pt-3"
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <Badge variant="outline">Interactive world map</Badge>
          <h2 className="mt-4 text-3xl font-semibold">Watch visa opportunity by region</h2>
          <p className="mt-3 text-muted-foreground">
            Explore active visa programs by region with country markers, score overlays, and quick links to detailed requirement pages.
          </p>
          <div className="mt-6 space-y-3">
            {latestUpdates.map((update) => (
              <Card key={update.title} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{update.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {update.source} - {update.date}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm font-medium">
                      <Link href={`/digital-nomad-visa/${update.countrySlug}`} className="text-primary">
                        Country guide
                      </Link>
                      <a href={update.officialUrl} target="_blank" rel="noreferrer" className="text-primary">
                        Official page
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <Badge variant="gold">{update.confidence}%</Badge>
                    <ShareActions
                      title={update.title}
                      text={update.summary}
                      url={`/latest-updates#${update.slug}`}
                      compact
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <Link href="/latest-updates" className="mt-4 inline-flex text-sm font-medium text-primary">
            View all updates
          </Link>
        </div>
        <InteractiveWorldMap />
      </section>

      <CountryRail title="Best for families" countries={familyCountries} />
      <CountryRail title="Best for Europe" countries={europeCountries} />
      <CountryRail title="Best for Asia" countries={asiaCountries} />

      <section className="border-y bg-muted/35">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Badge variant="gold">Newsletter</Badge>
          <h2 className="mt-4 text-3xl font-semibold">Get visa changes before they hit stale guides</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Weekly official-source monitoring, editorial review notes, and high-confidence changes for remote workers and relocation teams.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="FAQ"
          title="Built for trust, not scraped chaos"
          description="Nomad Visa Radar is designed around official sources, human review, and conservative publication workflows."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Does the system auto-publish changes?", "No. Every detected change becomes an admin review task first."],
            ["Can users save countries?", "Yes. Authenticated users can save favorites, alerts, newsletter settings, and comparison history."],
            ["Is this legal advice?", "No. The product links official sources and explains requirements, but users should consult licensed professionals."],
          ].map(([question, answer]) => (
            <Card key={question} className="p-5">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <h3 className="mt-4 font-semibold">{question}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{answer}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="outline">Latest articles</Badge>
              <h2 className="mt-4 text-3xl font-semibold">Editorial guides</h2>
            </div>
            <Link href="/blog" className="text-sm font-medium text-primary">
              Read blog
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-xl">
                <Link href={`/blog/${post.slug}`} className="block flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock3 className="h-4 w-4" />
                    {post.readTime}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary">
                    <ShieldCheck className="h-4 w-4" />
                    Reviewed content
                  </div>
                </Link>
                <ShareActions
                  title={post.title}
                  text={post.excerpt}
                  url={`/blog/${post.slug}`}
                  compact
                  className="mt-4 border-t pt-3"
                />
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
