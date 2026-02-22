// Affiliate and UTM tracking utility

export interface AffiliateData {
  ref: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

const STORAGE_KEY = 'pcp_affiliate_data';

/**
 * Captures URL parameters (ref, utm_source, utm_medium, utm_campaign)
 * and stores them in localStorage for the session
 */
export const captureAffiliateData = (): AffiliateData => {
  // Get URL parameters first
  const urlParams = new URLSearchParams(window.location.search);
  
  // Check if there are any affiliate params in the current URL
  const hasAffiliateParams = urlParams.has('ref') || 
                             urlParams.has('utm_source') || 
                             urlParams.has('utm_medium') || 
                             urlParams.has('utm_campaign');
  
  // If URL has params, always use those (override any stored data)
  if (hasAffiliateParams) {
    const affiliateData: AffiliateData = {
      ref: urlParams.get('ref') || '',
      utmSource: urlParams.get('utm_source') || '',
      utmMedium: urlParams.get('utm_medium') || '',
      utmCampaign: urlParams.get('utm_campaign') || '',
    };

    // Store in localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(affiliateData));

    console.log('Affiliate data captured:', affiliateData);

    return affiliateData;
  }
  
  // Otherwise, check if we have stored data
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsedData = JSON.parse(stored);
      console.log('Using stored affiliate data:', parsedData);
      return parsedData;
    } catch (e) {
      // If parsing fails, continue to return empty data
    }
  }

  // No URL params and no stored data - return empty
  const emptyData: AffiliateData = {
    ref: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyData));
  console.log('No affiliate data found');
  
  return emptyData;
};

/**
 * Gets the stored affiliate data from localStorage
 */
export const getAffiliateData = (): AffiliateData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // Return empty data if parsing fails
    }
  }

  // Return empty data if nothing stored
  return {
    ref: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
  };
};

/**
 * Clears the stored affiliate data (useful for testing)
 */
export const clearAffiliateData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};