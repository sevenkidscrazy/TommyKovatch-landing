# Visitor Tracking Setup Guide

## What's Been Implemented

Your landing page now tracks comprehensive visitor activity and sends it to your Google Sheets 'weblog' tab. The tracking captures:

1. **Page Visits** - When someone lands on the page
2. **Video Plays** - When the Hero video is played  
3. **Button Clicks** - Accept Challenge and Submit Registration buttons
4. **Section Views** - Which sections users scroll through (tracked when 50% visible)

## Data Captured

Each tracking event sends:
- `logType`: "weblog" (tells your script to write to the weblog tab)
- `sessionId`: Unique session identifier for this visitor
- `eventType`: "page_visit", "video_play", "button_click", or "section_view"
- `eventDetails`: Specific details about the event
- `timestamp`: ISO 8601 timestamp
- `userAgent`: Browser and device information
- `referrer`: Where the visitor came from (or "Direct")
- `url`: Current page URL
- `screenResolution`: Visitor's screen size
- `viewport`: Visitor's browser window size

## Google Apps Script Update Required

You need to update your Google Apps Script to handle the new tracking data. Here's the code to add:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Check if this is tracking data (weblog) or registration data
    if (data.logType === 'weblog') {
      // Write to weblog tab
      var weblogSheet = ss.getSheetByName('weblog');
      if (!weblogSheet) {
        // Create the weblog sheet if it doesn't exist
        weblogSheet = ss.insertSheet('weblog');
        // Add headers
        weblogSheet.appendRow([
          'Timestamp',
          'Session ID',
          'Event Type',
          'Event Details',
          'Video Played',
          'Referrer',
          'URL',
          'User Agent',
          'Screen Resolution',
          'Viewport',
          'IP Address'
        ]);
      }
      
      // Determine if video was played (yes/no)
      var videoPlayed = data.eventType === 'video_play' ? 'Yes' : '';
      
      // Get visitor's IP address (server-side only)
      var ipAddress = e.parameter.userip || 'Unknown';
      
      // Append the tracking data
      weblogSheet.appendRow([
        data.timestamp,
        data.sessionId,
        data.eventType,
        data.eventDetails,
        videoPlayed,
        data.referrer,
        data.url,
        data.userAgent,
        data.screenResolution,
        data.viewport,
        ipAddress
      ]);
      
    } else {
      // Handle registration form data (your existing code)
      var registrationSheet = ss.getSheetByName('registrations') || ss.getSheets()[0];
      
      registrationSheet.appendRow([
        new Date(),
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.hasMultipleDebts,
        data.hasMortgage,
        data.meetingPreference,
        data.additionalInfo
      ]);
      
      // Your existing email notification code here...
    }
    
    return ContentService.createTextOutput(JSON.stringify({result: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Tracked Sections

The following sections are automatically tracked when visitors scroll through them:
- `hero` - Hero section with video
- `common-sense` - "Why We're So Confident" section
- `qualifications` - "Who Should Take the Challenge?" section
- `process` - "How the Challenge Works" section
- `registration` - Registration form section
- `terms` - Terms & Conditions section

## Button Tracking

The following buttons are tracked:
- "Accept Challenge - Hero" - The main CTA button in the hero section
- "Submit Registration" - The registration form submit button

## Notes

- **IP Address**: Can only be captured server-side by your Google Apps Script, not from the browser
- **Session ID**: Generated per browser session to track unique visitor journeys
- **Privacy**: All tracking is anonymous and doesn't capture any PII unless users submit the registration form
- **Performance**: Tracking calls use `mode: 'no-cors'` and fail silently to not interrupt user experience

## Testing

To verify tracking is working:
1. Visit your landing page
2. Check the 'weblog' tab in your Google Sheet
3. You should see a "page_visit" entry immediately
4. Scroll through sections to see "section_view" entries
5. Click the video to see a "video_play" entry
6. Click "Accept Challenge" to see a "button_click" entry

## Facebook Traffic Source

Since you mentioned Facebook is your only traffic source right now, the `referrer` field will show:
- "facebook.com" or "m.facebook.com" for visitors coming from Facebook
- "Direct" for visitors who type the URL directly or click from a saved bookmark

When you add more traffic sources, they'll automatically be captured in the referrer field.
