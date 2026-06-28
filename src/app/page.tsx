import { HomePage } from "@/components/home/home-page";
import { siteConfig } from "@/lib/site";

export default function Page() {
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
      <HomePage />
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
