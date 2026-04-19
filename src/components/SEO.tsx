import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
}

const SITE_NAME = 'Tushar Gala | Gala Real Estate Group';
const DEFAULT_DESCRIPTION = 'Tushar Gala is a top-rated real estate agent serving Herndon, Leesburg, and Northern Virginia. Expert in first-time home buyers, luxury listings, and investment properties.';
const DEFAULT_IMAGE = 'https://greg-realestate.vercel.app/tushar-gala.jpg';
const BASE_URL = 'https://greg-realestate.vercel.app';

const LOCAL_BUSINESS_JSON = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Tushar Gala – Gala Real Estate Group',
  image: DEFAULT_IMAGE,
  url: BASE_URL,
  telephone: '+17033823247',
  email: 'tushar.gala@pearsonsmithrealty.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Pearson Smith Realty',
    addressLocality: 'Herndon',
    addressRegion: 'VA',
    addressCountry: 'US',
  },
  areaServed: ['Herndon, VA', 'Leesburg, VA', 'Northern Virginia'],
  priceRange: '$$',
  sameAs: ['https://www.facebook.com/profile.php?id=100090476906978'],
};

export default function SEO({ title, description, canonical, image }: SEOProps) {
  const fullTitle = title ? `${title} | Tushar Gala Real Estate` : SITE_NAME;
  const desc = description ?? DEFAULT_DESCRIPTION;
  const url = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
  const img = image ?? DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {/* Local Business JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(LOCAL_BUSINESS_JSON)}</script>
    </Helmet>
  );
}
