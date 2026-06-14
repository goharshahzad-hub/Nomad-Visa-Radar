import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CompareTool } from "@/components/compare/compare-tool";
import { Badge } from "@/components/ui/badge";
import { getCompareCountries } from "@/lib/visa-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const countries = getCompareCountries(slug.split("-vs-"));

  return {
    title: `${countries.map((country) => country.countryName).join(" vs ")} Digital Nomad Visa Comparison`,
    description:
      "Compare digital nomad visa requirements, taxes, processing, family support, and quality-of-life scores.",
    alternates: {
      canonical: `/compare/${slug}`,
    },
  };
}

export default async function CompareSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const selected = getCompareCountries(slug.split("-vs-"));

  if (selected.length < 2) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <Badge variant="outline">Visa comparison</Badge>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal sm:text-4xl">
          {selected.map((country) => country.countryName).join(" vs ")}
        </h1>
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          Compare remote worker visa requirements and lifestyle scores using a shareable URL.
        </p>
      </div>
      <CompareTool initial={selected} />
    </div>
  );
}
