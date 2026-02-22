// Session-based tracking - creates one row per visit and updates it
import { getAffiliateData } from './affiliate';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzwdnwsVmaV26ft8SItFmSkGpoKdBVvKiu1rHbcAkmkvMiyCwTAE1obuXUpowBUfJvrrA/exec';

// Generate a unique session ID for this visitor
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('tommy_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('tommy_session_id', sessionId);
  }
  return sessionId;
};

// Get session start time in Central Time
const getSessionStartTime = (): string => {
  let startTime = sessionStorage.getItem('tommy_session_start');
  if (!startTime) {
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

// Track which video milestones have been sent
const VIDEO_MILESTONES_KEY = 'tommy_video_milestones';

const getSentMilestones = (): Set<number> => {
  const stored = sessionStorage.getItem(VIDEO_MILESTONES_KEY);
  if (stored) {
    try {
      return new Set(JSON.parse(stored));
    } catch (e) {
      return new Set();
    }
  }
  return new Set();
};

const markMilestoneSent = (milestone: number) => {
  const milestones = getSentMilestones();
  milestones.add(milestone);
  sessionStorage.setItem(VIDEO_MILESTONES_KEY, JSON.stringify([...milestones]));
};

// Queue for events that happen before session is ready
const eventQueue: Array<() => void> = [];
let processingQueue = false;

const queueEvent = (eventFn: () => void) => {
  const sessionCreated = sessionStorage.getItem('tommy_session_created');
  if (sessionCreated === 'true') {
    // Session is ready, execute immediately
    eventFn();
  } else {
    // Queue the event
    console.log('Queueing event until session is ready');
    eventQueue.push(eventFn);
  }
};

const processEventQueue = () => {
  if (processingQueue || eventQueue.length === 0) return;
  
  const sessionCreated = sessionStorage.getItem('tommy_session_created');
  if (sessionCreated !== 'true') return;
  
  processingQueue = true;
  console.log(`Processing ${eventQueue.length} queued events`);
  
  while (eventQueue.length > 0) {
    const eventFn = eventQueue.shift();
    if (eventFn) {
      eventFn();
    }
  }
  
  processingQueue = false;
};

// Create initial session row
export const createSession = async () => {
  console.log('🚀 createSession called');
  
  const sessionCreated = sessionStorage.getItem('tommy_session_created');
  console.log('Session already created?', sessionCreated);
  
  if (sessionCreated === 'true') {
    console.log('Session already created, skipping...');
    return;
  }

  try {
    const affiliateData = getAffiliateData();
    
    const payload = {
      action: 'createSession',
      sessionId: getSessionId(),
      startTime: getSessionStartTime(),
      source: 'tommykovatch.com', // Identify the source
      affiliateId: affiliateData.ref || '',  // Changed from affiliateData.affiliateId
      utmSource: affiliateData.utmSource || '',
      utmMedium: affiliateData.utmMedium || '',
      utmCampaign: affiliateData.utmCampaign || ''
    };

    console.log('📤 Creating session with payload:', payload);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for Google Apps Script "Anyone" deployments
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('✅ Session creation request sent (no-cors mode - cannot read response)');

    // Add a small delay to ensure the row is created in the sheet
    console.log('⏳ Waiting 1 second for sheet to update...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    sessionStorage.setItem('tommy_session_created', 'true');
    console.log('✅ Session created successfully - flag set');
    
    // Process any queued events
    processEventQueue();
  } catch (error) {
    // Even if the fetch fails, mark session as created so the app continues
    // The tracking is nice-to-have, not critical for user experience
    console.log('Session creation attempt completed (network may be offline)');
    sessionStorage.setItem('tommy_session_created', 'true');
    processEventQueue();
  }
};

// Update existing session row
export const updateSession = async (updates: {
  video_unmuted?: boolean;
  video_watch_percentage?: number;
  registration_submitted?: boolean;
  appointment_set?: boolean;
}) => {
  // Wait until session is created before attempting updates
  const sessionCreated = sessionStorage.getItem('tommy_session_created');
  if (sessionCreated !== 'true') {
    console.log('Session not ready yet, skipping update...');
    return;
  }

  try {
    const payload = {
      action: 'updateSession',
      sessionId: getSessionId(),
      ...updates
    };

    console.log('Updating session:', payload);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    console.log('Session updated successfully');
  } catch (error) {
    // Silently handle fetch errors - they're expected with no-cors mode
    // and shouldn't disrupt the user experience
    console.log('Session update sent (network may be offline)');
  }
};

// Track video unmuted
export const trackVideoUnmuted = () => {
  queueEvent(() => {
    const alreadyTracked = sessionStorage.getItem('tommy_video_unmuted');
    if (alreadyTracked === 'true') {
      return; // Only track first unmute
    }
    
    console.log('🔊 Tracking video unmuted');
    updateSession({ video_unmuted: true });
    sessionStorage.setItem('tommy_video_unmuted', 'true');
  });
};

// Track video progress at milestones only
export const trackVideoMilestone = (percent: number) => {
  queueEvent(() => {
    const milestones = [10, 25, 50, 75, 100];
    const sentMilestones = getSentMilestones();

    console.log(`Video at ${percent.toFixed(1)}% - Already sent: [${[...sentMilestones].join(', ')}]`);

    // Find the highest milestone crossed that hasn't been sent yet
    let highestMilestone = 0;
    for (const milestone of milestones) {
      if (percent >= milestone && !sentMilestones.has(milestone)) {
        highestMilestone = milestone;
      }
    }

    // Send update if we crossed a new milestone
    if (highestMilestone > 0) {
      console.log(`🎯 Crossing milestone: ${highestMilestone}%`);
      updateSession({ video_watch_percentage: highestMilestone });
      markMilestoneSent(highestMilestone);
    }
  });
};

// Track registration submitted
export const trackRegistrationSubmitted = () => {
  updateSession({ registration_submitted: true });
};

// Track appointment set
export const trackAppointmentSet = () => {
  updateSession({ appointment_set: true });
};

// Initialize session tracking on page load
export const initializeSessionTracking = () => {
  // Create session immediately
  console.log('🎬 initializeSessionTracking() called');
  console.log('Current sessionStorage state:', {
    sessionId: sessionStorage.getItem('tommy_session_id'),
    created: sessionStorage.getItem('tommy_session_created'),
    startTime: sessionStorage.getItem('tommy_session_start')
  });
  createSession();
};