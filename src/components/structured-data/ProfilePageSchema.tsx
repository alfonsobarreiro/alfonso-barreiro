type Props = {
  url: string;
};

export function ProfilePageSchema({ url }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    inLanguage: "en-US",
    mainEntity: { "@id": "https://www.barreiro.com/#person" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
