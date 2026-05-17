type Props = {
  name: string;
  description: string;
  slug: string;
  dateCreated: string;
};

export function CaseStudySchema({ name, description, slug, dateCreated }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    creator: {
      "@type": "Person",
      name: "Alfonso Barreiro",
      url: "https://www.barreiro.com",
    },
    url: `https://www.barreiro.com/work/${slug}`,
    image: `https://www.barreiro.com/work/${slug}/opengraph-image`,
    dateCreated,
    inLanguage: "en-US",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
