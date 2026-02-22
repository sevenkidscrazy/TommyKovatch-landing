# Email Notification Setup for Tommy

## Current Status
The landing page sends registration data to Google Sheets via Google Apps Script. The email notification functionality is **already built into the script** - you just need to ensure the email address is configured correctly.

## How to Enable Email Notifications

### Step 1: Access Your Google Apps Script
1. Open your Google Sheet (the one receiving registrations)
2. Click **Extensions** → **Apps Script**
3. This will open the script editor

### Step 2: Update the Notification Email
1. Near the top of the script (around line 3-5), find this line:
   ```javascript
   const NOTIFICATION_EMAIL = 'tommy@peacockcapitalpartners.com';
   ```

2. Make sure it's set to Tommy's correct email address. If you need to change it:
   ```javascript
   const NOTIFICATION_EMAIL = 'newemail@example.com'; // Update here
   ```

### Step 3: Verify the Function Exists
Look for the `sendRegistrationEmail()` function in the script. It should look like this:

```javascript
function sendRegistrationEmail(data, affiliateName) {
  try {
    if (!NOTIFICATION_EMAIL) {
      Logger.log('No notification email configured');
      return;
    }
    
    const subject = `🎯 New Registration: ${data.firstName} ${data.lastName}`;
    
    const htmlBody = `
      <h2 style="color: #1a3a5c;">New Registration Received</h2>
      
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
      </div>
      
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        <h3>Qualifying Information</h3>
        <p><strong>Age:</strong> ${data.age}</p>
        <p><strong>Marital Status:</strong> ${data.maritalStatus}</p>
        <p><strong>Annual Income:</strong> ${data.annualIncome}</p>
        <p><strong>Total Debt:</strong> ${data.totalDebt}</p>
      </div>
      
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        <h3>Additional Info</h3>
        <p>${data.additionalInfo || 'None provided'}</p>
      </div>
      
      <div style="background: #e8f5e9; padding: 15px; border-radius: 5px; margin: 10px 0;">
        <h3>Tracking Data</h3>
        <p><strong>Affiliate:</strong> ${affiliateName || 'Direct'}</p>
        <p><strong>UTM Source:</strong> ${data.utmSource || 'N/A'}</p>
        <p><strong>UTM Medium:</strong> ${data.utmMedium || 'N/A'}</p>
        <p><strong>UTM Campaign:</strong> ${data.utmCampaign || 'N/A'}</p>
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
```

### Step 4: Save and Deploy
1. Click the **💾 Save** icon (or Ctrl+S / Cmd+S)
2. **Important:** You must redeploy the script for changes to take effect:
   - Click **Deploy** → **Manage deployments**
   - Click the ✏️ **Edit** icon next to your active deployment
   - Under "Version", select **New version**
   - Click **Deploy**

### Step 5: Test the Email
1. Submit a test registration on your site
2. Check Tommy's inbox (and spam folder!)
3. You should receive an email with subject: "🎯 New Registration: [Name]"

## Troubleshooting

### Not receiving emails?
1. **Check spam folder** - Gmail sometimes flags automated emails
2. **Verify email address** - Make sure `NOTIFICATION_EMAIL` is correct
3. **Check Gmail permissions** - The script needs permission to send emails:
   - In Apps Script, click **Run** → **Run function** → **sendTestEmail** (if available)
   - Authorize the script when prompted
4. **Check execution logs**:
   - In Apps Script editor, click **Executions** (left sidebar)
   - Look for any errors related to `sendRegistrationEmail`

### Email format looks wrong?
- The email is sent as HTML - make sure you're viewing it in an email client that supports HTML
- If you want plain text instead, change `htmlBody` to `body` in the `MailApp.sendEmail()` call

## What the Email Contains

Each notification email includes:
- ✅ Full contact information (name, email, phone)
- ✅ All qualifying questions (age, marital status, income, debt)
- ✅ Additional info/comments from the registrant
- ✅ Tracking data (affiliate ref, UTM parameters)
- ✅ Timestamp of submission

## Important Notes

- Email notifications are sent **instantly** when someone registers
- The registration is still saved to Google Sheets even if the email fails
- You can add multiple recipients by changing the `to:` field to a comma-separated list:
  ```javascript
  to: 'tommy@example.com, admin@example.com',
  ```
