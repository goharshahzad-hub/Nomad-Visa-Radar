import type { Metadata } from "next";
import { CompareTool } from "@/components/compare/compare-tool";
import { Badge } from "@/components/ui/badge";
import { countries } from "@/lib/visa-data";

export const metadata: Metadata = {
  title: "Compare Digital Nomad Visas",
  description:
    "Compare up to six digital nomad visa countries by income, fees, duration, taxes, safety, healthcare, family friendliness, and nomad score.",
  alternates: {
    canonical: "/compare",
  },
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <Badge variant="outline">Compare</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
          Compare digital nomad visas
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Build a side-by-side view for income, fees, renewability, dependents, taxes, internet, cost of living, safety, healthcare, quality of life, and Nomad Score.
        </p>
      </div>
      <CompareTool initial={countries.slice(0, 3)} />
    </div>
  );
}
