import Image from "next/image";
import { getCountryFlagImage, type VisaCountry } from "@/lib/visa-data";
import { cn } from "@/lib/utils";

type CountryFlagProps = {
  country: Pick<VisaCountry, "slug" | "countryName" | "flag">;
  className?: string;
  imageClassName?: string;
};

export function CountryFlag({ country, className, imageClassName }: CountryFlagProps) {
  const flagImage = getCountryFlagImage(country.slug);

  if (!flagImage) {
    return <span className={className}>{country.flag}</span>;
  }

  return (
    <span
      className={cn(
        "inline-flex h-5 w-7 shrink-0 overflow-hidden rounded-[3px] border border-white/30 bg-muted align-middle shadow-sm",
        className,
      )}
    >
      <Image
        src={flagImage}
        alt={`${country.countryName} flag`}
        width={64}
        height={44}
        unoptimized
        className={cn("h-full w-full object-cover", imageClassName)}
      />
    </span>
  );
}
