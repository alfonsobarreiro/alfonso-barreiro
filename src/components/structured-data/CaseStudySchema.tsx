type Props = {
  name: string;
  description: string;
  slug: string;
  dateCreated: string;
  dateModified?: string;
  headline?: string;
  keywords?: string | string[];
  about?: string | string[];
};

export function CaseStudySchema({
  name,
  description,
  slug,
  dateCreated,
  dateModified,
  headline,
  keywords,
  about,
}: Props) {
  const keywordsValue = Array.isArray(keywords) ? keywords.join(", ") : keywords;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    headline: headline ?? name,
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

  if (dateModified) {
    schema.dateModified = dateModified;
  }

  if (keywordsValue) {
    schema.keywords = keywordsValue;
  }

  if (about) {
    schema.about = about;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
