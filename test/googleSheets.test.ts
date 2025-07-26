import { logRequest } from '../src/googleSheets'
import { google } from 'googleapis'

jest.mock('googleapis')

const append = jest.fn(async () => ({}))
;(google as unknown as jest.Mocked<typeof google>).auth = {
  getClient: jest.fn(async () => 'auth')
} as any
;(google as unknown as jest.Mocked<typeof google>).sheets = jest.fn(() => ({
  spreadsheets: { values: { append } }
})) as any

describe('logRequest', () => {
  it('appends values to the sheet', async () => {
    const msg = await logRequest({ foo: 'bar' })
    expect(msg).toBe('Request logged to Google Sheets')
    expect(append).toHaveBeenCalled()
  })
})
