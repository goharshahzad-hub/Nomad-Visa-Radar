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
        Send corrections, official-source updates, partnership notes, or product feedback. Source updates are reviewed before anything goes live.
      </p>
      <ContactForm />
    </SimplePage>
  );
}
