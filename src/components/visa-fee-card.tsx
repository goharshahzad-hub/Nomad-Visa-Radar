import { FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatVisaFeeEstimate, type VisaCountry } from "@/lib/visa-data";

export function VisaFeeCard({ country }: { country: VisaCountry }) {
  return (
    <Card className="p-5">
      <FileText className="h-5 w-5 text-primary" />
      <p className="mt-3 text-sm text-muted-foreground">Visa fee</p>
      <p className="mt-1 font-semibold">
        {formatVisaFeeEstimate(country)}
      </p>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">
        Fee shown is the listed official amount, exact fee, or published range where the source provides one.
      </p>
    </Card>
  );
}
