export async function syncWithGoogleSheets(history) {
  const token = localStorage.getItem('google_access_token');
  const spreadsheetId = localStorage.getItem('spreadsheet_id');
  
  if (!token || !spreadsheetId) return null;

  try {
    // Format history data for sheets
    const values = history.map(item => [
      new Date(item.time).toISOString(),
      item.expression,
      item.result
    ]);

    // Clear existing data first
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A2:C:clear`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}) // Empty body required for clear request
      }
    );

    // If there's no history, we're done after clearing
    if (values.length === 0) return null;

    // Update Google Sheets with new data
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A2:C${values.length + 1}?valueInputOption=RAW`,
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          range: `A2:C${values.length + 1}`,
          values: values
        })
      }
    );

    if (!response.ok) throw new Error('Failed to sync with Google Sheets');
    
    return await response.json();
  } catch (error) {
    console.error('Error syncing with Google Sheets:', error);
    return null;
  }
}

export async function fetchFromGoogleSheets() {
  const token = localStorage.getItem('google_access_token');
  const spreadsheetId = localStorage.getItem('spreadsheet_id');
  
  if (!token || !spreadsheetId) return null;

  try {
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A2:C`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    );

    if (!response.ok) throw new Error('Failed to fetch from Google Sheets');
    
    const data = await response.json();
    
    return data.values?.map(row => ({
      time: new Date(row[0]),
      expression: row[1],
      result: row[2]
    })) || [];
  } catch (error) {
    console.error('Error fetching from Google Sheets:', error);
    return null;
  }
} 