// Visitor tracking utility for Google Sheets weblog
import { getAffiliateData } from './affiliate';

// NEW GOOGLE APPS SCRIPT URL FOR TOMMY LANDING PAGE
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxpz7jqZ4NcNYDe73coKngswskHMc0aNuvjTTBL043Z0Ls8I0xkI0Y57d-VoSwGiNbHZg/exec';

interface TrackingData {
  eventType: 'page_visit' | 'video_play' | 'button_click' | 'section_view';
  eventDetails?: string;
  timestamp?: string;
  userAgent?: string;
  referrer?: string;
  url?: string;
}

// Generate a unique session ID for this visitor
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('visitor_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('visitor_session_id', sessionId);
  }
  return sessionId;
};

// Send tracking data to Google Sheets
export const trackEvent = async (data: TrackingData) => {
  try {
    // Get current time in Central Time (America/Chicago)
    const centralTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    
    // Get affiliate data and apply defaults like registration form does
    const affiliateData = getAffiliateData();
    const trackingData = {
      affiliateRef: affiliateData.ref || '',
      utmSource: affiliateData.utmSource || 'tommykovatch.com',
      utmMedium: affiliateData.utmMedium || 'website',
      utmCampaign: affiliateData.utmCampaign || 'organic'
    };
    
    const trackingPayload = {
      logType: 'weblog', // This tells the Google Apps Script to write to the 'weblog' tab
      source: 'tommykovatch.com', // Identify the source (same as registration)
      sessionId: getSessionId(),
      eventType: data.eventType,
      eventDetails: data.eventDetails || '',
      timestamp: centralTime,
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct',
      url: window.location.href,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      affiliateRef: trackingData.affiliateRef,
      utmSource: trackingData.utmSource,
      utmMedium: trackingData.utmMedium,
      utmCampaign: trackingData.utmCampaign
    };

    console.log('Sending tracking event:', trackingPayload); // Debug log

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackingPayload)
    });
    
    console.log('Tracking sent successfully'); // Debug log
  } catch (error) {
    console.error('Tracking error:', error);
    // Silently fail - don't interrupt user experience
  }
};

// Track page visit on load
export const trackPageVisit = () => {
  trackEvent({
    eventType: 'page_visit',
    eventDetails: 'Landing page loaded'
  });
};

// Track video play
export const trackVideoPlay = () => {
  trackEvent({
    eventType: 'video_play',
    eventDetails: 'Hero video played'
  });
};

// Track button clicks
export const trackButtonClick = (buttonName: string) => {
  trackEvent({
    eventType: 'button_click',
    eventDetails: buttonName
  });
};

// Track section views
export const trackSectionView = (sectionName: string) => {
  trackEvent({
    eventType: 'section_view',
    eventDetails: sectionName
  });
};

// Set up Intersection Observer to track section views
export const setupSectionTracking = () => {
  const trackedSections = new Set<string>();
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const sectionId = entry.target.id;
          if (sectionId && !trackedSections.has(sectionId)) {
            trackedSections.add(sectionId);
            trackSectionView(sectionId);
          }
        }
      });
    },
    {
      threshold: 0.5, // Track when 50% of section is visible
      rootMargin: '0px'
    }
  );

  // Observe all sections
  const sections = document.querySelectorAll('section[id]');
  sections.forEach((section) => observer.observe(section));

  return () => observer.disconnect();
};