import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
}

export function SEOHead({ 
  title = "Tommy Kovatch - Financial Freedom & Wealth Building Expert",
  description = "Discover proven strategies to achieve financial freedom with Tommy Kovatch. Expert guidance on wealth building, financial planning, and securing your financial future. Book your free consultation today.",
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
      <meta name="keywords" content="financial freedom, wealth building, financial advisor, Tommy Kovatch, financial planning, investment strategies, wealth management, financial independence, retirement planning" />
      
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