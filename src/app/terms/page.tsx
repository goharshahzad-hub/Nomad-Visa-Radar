import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Terms of use for Nomad Visa Radar's informational visa research, account tools, and editorial content.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <SimplePage eyebrow="Legal" title="Terms of Use">
      <p>Last updated: June 14, 2026.</p>
      <p>
        Nomad Visa Radar provides informational software, comparison tools, and
        editorial content for remote-work visa research. Users remain
        responsible for verifying requirements with official authorities before
        making immigration, tax, employment, or relocation decisions.
      </p>
      <p>
        You may use the site for personal research, editorial reference,
        relocation planning, and lawful business evaluation. You may not scrape,
        resell, overload, interfere with, or misuse the platform, and you may not
        attempt to access admin tools, private data, or restricted systems.
      </p>
      <p>
        Account features are provided as-is and may change as the product
        improves. Admin tools are restricted to authorized roles under Supabase
        row-level security policies.
      </p>
      <p>
        Content may include summaries, comparisons, and links to official
        sources. We work to keep information useful, but we do not guarantee
        visa approval, processing time, tax outcome, appointment availability, or
        acceptance by any authority.
      </p>
    </SimplePage>
  );
}
