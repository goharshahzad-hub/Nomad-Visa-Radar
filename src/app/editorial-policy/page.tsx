import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Editorial Policy",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicyPage() {
  return (
    <SimplePage eyebrow="Editorial" title="Editorial Policy">
      <p>
        Visa pages prioritize official government sources, embassy pages, immigration portals, and trusted mobility sources. Automated monitoring can create review tasks, but it never publishes changes automatically.
      </p>
      <p>
        Each substantive change should record a source URL, confidence score, reviewer, last checked date, and last updated date before publication.
      </p>
    </SimplePage>
  );
}
