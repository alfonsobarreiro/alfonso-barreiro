export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alfonso Barreiro",
    jobTitle: "UX/UI Designer",
    url: "https://www.barreiro.com",
    image: "https://www.barreiro.com/opengraph-image",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Portland",
      addressRegion: "OR",
      addressCountry: "US",
    },
    sameAs: ["https://www.linkedin.com/in/alfonso-barreiro/"],
    knowsAbout: [
      "User Experience Design",
      "User Interface Design",
      "Interaction Design",
      "Design Systems",
      "Information Architecture",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
