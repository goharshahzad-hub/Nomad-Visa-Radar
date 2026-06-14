import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Nomad Visa Radar uses essential, analytics, preference, and advertising cookies.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <SimplePage eyebrow="Legal" title="Cookie Policy">
      <p>Last updated: June 14, 2026.</p>
      <p>
        Nomad Visa Radar uses essential cookies and similar technologies for
        authentication, session management, security, and basic product
        operation. Without these, login and saved-account features may not work
        correctly.
      </p>
      <p>
        Analytics cookies or privacy-respecting measurement tools may be used to
        understand aggregate behavior, Core Web Vitals, page errors, and content
        performance. These signals help us find pages that are slow, unclear, or
        outdated.
      </p>
      <p>
        If advertising is enabled, advertising partners may use cookies to
        deliver and measure ads, limit repeated ads, and help detect invalid
        activity. Browser settings, device settings, and any available product
        preferences can be used to control non-essential cookies where
        applicable.
      </p>
    </SimplePage>
  );
}
