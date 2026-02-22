# Google Apps Script - Updated for Session-Based Tracking

This script needs to be deployed as a container-bound script in your "Tommy Landing Page" Google Sheet.

## Required Sheet Structure

### Sheet 1: "Tommy Site Weblog" 
Columns (Row 1 - Headers):
- A: session_id
- B: start_time
- C: video_unmuted
- D: video_watch_percentage
- E: registration_submitted
- F: appointment_set
- G: affiliate_id
- H: utm_source
- I: utm_medium
- J: utm_campaign

### Sheet 2: "Tommy Reg"
Columns (Row 1 - Headers):
- A: Timestamp
- B: First Name
- C: Last Name
- D: Email
- E: Phone
- F: Age
- G: Marital Status
- H: Annual Income
- I: Total Debt
- J: Additional Info
- K: Turnstile Token
- L: Affiliate Ref
- M: UTM Source
- N: UTM Medium
- O: UTM Campaign

---

## Complete Google Apps Script Code

```javascript
// Tommy Landing Page - Unified tracking script with session-based weblog

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    console.log('Received data:', data);
    
    const action = data.action;
    
    // Route to appropriate handler based on action
    if (action === 'createSession') {
      return handleCreateSession(data);
    } else if (action === 'updateSession') {
      return handleUpdateSession(data);
    } else if (data.logType === 'tommy reg') {
      return handleRegistration(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error',
      message: 'Unknown action' 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error',
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Create a new session row
function handleCreateSession(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const weblogSheet = ss.getSheetByName('Tommy Site Weblog');
  
  if (!weblogSheet) {
    throw new Error('Tommy Site Weblog sheet not found');
  }
  
  // Append new row with initial data
  weblogSheet.appendRow([
    data.sessionId,               // session_id
    data.startTime,               // start_time
    'No',                         // video_unmuted (default)
    0,                            // video_watch_percentage (default)
    'No',                         // registration_submitted (default)
    'No',                         // appointment_set (default)
    data.affiliateId || '',       // affiliate_id
    data.utmSource || '',         // utm_source
    data.utmMedium || '',         // utm_medium
    data.utmCampaign || ''        // utm_campaign
  ]);
  
  console.log('Session created:', data.sessionId);
  
  return ContentService.createTextOutput(JSON.stringify({ 
    status: 'success',
    message: 'Session created' 
  })).setMimeType(ContentService.MimeType.JSON);
}

// Update an existing session row
function handleUpdateSession(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const weblogSheet = ss.getSheetByName('Tommy Site Weblog');
  
  if (!weblogSheet) {
    throw new Error('Tommy Site Weblog sheet not found');
  }
  
  // Find the row with matching session_id (column A)
  const sessionIds = weblogSheet.getRange('A:A').getValues();
  let rowIndex = -1;
  
  for (let i = 1; i < sessionIds.length; i++) { // Start from 1 to skip header
    if (sessionIds[i][0] === data.sessionId) {
      rowIndex = i + 1; // +1 because getValues() is 0-indexed but rows are 1-indexed
      break;
    }
  }
  
  if (rowIndex === -1) {
    console.error('Session not found:', data.sessionId);
    return ContentService.createTextOutput(JSON.stringify({ 
      status: 'error',
      message: 'Session not found' 
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  // Update specific columns based on what's provided
  if (data.video_unmuted !== undefined) {
    weblogSheet.getRange(rowIndex, 3).setValue(data.video_unmuted ? 'Yes' : 'No');
  }
  
  if (data.video_watch_percentage !== undefined) {
    weblogSheet.getRange(rowIndex, 4).setValue(data.video_watch_percentage);
  }
  
  if (data.registration_submitted !== undefined) {
    weblogSheet.getRange(rowIndex, 5).setValue(data.registration_submitted ? 'Yes' : 'No');
  }
  
  if (data.appointment_set !== undefined) {
    weblogSheet.getRange(rowIndex, 6).setValue(data.appointment_set ? 'Yes' : 'No');
  }
  
  console.log('Session updated:', data.sessionId);
  
  return ContentService.createTextOutput(JSON.stringify({ 
    status: 'success',
    message: 'Session updated' 
  })).setMimeType(ContentService.MimeType.JSON);
}

// Handle registration submissions
function handleRegistration(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const regSheet = ss.getSheetByName('Tommy Reg');
  
  if (!regSheet) {
    throw new Error('Tommy Reg sheet not found');
  }
  
  // Format timestamp
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  
  // Append registration data
  regSheet.appendRow([
    timestamp,
    data.firstName || '',
    data.lastName || '',
    data.email || '',
    data.phone || '',
    data.age || '',
    data.maritalStatus || '',
    data.annualIncome || '',
    data.totalDebt || '',
    data.additionalInfo || '',
    data.turnstileToken || '',
    data.affiliateRef || '',
    data.utmSource || '',
    data.utmMedium || '',
    data.utmCampaign || ''
  ]);
  
  // Send email notification
  try {
    const subject = '🎯 New Tommy Landing Page Registration';
    const body = `
New Registration Received:

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
Phone: ${data.phone}

Qualifying Info:
- Age: ${data.age}
- Marital Status: ${data.maritalStatus}
- Annual Income: ${data.annualIncome}
- Total Debt: ${data.totalDebt}

Additional Info:
${data.additionalInfo || 'None provided'}

Tracking:
- Affiliate Ref: ${data.affiliateRef || 'None'}
- UTM Source: ${data.utmSource || 'None'}
- UTM Medium: ${data.utmMedium || 'None'}
- UTM Campaign: ${data.utmCampaign || 'None'}

Timestamp: ${timestamp}
    `;
    
    // Send to your email - CHANGE THIS TO YOUR EMAIL
    MailApp.sendEmail({
      to: 'your-email@example.com',
      subject: subject,
      body: body
    });
    
    console.log('Registration saved and email sent');
  } catch (emailError) {
    console.error('Email error:', emailError);
    // Don't fail the whole request if email fails
  }
  
  return ContentService.createTextOutput(JSON.stringify({ 
    status: 'success',
    message: 'Registration saved' 
  })).setMimeType(ContentService.MimeType.JSON);
}
```

---

## Deployment Instructions

1. Open your "Tommy Landing Page" Google Sheet
2. Go to Extensions → Apps Script
3. Delete any existing code and paste the complete script above
4. **Important**: Change the email address in the `handleRegistration` function to your actual email
5. Save the script (Ctrl+S or Cmd+S)
6. Click "Deploy" → "New deployment"
7. Choose type: "Web app"
8. Settings:
   - Execute as: Me
   - Who has access: Anyone
9. Click "Deploy"
10. Copy the deployment URL - it should match the one in your frontend code

---

## Testing

After deployment, test the flow:

1. Load the landing page
2. Check "Tommy Site Weblog" - should see a new row with session_id and start_time
3. Play the video and unmute it
4. Watch past 10%, 25%, etc. - the video_watch_percentage column should update
5. Submit the registration form
6. Check that registration_submitted changes to "Yes"
7. Complete Calendly booking
8. Check that appointment_set changes to "Yes"

Each visit should create exactly ONE row that gets updated as the user interacts with the page.
