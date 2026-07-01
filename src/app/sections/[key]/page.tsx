import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SimplePage } from "@/components/simple-page";
import { getSiteSection } from "@/lib/managed-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ key: string }>;
}): Promise<Metadata> {
  const { key } = await params;
  const section = await getSiteSection(key);
  if (!section) return {};

  return {
    title: section.title,
    description: section.body.slice(0, 155),
    alternates: { canonical: `/sections/${key}` },
  };
}

export default async function ManagedSectionPage({
  params,
}: {
  params: Promise<{ key: string }>;
}) {
  const { key } = await params;
  const section = await getSiteSection(key);
  if (!section) notFound();

  const paragraphs = section.body.split(/\n\s*\n/).filter(Boolean);
  return (
    <SimplePage eyebrow="Nomad Visa Radar" title={section.title}>
      {section.image && (
        <div className="relative aspect-[16/8] overflow-hidden rounded-lg border">
          <Image src={section.image} alt={section.imageAlt} fill sizes="(max-width: 768px) 100vw, 760px" className="object-cover" priority />
        </div>
      )}
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </SimplePage>
  );
}
