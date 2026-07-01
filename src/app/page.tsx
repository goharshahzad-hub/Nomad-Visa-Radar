import { HomePage } from "@/components/home/home-page";
import { getSiteSection } from "@/lib/managed-content";
import { siteConfig } from "@/lib/site";

export default async function Page() {
  const hero = await getSiteSection("home-hero");
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Nomad Visa Radar publish automatically?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Production changes merged to the main branch deploy automatically, and daily source checks refresh monitoring status. Substantive visa-rule changes are verified before the guidance is rewritten.",
        },
      },
      {
        "@type": "Question",
        name: "Can users save digital nomad visa countries?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Authenticated users can save countries, set alerts, manage newsletter subscriptions, and view comparison history.",
        },
      },
    ],
  };

  return (
    <>
      <HomePage hero={hero ? { title: hero.title, description: hero.body } : undefined} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteConfig.url}/countries?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }),
        }}
      />
    </>
  );
}
