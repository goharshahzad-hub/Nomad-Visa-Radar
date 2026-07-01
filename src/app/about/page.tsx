import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";
import { getSiteSection } from "@/lib/managed-content";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Nomad Visa Radar, an independent digital nomad visa research site built around official-source review and practical remote-work planning.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const intro = await getSiteSection("about-intro");
  const paragraphs = intro?.body.split(/\n\s*\n/).filter(Boolean) ?? [];
  return (
    <SimplePage eyebrow="About" title={intro?.title ?? "Visa intelligence for careful remote moves"}>
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <h2 className="text-xl font-semibold text-foreground">Who runs the site</h2>
      <p>
        Nomad Visa Radar is founded and edited by Gohar Shahzad. The site is an
        independent research project, not an immigration agency or government
        service. Country pages combine direct official-source links with a
        structured comparison model so readers can identify which questions to
        verify before applying.
      </p>
      <p>
        The product combines structured country data, official-source links,
        editorial review workflows, saved-country tools, alerts, comparison
        history, and newsletters. Production changes merged into the main code
        branch deploy automatically. Daily monitoring timestamps refresh from
        source checks, while substantive visa-rule changes are verified before
        the guidance is rewritten. Important guides point readers back to government,
        embassy, immigration, or official application sources wherever possible.
      </p>
      <p>
        Nomad Visa Radar is not affiliated with any government agency. If you
        spot an outdated requirement or a better official source, use the
        contact form and include the page URL, the official source link, and a
        short note about what changed.
      </p>
    </SimplePage>
  );
}
