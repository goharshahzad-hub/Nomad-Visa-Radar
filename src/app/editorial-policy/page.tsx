import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Editorial Policy",
  description:
    "How Nomad Visa Radar researches, reviews, updates, and corrects digital nomad visa content.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <SimplePage eyebrow="Editorial" title="Editorial Policy">
      <p>
        Nomad Visa Radar publishes practical visa research for remote workers,
        but the standard is simple: readers should be able to see where the
        important information came from and what still needs official
        confirmation. Visa pages prioritize government ministries, embassy and
        consulate pages, immigration portals, official eVisa systems, and
        recognized public agencies.
      </p>
      <p>
        We separate stable context from moving requirements. Stable context may
        include the name of a route, whether it is designed for remote workers,
        and whether local employment is restricted. Moving requirements include
        income thresholds, fees, document validity windows, insurance wording,
        tax references, appointment systems, and processing times.
      </p>
      <p>
        Automated monitoring may create review tasks, but it does not publish
        substantive visa changes automatically. Each important change should
        record a source URL, confidence score, reviewer, last checked date, and
        last updated date before publication.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Corrections</h2>
      <p>
        Corrections are welcome. When a reader sends a better source or spots an
        outdated requirement, we review the official page first, update the
        affected content when appropriate, and avoid presenting uncertain items
        as settled facts.
      </p>
      <h2 className="text-xl font-semibold text-foreground">Advertising and independence</h2>
      <p>
        Advertising, sponsorships, or affiliate relationships do not decide visa
        rankings or editorial conclusions. If commercial relationships are added
        to a page, they should be disclosed clearly and kept separate from the
        source-review process.
      </p>
    </SimplePage>
  );
}
