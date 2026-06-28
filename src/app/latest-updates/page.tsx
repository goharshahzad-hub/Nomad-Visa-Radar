import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Bell, FileCheck2, PlusCircle, RefreshCcw, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ShareActions } from "@/components/share-actions";
import { latestUpdates } from "@/lib/visa-data";
import { siteConfig } from "@/lib/site";

const updateIcons = {
  requirement: FileCheck2,
  fee: FileCheck2,
  addition: PlusCircle,
  removal: XCircle,
  "source-check": RefreshCcw,
};

export const metadata: Metadata = {
  title: "Latest Digital Nomad Visa Updates",
  description:
    "Official-source updates for digital nomad visas, country additions, removals, requirement changes, and human-reviewed source checks.",
  alternates: {
    canonical: "/latest-updates",
  },
};

export default function LatestUpdatesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Latest Digital Nomad Visa Updates",
    url: `${siteConfig.url}/latest-updates`,
    about: "Official-source digital nomad visa updates and review tasks.",
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <Badge variant="gold">
          <Bell className="mr-1 h-3.5 w-3.5" />
          Official-source changes
        </Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-5xl">
          Latest digital nomad visa updates
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          A public changelog for new countries, removed programs, fee changes, requirements, and daily official-source checks. Source-check status refreshes automatically; substantive visa guidance is verified before it is rewritten.
        </p>
        <ShareActions
          title="Latest digital nomad visa updates"
          text="Track official-source digital nomad visa updates on Nomad Visa Radar."
          url={`${siteConfig.url}/latest-updates`}
          className="mt-5"
        />
      </div>

      <div className="mt-10 grid gap-5">
        {latestUpdates.map((update) => {
          const Icon = updateIcons[update.type];

          return (
            <Card key={update.slug} id={update.slug} className="scroll-mt-28 overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[260px_1fr]">
                <div className="bg-gradient-to-br from-primary via-accent to-foreground p-6 text-primary-foreground">
                  <Icon className="h-7 w-7" />
                  <p className="mt-5 text-sm font-medium uppercase">
                    {update.type.replace("-", " ")}
                  </p>
                  <p className="mt-2 font-mono text-3xl font-semibold">
                    {update.confidence}%
                  </p>
                  <p className="text-sm opacity-80">confidence</p>
                </div>
                <div className="p-6">
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{update.countryName}</Badge>
                        <span className="text-sm text-muted-foreground">{update.date}</span>
                      </div>
                      <h2 className="mt-3 text-2xl font-semibold">{update.title}</h2>
                      <p className="mt-3 leading-7 text-muted-foreground">{update.summary}</p>
                    </div>
                    <Link
                      href={`/digital-nomad-visa/${update.countrySlug}`}
                      className="text-sm font-medium text-primary"
                    >
                      Country guide
                    </Link>
                    <ShareActions
                      title={update.title}
                      text={update.summary}
                      url={`${siteConfig.url}/latest-updates#${update.slug}`}
                      compact
                    />
                  </div>
                  <div className="mt-5 rounded-md border bg-muted/40 p-4">
                    <p className="text-sm font-medium">Official statement / source basis</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {update.officialStatement}
                    </p>
                    <a
                      href={update.officialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary"
                    >
                      Open official visa information page <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
