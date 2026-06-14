import type { Metadata } from "next";
import { SimplePage } from "@/components/simple-page";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Nomad Visa Radar, an independent digital nomad visa research site built around official-source review and practical remote-work planning.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <SimplePage eyebrow="About" title="Visa intelligence for careful remote moves">
      <p>
        Nomad Visa Radar is an independent research site for remote workers,
        freelancers, founders, families, and relocation teams comparing digital
        nomad visas and remote-work residence routes. The site is built for
        people who want practical context before they spend money on
        appointments, relocation plans, or professional advice.
      </p>
      <p>
        Our goal is to make the first stage of research calmer and more useful:
        which countries have relevant routes, what evidence usually matters,
        where official instructions live, and which details need extra checking
        before a decision. We do not sell visas, guarantee approvals, or replace
        immigration or tax professionals.
      </p>
      <p>
        The product combines structured country data, official-source links,
        editorial review workflows, saved-country tools, alerts, comparison
        history, and newsletters. Substantive visa updates are reviewed before
        publication, and important guides point readers back to government,
        embassy, immigration, or official application sources wherever possible.
      </p>
      <p>
        Nomad Visa Radar is not affiliated with any government agency. If you
        spot an outdated requirement or a better official source, use the
        contact form and include the page URL, the official source link, and a
        short note about what changed.
      </p>
    </SimplePage>
  );
}
