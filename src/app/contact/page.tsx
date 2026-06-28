import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Nomad Visa Radar about visa data, partnerships, or editorial corrections.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <SimplePage eyebrow="Contact" title="Contact the editorial team">
      <p>
        Send corrections, official-source updates, partnership notes, or product
        feedback. Daily source-check status updates automatically; reported
        changes to income, fees, eligibility, or legal rules are verified before
        the guidance is rewritten. Specific
        visa questions should still be confirmed with official
        authorities or qualified professionals.
      </p>
      <p>
        For corrections, include the Nomad Visa Radar page URL, the official
        source URL, and a short note about the requirement that changed. That
        makes review faster and helps us keep the public guides useful.
      </p>
      <ContactForm />
    </SimplePage>
  );
}
