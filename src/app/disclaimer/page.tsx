import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Disclaimer",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <SimplePage eyebrow="Disclaimer" title="Not legal or tax advice">
      <p>
        Nomad Visa Radar is an informational product. Immigration, employment, and tax rules can change and may depend on nationality, family status, income source, and personal facts.
      </p>
      <p>
        Always confirm requirements with official government sources and qualified immigration or tax professionals before applying.
      </p>
    </SimplePage>
  );
}
