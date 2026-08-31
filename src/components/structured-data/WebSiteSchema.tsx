export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.barreiro.com/#website",
    url: "https://www.barreiro.com",
    name: "Alfonso Barreiro",
    description:
      "Product Designer in Portland, OR. Research through prototype: clear problem framing, evidence-based decisions, design that holds up under real constraints.",
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
