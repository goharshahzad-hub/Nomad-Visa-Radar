import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  BadgeDollarSign,
  Clock3,
  HeartHandshake,
  ShieldCheck,
  Users,
  Wifi,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { NewsletterForm } from "@/components/newsletter-form";
import { VisaFeeCard } from "@/components/visa-fee-card";
import { CountryHighlightsSlider } from "@/components/country-highlights-slider";
import { CountryFlag } from "@/components/country-flag";
import { LivingEducationSection } from "@/components/living-education-section";
import { MobilityPathwaySection } from "@/components/mobility-pathway-section";
import {
  countries,
  formatMinimumIncomeRequirement,
  getCountryBySlug,
  getCountryFlagImage,
  getDocumentsRequired,
  getOfficialVisaInformationUrl,
  getRelatedCountries,
} from "@/lib/visa-data";
import { siteConfig } from "@/lib/site";
import { formatCurrency } from "@/lib/utils";

export function generateStaticParams() {
  return countries.map((country) => ({ country: country.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    return {};
  }

  return {
    title: `${country.countryName} Digital Nomad Visa Requirements`,
    description: `${country.countryName} ${country.visaProgramName}: income requirement, fees, duration, tax notes, documents, processing time, and official government source.`,
    alternates: {
      canonical: `/digital-nomad-visa/${country.slug}`,
    },
    openGraph: {
      title: `${country.countryName} Digital Nomad Visa`,
      description: country.taxSummary,
      images: [country.image],
    },
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const country = getCountryBySlug(slug);

  if (!country) {
    notFound();
  }

  const related = getRelatedCountries(country);
  const officialVisaUrl = getOfficialVisaInformationUrl(country);
  const flagImage = getCountryFlagImage(country.slug);
  const incomeRequirement = formatMinimumIncomeRequirement(country);
  const documentsRequired = getDocumentsRequired(country);
  const facts: { label: string; value: string; icon: LucideIcon }[] = [
    { label: "Minimum income", value: incomeRequirement, icon: BadgeDollarSign },
    { label: "Duration", value: country.duration, icon: Clock3 },
    { label: "Processing time", value: country.processingTime, icon: Clock3 },
    {
      label: "Dependents",
      value: country.dependentsAllowed ? "Allowed" : "Not usually allowed",
      icon: Users,
    },
    { label: "Internet score", value: `${country.internetSpeedMbps} Mbps avg`, icon: Wifi },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${country.countryName} Digital Nomad Visa Requirements`,
    description: `${country.visaProgramName} requirements, fees, tax notes, and application process.`,
    dateModified: country.lastVerified,
    datePublished: country.lastVerified,
    author: {
      "@type": "Organization",
      name: "Nomad Visa Radar Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    mainEntityOfPage: `${siteConfig.url}/digital-nomad-visa/${country.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How much income do I need for the ${country.countryName} digital nomad visa?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: incomeRequirement,
        },
      },
      {
        "@type": "Question",
        name: `Can dependents apply with the ${country.countryName} program?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: country.dependentsAllowed
            ? "Dependents are allowed under this program, subject to additional documentation."
            : "Dependents are not usually supported under this program.",
        },
      },
    ],
  };

  return (
    <div>
      <section className="relative border-b">
        <div className="absolute inset-0">
          <Image
            src={country.image}
            alt={`${country.countryName} landscape`}
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-background/76 backdrop-blur-sm" />
        </div>
        {flagImage && (
          <div className="absolute bottom-6 right-4 hidden w-52 overflow-hidden rounded-lg border border-white/30 bg-white/18 p-3 shadow-2xl backdrop-blur md:block lg:right-[calc((100vw-80rem)/2+2rem)] lg:w-64">
            <Image
              src={flagImage}
              alt={`${country.countryName} flag`}
              width={640}
              height={420}
              unoptimized
              className="aspect-[3/2] w-full rounded-md object-cover"
            />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <CountryFlag country={country} className="h-9 w-14 rounded-md border-white/50" />
              <Badge variant={country.status === "active" ? "status" : "gold"}>
                {country.status}
              </Badge>
              <Badge variant="outline">{country.region}</Badge>
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-normal sm:text-5xl lg:text-6xl">
              {country.countryName} digital nomad visa
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              {country.visaProgramName} requirements, eligibility, documents, taxes, application process, and official source links.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
        <article className="space-y-8">
          <CountryHighlightsSlider country={country} />
          <MobilityPathwaySection country={country} />
          <LivingEducationSection country={country} />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <VisaFeeCard country={country} />
            {facts.map(({ label, value, icon: Icon }) => (
              <Card key={label} className="p-5">
                <Icon className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 font-semibold">{value}</p>
              </Card>
            ))}
          </div>

          {[
            ["Overview", `${country.countryName} is tracked as an ${country.status} program with a ${country.nomadScore}/100 Nomad Score. It is best evaluated against income proof, application cost, renewal path, family support, and tax exposure.`],
            ["Eligibility", `Applicants typically need remote employment, freelance contracts, or company ownership outside ${country.countryName}, plus income evidence of ${incomeRequirement}.`],
            ["Application process", `Prepare documents, verify apostille or translation requirements, submit through the official application channel, and wait about ${country.processingTime}.`],
            ["Tax notes", country.taxSummary],
            ["Pros and cons", `Pros: ${country.familyFriendly ? "family support, " : ""}${country.taxFriendly ? "tax planning potential, " : ""}official program visibility. Cons: income thresholds, documentation, and changing interpretation by consulates.`],
          ].map(([title, copy]) => (
            <section key={title} className="rounded-lg border bg-card p-6">
              <h2 className="text-2xl font-semibold">{title}</h2>
              <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
            </section>
          ))}

          <section className="rounded-lg border bg-card p-6">
            <h2 className="text-2xl font-semibold">Documents required</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {documentsRequired.map((document) => (
                <div key={document} className="flex items-center gap-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  {document}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border bg-card p-6">
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <div className="mt-5 space-y-4">
              <div>
                <h3 className="font-medium">Is the visa renewable?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {country.renewable ? "Yes, renewal is available or commonly supported." : "No, this route is usually time-limited without immediate renewal."}
                </p>
              </div>
              <div>
                <h3 className="font-medium">How much does living there cost?</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  A single remote worker should model around {formatCurrency(country.costOfLivingMonthlyUsd)} per month before lifestyle upgrades.
                </p>
              </div>
            </div>
          </section>
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <Card className="p-5">
            <h2 className="text-lg font-semibold">Nomad score</h2>
            <div className="mt-4 rounded-md bg-muted p-5 text-center">
              <p className="font-mono text-5xl font-semibold">{country.nomadScore}</p>
              <p className="mt-2 text-sm text-muted-foreground">out of 100</p>
            </div>
            <div className="mt-5 space-y-3 text-sm">
              {[
                ["Cost of living", country.costOfLivingMonthlyUsd],
                ["Safety", country.safetyScore],
                ["Healthcare", country.healthcareScore],
                ["Quality of life", country.qualityOfLifeScore],
              ].map(([label, value]) => (
                <div key={label as string} className="flex justify-between">
                  <span className="text-muted-foreground">{label as string}</span>
                  <span className="font-medium">
                    {typeof value === "number" && label === "Cost of living"
                      ? formatCurrency(value)
                      : value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="text-lg font-semibold">Official visa information page</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Last verified {country.lastVerified}
            </p>
            <a
              href={officialVisaUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
            >
              Open official visa information page <ArrowUpRight className="h-4 w-4" />
            </a>
          </Card>

          <Card className="p-5">
            <h2 className="text-lg font-semibold">Related countries</h2>
            <div className="mt-4 space-y-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/digital-nomad-visa/${item.slug}`}
                  className="flex items-center justify-between rounded-md border p-3 text-sm hover:bg-muted"
                >
                  <span className="flex items-center gap-2">
                    <CountryFlag country={item} />
                    {item.countryName}
                  </span>
                  <span className="font-mono">{item.nomadScore}</span>
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <HeartHandshake className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Track updates</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Get alerts when income, fees, or tax guidance changes.
            </p>
            <div className="mt-4">
              <NewsletterForm compact />
            </div>
          </Card>
        </aside>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
              { "@type": "ListItem", position: 2, name: "Countries", item: `${siteConfig.url}/countries` },
              { "@type": "ListItem", position: 3, name: country.countryName, item: `${siteConfig.url}/digital-nomad-visa/${country.slug}` },
            ],
          }),
        }}
      />
    </div>
  );
}
