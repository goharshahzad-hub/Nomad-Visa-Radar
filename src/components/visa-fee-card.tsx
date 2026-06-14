"use client";

import { useId, useState } from "react";
import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  applicantCountries,
  formatVisaFeeForApplicant,
  type VisaCountry,
} from "@/lib/visa-data";

export function VisaFeeCard({ country }: { country: VisaCountry }) {
  const [applyingFrom, setApplyingFrom] = useState("United States");
  const listId = useId();

  return (
    <Card className="p-5">
      <FileText className="h-5 w-5 text-primary" />
      <p className="mt-3 text-sm text-muted-foreground">Visa fee</p>
      <p className="mt-1 font-semibold">
        {formatVisaFeeForApplicant(country, applyingFrom)}
      </p>
      <label htmlFor={listId} className="mt-4 block text-xs font-medium text-muted-foreground">
        Applying from
      </label>
      <Input
        id={listId}
        list={`${listId}-countries`}
        value={applyingFrom}
        onChange={(event) => setApplyingFrom(event.target.value)}
        className="mt-2"
        placeholder="Search residence country"
      />
      <datalist id={`${listId}-countries`}>
        {applicantCountries.map((countryName) => (
          <option key={countryName} value={countryName} />
        ))}
      </datalist>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Fee shown is the destination program or consular estimate; final amount can vary by applicant residence country and local consulate.
      </p>
    </Card>
  );
}
