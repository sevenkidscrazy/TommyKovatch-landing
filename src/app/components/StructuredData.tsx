import { Helmet } from 'react-helmet-async';

/**
 * Structured Data (JSON-LD) for SEO, GEO, and AEO optimization
 * Helps AI engines and search engines understand your content
 */
export function StructuredData() {
  // Person Schema - Tommy Kovatch (ENHANCED: Debt Elimination Focus)
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Tommy Kovatch",
    "url": "https://tommykovatch.com",
    "email": "info@tommykovatch.com",
    "jobTitle": "Debt Elimination Specialist & Financial Strategist",
    "description": "Debt elimination expert helping clients pay off mortgages and debt 10-20 years faster while building substantial wealth through budget-neutral strategies",
    "expertise": [
      "Debt Elimination",
      "Debt Management",
      "Wealth Creation",
      "Financial Restructuring",
      "Mortgage Acceleration",
      "Interest Optimization"
    ],
    "knowsAbout": [
      "Debt Elimination Strategies",
      "Budget-Neutral Debt Payoff",
      "Mortgage Acceleration",
      "Interest Rate Optimization",
      "Wealth Building While Eliminating Debt",
      "Financial Freedom Planning",
      "Debt Restructuring",
      "Capital Accumulation Strategies"
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Tommy Kovatch Financial Services",
    "url": "https://tommykovatch.com",
    "email": "info@tommykovatch.com",
    "description": "Expert debt elimination and financial advisory services helping clients eliminate debt 10-20 years faster, save hundreds of thousands in interest, and build lasting wealth",
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
            "name": "Debt Elimination Strategy Consultation",
            "description": "Personalized debt elimination plan to pay off debt 10-20 years faster without increasing monthly payments"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Budget-Neutral Wealth Building",
            "description": "Build substantial wealth while eliminating debt through strategic financial restructuring"
          }
        }
      ]
    }
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Debt Elimination & Financial Advisory",
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
    "description": "Professional debt elimination services helping clients pay off mortgages and debt 10-20 years faster while building substantial wealth through proven budget-neutral strategies"
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

  // FAQ Schema - DEBT ELIMINATION FOCUSED (matches visible FAQ section)
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
        "name": "How can Tommy help me achieve financial freedom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tommy provides personalized financial guidance and proven strategies to help you build wealth, create passive income streams, and achieve financial independence. Through one-on-one consultation, you'll receive a customized plan tailored to your unique financial situation and goals."
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
        "name": "What makes Tommy different from other financial advisors?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tommy focuses on proven, actionable strategies for achieving true financial freedom. With a personalized approach and commitment to client success, the emphasis is on creating sustainable wealth-building systems rather than quick fixes."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get started with financial planning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Getting started is simple: schedule a free consultation to discuss your financial goals and current situation. From there, you'll receive a personalized assessment and customized strategy to begin your journey toward financial freedom."
        }
      },
      {
        "@type": "Question",
        "name": "What should I expect during the consultation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "During your consultation, we'll review your current financial situation, discuss your short-term and long-term goals, and identify opportunities for wealth building. You'll leave with actionable insights and a clear path forward toward achieving financial freedom."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to achieve financial freedom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The timeline varies based on your starting point, goals, and commitment to the strategy. Some clients see significant progress within 12-24 months, while building substantial wealth typically takes 3-7 years with consistent implementation of proven strategies."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need a lot of money to get started?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Financial freedom strategies can be tailored to any starting point. The key is having the right knowledge, strategy, and commitment to building wealth over time. Many successful clients started with limited resources but achieved significant results through smart planning and execution."
        }
      },
      {
        "@type": "Question",
        "name": "How can I eliminate debt faster without increasing my monthly payments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Through strategic debt restructuring and budget-neutral strategies, you can redirect existing cash flow to eliminate debt 10-20 years faster. This involves optimizing interest rates, structuring debt payoff sequences, and utilizing financial instruments strategically - all without increasing your current monthly budget."
        }
      },
      {
        "@type": "Question",
        "name": "What is budget-neutral debt elimination?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Budget-neutral debt elimination means paying off your debt significantly faster without increasing your monthly expenses. By restructuring how you allocate your existing income and optimizing interest rates, you can save hundreds of thousands of dollars in interest and achieve debt freedom years or even decades earlier."
        }
      },
      {
        "@type": "Question",
        "name": "How much interest can I save by restructuring my debt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Interest savings vary based on your total debt, current interest rates, and debt structure. Clients typically save between $50,000 to $250,000+ in interest over the life of their debt. For example, eliminating a 30-year mortgage in 10 years instead can save over $200,000 in interest on a $500,000 loan."
        }
      },
      {
        "@type": "Question",
        "name": "Can I build wealth while paying off debt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Through strategic financial planning, you can simultaneously eliminate debt and accumulate capital. Our clients typically build $75,000 to $500,000+ in liquid capital while aggressively paying down debt, creating both debt freedom and substantial wealth at the same time."
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

  // Case Studies as Reviews Schema (TIER 1 ADDITION)
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Debt Elimination Success Stories",
    "description": "Real client results showing debt payoff acceleration and interest savings",
    "itemListElement": [
      {
        "@type": "Review",
        "position": 1,
        "author": {
          "@type": "Person",
          "name": "John B."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "itemReviewed": {
          "@type": "Service",
          "name": "Debt Elimination Strategy",
          "provider": {
            "@type": "Person",
            "name": "Tommy Kovatch"
          }
        },
        "reviewBody": "Reduced total debt of $940,730 from a 30.1 year payoff timeline to just 9.9 years. Saved $225,600 in interest and accumulated $517,420 in capital through budget-neutral debt elimination strategy."
      },
      {
        "@type": "Review",
        "position": 2,
        "author": {
          "@type": "Person",
          "name": "Ricky & Melinda J."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "itemReviewed": {
          "@type": "Service",
          "name": "Debt Elimination Strategy",
          "provider": {
            "@type": "Person",
            "name": "Tommy Kovatch"
          }
        },
        "reviewBody": "Accelerated payoff of $443,801 in debt from 27.8 years to 9.5 years. Saved $56,437 in interest and accumulated $77,650 in liquid capital while eliminating debt faster."
      },
      {
        "@type": "Review",
        "position": 3,
        "author": {
          "@type": "Person",
          "name": "John M."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "itemReviewed": {
          "@type": "Service",
          "name": "Debt Elimination Strategy",
          "provider": {
            "@type": "Person",
            "name": "Tommy Kovatch"
          }
        },
        "reviewBody": "Cut debt payoff timeline on $495,945 from 27.4 years to 9.08 years. Saved $74,671 in interest and built $129,137 in capital accumulation."
      },
      {
        "@type": "Review",
        "position": 4,
        "author": {
          "@type": "Person",
          "name": "Mark & Kimberly O."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "itemReviewed": {
          "@type": "Service",
          "name": "Debt Elimination Strategy",
          "provider": {
            "@type": "Person",
            "name": "Tommy Kovatch"
          }
        },
        "reviewBody": "Reduced $500,122 in debt from 27.9 year payoff to 9.3 years. Saved $74,556 in interest and accumulated $125,346 in capital."
      },
      {
        "@type": "Review",
        "position": 5,
        "author": {
          "@type": "Person",
          "name": "Caleb K."
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "itemReviewed": {
          "@type": "Service",
          "name": "Debt Elimination Strategy",
          "provider": {
            "@type": "Person",
            "name": "Tommy Kovatch"
          }
        },
        "reviewBody": "Accelerated $461,028 in debt from 27.4 years to 9.3 years. Saved $106,300 in interest and built $259,750 in capital while eliminating debt."
      }
    ]
  };

  // Aggregate Rating Schema (TIER 1 ADDITION)
  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Tommy Kovatch Debt Elimination Services",
    "description": "Expert debt elimination strategies helping clients pay off debt 10-20 years faster",
    "provider": {
      "@type": "Person",
      "name": "Tommy Kovatch"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "5",
      "bestRating": "5",
      "worstRating": "5"
    }
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

      {/* TIER 1: Case Studies Reviews Schema */}
      <script type="application/ld+json">
        {JSON.stringify(reviewsSchema)}
      </script>

      {/* TIER 1: Aggregate Rating Schema */}
      <script type="application/ld+json">
        {JSON.stringify(aggregateRatingSchema)}
      </script>
    </Helmet>
  );
}