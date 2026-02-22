import { Helmet } from 'react-helmet-async';

/**
 * Structured Data (JSON-LD) for SEO, GEO, and AEO optimization
 * Helps AI engines and search engines understand your content
 */
export function StructuredData() {
  // Person Schema - Tommy Kovatch
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Tommy Kovatch",
    "url": "https://tommykovatch.com",
    "email": "info@tommykovatch.com",
    "jobTitle": "Financial Advisor",
    "description": "Financial freedom expert and wealth building strategist helping individuals achieve financial independence",
    "knowsAbout": [
      "Financial Planning",
      "Wealth Building",
      "Investment Strategies",
      "Financial Freedom",
      "Retirement Planning",
      "Personal Finance"
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Tommy Kovatch Financial Services",
    "url": "https://tommykovatch.com",
    "email": "info@tommykovatch.com",
    "description": "Expert financial advisory services focused on helping clients achieve financial freedom and build lasting wealth",
    "founder": {
      "@type": "Person",
      "name": "Tommy Kovatch"
    },
    "areaServed": "United States",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Financial Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Financial Freedom Consultation",
            "description": "Personalized consultation to create your path to financial freedom"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wealth Building Strategy",
            "description": "Comprehensive wealth building strategies tailored to your goals"
          }
        }
      ]
    }
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Financial Advisory",
    "provider": {
      "@type": "Person",
      "name": "Tommy Kovatch",
      "url": "https://tommykovatch.com"
    },
    "areaServed": "United States",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://tommykovatch.com",
      "serviceType": "Online Consultation"
    },
    "description": "Professional financial advisory services to help you achieve financial freedom and build sustainable wealth"
  };

  // WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Tommy Kovatch",
    "url": "https://tommykovatch.com",
    "description": "Expert financial guidance for achieving financial freedom and building lasting wealth",
    "publisher": {
      "@type": "Person",
      "name": "Tommy Kovatch"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://tommykovatch.com/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // FAQ Schema - This is CRITICAL for AEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is financial freedom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Financial freedom is the state of having sufficient personal wealth to live without having to actively work for basic necessities. It means your assets generate enough income to cover your living expenses, giving you the freedom to pursue your passions and make choices without financial constraints."
        }
      },
      {
        "@type": "Question",
        "name": "How can Tommy Kovatch help me achieve financial freedom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tommy Kovatch provides personalized financial guidance and proven strategies to help you build wealth, create passive income streams, and achieve financial independence. Through one-on-one consultation, you'll receive a customized plan tailored to your unique financial situation and goals."
        }
      },
      {
        "@type": "Question",
        "name": "Who qualifies for financial advisory services?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Anyone serious about achieving financial freedom can benefit from professional financial guidance. Whether you're just starting your wealth-building journey or looking to optimize existing investments, personalized financial strategies can help you reach your goals faster."
        }
      },
      {
        "@type": "Question",
        "name": "What makes Tommy Kovatch different from other financial advisors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tommy Kovatch focuses on proven, actionable strategies for achieving true financial freedom. With a personalized approach and commitment to client success, the emphasis is on creating sustainable wealth-building systems rather than quick fixes."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get started with financial planning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Getting started is simple: schedule a free consultation to discuss your financial goals and current situation. From there, you'll receive a personalized assessment and customized strategy to begin your journey toward financial freedom."
        }
      }
    ]
  };

  // Video Object Schema (for the hero video)
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "Financial Freedom Strategy Overview",
    "description": "Learn how to achieve financial freedom with proven wealth-building strategies from Tommy Kovatch",
    "thumbnailUrl": "https://tommykovatch.com/video-thumbnail.jpg", // Update with actual thumbnail
    "uploadDate": "2026-02-01",
    "contentUrl": "https://tommykovatch.com",
    "embedUrl": "https://player.vimeo.com/video/1062042082?autoplay=1&muted=1&loop=1&background=0&controls=1"
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tommykovatch.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Financial Freedom Services",
        "item": "https://tommykovatch.com#services"
      }
    ]
  };

  return (
    <Helmet>
      {/* Person Schema */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      
      {/* Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      {/* Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      
      {/* Website Schema */}
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      
      {/* FAQ Schema - CRITICAL for AEO */}
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      
      {/* Video Schema */}
      <script type="application/ld+json">
        {JSON.stringify(videoSchema)}
      </script>
      
      {/* Breadcrumb Schema */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
