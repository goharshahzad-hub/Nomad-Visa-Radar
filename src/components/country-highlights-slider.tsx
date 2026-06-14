import Image from "next/image";
import type { VisaCountry } from "@/lib/visa-data";
import { getCountryFlagImage, getCountryHighlights } from "@/lib/visa-data";

const gradients = [
  "from-rose-500 via-amber-400 to-cyan-500",
  "from-emerald-500 via-sky-400 to-indigo-500",
  "from-fuchsia-500 via-violet-500 to-orange-400",
  "from-teal-500 via-lime-400 to-yellow-400",
];

export function CountryHighlightsSlider({ country }: { country: VisaCountry }) {
  const highlights = getCountryHighlights(country.countryName);
  const flagImage = getCountryFlagImage(country.slug);

  return (
    <section className="overflow-hidden rounded-lg border bg-card p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Travel context</p>
          <h2 className="mt-2 text-2xl font-semibold">Famous cities and tourism spots</h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Country pages use vibrant destination cues so applicants can quickly connect visa data with real places.
        </p>
      </div>
      <div className="mt-5 flex snap-x gap-4 overflow-x-auto pb-2">
        {highlights.map((highlight, index) => (
          <div
            key={highlight}
            className={`relative min-h-44 min-w-[260px] snap-start overflow-hidden rounded-lg bg-gradient-to-br ${gradients[index % gradients.length]} p-5 text-white shadow-lg`}
          >
            {flagImage && (
              <Image
                src={flagImage}
                alt={`${country.countryName} flag background`}
                fill
                unoptimized
                sizes="260px"
                className="object-cover opacity-22 blur-[2px]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-black/45 via-black/15 to-black/35" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
            <div className="relative flex h-full flex-col justify-between">
              <span className="w-fit rounded-md bg-white/18 px-2.5 py-1 text-xs font-semibold backdrop-blur">
                {country.countryName}
              </span>
              <div>
                <h3 className="text-2xl font-semibold">{highlight}</h3>
                <p className="mt-2 text-sm text-white/82">
                  Destination signal for remote workers comparing lifestyle, access, and family fit.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
