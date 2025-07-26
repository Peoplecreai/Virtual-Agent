import TravelAgent from '../src/agent'
import { GoogleGenAI } from '@google/genai'


jest.mock('@google/genai')

const MockedGenAI = GoogleGenAI as unknown as jest.Mock
const mockSendMessage = jest.fn(async () => ({ text: 'respuesta' }))

MockedGenAI.mockImplementation(() => ({
  chats: {
    create: () => ({ sendMessage: mockSendMessage })
  }
}))

describe('TravelAgent.handleMessage', () => {
  it('returns text from Gemini', async () => {
    const agent = new TravelAgent()
    const res = await agent.handleMessage('u1', 'hola')
    expect(res).toBe('respuesta')
    expect(mockSendMessage).toHaveBeenCalledWith({ message: 'hola' })
  })
})
