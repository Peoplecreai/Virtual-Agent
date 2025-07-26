import TravelAgent from '../src/agent'
import { GoogleGenerativeAI } from '@google/generative-ai'


jest.mock('@google/generative-ai')

const MockedGenAI = GoogleGenerativeAI as unknown as jest.Mock
const mockSendMessage = jest.fn(async () => ({
  response: { candidates: [{ content: { parts: [{ text: 'respuesta' }] } }] }
}))

MockedGenAI.mockImplementation(() => ({
  getGenerativeModel: () => ({
    startChat: () => ({ sendMessage: mockSendMessage })
  })
}))

describe('TravelAgent.handleMessage', () => {
  it('returns text from Gemini', async () => {
    const agent = new TravelAgent()
    const res = await agent.handleMessage('u1', 'hola')
    expect(res).toBe('respuesta')
    expect(mockSendMessage).toHaveBeenCalledWith('hola')
  })
})
