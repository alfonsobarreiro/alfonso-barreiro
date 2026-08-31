export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.barreiro.com/#person",
    name: "Alfonso Barreiro",
    jobTitle: "Product Designer",
    url: "https://www.barreiro.com",
    image: "https://www.barreiro.com/opengraph-image",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Portland",
      addressRegion: "OR",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.linkedin.com/in/alfonso-barreiro/",
      "https://x.com/alfbarreiro",
      "https://github.com/alfonsobarreiro",
    ],
    knowsAbout: [
      "Product Design",
      "UX Design",
      "UI Design",
      "Design Systems",
      "Prototyping",
      "Figma",
      "Next.js",
      "Accessibility",
      "Content UX",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
