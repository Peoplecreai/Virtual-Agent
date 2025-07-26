from googleapiclient.discovery import build
from google.oauth2 import service_account
import os

SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

async def log_request(data: dict) -> str:
    creds = service_account.Credentials.from_service_account_file(
        os.environ['GOOGLE_SERVICE_ACCOUNT'], scopes=SCOPES
    )
    service = build('sheets', 'v4', credentials=creds)
    sheet = service.spreadsheets()
    spreadsheet_id = os.environ['GOOGLE_SHEET_ID']
    body = {'values': [[data]]}
    await sheet.values().append(
        spreadsheetId=spreadsheet_id,
        range='Requests!A:Z',
        valueInputOption='RAW',
        body=body
    ).execute()
    return 'Request logged to Google Sheets'
