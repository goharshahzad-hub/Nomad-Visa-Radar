import { HomePage } from "@/components/home/home-page";
import { siteConfig } from "@/lib/site";

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does Nomad Visa Radar auto-publish detected visa changes?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Detected changes create admin review tasks and require human approval before publication.",
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
