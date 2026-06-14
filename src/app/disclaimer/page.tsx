import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Nomad Visa Radar is informational and does not provide legal, tax, immigration, or financial advice.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <SimplePage eyebrow="Disclaimer" title="Not legal or tax advice">
      <p>
        Nomad Visa Radar is an informational product. Immigration, employment, and tax rules can change and may depend on nationality, family status, income source, and personal facts.
      </p>
      <p>
        The site may summarize official pages, compare country programs, and
        explain common planning issues, but it does not provide legal, tax,
        immigration, financial, or investment advice. Reading a guide here does
        not create a professional relationship with Nomad Visa Radar.
      </p>
      <p>
        Always confirm requirements with official government sources and
        qualified immigration or tax professionals before applying. This is
        especially important for income thresholds, dependent eligibility, local
        work restrictions, tax residence, health insurance, background checks,
        document legalization, and appointment availability.
      </p>
      <p>
        We aim to keep content useful and current, but no visa website can
        guarantee that every consulate, embassy, or application portal will apply
        requirements in exactly the same way on the day you file.
      </p>
    </SimplePage>
  );
}
