# YouTube Views Tracker Script

## Overview

The YouTube Views Tracker script is a Google Apps Script designed to interact with the YouTube Data API. It allows users to retrieve information about videos, including view counts, and update a Google Spreadsheet with the obtained data.

## Script Components

1. **`getService()` function:**
   - Returns the base URL for the YouTube Data API.

2. **`getVideoInfo(videoId)` function:**
   - Fetches video information, including snippet and statistics, from the YouTube Data API.
   - Parses the API response and extracts the view count.
   - Handles errors gracefully.

3. **`updateViewCounts(sheetName, readRange, insertSheetName, insertRange)` function:**
   - Reads video IDs from a specified range in a sheet.
   - Calls `getVideoInfo()` for each video ID to get the view count.
   - Writes the view counts to a specified range in another sheet.
   - Handles errors gracefully.

4. **`youtubeviews()` function:**
   - Prompts the user to select a sheet and range for reading video information.
   - Prompts the user to choose whether to output the data to the same sheet or a different one.
   - Prompts for the output sheet and range if necessary.
   - Calls `updateViewCounts()` with the selected parameters.
   - Shows a message box indicating the success or failure of the operation.

5. **`onOpen()` function:**
   - Creates a custom menu in the Google Spreadsheet UI with a single option to run the `youtubeviews` function.

6. **API Key:**
   - Stores the API key for accessing the YouTube Data API. Ensure the key is kept secure.

## Usage Instructions

1. **Open your Google Spreadsheet:**
   - Go to your Google account and open Google Spreadsheet.

2. **Click on "Scripts" and choose "Run my script":**
   - Follow the prompts:
      - Select a sheet and range for reading video information.
      - Decide whether to output data to the same sheet or another.
      - Specify the sheet and range for output if necessary.
   - The script will retrieve video information and update the selected sheet with view counts.

## Installation Instructions

1. **Open Google Spreadsheet:**
   - Log in to your Google account and open Google Spreadsheet.

2. **Create a new project:**
   - In the top menu, select "Extensions" -> "Apps Script."

3. **Insert the code:**
   - In the Apps Script window, delete any existing code.
   - Copy and paste your script code.
   - In the Services section, add "Google Sheets API" and "YouTube Data API v3."

4. **Save the project:**
   - Give the project a name, click the disk icon, and enter a project name (e.g., "YouTube Views Tracker").

5. **Configure API Key:**
   - After pasting the code, find the line with `const API_KEY = 'YOUR_API_KEY';`.
   - Replace 'YOUR_API_KEY' with your own API key obtained from the YouTube Data API.

6. **Save Changes:**
   - Click the disk icon or select "File" -> "Save" to save changes in your script.

7. **Run the function through the menu:**
   - Close the Apps Script window and return to Google Spreadsheet.
   - Refresh the page to see the new "Scripts" menu.
   - In the "Scripts" menu, select "Run my script." This will execute the `youtubeviews` function.

8. **Grant Permissions:**
   - Grant permissions if prompted.

9. **Choose sheet and range:**
   - Follow the script prompts to choose the sheet and range for reading video information.

10. **Wait for Execution:**
    - Wait for the script to complete execution. A popup will indicate the success or failure of the operation.

11. **Done!**
    - Your script is now set up and executed. You can view the video view counts in the selected sheet.

## Notes and Recommendations

- Ensure that the Google Sheets document has the necessary permissions for running the script.
- You will need an API key; follow the [official Google instructions](https://developers.google.com/youtube/registering_an_application) to obtain one.
- Keep the API key (`API_KEY` variable) secure and do not expose it publicly.
- Monitor the execution logs for any errors or issues.
