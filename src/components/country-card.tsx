import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, DollarSign, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CountryFlag } from "@/components/country-flag";
import { ShareActions } from "@/components/share-actions";
import { formatVisaFeeEstimate, VisaCountry } from "@/lib/visa-data";
import { formatCurrency } from "@/lib/utils";

export function CountryCard({
  country,
}: {
  country: VisaCountry;
}) {
  const href = `/digital-nomad-visa/${country.slug}`;

  return (
    <Card className="group flex h-full flex-col overflow-hidden bg-card/80 transition hover:-translate-y-1 hover:shadow-xl">
      <Link
        href={href}
        className="block flex-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative h-36 overflow-hidden">
          <Image
            src={country.image}
            alt={`${country.countryName} flag cover`}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/35 to-transparent backdrop-blur-[1px]" />
          <div className="absolute left-4 top-4 flex items-center gap-2">
            <CountryFlag country={country} className="h-7 w-10 rounded-md border-white/50" />
            <Badge variant={country.status === "active" ? "status" : "gold"}>
              {country.status}
            </Badge>
          </div>
        </div>
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">{country.countryName}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {country.visaProgramName}
              </p>
            </div>
            <div className="rounded-md bg-muted px-2 py-1 font-mono text-sm">
              {country.nomadScore}
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4 text-primary" />
              {formatCurrency(country.minimumIncomeMonthlyUsd)}/mo
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-primary" />
              {country.processingTime}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              {country.dependentsAllowed ? "Dependents" : "Solo"}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <FileText className="h-4 w-4 text-primary" />
              <span className="truncate" title={formatVisaFeeEstimate(country)}>
                {formatVisaFeeEstimate(country)}
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
            View guide <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>
      </Link>
      <div className="border-t px-5 py-3">
        <ShareActions
          title={`${country.countryName} digital nomad visa`}
          text={`Compare ${country.countryName} digital nomad visa requirements on Nomad Visa Radar.`}
          url={href}
          compact
        />
      </div>
    </Card>
  );
}
