import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export function SEOHead({ 
  title = "Tommy Kovatch - Debt Elimination Specialist | Pay Off Debt 10-20 Years Faster",
  description = "Expert debt elimination strategies helping you pay off mortgages and debt 10-20 years faster while building substantial wealth. Budget-neutral solutions that save $50K-$250K+ in interest. Proven results with real case studies.",
  canonicalUrl = "https://www.tommykovatch.com",
  ogImage = "https://www.tommykovatch.com/Tommy White Logo V2.png"
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      
      {/* Keywords for traditional SEO (still useful for some search engines) */}
      <meta name="keywords" content="debt elimination, mortgage acceleration, debt payoff strategies, budget-neutral debt elimination, Tommy Kovatch, interest savings, wealth building while eliminating debt, financial freedom, debt restructuring, pay off mortgage faster" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Tommy Kovatch" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags for GEO/AEO */}
      <meta name="author" content="Tommy Kovatch" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Geo Tags (if you want to target specific locations) */}
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />
    </Helmet>
  );
}