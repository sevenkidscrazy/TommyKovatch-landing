# Tommy Landing Page - Google Sheets Setup Guide

## Overview
This is a **standalone** setup for the Tommy Landing Page with its own isolated Google Sheet and Google Apps Script. This will not interfere with your other two sites (kickoff and teamup).

---

## Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named: **"Tommy Landing Page"**
3. Create three tabs (sheets) with the exact names below:

### Tab 1: **Affiliate Roster** (READ ONLY)
This tab stores affiliate information for lookup purposes.

**Columns (Row 1 - Headers):**
```
A: Affiliate Name
B: Affiliate Code
C: Email
D: Phone
E: Status
F: Date Added
```

**Example Data (Row 2):**
```
John Smith | SMITH2024 | john@example.com | 555-1234 | Active | 02/14/2026
```

---

### Tab 2: **Tommy Reg**
This tab captures all registration form submissions.

**Columns (Row 1 - Headers):**
```
A: Timestamp
B: First Name
C: Last Name
D: Email
E: Phone
F: Age
G: Marital Status
H: Annual Income
I: Total Debt
J: Meeting Preference
K: Additional Info
L: Affiliate Ref
M: UTM Source
N: UTM Medium
O: UTM Campaign
P: Turnstile Token
```

---

### Tab 3: **Tommy Site Weblog**
This tab captures ONE ROW per visitor with their complete session engagement metrics.

**Columns (Row 1 - Headers):**
```
A: Session ID
B: Timestamp (Session Start)
C: Video Played
D: Sound Status
E: Percent Watched
F: Registration Submitted
G: Appointment Set
H: Affiliate Ref
I: UTM Source
J: UTM Medium
K: UTM Campaign
```

---

## Step 2: Deploy the Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy and paste the complete script below
4. Click **Save** (disk icon)
5. Name the project: **"Tommy Landing Page Script"**
6. Click **Deploy** → **New deployment**
7. Click the gear icon ⚙️ next to "Select type"
8. Choose **"Web app"**
9. Configure:
   - **Description:** Tommy Landing Page Handler
   - **Execute as:** Me
   - **Who has access:** Anyone
10. Click **Deploy**
11. **Copy the Web app URL** - you'll need this!

---

## Google Apps Script Code

```javascript
/**
 * Tommy Landing Page - Google Apps Script Handler
 * Handles registration submissions and video engagement tracking
 * 
 * TABS:
 * - Affiliate Roster (READ ONLY - for lookups)
 * - Tommy Reg (captures registration form data)
 * - Tommy Site Weblog (captures video engagement metrics - ONE ROW per session)
 */

// ===========================
// CONFIGURATION
// ===========================

const SHEET_NAME = 'Tommy Landing Page'; // Your Google Sheet name
const AFFILIATE_ROSTER_TAB = 'Affiliate Roster';
const TOMMY_REG_TAB = 'Tommy Reg';
const TOMMY_WEBLOG_TAB = 'Tommy Site Weblog';

// Notification email (optional - set to your email to receive alerts)
const NOTIFICATION_EMAIL = 'tommy@peacockcapitalpartners.com'; // Change this to your email

// ===========================
// MAIN HANDLER
// ===========================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const logType = data.logType;
    
    Logger.log('Received request with logType: ' + logType);
    
    // Route to appropriate handler based on logType
    if (logType === 'tommy reg') {
      return handleTommyRegistration(data);
    } else if (logType === 'tommy site weblog') {
      return handleTommyWeblog(data);
    } else {
      Logger.log('Unknown logType: ' + logType);
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Unknown logType'
      })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    Logger.log('Error in doPost: ' + error.message);
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ===========================
// REGISTRATION HANDLER
// ===========================

function handleTommyRegistration(data) {
  try {
    const ss = SpreadsheetApp.openByName(SHEET_NAME);
    const sheet = ss.getSheetByName(TOMMY_REG_TAB);
    
    if (!sheet) {
      throw new Error('Tommy Reg tab not found');
    }
    
    // Get affiliate name from Affiliate Roster (if ref provided)
    let affiliateName = '';
    if (data.affiliateRef) {
      affiliateName = lookupAffiliateName(data.affiliateRef);
    }
    
    // Get current Central Time
    const centralTime = getCentralTime();
    
    // Prepare row data
    const rowData = [
      centralTime,                    // A: Timestamp
      data.firstName || '',           // B: First Name
      data.lastName || '',            // C: Last Name
      data.email || '',               // D: Email
      data.phone || '',               // E: Phone
      data.age || '',                 // F: Age
      data.maritalStatus || '',       // G: Marital Status
      data.annualIncome || '',        // H: Annual Income
      data.totalDebt || '',           // I: Total Debt
      data.meetingPreference || '',   // J: Meeting Preference
      data.additionalInfo || '',      // K: Additional Info
      data.affiliateRef || '',        // L: Affiliate Ref
      data.utmSource || '',           // M: UTM Source
      data.utmMedium || '',           // N: UTM Medium
      data.utmCampaign || '',         // O: UTM Campaign
      data.turnstileToken || ''       // P: Turnstile Token
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    // Send email notification
    sendRegistrationEmail(data, affiliateName);
    
    Logger.log('Tommy registration recorded successfully');
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Registration recorded'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error in handleTommyRegistration: ' + error.message);
    throw error;
  }
}

// ===========================
// WEBLOG HANDLER (VIDEO TRACKING)
// ===========================

function handleTommyWeblog(data) {
  try {
    const ss = SpreadsheetApp.openByName(SHEET_NAME);
    const sheet = ss.getSheetByName(TOMMY_WEBLOG_TAB);
    
    if (!sheet) {
      throw new Error('Tommy Site Weblog tab not found');
    }
    
    const sessionId = data.sessionId;
    
    if (!sessionId) {
      throw new Error('No sessionId provided');
    }
    
    // Find existing row for this session
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    let rowIndex = -1;
    
    // Search for existing session (skip header row)
    for (let i = 1; i < values.length; i++) {
      if (values[i][0] === sessionId) { // Column A is Session ID
        rowIndex = i + 1; // Convert to 1-based index
        break;
      }
    }
    
    // Prepare row data
    const rowData = [
      sessionId,                                    // A: Session ID
      data.timestamp || getCentralTime(),           // B: Timestamp (Session Start)
      data.videoPlayed || 'No',                     // C: Video Played
      data.soundStatus || 'unknown',                // D: Sound Status
      data.percentWatched || 0,                     // E: Percent Watched
      data.registrationSubmitted || 'No',           // F: Registration Submitted
      data.appointmentSet || 'No',                  // G: Appointment Set
      data.affiliateData?.ref || '',                // H: Affiliate Ref
      data.affiliateData?.utmSource || '',          // I: UTM Source
      data.affiliateData?.utmMedium || '',          // J: UTM Medium
      data.affiliateData?.utmCampaign || ''         // K: UTM Campaign
    ];
    
    if (rowIndex > 0) {
      // UPDATE existing row - overwrite with latest metrics
      sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
      Logger.log('Updated existing weblog entry for session: ' + sessionId);
    } else {
      // INSERT new row
      sheet.appendRow(rowData);
      Logger.log('Created new weblog entry for session: ' + sessionId);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Weblog recorded'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error in handleTommyWeblog: ' + error.message);
    throw error;
  }
}

// ===========================
// AFFILIATE LOOKUP
// ===========================

function lookupAffiliateName(affiliateRef) {
  try {
    const ss = SpreadsheetApp.openByName(SHEET_NAME);
    const sheet = ss.getSheetByName(AFFILIATE_ROSTER_TAB);
    
    if (!sheet) {
      Logger.log('Affiliate Roster tab not found');
      return '';
    }
    
    const dataRange = sheet.getDataRange();
    const values = dataRange.getValues();
    
    // Search for affiliate by code (Column B)
    for (let i = 1; i < values.length; i++) {
      if (values[i][1] === affiliateRef) { // Column B is Affiliate Code
        return values[i][0]; // Return Column A (Affiliate Name)
      }
    }
    
    return ''; // Not found
  } catch (error) {
    Logger.log('Error looking up affiliate: ' + error.message);
    return '';
  }
}

// ===========================
// EMAIL NOTIFICATION
// ===========================

function sendRegistrationEmail(data, affiliateName) {
  try {
    if (!NOTIFICATION_EMAIL) {
      Logger.log('No notification email configured');
      return;
    }
    
    const subject = '🎯 New Tommy Landing Page Registration';
    
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1e40af; border-bottom: 3px solid #10b981; padding-bottom: 10px;">
          New Registration Received
        </h2>
        
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
        </div>
        
        <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Qualifying Information</h3>
          <p><strong>Age:</strong> ${data.age}</p>
          <p><strong>Marital Status:</strong> ${data.maritalStatus}</p>
          <p><strong>Annual Income:</strong> ${data.annualIncome}</p>
          <p><strong>Total Debt:</strong> ${data.totalDebt}</p>
        </div>
        
        ${data.additionalInfo ? `
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Additional Information</h3>
          <p>${data.additionalInfo}</p>
        </div>
        ` : ''}
        
        ${data.affiliateRef ? `
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Affiliate/UTM Data</h3>
          <p><strong>Affiliate:</strong> ${affiliateName || data.affiliateRef}</p>
          ${data.utmSource ? `<p><strong>UTM Source:</strong> ${data.utmSource}</p>` : ''}
          ${data.utmMedium ? `<p><strong>UTM Medium:</strong> ${data.utmMedium}</p>` : ''}
          ${data.utmCampaign ? `<p><strong>UTM Campaign:</strong> ${data.utmCampaign}</p>` : ''}
        </div>
        ` : ''}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 12px;">
          <p>This registration was submitted from the Tommy Landing Page.</p>
          <p>View the full spreadsheet: <a href="${SpreadsheetApp.openByName(SHEET_NAME).getUrl()}" style="color: #1e40af;">Tommy Landing Page Sheet</a></p>
        </div>
      </div>
    `;
    
    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: subject,
      htmlBody: htmlBody
    });
    
    Logger.log('Email notification sent to: ' + NOTIFICATION_EMAIL);
    
  } catch (error) {
    Logger.log('Error sending email: ' + error.message);
    // Don't throw - we don't want email failures to block the registration
  }
}

// ===========================
// UTILITY FUNCTIONS
// ===========================

function getCentralTime() {
  return Utilities.formatDate(
    new Date(),
    'America/Chicago',
    'MM/dd/yyyy hh:mm:ss a'
  );
}

// ===========================
// TEST FUNCTIONS (for debugging)
// ===========================

function testRegistration() {
  const testData = {
    logType: 'tommy reg',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '555-1234',
    age: '36-49',
    maritalStatus: 'married',
    annualIncome: '$100k to $200k',
    totalDebt: '$25k - $100k',
    meetingPreference: 'calendly',
    additionalInfo: 'This is a test registration',
    affiliateRef: 'SMITH2024',
    utmSource: 'google',
    utmMedium: 'cpc',
    utmCampaign: 'test-campaign',
    turnstileToken: 'test-token'
  };
  
  Logger.log('Running test registration...');
  const result = handleTommyRegistration(testData);
  Logger.log('Test result: ' + result);
}

function testWeblog() {
  const testData = {
    logType: 'tommy site weblog',
    sessionId: 'test_session_123',
    timestamp: getCentralTime(),
    videoPlayed: 'Yes',
    soundStatus: 'on',
    percentWatched: 75,
    registrationSubmitted: 'Yes',
    appointmentSet: 'No',
    affiliateData: {
      ref: 'SMITH2024',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'test-campaign'
    }
  };
  
  Logger.log('Running test weblog...');
  const result = handleTommyWeblog(testData);
  Logger.log('Test result: ' + result);
}
```

---

## Step 3: Update Your Website

After deploying the script, you'll receive a Web app URL that looks like:
```
https://script.google.com/macros/s/AKfycby...LONG_STRING.../exec
```

**You need to update THREE files in your Figma Make project:**

1. Open `/src/app/utils/tracking.ts`
   - Replace `YOUR_TOMMY_LANDING_PAGE_SCRIPT_URL_HERE` with your actual URL

2. Open `/src/app/utils/videoTracking.ts`
   - Replace `YOUR_TOMMY_LANDING_PAGE_SCRIPT_URL_HERE` with your actual URL

3. Open `/src/app/components/RegistrationSection.tsx`
   - Replace `YOUR_TOMMY_LANDING_PAGE_SCRIPT_URL_HERE` with your actual URL

---

## Step 4: Test Your Setup

1. **Test in Apps Script:**
   - In the Apps Script editor, click the function dropdown (next to Debug)
   - Select `testRegistration` and click Run
   - Check the Execution log for success
   - Verify a test row appears in the "Tommy Reg" tab

2. **Test from Website:**
   - Fill out the registration form on your website
   - Submit it
   - Check the "Tommy Reg" tab for the new entry
   - Check your email for the notification

3. **Test Video Tracking:**
   - Visit your website
   - Play the video
   - Leave the page (or switch tabs)
   - Check the "Tommy Site Weblog" tab for your session

---

## Email Configuration

To receive email notifications when someone registers:

1. Open the Google Apps Script
2. Find this line near the top:
   ```javascript
   const NOTIFICATION_EMAIL = 'tommy@peacockcapitalpartners.com';
   ```
3. Replace with your actual email address
4. Save and redeploy

---

## Troubleshooting

### Problem: "Tommy Reg tab not found" error
**Solution:** Make sure your Google Sheet has tabs named exactly:
- `Affiliate Roster`
- `Tommy Reg`
- `Tommy Site Weblog`

### Problem: No data appearing in sheets
**Solution:**
1. Check the browser console for errors
2. Verify the script URL is correct in all three files
3. Make sure the script is deployed as "Anyone" can access

### Problem: Email notifications not working
**Solution:**
1. Verify `NOTIFICATION_EMAIL` is set correctly
2. Check your spam folder
3. Run the `testRegistration` function to see error logs

---

## Data Privacy & Security Notes

- ✅ This is an isolated setup - no interference with kickoff or teamup sites
- ✅ Cloudflare Turnstile tokens are captured for bot protection verification
- ✅ Affiliate data is looked up from the READ-ONLY "Affiliate Roster" tab
- ✅ Video engagement tracking uses ONE ROW per session (updates the same row)
- ✅ All timestamps are in Central Time (America/Chicago)
- ⚠️ Remember: Figma Make is not meant for collecting PII or securing highly sensitive data

---

## Success! ✅

Your Tommy Landing Page now has its own dedicated Google Sheet that won't interfere with your other sites!
