export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.barreiro.com/#website",
    url: "https://www.barreiro.com",
    name: "Alfonso Barreiro",
    description:
      "Designer and web developer in Portland, OR. Websites, logos, ad campaigns, print, and five case studies.",
    inLanguage: "en-US",
    publisher: { "@id": "https://www.barreiro.com/#person" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
