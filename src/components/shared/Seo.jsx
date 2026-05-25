import { Helmet } from "react-helmet-async";

export default function Seo({ title, description, keywords = [], image, canonical }) {
  const fullTitle = title ? `${title} | Developer Portfolio` : "Developer Portfolio";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {image ? <meta property="og:image" content={image} /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}
    </Helmet>
  );
}
