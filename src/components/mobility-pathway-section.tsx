import { BadgeCheck, ExternalLink, Globe2, IdCard, Route } from "lucide-react";
import type { VisaCountry } from "@/lib/visa-data";
import { getMobilityPathway } from "@/lib/visa-data";

const chanceClass = {
  High: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  Medium: "bg-sky-500/15 text-sky-700 dark:text-sky-300",
  Low: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  Limited: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
  "Not direct": "bg-muted text-muted-foreground",
  "Separate route": "bg-violet-500/15 text-violet-700 dark:text-violet-300",
  "Not a TRC route": "bg-muted text-muted-foreground",
};

function SignalCard({
  label,
  value,
  chance,
}: {
  label: string;
  value: string;
  chance?: keyof typeof chanceClass;
}) {
  return (
    <div className="rounded-lg border border-white/25 bg-white/80 p-4 shadow-sm backdrop-blur dark:bg-zinc-950/48">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        {chance && (
          <span className={`rounded-md px-2 py-1 text-xs font-semibold ${chanceClass[chance]}`}>
            {chance}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-6 text-foreground">{value}</p>
    </div>
  );
}

function passportTierLabel(rank: number) {
  return `Tier #${rank}`;
}

function passportMilestone(rank: number) {
  if (rank === 1) {
    return "the Tier #1 worldwide passport group";
  }
  if (rank <= 3) {
    return `Tier #${rank}, a top-3 worldwide passport group`;
  }
  if (rank <= 5) {
    return `Tier #${rank}, a top-5 worldwide passport group`;
  }
  if (rank <= 10) {
    return `Tier #${rank}, a top-10 worldwide passport group`;
  }
  if (rank <= 25) {
    return `Tier #${rank}, a top-25 worldwide passport group`;
  }
  if (rank <= 50) {
    return `Tier #${rank}, a top-50 worldwide passport group`;
  }

  return `Tier #${rank}, a lower global mobility group`;
}

export function MobilityPathwaySection({ country }: { country: VisaCountry }) {
  const pathway = getMobilityPathway(country);
  const passport = pathway.passportStrength;

  return (
    <section className="overflow-hidden rounded-lg border bg-[linear-gradient(135deg,rgba(20,184,166,0.18),rgba(59,130,246,0.16),rgba(245,158,11,0.18))] p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-primary">
            <Route className="h-4 w-4" />
            Mobility pathway
          </p>
          <h2 className="mt-2 text-2xl font-semibold">
            Renewal, TRC, PR, citizenship, and passport strength
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
            These signals estimate whether the visa is only a temporary remote-work stay or can support a deeper residence plan.
          </p>
        </div>
        {passport ? (
          <a
            href={passport.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/85 px-3 py-2 text-sm font-medium text-foreground shadow-sm backdrop-blur hover:bg-white dark:bg-zinc-950/60"
          >
            Passport source <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-white/25 bg-zinc-950 p-5 text-white shadow-sm">
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-amber-300" />
            <h3 className="font-semibold">Passport strength</h3>
          </div>
          {passport ? (
            <>
              <div className="mt-4 flex flex-wrap items-end gap-3">
                <p className="font-mono text-4xl font-semibold">{passportTierLabel(passport.rank)}</p>
                <span className="mb-1 rounded-md bg-amber-300 px-2 py-1 text-xs font-semibold text-zinc-950">
                  Worldwide passport tier
                </span>
              </div>
              <p className="mt-1 text-sm text-white/70">
                {passportTierLabel(passport.rank)} worldwide in {passport.sourceName}
              </p>
              <div className="mt-4 rounded-lg border border-white/10 bg-white/8 p-3">
                <p className="text-sm font-medium text-white">
                  {country.countryName} sits in {passportMilestone(passport.rank)}.
                </p>
                <p className="mt-2 text-xs leading-5 text-white/65">
                  Passport Index ranks passports globally by total mobility score. This passport scores {passport.mobilityScore}, including visa-free {passport.visaFree ?? "n/a"} and visa-on-arrival {passport.visaOnArrival ?? "n/a"} destinations.
                </p>
              </div>
              <p className="mt-3 text-xs leading-5 text-white/62">
                Latest source:{" "}
                <a href={passport.sourceUrl} target="_blank" rel="noreferrer" className="font-medium text-amber-200 underline underline-offset-4">
                  {passport.sourceName}
                </a>{" "}
                ({passport.sourceDate}).
              </p>
            </>
          ) : (
            <p className="mt-4 text-sm leading-6 text-white/72">
              {pathway.passportNote ?? "Passport strength is not separately listed for this jurisdiction in the current ranking source."}
            </p>
          )}
        </div>

        <div className="grid gap-4 lg:col-span-2 sm:grid-cols-2">
          <SignalCard label="Maximum renewal / stay" value={`${pathway.renewalMax}. Maximum stay: ${pathway.maximumStay}.`} chance={pathway.renewalChance} />
          <SignalCard label="TRC / temporary residence card" value={pathway.trcDuration} chance={pathway.trcChance} />
          <SignalCard label="PR pathway timing" value={pathway.prAfter} chance={pathway.prChance} />
          <SignalCard label="Citizenship timing" value={pathway.citizenshipAfter} chance={pathway.citizenshipChance} />
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-white/25 bg-white/72 p-4 text-sm leading-6 text-muted-foreground backdrop-blur dark:bg-zinc-950/45">
        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>{pathway.notes}</p>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <IdCard className="h-3.5 w-3.5" />
        TRC means temporary residence card/permit. PR and citizenship are never guaranteed and depend on residence, tax, language, integration, and nationality-specific rules.
      </p>
    </section>
  );
}
