"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CountryFlag } from "@/components/country-flag";
import { countries, formatMinimumIncomeRequirement, type VisaCountry } from "@/lib/visa-data";
import { formatCurrency } from "@/lib/utils";

const coordinates: Record<string, [number, number]> = {
  portugal: [39.5, -8],
  spain: [40.3, -3.7],
  croatia: [45.1, 15.2],
  estonia: [58.7, 25],
  malta: [35.9, 14.4],
  greece: [39.1, 22.9],
  italy: [42.8, 12.5],
  hungary: [47.2, 19.4],
  latvia: [56.9, 24.6],
  romania: [45.9, 24.9],
  czechia: [49.8, 15.5],
  germany: [51.1, 10.4],
  iceland: [64.9, -18.6],
  barbados: [13.2, -59.5],
  "antigua-and-barbuda": [17.1, -61.8],
  "costa-rica": [9.7, -84],
  brazil: [-14.2, -51.9],
  colombia: [4.6, -74.1],
  ecuador: [-1.8, -78.2],
  argentina: [-34, -64],
  uruguay: [-32.8, -56],
  "united-arab-emirates": [24.2, 54.4],
  thailand: [15.8, 101],
  malaysia: [4.2, 102],
  japan: [36.2, 138.2],
  "south-korea": [36.3, 127.9],
  indonesia: [-2, 118],
  mauritius: [-20.2, 57.5],
  seychelles: [-4.6, 55.4],
  namibia: [-22.6, 17.1],
  "cape-verde": [16, -24],
  georgia: [42.2, 43.4],
  bahamas: [25, -77.4],
  bermuda: [32.3, -64.8],
  dominica: [15.4, -61.4],
  montserrat: [16.7, -62.2],
  anguilla: [18.2, -63.1],
  belize: [17.2, -88.5],
  panama: [8.5, -80],
  mexico: [23.6, -102.5],
  cyprus: [35.1, 33.4],
  norway: [60.5, 8.5],
  albania: [41.2, 20.2],
  montenegro: [42.7, 19.3],
  serbia: [44, 21],
  turkey: [39, 35],
  taiwan: [23.7, 121],
  "sri-lanka": [7.8, 80.7],
  "south-africa": [-30.6, 25],
  kenya: [0.1, 37.9],
  kyrgyzstan: [41.2, 74.8],
  curacao: [12.2, -69],
  aruba: [12.5, -70],
  "saint-lucia": [13.9, -61],
};

const regionColors: Record<VisaCountry["region"], string> = {
  Europe: "fill-cyan-400",
  Americas: "fill-emerald-400",
  Asia: "fill-amber-400",
  Africa: "fill-rose-400",
  "Middle East": "fill-violet-400",
  Oceania: "fill-sky-400",
};

function project([lat, lng]: [number, number]) {
  return {
    x: ((lng + 180) / 360) * 960,
    y: ((86 - lat) / 172) * 520,
  };
}

export function InteractiveWorldMap() {
  const [region, setRegion] = useState<"All" | VisaCountry["region"]>("All");
  const [selectedSlug, setSelectedSlug] = useState("portugal");
  const regions = useMemo(
    () => ["All", ...Array.from(new Set(countries.map((country) => country.region)))] as const,
    [],
  );
  const visibleCountries = countries.filter((country) => region === "All" || country.region === region);
  const selected =
    countries.find((country) => country.slug === selectedSlug) ?? visibleCountries[0] ?? countries[0];

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="flex flex-col gap-4 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" />
            Interactive visa map
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {visibleCountries.length} tracked remote-work and freelancer visa programs
          </p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 lg:pb-0">
          {regions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRegion(item)}
              className="h-9 shrink-0 rounded-md border px-3 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground data-[active=true]:bg-foreground data-[active=true]:text-background"
              data-active={region === item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[1fr_300px]">
        <div className="relative min-h-[360px] bg-[radial-gradient(circle_at_top_right,oklch(0.72_0.15_166_/_0.18),transparent_32%),linear-gradient(180deg,oklch(0.2_0.02_252),oklch(0.12_0.02_252))] p-3">
          <svg viewBox="0 0 960 520" role="img" aria-label="Interactive digital nomad visa world map" className="h-full min-h-[340px] w-full">
            <defs>
              <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="white" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            {Array.from({ length: 8 }, (_, index) => (
              <path
                key={`lat-${index}`}
                d={`M0 ${70 + index * 55} H960`}
                className="stroke-white/10"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 12 }, (_, index) => (
              <path
                key={`lng-${index}`}
                d={`M${80 + index * 72} 0 V520`}
                className="stroke-white/10"
                strokeWidth="1"
              />
            ))}
            <path d="M106 149 154 109 238 100 315 127 332 185 280 222 212 209 177 250 121 226 86 184Z" fill="url(#land)" stroke="white" strokeOpacity="0.16" />
            <path d="M273 257 333 301 348 382 310 473 252 449 230 368 244 300Z" fill="url(#land)" stroke="white" strokeOpacity="0.16" />
            <path d="M430 124 500 102 565 129 602 177 560 219 484 206 425 175Z" fill="url(#land)" stroke="white" strokeOpacity="0.16" />
            <path d="M488 210 562 234 594 302 574 397 521 420 467 348 450 262Z" fill="url(#land)" stroke="white" strokeOpacity="0.16" />
            <path d="M575 132 684 104 808 133 886 206 828 267 715 253 642 313 580 262 616 194Z" fill="url(#land)" stroke="white" strokeOpacity="0.16" />
            <path d="M744 346 836 367 890 435 824 469 742 433Z" fill="url(#land)" stroke="white" strokeOpacity="0.16" />

            {visibleCountries.map((country) => {
              const coordinate = coordinates[country.slug];

              if (!coordinate) {
                return null;
              }

              const { x, y } = project(coordinate);
              const active = selected.slug === country.slug;

              return (
                <a
                  key={country.slug}
                  href={`/digital-nomad-visa/${country.slug}`}
                  onMouseEnter={() => setSelectedSlug(country.slug)}
                  onFocus={() => setSelectedSlug(country.slug)}
                  className="outline-none"
                >
                  <title>{country.countryName}</title>
                  <circle
                    cx={x}
                    cy={y}
                    r={active ? 12 : 8}
                    className={`${regionColors[country.region]} transition-all`}
                    opacity="0.95"
                    stroke="white"
                    strokeWidth={active ? 3 : 2}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={active ? 24 : 16}
                    fill="none"
                    stroke="white"
                    strokeOpacity={active ? 0.45 : 0.18}
                    strokeWidth="2"
                  />
                </a>
              );
            })}
          </svg>
        </div>

        <div className="border-t p-5 lg:border-l lg:border-t-0">
          <Badge variant="gold">{selected.region}</Badge>
          <h3 className="mt-4 flex items-center gap-2 text-2xl font-semibold">
            <CountryFlag country={selected} className="h-6 w-9 rounded-md" />
            {selected.countryName}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {selected.visaProgramName}
          </p>
          <div className="mt-5 grid gap-3 text-sm">
            <div className="flex justify-between gap-3">
              <span className="text-muted-foreground">Income</span>
              <span className="text-right font-medium">{formatMinimumIncomeRequirement(selected)}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-muted-foreground">Fee</span>
              <span className="text-right font-medium">{selected.visaFee}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-muted-foreground">Living cost</span>
              <span className="font-medium">{formatCurrency(selected.costOfLivingMonthlyUsd)}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-muted-foreground">Nomad score</span>
              <span className="font-mono font-semibold">{selected.nomadScore}</span>
            </div>
          </div>
          <Link
            href={`/digital-nomad-visa/${selected.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary"
          >
            Open country guide <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
