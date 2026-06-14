import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Terms",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <SimplePage eyebrow="Legal" title="Terms of Use">
      <p>
        Nomad Visa Radar provides informational software and editorial content. Users remain responsible for verifying requirements with official authorities before making immigration, tax, or relocation decisions.
      </p>
      <p>
        You may not scrape, resell, or misuse the platform. Admin tools are restricted to authorized roles under Supabase row-level security policies.
      </p>
    </SimplePage>
  );
}
