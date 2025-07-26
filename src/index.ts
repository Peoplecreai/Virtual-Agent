import 'dotenv/config'
import { OkibiSDK, ConsoleLogger } from '@okibi/a1kit'
import { AgentServer } from '@okibi/a1kit/server'
import createTravelAgent from './agent'
import { setupSlack } from './slack'

async function main() {
  const sdk = new OkibiSDK({
    apiKey: process.env.OKIBI_API_KEY!,
    modelApiKey: process.env.MODEL_API_KEY!,
    defaultModel: 'gpt-4o',
    defaultSystemPrompt: 'Eres el agente virtual de Creai especializado en gestionar solicitudes de viaje de negocio en Slack de forma natural, conversacional y precisa.'
  })
  const travelAgent = await createTravelAgent(sdk)
  const server = new AgentServer(travelAgent, {
    port: Number(process.env.PORT) || 9000,
    logger: new ConsoleLogger(),
    corsOptions: {}
  })
  await server.start()
  console.log('AgentServer listening on port', server)
  // Setup Slack integration
  setupSlack(travelAgent)
}

main().catch(err => {
  console.error('Error starting server:', err)
  process.exit(1)
})
