import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <SimplePage eyebrow="Legal" title="Privacy Policy">
      <p>
        Nomad Visa Radar stores account data required for authentication, saved countries, alerts, newsletter preferences, and comparison history. Supabase Auth handles login sessions, including Google OAuth when enabled.
      </p>
      <p>
        We use analytics and operational logs to improve performance, security, and content quality. Users may request deletion of account-associated product data.
      </p>
    </SimplePage>
  );
}
