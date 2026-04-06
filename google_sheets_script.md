# Google Apps Script for Google Sheets Integration

Follow these steps to connect your contact form to a Google Sheet:

### 1. Create a Google Sheet
- Create a new Google Sheet (or use an existing one).
- Note down the sheet name (default is "Sheet1").

### 2. Set Up the Apps Script
- In your Google Sheet, go to **Extensions** > **Apps Script**.
- Delete any existing code in the `Code.gs` file.
- Paste the following code:

```javascript
/**
 * Google Apps Script to handle POST requests from a web contact form.
 * Appends data as a new row to the active spreadsheet.
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);
    var name = data.name;
    var email = data.email;
    var phone = data.phone;
    var timestamp = new Date();

    // Get the active spreadsheet and the first sheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheets()[0]; // Or use ss.getSheetByName("YourSheetName");

    // Append headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Timestamp", "Name", "Email", "Phone Number"]);
    }

    // Append the user data
    sheet.appendRow([timestamp, name, email, phone]);

    // Return a success JSON response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'success',
      'message': 'Data added to Google Sheet successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    // Return an error JSON response
    return ContentService.createTextOutput(JSON.stringify({
      'result': 'error',
      'message': err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

### 3. Deploy as a Web App
- Click the **Deploy** button > **New deployment**.
- **Select type:** Web app.
- **Description:** "Contact Form Handler".
- **Execute as:** Me (your email).
- **Who has access:** Anyone.
- Click **Deploy**.
- **Copy the Web App URL** (e.g., `https://script.google.com/macros/s/.../exec`).

### 4. Update the Website Code
- Open `src/components/ContactSection.tsx`.
- Update the `handleSubmit` function to send the data to your Web App URL. (I will do this part for you next).
