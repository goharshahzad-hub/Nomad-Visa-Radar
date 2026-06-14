"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Download, Link2, Plus, Trophy, X } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountryFlag } from "@/components/country-flag";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  applicantCountries,
  countries,
  formatMinimumIncomeRequirement,
  formatVisaFeeForApplicant,
  VisaCountry,
} from "@/lib/visa-data";
import { formatCurrency } from "@/lib/utils";

const rows: [string, (country: VisaCountry, applyingFrom: string) => string | number][] = [
  ["Income requirement", (country) => formatMinimumIncomeRequirement(country)],
  ["Visa fee", (country, applyingFrom) => formatVisaFeeForApplicant(country, applyingFrom)],
  ["Duration", (country) => country.duration],
  ["Renewability", (country) => (country.renewable ? "Renewable" : "Limited")],
  ["Dependents", (country) => (country.dependentsAllowed ? "Allowed" : "Not usually")],
  ["Taxes", (country) => country.taxFriendly ? "Favorable" : "Needs planning"],
  ["Internet speed", (country) => `${country.internetSpeedMbps} Mbps`],
  ["Cost of living", (country) => formatCurrency(country.costOfLivingMonthlyUsd)],
  ["Safety", (country) => country.safetyScore],
  ["Family friendliness", (country) => (country.familyFriendly ? "Strong" : "Moderate")],
  ["Healthcare", (country) => country.healthcareScore],
  ["Quality of life", (country) => country.qualityOfLifeScore],
  ["Nomad score", (country) => country.nomadScore],
];

function badgesFor(selected: VisaCountry[]) {
  if (!selected.length) return new Map<string, string[]>();

  const map = new Map<string, string[]>();
  selected.forEach((country) => map.set(country.slug, []));

  const byFee = [...selected].sort((a, b) => a.visaFeeUsd - b.visaFeeUsd)[0];
  const byTax = [...selected].sort((a, b) => b.taxScore - a.taxScore)[0];
  const byProcessing = [...selected].sort((a, b) => a.processingDays - b.processingDays)[0];
  const byFamily = [...selected].sort((a, b) => b.safetyScore + b.healthcareScore - (a.safetyScore + a.healthcareScore))[0];
  const byValue = [...selected].sort(
    (a, b) =>
      b.nomadScore / Math.max(b.costOfLivingMonthlyUsd, 1) -
      a.nomadScore / Math.max(a.costOfLivingMonthlyUsd, 1),
  )[0];

  [
    [byValue, "Best Value"],
    [byFee, "Cheapest"],
    [byTax, "Lowest Tax"],
    [byProcessing, "Fastest Processing"],
    [byFamily, "Best Family Country"],
  ].forEach(([country, badge]) => {
    if (country) {
      map.get((country as VisaCountry).slug)?.push(badge as string);
    }
  });

  return map;
}

export function CompareTool({ initial = [] }: { initial?: VisaCountry[] }) {
  const [selected, setSelected] = useState<VisaCountry[]>(initial.slice(0, 6));
  const [applyingFrom, setApplyingFrom] = useState("United States");
  const tableRef = useRef<HTMLDivElement>(null);
  const badgeMap = useMemo(() => badgesFor(selected), [selected]);
  const available = countries.filter(
    (country) => !selected.some((item) => item.slug === country.slug),
  );
  const sharePath = `/compare/${selected.map((country) => country.slug).join("-vs-")}`;

  function addCountry(slug: string) {
    const country = countries.find((item) => item.slug === slug);
    if (country && selected.length < 6) {
      setSelected([...selected, country]);
    }
  }

  function removeCountry(slug: string) {
    setSelected(selected.filter((country) => country.slug !== slug));
  }

  async function copyShareUrl() {
    const url = `${window.location.origin}${sharePath}`;
    await navigator.clipboard.writeText(url);
    toast.success("Share URL copied.");
  }

  async function exportPdf() {
    if (!tableRef.current) return;
    const [{ jsPDF }, html2canvas] = await Promise.all([
      import("jspdf"),
      import("html2canvas").then((module) => module.default),
    ]);
    const canvas = await html2canvas(tableRef.current, { scale: 2, backgroundColor: null });
    const pdf = new jsPDF({ orientation: "landscape", unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("nomad-visa-comparison.pdf");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-card p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-semibold">Compare up to six countries</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Choose programs and create a clean shareable comparison link.
            </p>
          </div>
          <div className="grid gap-2 sm:flex sm:flex-wrap">
            <div>
              <Input
                list="compare-applying-from"
                value={applyingFrom}
                onChange={(event) => setApplyingFrom(event.target.value)}
                placeholder="Applying from"
                className="h-10 sm:w-44"
              />
              <datalist id="compare-applying-from">
                {applicantCountries.map((countryName) => (
                  <option key={countryName} value={countryName} />
                ))}
              </datalist>
            </div>
            <select
              aria-label="Add country"
              disabled={selected.length >= 6}
              onChange={(event) => {
                addCountry(event.target.value);
                event.currentTarget.value = "";
              }}
              className="h-10 min-w-0 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring sm:min-w-48"
            >
              <option value="">Add country</option>
              {available.map((country) => (
                <option key={country.slug} value={country.slug}>
                  {country.countryName}
                </option>
              ))}
            </select>
            <Button variant="outline" onClick={copyShareUrl} disabled={!selected.length} className="w-full sm:w-auto">
              <Link2 className="h-4 w-4" />
              Share
            </Button>
            <Button onClick={exportPdf} disabled={!selected.length} className="w-full sm:w-auto">
              <Download className="h-4 w-4" />
              PDF
            </Button>
          </div>
        </div>
      </div>

      <div ref={tableRef} className="rounded-lg border bg-card p-4">
        {selected.length ? (
          <>
            <div className="mb-4 flex flex-wrap gap-2">
              {selected.map((country) => (
                <div
                  key={country.slug}
                  className="inline-flex min-h-10 items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-muted"
                >
                  <Link href={`/digital-nomad-visa/${country.slug}`} className="inline-flex items-center gap-2 font-medium">
                    <CountryFlag country={country} />
                    {country.countryName}
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeCountry(country.slug)}
                    aria-label={`Remove ${country.countryName}`}
                    className="rounded-sm p-1 hover:bg-background"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <div className="md:hidden">
              <div className="grid gap-3">
                {selected.map((country) => (
                  <Link
                    key={country.slug}
                    href={`/digital-nomad-visa/${country.slug}`}
                    className="block rounded-md border bg-background/60 p-4 hover:bg-muted/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="flex items-center gap-2 font-semibold">
                          <CountryFlag country={country} />
                          {country.countryName}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {country.visaProgramName}
                        </p>
                      </div>
                      <Badge variant="success">{country.nomadScore}</Badge>
                    </div>
                    <div className="mt-4 grid gap-2 text-sm">
                      <div className="flex justify-between gap-3">
                        <span className="text-muted-foreground">Income</span>
                        <span className="text-right font-medium">{formatMinimumIncomeRequirement(country)}</span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-muted-foreground">Fee</span>
                        <span className="text-right font-medium">
                          {formatVisaFeeForApplicant(country, applyingFrom)}
                        </span>
                      </div>
                      <div className="flex justify-between gap-3">
                        <span className="text-muted-foreground">Processing</span>
                        <span className="text-right font-medium">{country.processingTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Swipe the full table below for every comparison metric.
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Metric</TableHead>
                  {selected.map((country) => (
                    <TableHead key={country.slug}>
                      <Link href={`/digital-nomad-visa/${country.slug}`} className="inline-flex items-center gap-2">
                        <CountryFlag country={country} />
                        {country.countryName}
                      </Link>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Badges</TableCell>
                  {selected.map((country) => (
                    <TableCell key={country.slug}>
                      <div className="flex flex-wrap gap-1">
                        {(badgeMap.get(country.slug) ?? []).map((badge) => (
                          <Badge key={badge} variant="gold">
                            <Trophy className="mr-1 h-3 w-3" />
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
                {rows.map(([label, getter]) => (
                  <TableRow key={label}>
                    <TableCell className="font-medium">{label}</TableCell>
                    {selected.map((country) => (
                      <TableCell key={country.slug}>
                        <Link
                          href={`/digital-nomad-visa/${country.slug}`}
                          className="block rounded-sm hover:text-primary"
                        >
                          {getter(country, applyingFrom)}
                        </Link>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        ) : (
          <div className="flex min-h-60 flex-col items-center justify-center text-center">
            <Plus className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-lg font-semibold">Start with your first country</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Add Portugal, Spain, Croatia, Thailand, or any other tracked program to compare requirements.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
