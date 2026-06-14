import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "About",
  description: "About Nomad Visa Radar and its editorial review approach.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SimplePage eyebrow="About" title="Visa intelligence for careful remote moves">
      <p>
        Nomad Visa Radar helps remote workers, freelancers, families, and relocation teams compare digital nomad visa programs without relying on stale copied guides.
      </p>
      <p>
        The product combines structured country data, official-source links, editorial review workflows, and user tools for saved countries, alerts, comparison history, and newsletters.
      </p>
    </SimplePage>
  );
}
