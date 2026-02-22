// Enhanced video tracking for Tommy Site Weblog
import { getAffiliateData } from './affiliate';

// NEW GOOGLE APPS SCRIPT URL FOR TOMMY LANDING PAGE
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxpz7jqZ4NcNYDe73coKngswskHMc0aNuvjTTBL043Z0Ls8I0xkI0Y57d-VoSwGiNbHZg/exec';

interface VideoMetrics {
  soundStatus: 'on' | 'muted' | 'unknown';
  percentWatched: number;
  registrationSubmitted: boolean;
  appointmentSet: boolean;
  videoPlayed: boolean;
  sessionStartTime: string; // Store the session start timestamp
}

// Generate a unique session ID for this visitor
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('tommy_session_id');
  if (!sessionId) {
    sessionId = `tommy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('tommy_session_id', sessionId);
  }
  return sessionId;
};

// Get session start time (when page first loaded)
const getSessionStartTime = (): string => {
  let startTime = sessionStorage.getItem('tommy_session_start');
  if (!startTime) {
    // Capture the time in Central Time when session starts
    startTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    sessionStorage.setItem('tommy_session_start', startTime);
  }
  return startTime;
};

// Store video metrics in session storage
const METRICS_KEY = 'tommy_video_metrics';
const SENT_FLAG_KEY = 'tommy_metrics_sent';

export const getVideoMetrics = (): VideoMetrics => {
  const stored = sessionStorage.getItem(METRICS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      // If parsing fails, return defaults
    }
  }
  
  return {
    soundStatus: 'unknown',
    percentWatched: 0,
    registrationSubmitted: false,
    appointmentSet: false,
    videoPlayed: false,
    sessionStartTime: getSessionStartTime()
  };
};

export const updateVideoMetrics = (updates: Partial<VideoMetrics>) => {
  const current = getVideoMetrics();
  const updated = { ...current, ...updates };
  sessionStorage.setItem(METRICS_KEY, JSON.stringify(updated));
};

// Check if metrics have already been sent this session
const hasMetricsBeenSent = (): boolean => {
  return sessionStorage.getItem(SENT_FLAG_KEY) === 'true';
};

// Mark metrics as sent
const markMetricsAsSent = () => {
  sessionStorage.setItem(SENT_FLAG_KEY, 'true');
};

const sendMetricsToSheet = async (metrics: VideoMetrics) => {
  // CRITICAL: Only send once per session
  if (hasMetricsBeenSent()) {
    console.log('Metrics already sent this session, skipping...');
    return;
  }

  try {
    const trackingPayload = {
      logType: 'tommy site weblog', // This tells Google Apps Script which tab to write to
      sessionId: getSessionId(),
      timestamp: metrics.sessionStartTime, // Use the session start time, not current time
      videoPlayed: metrics.videoPlayed ? 'Yes' : 'No',
      soundStatus: metrics.soundStatus,
      percentWatched: Math.round(metrics.percentWatched),
      registrationSubmitted: metrics.registrationSubmitted ? 'Yes' : 'No',
      appointmentSet: metrics.appointmentSet ? 'Yes' : 'No',
      affiliateData: getAffiliateData()
    };

    console.log('Sending final video metrics:', trackingPayload);

    // Mark as sent BEFORE the fetch to prevent race conditions
    markMetricsAsSent();

    // Use fetch with keepalive for reliable delivery on page unload
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true, // Important for beforeunload events
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackingPayload)
    });
    
    console.log('Video metrics sent successfully');
  } catch (error) {
    console.error('Video tracking error:', error);
    // Silently fail - don't interrupt user experience
  }
};

// Track video sound status
export const trackSoundStatus = (isMuted: boolean) => {
  updateVideoMetrics({ soundStatus: isMuted ? 'muted' : 'on' });
  // Don't send, just capture
};

// Track video watch percentage
export const trackVideoProgress = (percent: number) => {
  const current = getVideoMetrics();
  // Only update if new percentage is higher
  if (percent > current.percentWatched) {
    updateVideoMetrics({ percentWatched: percent, videoPlayed: true });
  }
  // Don't send, just capture
};

// Track registration submission
export const trackRegistrationSubmitted = () => {
  updateVideoMetrics({ registrationSubmitted: true });
  // SEND IMMEDIATELY - this is a key action
  const metrics = getVideoMetrics();
  sendMetricsToSheet(metrics);
};

// Track appointment set
export const trackAppointmentSet = () => {
  updateVideoMetrics({ appointmentSet: true });
  // Don't send, just capture - will be sent when they leave or already sent on registration
};

// Initialize tracking on page load
export const initializeVideoTracking = () => {
  // Initialize session start time and metrics
  getSessionStartTime();
  getVideoMetrics();
  
  // Send metrics when user leaves the page (final state)
  window.addEventListener('beforeunload', () => {
    const metrics = getVideoMetrics();
    sendMetricsToSheet(metrics);
  });
  
  // Also send on visibility change (when tab is hidden)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const metrics = getVideoMetrics();
      sendMetricsToSheet(metrics);
    }
  });
};