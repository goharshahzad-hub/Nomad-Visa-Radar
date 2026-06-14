import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Nomad Visa Radar handles account data, contact messages, newsletter preferences, analytics, and deletion requests.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <SimplePage eyebrow="Legal" title="Privacy Policy">
      <p>Last updated: June 14, 2026.</p>
      <p>
        Nomad Visa Radar stores account data required for authentication, saved
        countries, alerts, newsletter preferences, comparison history, and
        product security. Supabase Auth handles login sessions, including Google
        OAuth when enabled.
      </p>
      <p>
        If you submit a contact form or newsletter signup, we process the details
        you provide so we can respond, deliver the requested email, investigate a
        correction, or improve the product. We do not ask for passport numbers,
        government ID scans, or private immigration documents through the public
        contact form.
      </p>
      <p>
        We may use analytics, performance data, security logs, and aggregated
        product usage signals to improve page speed, reliability, content
        quality, and abuse prevention. If advertising is enabled, advertising
        partners may use cookies or similar technologies subject to their own
        policies and user controls.
      </p>
      <p>
        Users may request deletion of account-associated product data. Some
        operational records may be retained when needed for security,
        compliance, abuse prevention, or backup integrity.
      </p>
    </SimplePage>
  );
}
