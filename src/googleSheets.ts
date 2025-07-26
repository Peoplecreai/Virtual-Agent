import { google } from 'googleapis'

export async function logRequest(data: unknown): Promise<string> {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  })
  const sheets = google.sheets({ version: 'v4', auth })
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'Requests!A:Z',
    valueInputOption: 'RAW',
    requestBody: {
      values: [[new Date().toISOString(), JSON.stringify(data)]]
    }
  })
  return 'Request logged to Google Sheets'
}
