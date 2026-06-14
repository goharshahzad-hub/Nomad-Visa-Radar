import { GraduationCap, Home, MapPin, School } from "lucide-react";
import type { VisaCountry } from "@/lib/visa-data";
import { getLivingEducation } from "@/lib/visa-data";
import { formatCurrency } from "@/lib/utils";

export function LivingEducationSection({ country }: { country: VisaCountry }) {
  const details = getLivingEducation(country);

  return (
    <section className="rounded-lg border bg-card p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Living and family planning</p>
          <h2 className="mt-2 text-2xl font-semibold">Cities, monthly living, schools, and universities</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Practical planning ranges for a single remote worker and families comparing education options.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border bg-background/60 p-5">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Monthly living for one person</h3>
          </div>
          <p className="mt-4 font-mono text-3xl font-semibold">
            {formatCurrency(details.monthlyLivingSingleUsd)}/mo
          </p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {details.monthlyLivingNote}
          </p>
        </div>

        <div className="rounded-lg border bg-background/60 p-5">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Best destination cities</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {details.bestCities.map((city) => (
              <span key={city} className="rounded-md border bg-card px-3 py-1.5 text-sm font-medium">
                {city}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-background/60 p-5">
          <div className="flex items-center gap-2">
            <School className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Schooling options</h3>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {details.schoolingSummary}
          </p>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4 rounded-md bg-muted/60 p-3">
              <span className="text-muted-foreground">Public schools</span>
              <span className="max-w-[15rem] text-right font-medium">{details.publicSchoolAnnualUsd}</span>
            </div>
            <div className="flex justify-between gap-4 rounded-md bg-muted/60 p-3">
              <span className="text-muted-foreground">Private/international schools</span>
              <span className="text-right font-medium">{details.privateSchoolAnnualUsd}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-background/60 p-5">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">College and university options</h3>
          </div>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex justify-between gap-4 rounded-md bg-muted/60 p-3">
              <span className="text-muted-foreground">Public colleges/universities</span>
              <span className="text-right font-medium">{details.publicCollegeAnnualUsd}</span>
            </div>
            <div className="flex justify-between gap-4 rounded-md bg-muted/60 p-3">
              <span className="text-muted-foreground">Private colleges/universities</span>
              <span className="text-right font-medium">{details.privateCollegeAnnualUsd}</span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {details.universityExamples.map((name) => (
              <span key={name} className="rounded-md border bg-card px-3 py-1.5 text-xs font-medium">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-5 text-muted-foreground">
        {details.sourceNote}
      </p>
    </section>
  );
}
