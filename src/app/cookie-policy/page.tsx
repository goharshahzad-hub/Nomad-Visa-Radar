import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <SimplePage eyebrow="Legal" title="Cookie Policy">
      <p>
        The website uses essential cookies for authentication and session management. Analytics cookies may be used to understand aggregate behavior, Core Web Vitals, and content performance.
      </p>
      <p>
        Browser settings and product preferences can be used to control non-essential cookies where applicable.
      </p>
    </SimplePage>
  );
}
